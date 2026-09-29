import React from 'react';
import { Github, Linkedin, Mail, Upload, UserPlus } from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';

interface TeamSectionProps {
  onOpenOwnerPanel: () => void;
}

export default function TeamSection({ onOpenOwnerPanel }: TeamSectionProps) {
  const { teamMembers, isOwner } = useSiteAssets();

  return (
    <section id="team" className="py-20 bg-[#070B0F] border-b border-[#16222C] relative">
      <div className="w-[94%] max-w-[1360px] mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#15232F]">
          <div>
            <div className="text-xs font-black tracking-[0.2em] text-[#FFB020] uppercase font-mono mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020]" />
              13 · THE TEAM
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-heading">
              AI Mavericks
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-[#8EA0AD] max-w-md leading-relaxed font-sans">
              Developing a multi-sensor, predictive safety architecture for India's open-cast mining ecosystems at Smart India Hackathon 2026.
            </p>

            <button
              onClick={onOpenOwnerPanel}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB020] to-[#FF8533] text-[#0A0D10] text-xs font-black uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all shadow-lg shadow-[#FFB020]/25 shrink-0 cursor-pointer font-heading"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isOwner ? 'Manage Team' : 'Owner Panel'}</span>
            </button>
          </div>
        </div>

        {/* 6 Members In One Row on Desktop (50% Size with 1.2 x 1.6 Ratio) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 xl:gap-4">
          {teamMembers.slice(0, 6).map((member) => (
            <div
              key={member.id}
              className="rounded-xl bg-[#0D141B] border border-[#21303C] hover:border-[#FFB020]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl group hover:-translate-y-1"
            >
              <div>
                {/* 1.2 x 1.6 Ratio Portrait Container (50% Scale) */}
                <div className="relative w-full aspect-[1.2/1.6] bg-[#0A1016] overflow-hidden border-b border-[#1B2936]">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-[#111A24] to-[#080D12]">
                      <div className="w-14 h-14 rounded-xl bg-[#152330] border border-[#2B3E50] flex items-center justify-center text-xl font-black text-[#FFB020] font-heading mb-2">
                        {member.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-mono text-[#7D93A3] font-bold">
                        1.2 × 1.6
                      </span>
                      <button
                        onClick={onOpenOwnerPanel}
                        className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FFB020]/15 hover:bg-[#FFB020] text-[#FFB020] hover:text-[#0A0D10] text-[10px] font-bold font-mono transition-all cursor-pointer"
                      >
                        <Upload className="w-2.5 h-2.5" />
                        <span>Upload</span>
                      </button>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D141B] via-transparent to-transparent opacity-70 pointer-events-none" />

                  {/* Top Ratio Tag */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="px-1.5 py-0.5 rounded bg-[#070B0F]/85 backdrop-blur-md border border-[#233544] text-[9px] font-mono text-[#FFB020] font-bold">
                      1.2 × 1.6
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#35E28B]" />
                  </div>

                  {/* Quick Photo Upload Trigger on Hover */}
                  <button
                    onClick={onOpenOwnerPanel}
                    className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[#070B0F]/90 hover:bg-[#FFB020] text-[#FFB020] hover:text-[#0A0D10] border border-[#21303C] hover:border-[#FFB020] transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                    title="Change portrait photo (1.2 x 1.6)"
                  >
                    <Upload className="w-3 h-3" />
                  </button>
                </div>

                {/* Member Info Content */}
                <div className="p-3.5 space-y-1.5">
                  <h3 className="text-sm font-black text-white group-hover:text-[#FFB020] transition-colors leading-snug font-heading truncate">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-mono font-bold text-[#FFB020] uppercase tracking-tight truncate block">
                    {member.role.split('&')[0]}
                  </p>

                  {/* Skill tags */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {member.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.5 rounded bg-[#111A22] border border-[#1E2E3C] text-[9px] font-mono text-[#A8BAC7] truncate max-w-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: Social Icons and Action */}
              <div className="px-3.5 py-2.5 border-t border-[#172430] bg-[#0A1016] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#7E909D]">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1 rounded hover:text-[#FFB020] transition-colors"
                      title={member.email}
                    >
                      <Mail className="w-3 h-3" />
                    </a>
                  )}
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:text-[#46D9FF] transition-colors"
                    >
                      <Linkedin className="w-3 h-3" />
                    </a>
                  )}
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:text-white transition-colors"
                    >
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <button
                  onClick={onOpenOwnerPanel}
                  className="text-[10px] font-mono font-bold text-[#35E28B] hover:text-[#56fdb0] transition-colors cursor-pointer flex items-center gap-0.5"
                >
                  <Upload className="w-2.5 h-2.5" />
                  <span>Photo</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Team Banner / Mission Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#111B22] to-[#0A1015] border border-[#21303C] space-y-3">
            <div className="text-2xl sm:text-3xl font-black tracking-widest text-[#FFB020] font-heading">
              AI MAVERICKS
            </div>
            <p className="text-xs text-[#8EA0AD] font-mono">
              MineVex AI · Smart India Hackathon 2026 · 6 Core Contributors
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono font-bold text-white">
              <span className="px-2.5 py-1 rounded-lg bg-[#14202B] border border-[#233543]">AI / ML</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#14202B] border border-[#233543]">Frontend</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#14202B] border border-[#233543]">Backend</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#14202B] border border-[#233543]">IoT CAN Bus</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#14202B] border border-[#233543]">Research</span>
            </div>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#111B22] to-[#0A1015] border border-[#21303C] flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white mb-1.5 font-heading">Our Mission</h3>
              <p className="text-xs sm:text-sm text-[#8EA0AD] leading-relaxed font-sans">
                Transform mining safety from reactive observation into continuous, data-driven and predictive situational awareness across India's mineral extraction corridors.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#home"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFB020] text-[#0A0D10] text-xs font-black uppercase tracking-wider hover:bg-[#FFC14D] transition-all shadow-md shadow-[#FFB020]/20 font-mono"
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
