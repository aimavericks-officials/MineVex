import React, { useState, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Camera, 
  Upload, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import { TeamMember } from '../types';
import AdminTeamModal from './AdminTeamModal';

interface TeamSectionProps {
  teamMembers: TeamMember[];
  onUpdateTeam: (members: TeamMember[]) => void;
}

export default function TeamSection({
  teamMembers,
  onUpdateTeam,
}: TeamSectionProps) {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dragOverMemberId, setDragOverMemberId] = useState<string | null>(null);

  const directFileInputRef = useRef<HTMLInputElement>(null);
  const [directUploadMemberId, setDirectUploadMemberId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveMember = (savedMember: TeamMember) => {
    const exists = teamMembers.some((m) => m.id === savedMember.id);
    let updated: TeamMember[];
    if (exists) {
      updated = teamMembers.map((m) => (m.id === savedMember.id ? savedMember : m));
      showToast(`Updated profile for ${savedMember.name}`);
    } else {
      updated = [...teamMembers, savedMember];
      showToast(`Added new team member: ${savedMember.name}`);
    }
    onUpdateTeam(updated);
    setEditingMember(null);
    setIsAddingMember(false);
  };

  const triggerDirectUpload = (memberId: string) => {
    setDirectUploadMemberId(memberId);
    if (directFileInputRef.current) {
      directFileInputRef.current.value = '';
      directFileInputRef.current.click();
    }
  };

  const processImageFile = (file: File, memberId: string) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const newUrl = event.target.result as string;
        const targetMember = teamMembers.find((m) => m.id === memberId);
        const updated = teamMembers.map((m) =>
          m.id === memberId ? { ...m, avatarUrl: newUrl } : m
        );
        onUpdateTeam(updated);
        showToast(`Photo uploaded for ${targetMember?.name || 'team member'}`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDirectFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !directUploadMemberId) return;
    processImageFile(file, directUploadMemberId);
    e.target.value = '';
  };

  const handleRemovePhoto = (memberId: string, memberName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = teamMembers.map((m) =>
      m.id === memberId ? { ...m, avatarUrl: '' } : m
    );
    onUpdateTeam(updated);
    showToast(`Removed photo for ${memberName}`);
  };

  const handleDragOver = (e: React.DragEvent, memberId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverMemberId(memberId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverMemberId(null);
  };

  const handleDrop = (e: React.DragEvent, memberId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverMemberId(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file, memberId);
    }
  };

  // Helper to extract initials (e.g., "Ankit Dey" -> "AD")
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="team" className="relative py-16 bg-[#02060D] scroll-mt-24">
      {/* Hidden file input for direct photo uploads */}
      <input
        ref={directFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleDirectFileChange}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching mockup */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#006BFF] mb-1.5 font-mono flex items-center gap-2">
              <span>TEAM MAVERICKS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#006BFF]" />
              <span className="text-[11px] text-[#98A4B3] font-normal lowercase">click any card to upload photo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
              Meet the Minds Behind FLOODX
            </h2>
          </div>

          {/* Add member button */}
          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <button
              onClick={() => setIsAddingMember(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#006BFF] hover:bg-[#0084FF] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-[0_0_15px_rgba(0,107,255,0.3)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* Live Notification Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#08111F] border border-emerald-500/50 text-emerald-400 text-xs font-mono shadow-2xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 6 Team Member Cards in a responsive grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {teamMembers.slice(0, 6).map((member) => {
            const isTeamLeader = member.id === 'ankit-dey' || member.role.toLowerCase().includes('team leader');
            const hasPhoto = !!member.avatarUrl && member.avatarUrl.trim().length > 0;
            const isDragging = dragOverMemberId === member.id;

            return (
              <div
                key={member.id}
                className={`p-4 rounded-2xl bg-[#08111F] border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isDragging
                    ? 'border-[#00B7FF] shadow-[0_0_30px_rgba(0,183,255,0.4)] scale-[1.02]'
                    : 'border-[#00B7FF]/15 hover:border-[#00B7FF]/40 shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
                }`}
                onDragOver={(e) => handleDragOver(e, member.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, member.id)}
              >
                <div>
                  {/* Photo Container / Upload Dropzone */}
                  <div
                    onClick={() => triggerDirectUpload(member.id)}
                    className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 cursor-pointer transition-all duration-300 ${
                      hasPhoto
                        ? 'bg-[#030712] border border-[#00B7FF]/20 group-hover:border-[#00B7FF]/50'
                        : 'bg-gradient-to-b from-[#0B1728] to-[#040914] border-2 border-dashed border-[#00B7FF]/30 group-hover:border-[#00B7FF] group-hover:shadow-[0_0_20px_rgba(0,183,255,0.25)]'
                    }`}
                  >
                    {hasPhoto ? (
                      <>
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {/* Hover Overlay with Change / Delete buttons */}
                        <div className="absolute inset-0 bg-[#02060D]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 backdrop-blur-[2px]">
                          <span className="px-2.5 py-1 rounded-lg bg-[#006BFF] text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-lg">
                            <Camera className="w-3 h-3" />
                            <span>Change Photo</span>
                          </span>
                          <button
                            onClick={(e) => handleRemovePhoto(member.id, member.name, e)}
                            className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white border border-rose-500/40 text-[10px] flex items-center gap-1 transition-all"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Empty State with Initials & Upload Prompt */
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center select-none">
                        {/* Initials Avatar Ring */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#006BFF]/30 via-[#00B7FF]/20 to-transparent border border-[#00B7FF]/40 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(0,183,255,0.15)] group-hover:scale-110 group-hover:border-[#00B7FF] transition-all">
                          <span className="text-base font-black text-[#00B7FF] font-mono tracking-wider">
                            {getInitials(member.name)}
                          </span>
                        </div>

                        {/* Upload Prompt */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F7FA] group-hover:text-[#00B7FF] transition-colors mb-0.5">
                          <Upload className="w-3.5 h-3.5 text-[#00B7FF] group-hover:-translate-y-0.5 transition-transform" />
                          <span>Upload Photo</span>
                        </div>
                        <span className="text-[10px] text-[#98A4B3] leading-tight">
                          Click or drag & drop
                        </span>
                      </div>
                    )}

                    {/* Team Leader Badge on Top Left */}
                    {isTeamLeader && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#006BFF] text-white text-[9px] font-bold tracking-wider uppercase shadow-md pointer-events-none z-10">
                        TEAM LEADER
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-sm font-bold text-[#F5F7FA] mb-1">
                    {member.name}
                  </h3>

                  {/* Subtitle / Role matching mockup */}
                  <div className="text-[11px] text-[#98A4B3] leading-tight mb-4 min-h-[28px]">
                    {member.id === 'ankit-dey' ? (
                      <>
                        <div className="text-[#98A4B3]">Team Leader</div>
                        <div className="text-[#98A4B3]">AI/ML Engineer & System Architect</div>
                      </>
                    ) : (
                      <div>{member.role}</div>
                    )}
                  </div>
                </div>

                {/* Social Icons matching mockup (GitHub, LinkedIn, Email) */}
                <div className="flex items-center gap-3 pt-3 border-t border-[#00B7FF]/10 text-[#98A4B3]">
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#F5F7FA] transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00B7FF] transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={member.email ? `mailto:${member.email}` : 'mailto:contact@floodx.ai'}
                    className="hover:text-[#F5F7FA] transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>

                  {/* Direct Upload / Edit Trigger */}
                  <button
                    onClick={() => triggerDirectUpload(member.id)}
                    className="ml-auto p-1 text-[#00B7FF] hover:text-white transition-colors"
                    title="Upload / Change Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setEditingMember(member)}
                    className="p-1 text-[#98A4B3] hover:text-[#00B7FF] transition-colors cursor-pointer"
                    title="Edit Member Details"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Admin Team Modal for Edit/Add */}
      {(!!editingMember || isAddingMember) && (
        <AdminTeamModal
          memberToEdit={editingMember}
          onSave={handleSaveMember}
          onClose={() => {
            setEditingMember(null);
            setIsAddingMember(false);
          }}
        />
      )}
    </section>
  );
}
