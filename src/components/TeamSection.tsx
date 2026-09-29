import React from 'react';
import { Github, Linkedin, Mail, Twitter, ShieldCheck, Upload, Award, UserPlus, Settings } from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';

interface TeamSectionProps {
  onOpenOwnerPanel: () => void;
}

export default function TeamSection({ onOpenOwnerPanel }: TeamSectionProps) {
  const { teamMembers, isOwner } = useSiteAssets();

  return (
    <section id="team" className="py-20 bg-[#070B0F] border-b border-[#16222C] relative">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              13 · THE TEAM
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              AI Mavericks
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-[#8EA0AD] max-w-md leading-relaxed">
              Building an intelligent, predictive safety layer for India's open-cast mining ecosystem at Smart India Hackathon 2026.
            </p>

            <button
              onClick={onOpenOwnerPanel}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111A22] hover:bg-[#16232E] border border-[#FFB020]/40 text-[#FFB020] text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isOwner ? 'Manage Members' : 'Owner Panel'}</span>
            </button>
          </div>
        </div>

        {/* Team Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl bg-[#0D141B] border border-[#21303C] hover:border-[#FFB020]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Avatar and Badges */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl bg-[#111A22] border-2 border-[#21303C] group-hover:border-[#FFB020] transition-colors overflow-hidden flex items-center justify-center shrink-0">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-black text-[#FFB020]">
                        {member.name.charAt(0)}
                      </span>
                    )}

                    {member.avatarUrl && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#35E28B] border-2 border-[#070B0F] rounded-full" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FFB020] transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-[#FFB020] mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#8EA0AD] leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Skill tags */}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-[#111A22] border border-[#1E2E3C] text-[10px] font-mono text-[#A8BAC7]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Social / Contact + Owner Quick Upload */}
              <div className="pt-5 mt-4 border-t border-[#182633] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#7E909D]">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-lg hover:text-[#FFB020] hover:bg-[#14202B] transition-all"
                      title={member.email}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:text-white hover:bg-[#14202B] transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:text-[#46D9FF] hover:bg-[#14202B] transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={onOpenOwnerPanel}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#35E28B] hover:underline cursor-pointer"
                >
                  <Upload className="w-3 h-3" />
                  <span>{isOwner ? 'Edit / Photo' : 'Upload'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Team Banner / Mission Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#111B22] to-[#0A1015] border border-[#21303C] space-y-4">
            <div className="text-2xl font-black tracking-widest text-[#FFB020] font-mono">
              AI MAVERICKS
            </div>
            <p className="text-xs sm:text-sm text-[#8EA0AD]">
              MineVex AI · Smart India Hackathon 2026
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono font-bold text-white">
              <span className="px-3 py-1.5 rounded-lg bg-[#14202B] border border-[#233543]">AI / ML</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#14202B] border border-[#233543]">Frontend</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#14202B] border border-[#233543]">Backend</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#14202B] border border-[#233543]">IoT CAN Bus</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#14202B] border border-[#233543]">Research</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#111B22] to-[#0A1015] border border-[#21303C] flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-[#8EA0AD] leading-relaxed">
                Transform mining safety from reactive observation into continuous, data-driven and predictive situational awareness across India's mineral extraction corridors.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#home"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFB020] text-[#0A0D10] text-xs font-bold uppercase tracking-wider hover:bg-[#FFC14D] transition-all shadow-md shadow-[#FFB020]/20"
              >
                <span>Back to top ↑</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
