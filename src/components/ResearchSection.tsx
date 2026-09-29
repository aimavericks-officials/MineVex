import React from 'react';
import { RESEARCH_PIPELINE, FURTHER_READING } from '../data/minevexData';
import { Camera, Layers, AlertCircle, Cpu, MapPin, Compass, Monitor, BookOpen, ExternalLink } from 'lucide-react';

export default function ResearchSection() {
  const getStageIcon = (type: string) => {
    switch (type) {
      case 'camera':
        return Camera;
      case 'sensor':
        return Layers;
      case 'collision':
        return AlertCircle;
      case 'trajectory':
        return Cpu;
      case 'map':
        return MapPin;
      case 'motion':
        return Compass;
      case 'simulation':
        return Monitor;
      default:
        return BookOpen;
    }
  };

  return (
    <section id="research" className="py-20 bg-[#070B0F] border-b border-[#16222C] relative">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-16">
        {/* Header (Matching Screenshot 3) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFB020]/20 border border-[#FFB020]/40 flex items-center justify-center">
              <span className="text-[#FFB020] font-black text-sm">M</span>
            </div>
            <span className="text-sm font-bold text-white tracking-wide">
              AI Mavericks
            </span>
            <span className="px-3 py-1 rounded-full bg-[#111A22] border border-[#FFB020]/40 text-[#FFB020] text-xs font-mono font-bold">
              Smart India Hackathon 2026
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Research &amp; <span className="text-[#FFB020]">References</span>
          </h2>

          <p className="text-base sm:text-lg text-[#AEBBC4] max-w-3xl leading-relaxed">
            The published work behind MineVexAI's seven-stage safety pipeline — from perception in fog to full-scenario simulation. Supporting MineVexAI with existing research on autonomous collision prevention in underground and open-pit mines.
          </p>
        </div>

        {/* The pipeline, stage by stage (Matching Screenshots 3, 4, 5) */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              The pipeline, stage by stage
            </h3>
            <p className="text-xs sm:text-sm text-[#8EA0AD] max-w-2xl mt-1 leading-relaxed">
              Each stage of MineVexAI maps to a specific, peer-reviewed foundation. The papers below are ordered the way data moves through the system: sensed, fused, reasoned about, and rehearsed.
            </p>
          </div>

          {/* Vertical Pipeline Cards with Stage Indicators */}
          <div className="space-y-6 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#1A2834]">
            {RESEARCH_PIPELINE.map((paper) => {
              const Icon = getStageIcon(paper.iconType);

              return (
                <div key={paper.id} className="relative pl-12 group">
                  {/* Left Circle Node */}
                  <div className="absolute left-0 top-6 w-10 h-10 rounded-xl bg-[#091017] border border-[#21303C] group-hover:border-[#FFB020] flex items-center justify-center text-[#FFB020] shadow-md transition-all z-10">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Stage Card */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-[#0D141B] border border-[#21303C] hover:border-[#FFB020]/50 transition-all space-y-4 shadow-xl">
                    {/* Stage Header */}
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#46D9FF] tracking-wider uppercase">
                      <span>0{paper.stageNumber}</span>
                      <span>·</span>
                      <span>{paper.stageName}</span>
                    </div>

                    {/* Paper Title & Abstract Description */}
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFB020] transition-colors leading-snug">
                        {paper.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#8EA0AD] mt-2 leading-relaxed">
                        {paper.description}
                      </p>
                    </div>

                    {/* Publication Citation & Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#182633]">
                      <div className="text-xs font-mono text-[#AEBAC3] space-y-0.5">
                        <div className="text-white font-semibold">{paper.paperTitle}</div>
                        <div className="text-[#6C7E8B]">
                          {paper.year} · {paper.journal} {paper.doi && `· doi:${paper.doi}`}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        {paper.secondaryUrl && (
                          <a
                            href={paper.secondaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#21303C] bg-[#111A22] hover:bg-[#182632] text-xs font-mono text-[#46D9FF] font-semibold transition-all"
                          >
                            <span>{paper.secondaryUrlLabel || 'Secondary'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-[#FFB020]/40 bg-[#16201B] hover:bg-[#FFB020] text-[#FFB020] hover:text-[#0A0D10] text-xs font-mono font-bold transition-all"
                        >
                          <span>View paper</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Further Reading (Matching Screenshot 5) */}
        <div className="space-y-6 pt-6 border-t border-[#182633]">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Further reading
            </h3>
            <p className="text-xs sm:text-sm text-[#8EA0AD] max-w-2xl mt-1 leading-relaxed">
              Two additional papers held in reserve, in case a stage above needs a second citation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FURTHER_READING.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#0D141B] border border-[#21303C] hover:border-[#FFB020]/40 transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <h4 className="text-base font-bold text-white leading-snug">
                    {item.title}
                  </h4>
                  <div className="text-xs font-mono text-[#6C7E8B] mt-2">
                    {item.year} · {item.journal} {item.doi && `· doi:${item.doi}`}
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#FFB020]/40 bg-[#141B16] text-[#FFB020] text-xs font-mono font-bold hover:bg-[#FFB020] hover:text-[#0A0D10] transition-all"
                  >
                    <span>View paper</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
