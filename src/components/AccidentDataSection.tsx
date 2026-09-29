import React, { useState } from 'react';
import { ACCIDENT_DATA, WHY_MINEVEX_POINTS, MINEVEX_ARCHITECTURE_POINTS } from '../data/minevexData';
import { BarChart3, TrendingDown, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function AccidentDataSection() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const maxVal = 50;

  return (
    <section id="accident-data" className="py-20 bg-[#070B0F] border-b border-[#16222C] relative">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              01 · STATISTICAL GROUND TRUTH
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Indian Non-Coal Mine Accidents
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Historical fatality records published by the Directorate General of Mines Safety (DGMS) demonstrate persistent interaction risks across heavy haulage circuits.
          </p>
        </div>

        {/* 3 Top Stat Cards (Directly matching Screenshot 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#0D141B] border border-[#21303C] hover:border-[#FFB020]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                45
              </div>
              <div className="text-sm font-bold text-[#E2E8F0] mt-2">
                Peak fatal accidents
              </div>
            </div>
            <div className="text-xs font-mono text-[#8EA0AD] mt-4 pt-3 border-t border-[#182631]">
              2018 & 2019
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#0D141B] border border-[#21303C] hover:border-[#35E28B]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-4xl sm:text-5xl font-black text-[#35E28B] tracking-tight">
                28
              </div>
              <div className="text-sm font-bold text-[#E2E8F0] mt-2">
                Lowest annual count
              </div>
            </div>
            <div className="text-xs font-mono text-[#8EA0AD] mt-4 pt-3 border-t border-[#182631]">
              2023
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#0D141B] border border-[#21303C] hover:border-[#FFB020]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="text-4xl sm:text-5xl font-black text-[#FFB020] tracking-tight">
                33
              </div>
              <div className="text-sm font-bold text-[#E2E8F0] mt-2">
                Fatal accidents
              </div>
            </div>
            <div className="text-xs font-mono text-[#8EA0AD] mt-4 pt-3 border-t border-[#182631]">
              2024
            </div>
          </div>
        </div>

        {/* Main DGMS Bar Chart Card (Directly matching Screenshot 1) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141B] border border-[#21303C] shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b2a36] pb-5">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Indian Non-Coal Mine Accidents
              </h3>
              <p className="text-xs text-[#8EA0AD] mt-1 font-mono">
                Fatal accidents reported across India from 2016 to 2024
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Legend */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#E2E8F0]">
                <span className="w-3.5 h-3.5 rounded-sm bg-[#FFB020]" />
                <span>Fatal accidents</span>
              </div>

              {/* DGMS Badge */}
              <span className="px-2.5 py-1 rounded-md bg-[#FFB020]/15 border border-[#FFB020]/40 text-[#FFB020] font-mono text-[11px] font-bold tracking-wider">
                DGMS DATA
              </span>
            </div>
          </div>

          {/* Interactive Chart Area */}
          <div className="relative pt-6 pb-2">
            {/* Y-axis guideline grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-[#576874] pr-4">
              {[45, 40, 35, 30, 25, 20, 15, 10, 5, 0].map((tick) => (
                <div key={tick} className="w-full flex items-center gap-2">
                  <span className="w-6 text-right">{tick}</span>
                  <div className="flex-1 border-b border-[#182633]" />
                </div>
              ))}
            </div>

            {/* Bars container */}
            <div className="relative h-64 sm:h-72 ml-8 flex items-end justify-between gap-2 sm:gap-4 pt-4 px-2">
              {ACCIDENT_DATA.map((item) => {
                const heightPercent = (item.fatalAccidents / maxVal) * 100;
                const isHovered = hoveredYear === item.year;

                return (
                  <div
                    key={item.year}
                    onMouseEnter={() => setHoveredYear(item.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-12 z-30 px-3 py-1.5 rounded-lg bg-[#111C24] border border-[#FFB020] text-white text-xs font-mono whitespace-nowrap shadow-xl">
                        <span className="text-[#FFB020] font-bold">{item.year}: </span>
                        <span>{item.fatalAccidents} fatalities</span>
                      </div>
                    )}

                    {/* Bar */}
                    <div className="w-full max-w-[54px] flex flex-col items-center justify-end h-full">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-md transition-all duration-300 relative ${
                          isHovered 
                            ? 'bg-gradient-to-t from-[#FF8533] to-[#FFC559] shadow-[0_0_20px_rgba(255,176,32,0.6)]' 
                            : 'bg-[#FFB020] hover:bg-[#FFC04D]'
                        }`}
                      >
                        {/* Value label on top of bar on hover or always on larger screens */}
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[#E2E8F0]">
                          {item.fatalAccidents}
                        </span>
                      </div>
                    </div>

                    {/* X-axis year */}
                    <span className="mt-3 text-[11px] sm:text-xs font-mono text-[#8EA0AD] group-hover:text-white transition-colors">
                      {item.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Why MineVexAI? & MineVex Architecture Cards (Directly matching Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Why MineVexAI? */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141B] border border-[#21303C] space-y-5 hover:border-[#FFB020]/40 transition-all">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Why MineVexAI?
              </h3>
              <p className="text-xs sm:text-sm text-[#8EA0AD] mt-2 leading-relaxed">
                Mining environments present difficult operating conditions including fog, dust, poor visibility, uneven haul roads and large heavy vehicles.
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {WHY_MINEVEX_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-xs sm:text-sm text-[#E2E8F0] py-1 border-b border-[#16222C] last:border-none">
                  <span className="text-[#FFB020] text-sm shrink-0">◆</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: MineVex Architecture */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141B] border border-[#21303C] space-y-5 hover:border-[#46D9FF]/40 transition-all">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                MineVex Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[#8EA0AD] mt-2 leading-relaxed">
                MineVexAI combines multiple sources of information to create a real-time understanding of the vehicle's surroundings.
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {MINEVEX_ARCHITECTURE_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-xs sm:text-sm text-[#E2E8F0] py-1 border-b border-[#16222C] last:border-none">
                  <span className="text-[#FFB020] text-sm shrink-0">◆</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Sub-Banner (from Screenshot 2) */}
        <div className="text-center pt-4 border-t border-[#16222C] text-xs font-mono text-[#6E808D] space-y-1">
          <div>
            <strong className="text-[#FFB020]">MINEVEX AI</strong> | <span className="text-white">AI MAVERICKS</span>
          </div>
          <div>AI-Based Mining Vehicle Safety & Risk Assessment</div>
          <div className="text-[11px] text-[#556570]">Data source: Directorate General of Mines Safety (DGMS)</div>
        </div>
      </div>
    </section>
  );
}
