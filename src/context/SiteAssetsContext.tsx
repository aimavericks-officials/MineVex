import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  db, 
  auth, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  signOut, 
  onAuthStateChanged,
  User,
  testFirestoreConnection
} from '../firebase';
import { SiteAsset, TeamMember } from '../types';
import { DEFAULT_TEAM_MEMBERS } from '../data/minevexData';

interface SiteAssetsContextType {
  assets: Record<string, SiteAsset>;
  getAssetUrl: (id: string, fallbackUrl: string) => string;
  uploadAsset: (id: string, title: string, category: SiteAsset['category'], file: File) => Promise<string>;
  deleteAsset: (id: string) => Promise<void>;
  isLoadingAssets: boolean;
  
  // Team members synced via Firebase
  teamMembers: TeamMember[];
  updateTeamMemberPhoto: (memberId: string, file: File) => Promise<void>;
  saveTeamMember: (member: TeamMember) => Promise<void>;
  deleteTeamMember: (memberId: string) => Promise<void>;
  compressMemberImage: (file: File) => Promise<string>;
  
  // Owner Auth state
  currentUser: User | null;
  ownerEmail: string | null;
  isOwner: boolean;
  loginAsOwner: (emailInput: string, passwordInput: string) => Promise<void>;
  logoutOwner: () => Promise<void>;
}

const SiteAssetsContext = createContext<SiteAssetsContextType | null>(null);

const STORAGE_KEY_ASSETS = 'minevex_site_assets_v1';
const STORAGE_KEY_TEAM = 'minevex_team_members_v1';
const STORAGE_KEY_AUTH = 'minevex_owner_authenticated_v1';

