import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, ShieldAlert, Waves } from 'lucide-react';

interface RiverWaterLevelCardProps {
  initialLevel?: number;
  onLevelChange?: (level: number) => void;
  className?: string;
}

export default function RiverWaterLevelCard({
  initialLevel = 38,
  onLevelChange,
  className = '',
}: RiverWaterLevelCardProps) {
  const [waterLevel, setWaterLevel] = useState<number>(initialLevel);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setWaterLevel(val);
    if (onLevelChange) {
      onLevelChange(val);
    }
  };

  // Determine single active status and styling based on user rules:
  // > 80: High Risk in RED font
  // > 70 and <= 80 (up to 80): Risk in ORANGE font
  // > 60 and <= 70 (under 70): Moderate in BLUE font
  // <= 60 (under 60): Normal in GREEN font
  let statusText = 'NORMAL';
  let fontColorClass = 'text-emerald-400';
  let badgeBgClass = 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400';
  let liquidGradient = 'from-emerald-600 via-emerald-500 to-teal-400';
  let liquidGlow = 'shadow-[0_0_20px_rgba(16,185,129,0.5)]';
  let sliderAccent = '#10B981';
  let StatusIcon = ShieldCheck;

  if (waterLevel > 80) {
    statusText = 'HIGH RISK';
    fontColorClass = 'text-red-500';
    badgeBgClass = 'bg-rose-950/80 border-rose-500/50 text-rose-400';
    liquidGradient = 'from-red-700 via-rose-600 to-red-500';
    liquidGlow = 'shadow-[0_0_28px_rgba(239,68,68,0.7)]';
    sliderAccent = '#EF4444';
    StatusIcon = ShieldAlert;
  } else if (waterLevel > 70) {
    statusText = 'RISK';
    fontColorClass = 'text-orange-500';
    badgeBgClass = 'bg-orange-950/70 border-orange-500/40 text-orange-400';
    liquidGradient = 'from-amber-600 via-orange-500 to-amber-400';
    liquidGlow = 'shadow-[0_0_24px_rgba(249,115,22,0.6)]';
    sliderAccent = '#F97316';
    StatusIcon = AlertTriangle;
  } else if (waterLevel > 60) {
    statusText = 'MODERATE';
    fontColorClass = 'text-[#00B7FF]';
    badgeBgClass = 'bg-blue-950/70 border-[#00B7FF]/40 text-[#00B7FF]';
    liquidGradient = 'from-[#0052CC] via-[#006BFF] to-[#00B7FF]';
    liquidGlow = 'shadow-[0_0_22px_rgba(0,183,255,0.6)]';
    sliderAccent = '#00B7FF';
    StatusIcon = AlertCircle;
  } else {
    statusText = 'NORMAL';
    fontColorClass = 'text-emerald-400';
    badgeBgClass = 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400';
    liquidGradient = 'from-[#005b8a] via-[#0088cc] to-[#00B7FF]';
    liquidGlow = 'shadow-[0_0_20px_rgba(0,183,255,0.4)]';
    sliderAccent = '#10B981';
    StatusIcon = ShieldCheck;
  }

  return (
    <div
      id="river-water-level-panel"
      className={`p-6 rounded-2xl bg-[#061120] border border-[#00B7FF]/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between items-center relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Ambient background glow matching liquid state */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: sliderAccent }}
      />

      {/* Top Header matching reference image */}
      <div className="w-full text-center mb-5 relative z-10">
        <h3 className="text-lg font-bold text-[#F5F7FA] tracking-tight">
          River Water Level
        </h3>
        
        {/* Dynamic Single Active Status Tag */}
        <div className="mt-1.5 flex items-center justify-center gap-1.5">
          <span
            className={`text-xs font-mono font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all duration-300 flex items-center gap-1.5 ${badgeBgClass} ${fontColorClass}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{statusText}</span>
          </span>
        </div>
      </div>

      {/* Center Capsule Fluid Gauge matching reference image */}
      <div className="relative my-2 z-10 flex flex-col items-center">
        {/* The Outer Capsule (Pill Shape) */}
        <div className="relative w-24 sm:w-28 h-56 sm:h-64 rounded-full bg-[#030712] border-2 border-[#1E293B] shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)] overflow-hidden flex items-end p-1">
          
          {/* Inner measurement scale grid ticks */}
          <div className="absolute inset-y-4 right-2 w-1.5 flex flex-col justify-between items-end opacity-25 pointer-events-none z-20">
            <div className="w-2 h-[1px] bg-red-400" title="100%" />
            <div className="w-3 h-[1px] bg-red-400" title="80% High Risk" />
            <div className="w-2 h-[1px] bg-orange-400" title="70% Risk" />
            <div className="w-2.5 h-[1px] bg-blue-400" title="60% Moderate" />
            <div className="w-2 h-[1px] bg-emerald-400" title="40%" />
            <div className="w-3 h-[1px] bg-emerald-400" title="20%" />
            <div className="w-2 h-[1px] bg-emerald-400" title="0%" />
          </div>

          {/* Liquid Column */}
          <div
            className={`w-full rounded-b-full rounded-t-sm bg-gradient-to-t ${liquidGradient} ${liquidGlow} transition-all duration-300 ease-out relative overflow-hidden`}
            style={{ height: `${Math.min(Math.max(waterLevel, 3), 100)}%` }}
          >
            {/* Fluid surface crest line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

            {/* Subtle internal wave sheen */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 animate-pulse" />
          </div>
        </div>

        {/* Big Percentage Number matching reference image */}
        <div className="mt-4 text-center">
          <div className="text-4xl sm:text-5xl font-black text-[#F5F7FA] font-mono tracking-tight">
            {waterLevel}%
          </div>
        </div>
      </div>

      {/* Bottom Slider & Label matching reference image */}
      <div className="w-full mt-4 pt-4 border-t border-[#00B7FF]/15 relative z-10">
        <div className="flex items-center justify-between text-[11px] font-mono mb-2">
          <span className="text-[#98A4B3] font-bold tracking-wider">
            SIMULATE LEVEL
          </span>
          <span className={`font-black font-mono ${fontColorClass}`}>
            {waterLevel}%
          </span>
        </div>

        {/* Interactive Range Slider */}
        <input
          id="simulate-water-level-slider"
          type="range"
          min="0"
          max="100"
          value={waterLevel}
          onChange={handleSliderChange}
          className="w-full h-2 bg-[#0A1424] rounded-lg appearance-none cursor-pointer accent-[#00B7FF] focus:outline-none transition-all"
          style={{
            accentColor: sliderAccent,
          }}
        />

        {/* Quick Click Presets to instantly demonstrate user conditions */}
        <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setWaterLevel(38);
              if (onLevelChange) onLevelChange(38);
            }}
            className={`py-1 rounded text-[10px] font-mono font-bold transition-all ${
              waterLevel <= 60
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-[#08111F] text-[#98A4B3] hover:text-white border border-[#00B7FF]/10'
            }`}
          >
            38% Normal
          </button>

          <button
            type="button"
            onClick={() => {
              setWaterLevel(65);
              if (onLevelChange) onLevelChange(65);
            }}
            className={`py-1 rounded text-[10px] font-mono font-bold transition-all ${
              waterLevel > 60 && waterLevel <= 70
                ? 'bg-blue-500/20 text-[#00B7FF] border border-[#00B7FF]/50 shadow-[0_0_10px_rgba(0,183,255,0.3)]'
                : 'bg-[#08111F] text-[#98A4B3] hover:text-white border border-[#00B7FF]/10'
            }`}
          >
            65% Mod
          </button>

          <button
            type="button"
            onClick={() => {
              setWaterLevel(75);
              if (onLevelChange) onLevelChange(75);
            }}
            className={`py-1 rounded text-[10px] font-mono font-bold transition-all ${
              waterLevel > 70 && waterLevel <= 80
                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]'
                : 'bg-[#08111F] text-[#98A4B3] hover:text-white border border-[#00B7FF]/10'
            }`}
          >
            75% Risk
          </button>

          <button
            type="button"
            onClick={() => {
              setWaterLevel(92);
              if (onLevelChange) onLevelChange(92);
            }}
            className={`py-1 rounded text-[10px] font-mono font-bold transition-all ${
              waterLevel > 80
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                : 'bg-[#08111F] text-[#98A4B3] hover:text-white border border-[#00B7FF]/10'
            }`}
          >
            92% High
          </button>
        </div>
      </div>
    </div>
  );
}
