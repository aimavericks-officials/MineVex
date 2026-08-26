import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Upload, 
  Trash2, 
  Plus, 
  Save, 
  Github, 
  Linkedin, 
  Twitter, 
  User, 
  Image as ImageIcon,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { TeamMember } from '../types';

interface AdminTeamModalProps {
  memberToEdit: TeamMember | null;
  onSave: (member: TeamMember) => void;
  onClose: () => void;
}

export default function AdminTeamModal({
  memberToEdit,
  onSave,
  onClose,
}: AdminTeamModalProps) {
  const [name, setName] = useState(memberToEdit?.name || '');
  const [role, setRole] = useState(memberToEdit?.role || '');
  const [bio, setBio] = useState(memberToEdit?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(memberToEdit?.avatarUrl || '');
  const [skillsText, setSkillsText] = useState(memberToEdit?.skills.join(', ') || 'AI, Hydroinformatics, GIS');
  const [githubUrl, setGithubUrl] = useState(memberToEdit?.githubUrl || '');
  const [linkedinUrl, setLinkedinUrl] = useState(memberToEdit?.linkedinUrl || '');
  const [twitterUrl, setTwitterUrl] = useState(memberToEdit?.twitterUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Convert to Base64 Data URL for instant persistent local and Firestore storage
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarUrl(event.target.result as string);
        setIsUploading(false);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) return;

    const skills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedMember: TeamMember = {
      id: memberToEdit?.id || `member-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      bio: bio.trim(),
      avatarUrl: avatarUrl.trim(),
      skills: skills.length > 0 ? skills : ['Geospatial AI', 'Hydrology'],
      githubUrl: githubUrl.trim() || undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      twitterUrl: twitterUrl.trim() || undefined,
      order: memberToEdit?.order || Date.now(),
    };

    onSave(updatedMember);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-xl bg-[#08111F] border border-[#00B7FF]/40 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 relative text-[#F5F7FA]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#00B7FF]/20">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-[#00B7FF]">
              Team Roster Manager
            </span>
            <h3 className="text-2xl font-black text-[#F5F7FA]">
              {memberToEdit ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#02060D] text-[#98A4B3] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Upload / Replace Section */}
          <div className="p-4 rounded-xl bg-[#02060D] border border-[#00B7FF]/20 flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group cursor-pointer" onClick={handleTriggerUpload}>
              {avatarUrl ? (
                <>
                  <img
                    src={avatarUrl}
                    alt={name || 'Avatar Preview'}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#00B7FF] shadow-[0_0_15px_rgba(0,183,255,0.4)]"
                  />
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium">
                    Change
                  </div>
                </>
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#0B1728] border-2 border-dashed border-[#00B7FF]/50 flex flex-col items-center justify-center text-[#00B7FF] group-hover:border-[#00B7FF] transition-colors">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-[9px] font-mono font-bold uppercase">Upload</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-xs font-bold text-[#F5F7FA] mb-1">
                Profile Photo
              </span>
              <p className="text-[11px] text-[#98A4B3] mb-3">
                Upload member portrait photo (PNG, JPG, WebP supported).
              </p>

              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleTriggerUpload}
                  disabled={isUploading}
                  className="px-3.5 py-1.5 rounded-lg bg-[#006BFF] hover:bg-[#00B7FF] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Uploading...' : avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl('')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#08111F] text-rose-400 hover:text-rose-300 text-xs border border-rose-500/30 transition-colors flex items-center gap-1"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {uploadSuccess && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Photo uploaded successfully
                </span>
              )}
            </div>
          </div>

          {/* Member Name & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priyam Roy"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
                Designation / Role *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Project Director & GIS Lead"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF]"
              />
            </div>
          </div>

          {/* Bio Description */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
              Bio & Focus Area
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Short description of responsibilities, research fields, or technical specialization..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF] resize-none"
            />
          </div>

          {/* Skills (Comma-separated) */}
          <div>
            <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
              Technical Skills (Comma-separated)
            </label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Deep Learning, Arduino, LoRaWAN, Spatial Analysis"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF]"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#98A4B3] mb-1">GitHub URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-lg bg-[#02060D] border border-[#00B7FF]/20 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#00B7FF]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[#98A4B3] mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 rounded-lg bg-[#02060D] border border-[#00B7FF]/20 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#00B7FF]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[#98A4B3] mb-1">Twitter/X URL</label>
              <input
                type="url"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full px-3 py-2 rounded-lg bg-[#02060D] border border-[#00B7FF]/20 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#00B7FF]"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#00B7FF]/20 flex items-center justify-between">
            <span className="text-[11px] text-[#98A4B3] font-mono">
              Live instant update to public website
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#02060D] hover:bg-[#08111F] text-xs font-semibold text-[#98A4B3] border border-[#00B7FF]/20"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#006BFF] to-[#00B7FF] text-white text-xs font-bold shadow-[0_0_15px_rgba(0,183,255,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Member</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
