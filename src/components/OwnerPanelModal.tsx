import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Key, 
  Mail, 
  Image as ImageIcon, 
  ShieldCheck, 
  LogOut,
  RefreshCw,
  Plus,
  Edit2,
  User as UserIcon,
  Award,
  Eye,
  EyeOff
} from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';
import { TeamMember } from '../types';

interface OwnerPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OwnerPanelModal({ isOpen, onClose }: OwnerPanelModalProps) {
  const { 
    assets, 
    uploadAsset, 
    deleteAsset, 
    isOwner, 
    ownerEmail,
    loginAsOwner, 
    logoutOwner,
    teamMembers,
    updateTeamMemberPhoto,
    saveTeamMember,
    deleteTeamMember,
    compressMemberImage
  } = useSiteAssets();

  // Login form state - strictly empty by default so credentials are never visible
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  // Hidden file inputs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = useState<{ id: string; title: string; category: any } | null>(null);

  const teamFileInputRef = useRef<HTMLInputElement>(null);
  const [activeTeamMemberId, setActiveTeamMemberId] = useState<string | null>(null);

  // Member Creation & Editing Dialog state
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberBio, setMemberBio] = useState('');
  const [memberSkills, setMemberSkills] = useState('');
  const [memberAvatarPreview, setMemberAvatarPreview] = useState<string>('');
  const [memberFile, setMemberFile] = useState<File | null>(null);
  const [isSavingMember, setIsSavingMember] = useState(false);
  const memberImageInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);
    try {
      await loginAsOwner(email, password);
      setUploadStatus('Authenticated as Owner! You can now upload pictures and manage team members for all web users.');
    } catch (err: any) {
      console.error('Owner auth error:', err);
      setAuthError(err.message || 'Failed to authenticate. Verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTriggerUpload = (slot: { id: string; title: string; category: any }) => {
    setActiveSlot(slot);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlot) return;

    if (!file.type.startsWith('image/')) {
      setAuthError('Please upload a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    setUploadingSlot(activeSlot.id);
    setUploadStatus(`Compressing and uploading ${activeSlot.title}...`);

    try {
      await uploadAsset(activeSlot.id, activeSlot.title, activeSlot.category, file);
      setUploadStatus(`Success! "${activeSlot.title}" has been saved to Firebase Firestore. All web users can now see this picture.`);
    } catch (err: any) {
      console.error('Upload error:', err);
      setAuthError(`Upload error: ${err.message || 'Could not save asset'}`);
    } finally {
      setUploadingSlot(null);
      setActiveSlot(null);
      e.target.value = '';
    }
  };

  const handleTriggerTeamUpload = (memberId: string) => {
    setActiveTeamMemberId(memberId);
    if (teamFileInputRef.current) {
      teamFileInputRef.current.value = '';
      teamFileInputRef.current.click();
    }
  };

  const handleTeamFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeTeamMemberId) return;

    setUploadingSlot(`team_${activeTeamMemberId}`);
    setUploadStatus('Saving team photo to Firebase...');

    try {
      await updateTeamMemberPhoto(activeTeamMemberId, file);
      setUploadStatus('Team photo saved! All visitors now see the updated picture.');
    } catch (err: any) {
      console.error('Team upload error:', err);
      setAuthError(`Failed to update photo: ${err.message}`);
    } finally {
      setUploadingSlot(null);
      setActiveTeamMemberId(null);
      e.target.value = '';
    }
  };

  const handleDeleteSlot = async (id: string, title: string) => {
    if (!confirm(`Reset "${title}" to default image?`)) return;
    try {
      await deleteAsset(id);
      setUploadStatus(`Reset "${title}" to default.`);
    } catch (err: any) {
      setAuthError(`Failed to reset: ${err.message}`);
    }
  };

  // Open member form for Adding
  const handleOpenAddMember = () => {
    setEditingMemberId(null);
    setMemberName('');
    setMemberRole('');
    setMemberBio('');
    setMemberSkills('Mining AI, Computer Vision, Edge Computing');
    setMemberAvatarPreview('');
    setMemberFile(null);
    setIsMemberFormOpen(true);
  };

  // Open member form for Editing
  const handleOpenEditMember = (member: TeamMember) => {
    setEditingMemberId(member.id);
    setMemberName(member.name);
    setMemberRole(member.role);
    setMemberBio(member.bio || '');
    setMemberSkills(member.skills ? member.skills.join(', ') : '');
    setMemberAvatarPreview(member.avatarUrl || '');
    setMemberFile(null);
    setIsMemberFormOpen(true);
  };

  const handleMemberImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAuthError('Please choose a valid image file');
      return;
    }

    setMemberFile(file);
    try {
      const compressed = await compressMemberImage(file);
      setMemberAvatarPreview(compressed);
    } catch (err) {
      console.error('Error previewing image:', err);
    }
  };

  const handleSaveMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberRole.trim()) {
      setAuthError('Please provide both Member Name and Role');
      return;
    }

    setIsSavingMember(true);
    setAuthError(null);

    try {
      const memberId = editingMemberId || memberName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `member-${Date.now()}`;
      
      let finalAvatarUrl = memberAvatarPreview;
      if (memberFile) {
        finalAvatarUrl = await compressMemberImage(memberFile);
      }

      const skillsArray = memberSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const targetOrder = editingMemberId 
        ? (teamMembers.find((m) => m.id === editingMemberId)?.order || teamMembers.length + 1)
        : teamMembers.length + 1;

      const memberRecord: TeamMember = {
        id: memberId,
        name: memberName.trim(),
        role: memberRole.trim(),
        bio: memberBio.trim() || 'AI Mavericks contributor specializing in intelligent mining vehicle safety architectures.',
        avatarUrl: finalAvatarUrl,
        skills: skillsArray.length > 0 ? skillsArray : ['Mining AI', 'Safety Systems'],
        order: targetOrder,
      };

      await saveTeamMember(memberRecord);
      setUploadStatus(`Team member "${memberRecord.name}" successfully saved to Firebase! Visible to all web users.`);
      setIsMemberFormOpen(false);
    } catch (err: any) {
      console.error('Error saving member:', err);
      setAuthError(`Failed to save member: ${err.message}`);
    } finally {
      setIsSavingMember(false);
    }
  };

  const handleDeleteMember = async (memberId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the team?`)) return;
    try {
      await deleteTeamMember(memberId);
      setUploadStatus(`Removed ${name} from the team.`);
    } catch (err: any) {
      setAuthError(`Failed to delete member: ${err.message}`);
    }
  };

  const slots = [
    {
      id: 'hero_background',
      title: 'Upper Webpage Background Image',
      category: 'hero' as const,
      description: 'The main upper background image for the website hero section (Mine / Haul Road / Dam view).',
      recommendation: 'Landscape 16:9 or 21:9 ratio (JPG, PNG, WebP)',
      preview: assets['hero_background']?.imageUrl || '/images/aa.jpg'
    },
    {
      id: 'minevex_logo',
      title: 'MineVex AI & AI Mavericks Logo',
      category: 'logo' as const,
      description: 'The official circular emblem and badge displayed in navigation bar, headers, and footer.',
      recommendation: 'Square 1:1 circular badge (PNG, JPG)',
      preview: assets['minevex_logo']?.imageUrl || '/images/floodx_logo.png'
    },
    {
      id: 'cv_preview',
      title: 'Computer Vision YOLO Detection Frame',
      category: 'diagram' as const,
      description: 'The demonstration camera image displayed inside the Section 04 Computer Vision prototype.',
      recommendation: '16:9 haul truck / mining environment view',
      preview: assets['cv_preview']?.imageUrl || '/images/dam_aerial_release.jpg'
    },
    {
      id: 'architecture_diagram',
      title: 'System Architecture & Hardware Diagram',
      category: 'diagram' as const,
      description: 'Detailed technical diagram or hardware board photo for the MineVex system architecture.',
      recommendation: 'Diagram or circuit layout photo',
      preview: assets['architecture_diagram']?.imageUrl || '/images/arduino_zero.jpg'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#091017] border border-[#21303C] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2a36] bg-[#0d161f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFB020] to-[#FF6B35] flex items-center justify-center shadow-lg shadow-[#FFB020]/20">
              <ShieldCheck className="w-5 h-5 text-[#0A0D10]" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white flex items-center gap-2">
                MINEVEX AI OWNER PANEL
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#35E28B]/10 text-[#35E28B] border border-[#35E28B]/30">
                  FIREBASE LIVE SYNC
                </span>
              </h2>
              <p className="text-xs text-[#8EA0AD]">
                Manage website background, branding, pictures, and team members visible to all web users
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#8EA0AD] hover:text-white hover:bg-[#16232E] transition-all cursor-pointer"
            aria-label="Close owner panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Notifications */}
          {uploadStatus && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#35E28B]/10 border border-[#35E28B]/30 text-[#BDF5D1] text-xs font-medium animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#35E28B] shrink-0" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {authError && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#FF4D5E]/10 border border-[#FF4D5E]/30 text-[#FF8591] text-xs font-medium animate-fade-in">
              <AlertCircle className="w-4 h-4 text-[#FF4D5E] shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* If NOT Authenticated: Show Password Login Form (No Google) */}
          {!isOwner ? (
            <div className="p-6 rounded-2xl bg-[#0d141b] border border-[#1d2a34] space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#FFB020]/10 border border-[#FFB020]/20 text-[#FFB020]">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Owner Credentials Login</h3>
                  <p className="text-xs text-[#8EA0AD] mt-1 leading-relaxed">
                    Log in with your administrator email and password below to upload pictures and add or manage team members. All changes are saved to Firebase Firestore and displayed live to every visitor.
                  </p>
                </div>
              </div>

              {/* Form login with credentials */}
              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#8EA0AD] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FFB020]" />
                    Owner Email
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070B0F] border border-[#21303C] text-white text-sm focus:outline-none focus:border-[#FFB020] transition-colors font-mono"
                    placeholder="Enter owner email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8EA0AD] mb-1.5 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#FFB020]" />
                    Owner Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="off"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#070B0F] border border-[#21303C] text-white text-sm focus:outline-none focus:border-[#FFB020] transition-colors font-mono"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#687C8C] hover:text-[#FFB020] transition-colors p-1"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#FFB020] to-[#FF6B35] text-[#0A0D10] font-black text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#FFB020]/25 disabled:opacity-50 cursor-pointer font-heading"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Sign In as Owner'
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* If Authenticated: Show Full Asset & Member Management Dashboard */
            <div className="space-y-8">
              {/* Authenticated Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#111A22] border border-[#21303C]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#35E28B]/20 text-[#35E28B] flex items-center justify-center font-black">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>Owner Mode Active</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#35E28B]/20 text-[#35E28B] border border-[#35E28B]/40 font-mono tracking-wider">
                        VERIFIED ADMINISTRATOR
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8EA0AD] mt-0.5">
                      Uploaded pictures and team changes sync to Firebase Firestore and update immediately across the site.
                    </p>
                  </div>
                </div>

                <button
                  onClick={logoutOwner}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2d3f4d] bg-[#0c141a] text-xs text-[#a9b8c2] hover:text-white hover:border-[#ff4d5e]/50 transition-all self-start sm:self-auto cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#ff4d5e]" />
                  Sign Out
                </button>
              </div>

              {/* ================= TEAM MEMBER ADD & EDIT SECTION ================= */}
              <div className="p-5 rounded-2xl bg-[#0B131A] border border-[#20313F] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-[#FFB020] flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-[#FFB020]" />
                      Team Member Management (Name, Role, Image)
                    </h3>
                    <p className="text-xs text-[#8EA0AD] mt-0.5">
                      Add, edit, or upload member name, role, bio, and portrait image to Firebase
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddMember}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#35E28B] hover:bg-[#43e694] text-[#07130B] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#35E28B]/20 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Member</span>
                  </button>
                </div>

                {/* Add/Edit Member Form Drawer */}
                {isMemberFormOpen && (
                  <form onSubmit={handleSaveMemberSubmit} className="p-4 sm:p-5 rounded-xl bg-[#070C11] border border-[#2A3F50] space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-[#1A2A38] pb-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                        {editingMemberId ? <Edit2 className="w-3.5 h-3.5 text-[#FFB020]" /> : <Plus className="w-3.5 h-3.5 text-[#35E28B]" />}
                        <span>{editingMemberId ? 'Edit Team Member' : 'Add New Team Member'}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setIsMemberFormOpen(false)}
                        className="text-[#8EA0AD] hover:text-white p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      {/* Member Image Upload Box (4 cols) with 1.2 x 1.6 aspect ratio */}
                      <div className="md:col-span-5 flex flex-col items-center gap-3 p-4 rounded-xl bg-[#0D1620] border border-[#1F2F3D]">
                        <div className="flex items-center justify-between w-full text-[11px] font-mono font-bold text-[#FFB020]">
                          <span>PORTRAIT PHOTO</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#FFB020]/15 text-[10px]">1.2 : 1.6 RATIO</span>
                        </div>

                        <div className="relative w-full max-w-[200px] aspect-[1.2/1.6] rounded-2xl bg-[#131F2B] border-2 border-[#2F4457] overflow-hidden flex items-center justify-center group shadow-xl">
                          {memberAvatarPreview ? (
                            <img
                              src={memberAvatarPreview}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-4 text-center text-[#55697A]">
                              <ImageIcon className="w-10 h-10 mb-2 text-[#46D9FF]" />
                              <span className="text-xs font-mono font-bold text-white">No Photo</span>
                              <span className="text-[10px] text-[#6E8394] mt-1 font-mono">1.2 × 1.6 Ratio</span>
                            </div>
                          )}
                        </div>

                        <input
                          ref={memberImageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleMemberImageChange}
                        />

                        <button
                          type="button"
                          onClick={() => memberImageInputRef.current?.click()}
                          className="w-full max-w-[200px] py-2 px-3 rounded-lg bg-[#182633] hover:bg-[#203345] text-xs font-bold text-[#FFB020] border border-[#2F4457] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{memberAvatarPreview ? 'Change Photo (1.2 : 1.6)' : 'Upload Photo (1.2 : 1.6)'}</span>
                        </button>
                        <span className="text-[10px] text-[#697E8E] text-center font-mono">
                          Auto-formatted &amp; centered to 1.2 × 1.6 portrait
                        </span>
                      </div>

                      {/* Member Info Inputs (7 cols) */}
                      <div className="md:col-span-7 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8EA0AD] mb-1">
                              Member Full Name *
                            </label>
                            <input
                              type="text"
                              value={memberName}
                              onChange={(e) => setMemberName(e.target.value)}
                              required
                              placeholder="e.g. Priyam Roy"
                              className="w-full px-3 py-2 rounded-lg bg-[#070B0E] border border-[#233544] text-white text-xs focus:outline-none focus:border-[#FFB020]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8EA0AD] mb-1">
                              Role / Designation *
                            </label>
                            <input
                              type="text"
                              value={memberRole}
                              onChange={(e) => setMemberRole(e.target.value)}
                              required
                              placeholder="e.g. Mining AI Lead & Architect"
                              className="w-full px-3 py-2 rounded-lg bg-[#070B0E] border border-[#233544] text-white text-xs focus:outline-none focus:border-[#FFB020]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8EA0AD] mb-1">
                            Skills &amp; Badges (comma separated)
                          </label>
                          <input
                            type="text"
                            value={memberSkills}
                            onChange={(e) => setMemberSkills(e.target.value)}
                            placeholder="e.g. Computer Vision, PyTorch, Edge AI, CAN Bus"
                            className="w-full px-3 py-2 rounded-lg bg-[#070B0E] border border-[#233544] text-white text-xs focus:outline-none focus:border-[#FFB020]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8EA0AD] mb-1">
                            Biography &amp; Focus Area
                          </label>
                          <textarea
                            rows={2}
                            value={memberBio}
                            onChange={(e) => setMemberBio(e.target.value)}
                            placeholder="Brief description of member's research focus and contributions..."
                            className="w-full px-3 py-2 rounded-lg bg-[#070B0E] border border-[#233544] text-white text-xs focus:outline-none focus:border-[#FFB020] resize-none"
                          />
                        </div>

                        <div className="pt-2 flex items-center justify-end gap-2.5">
                          <button
                            type="button"
                            onClick={() => setIsMemberFormOpen(false)}
                            className="px-4 py-2 rounded-lg border border-[#25394A] bg-[#101A24] text-xs text-[#8EA0AD] hover:text-white"
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            disabled={isSavingMember}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-[#FFB020] to-[#FF6B35] text-[#0A0D10] font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#FFB020]/25 disabled:opacity-50 cursor-pointer"
                          >
                            {isSavingMember ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                Saving to Firebase...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Save Member</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Team Members List with 1.2 x 1.6 ratio thumbnails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-3.5 rounded-xl bg-[#0D151D] border border-[#1B2935] flex flex-col justify-between gap-3 hover:border-[#2D4355] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {/* 1.2 x 1.6 Ratio Member Thumbnail */}
                        <div className="relative w-14 sm:w-16 aspect-[1.2/1.6] rounded-xl bg-[#14202B] border border-[#2B3E4F] overflow-hidden shrink-0 flex items-center justify-center">
                          {member.avatarUrl ? (
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <span className="font-bold text-sm text-[#FFB020] font-heading">
                              {member.name.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-white truncate font-heading">{member.name}</h5>
                          <p className="text-[10px] text-[#FFB020] truncate font-mono mt-0.5 font-bold">
                            {member.role}
                          </p>
                          <span className="text-[9px] text-[#637785] font-mono block mt-1">1.2 × 1.6 Portrait</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#172430]">
                        <button
                          type="button"
                          onClick={() => handleTriggerTeamUpload(member.id)}
                          className="text-[11px] font-mono text-[#35E28B] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Photo (1.2×1.6)</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditMember(member)}
                            className="p-1.5 rounded bg-[#152330] hover:bg-[#1E3347] text-[#FFB020] text-xs transition-all cursor-pointer"
                            title="Edit details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="p-1.5 rounded bg-[#201015] hover:bg-[#30161E] text-[#FF4D5E] text-xs transition-all cursor-pointer"
                            title="Delete member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= PRIMARY WEBSITE PICTURE SLOTS ================= */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#FFB020]">
                    Primary Website Picture Slots
                  </h3>
                  <span className="text-[11px] text-[#6e808c]">
                    Click "Upload Picture" on any slot to replace it live
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slots.map((slot) => {
                    const isCustom = Boolean(assets[slot.id]);
                    const isBusy = uploadingSlot === slot.id;

                    return (
                      <div
                        key={slot.id}
                        className="p-4 rounded-xl bg-[#0D141B] border border-[#1b2832] flex flex-col justify-between gap-4 hover:border-[#2d4253] transition-all"
                      >
                        <div className="flex flex-col sm:flex-row gap-3.5">
                          <div className="relative w-full sm:w-36 h-28 rounded-xl bg-[#070b0f] border border-[#21303c] overflow-hidden shrink-0 group shadow-md">
                            <img
                              src={slot.preview}
                              alt={slot.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {isCustom && (
                              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 text-[9px] font-bold rounded bg-[#35E28B] text-[#0A0D10] font-mono">
                                FIREBASE
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate font-heading">{slot.title}</h4>
                            <p className="text-[11px] text-[#8EA0AD] line-clamp-2 mt-1 leading-relaxed">
                              {slot.description}
                            </p>
                            <span className="inline-block mt-2 text-[10px] text-[#697a85] font-mono">
                              {slot.recommendation}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#16222b]">
                          <span className="text-[10px] text-[#8EA0AD]">
                            Status:{' '}
                            <strong className={isCustom ? 'text-[#35E28B]' : 'text-[#a9b8c2]'}>
                              {isCustom ? 'Custom Uploaded' : 'Default Asset'}
                            </strong>
                          </span>

                          <div className="flex items-center gap-2">
                            {isCustom && (
                              <button
                                onClick={() => handleDeleteSlot(slot.id, slot.title)}
                                className="p-1.5 rounded-lg border border-[#302125] bg-[#1a0e12] text-[#ff7884] hover:bg-[#281318] transition-all text-xs flex items-center gap-1 cursor-pointer"
                                title="Reset to default image"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Reset</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleTriggerUpload(slot)}
                              disabled={isBusy}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFB020] text-[#0A0D10] text-xs font-bold hover:bg-[#ffc14d] active:scale-95 transition-all shadow-md shadow-[#FFB020]/20 disabled:opacity-50 cursor-pointer"
                            >
                              {isBusy ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="w-3.5 h-3.5" />
                                  Upload Picture
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelected}
        />
        <input
          ref={teamFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleTeamFileSelected}
        />

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#1b2a36] bg-[#0b1219] text-xs text-[#8EA0AD]">
          <span>© MineVex AI · AI Mavericks Owner Controls</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#21303C] bg-[#111A22] text-white hover:bg-[#16232E] transition-all text-xs font-semibold cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