// Compress image via canvas to stay safely under Firestore 1MB document limit
export async function compressImage(file: File, maxDim = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image element'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Prefer webp with fallback to jpeg
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const SiteAssetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize assets with local backup if available
  const [assets, setAssets] = useState<Record<string, SiteAsset>>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_ASSETS);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // Ignore cache error
    }
    return {};
  });

  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ownerEmail, setOwnerEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH);
    } catch {
      return null;
    }
  });

  // Initialize team members with local cache or default
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_TEAM);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {}
    return DEFAULT_TEAM_MEMBERS;
  });

  // Test Firestore connectivity on boot
  useEffect(() => {
    testFirestoreConnection().catch(() => {});
  }, []);

  // Track Firebase Auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user?.email) {
        const email = user.email.toLowerCase();
        if (email === 'priyam1.3.2008@gmail.com' || email.startsWith('priyam1.3.2008')) {
          setOwnerEmail(email);
          try {
            localStorage.setItem(STORAGE_KEY_AUTH, email);
          } catch {}
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen to site_assets collection for real-time images across all web users
  useEffect(() => {
    const path = 'site_assets';
    const unsubscribe = onSnapshot(
      collection(db, path),
      (snapshot) => {
        const map: Record<string, SiteAsset> = {};
        snapshot.forEach((d) => {
          map[d.id] = d.data() as SiteAsset;
        });
        
        // Merge with existing local state
        setAssets((prev) => {
          const merged = { ...prev, ...map };
          try {
            localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(merged));
          } catch {}
          return merged;
        });
        setIsLoadingAssets(false);
      },
      (error) => {
        console.warn('site_assets snapshot info:', error?.message || error);
        setIsLoadingAssets(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Listen to team_members collection
  useEffect(() => {
    const path = 'team_members';
    const unsubscribe = onSnapshot(
      collection(db, path),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: TeamMember[] = [];
          snapshot.forEach((d) => {
            loaded.push(d.data() as TeamMember);
          });
          loaded.sort((a, b) => a.order - b.order);
          setTeamMembers(loaded);
          try {
            localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(loaded));
          } catch {}
        }
      },
      (error) => {
        console.warn('team_members snapshot info:', error?.message || error);
      }
    );
    return () => unsubscribe();
  }, []);

  // Determine if the current session has Owner privileges
  const isOwner = useMemo(() => {
    if (ownerEmail) {
      const email = ownerEmail.toLowerCase();
      if (email === 'priyam1.3.2008@gmail.com' || email.startsWith('priyam1.3.2008')) {
        return true;
      }
    }
    if (currentUser?.email) {
      const email = currentUser.email.toLowerCase();
      if (email === 'priyam1.3.2008@gmail.com' || email.startsWith('priyam1.3.2008')) {
        return true;
      }
    }
    return false;
  }, [ownerEmail, currentUser]);

  // Upload an image asset to Firebase Firestore so all visitors see it
  const uploadAsset = async (
    id: string,
    title: string,
    category: SiteAsset['category'],
    file: File
  ): Promise<string> => {
    const compressedDataUrl = await compressImage(file, 1600, 0.85);
    const assetData: SiteAsset = {
      id,
      title,
      category,
      imageUrl: compressedDataUrl,
      uploadedBy: ownerEmail || currentUser?.email || 'priyam1.3.2008@gmail.com',
      updatedAt: new Date().toISOString(),
      fileSize: file.size,
    };

    // 1. Immediately update local state & localStorage so the UI renders right away
    setAssets((prev) => {
      const next = { ...prev, [id]: assetData };
      try {
        localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(next));
      } catch {}
      return next;
    });

    // 2. Persist to Firebase Firestore so every web user receives the image live
    try {
      await setDoc(doc(db, 'site_assets', id), assetData);
    } catch (error) {
      console.warn('Firestore write notice (local fallback active):', error);
    }

    return compressedDataUrl;
  };

  // Delete an image asset
  const deleteAsset = async (id: string): Promise<void> => {
    setAssets((prev) => {
      const copy = { ...prev };
      delete copy[id];
      try {
        localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(copy));
      } catch {}
      return copy;
    });

    try {
      await deleteDoc(doc(db, 'site_assets', id));
    } catch (error) {
      console.warn('Firestore delete notice:', error);
    }
  };

  // Upload team member photo
  const updateTeamMemberPhoto = async (memberId: string, file: File): Promise<void> => {
    const compressedDataUrl = await compressImage(file, 800, 0.88);
    const target = teamMembers.find((m) => m.id === memberId) || {
      id: memberId,
      name: 'Team Member',
      role: 'AI Mavericks Specialist',
      bio: '',
      skills: [],
      order: 99,
      avatarUrl: '',
    };

    const updatedMember: TeamMember = {
      ...target,
      avatarUrl: compressedDataUrl,
    };

    const updatedList = teamMembers.map((m) => (m.id === memberId ? updatedMember : m));
    setTeamMembers(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(updatedList));
    } catch {}

    try {
      await setDoc(doc(db, 'team_members', memberId), updatedMember);
    } catch (error) {
      console.warn('Team photo Firestore notice:', error);
    }
  };

  // Save (add or update) a team member with name, role, bio, image, skills
  const saveTeamMember = async (member: TeamMember): Promise<void> => {
    const existingIndex = teamMembers.findIndex((m) => m.id === member.id);
    let updatedList: TeamMember[];

    if (existingIndex >= 0) {
      updatedList = teamMembers.map((m) => (m.id === member.id ? member : m));
    } else {
      updatedList = [...teamMembers, member];
    }

    updatedList.sort((a, b) => a.order - b.order);
    setTeamMembers(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(updatedList));
    } catch {}

    try {
      await setDoc(doc(db, 'team_members', member.id), member);
    } catch (error) {
      console.warn('Save team member Firestore notice:', error);
    }
  };

  // Delete a team member
  const deleteTeamMember = async (memberId: string): Promise<void> => {
    const filtered = teamMembers.filter((m) => m.id !== memberId);
    setTeamMembers(filtered);
    try {
      localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(filtered));
    } catch {}

    try {
      await deleteDoc(doc(db, 'team_members', memberId));
    } catch (error) {
      console.warn('Delete team member Firestore notice:', error);
    }
  };

  const compressMemberImage = async (file: File): Promise<string> => {
    return compressImage(file, 800, 0.88);
  };

  // Helper to get image URL with fallback
  const getAssetUrl = (id: string, fallbackUrl: string): string => {
    const item = assets[id];
    if (item && item.imageUrl) {
      return item.imageUrl;
    }
    return fallbackUrl;
  };

  // Owner login handler using credentials requested by user
  const loginAsOwner = async (emailInput: string, passwordInput: string) => {
    const normalizedEmail = emailInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    // Verify Owner credentials
    const isOwnerEmailMatch = 
      normalizedEmail === 'priyam1.3.2008@' || 
      normalizedEmail === 'priyam1.3.2008@gmail.com' ||
      normalizedEmail.startsWith('priyam1.3.2008');

    const isPasswordMatch = cleanPassword === 'Priyam2008@';

    if (isOwnerEmailMatch && isPasswordMatch) {
      const canonicalEmail = 'priyam1.3.2008@gmail.com';
      setOwnerEmail(canonicalEmail);
      try {
        localStorage.setItem(STORAGE_KEY_AUTH, canonicalEmail);
      } catch {}
      return;
    }

    throw new Error('Invalid email or password. Please verify your credentials.');
  };

  // Owner logout handler
  const logoutOwner = async () => {
    setOwnerEmail(null);
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch {}
    try {
      await signOut(auth);
    } catch {}
  };

  return (
    <SiteAssetsContext.Provider
      value={{
        assets,
        getAssetUrl,
        uploadAsset,
        deleteAsset,
        isLoadingAssets,
        teamMembers,
        updateTeamMemberPhoto,
        saveTeamMember,
        deleteTeamMember,
        compressMemberImage,
        currentUser,
        ownerEmail,
        isOwner,
        loginAsOwner,
        logoutOwner,
      }}
    >
      {children}
    </SiteAssetsContext.Provider>
  );
};

export const useSiteAssets = () => {
  const context = useContext(SiteAssetsContext);
  if (!context) {
    throw new Error('useSiteAssets must be used within a SiteAssetsProvider');
  }
  return context;
};
