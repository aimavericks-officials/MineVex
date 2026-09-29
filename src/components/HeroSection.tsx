import React from 'react';
import { ArrowDown, ArrowRight, Shield, Radio, Upload } from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';

interface HeroSectionProps {
  onOpenOwnerPanel: () => void;
}

export default function HeroSection({ onOpenOwnerPanel }: HeroSectionProps) {
  const { getAssetUrl, isOwner, assets } = useSiteAssets();

  // Dynamic Upper Background: pulls from Firebase Firestore 'site_assets/hero_background' if uploaded by owner!
  const bgImageUrl = getAssetUrl('hero_background', '/images/aa.jpg');
  const isCustomBg = Boolean(assets['hero_background']);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="home" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-[#070B0F] border-b border-[#16222C]">
      {/* ================= DYNAMIC UPPER BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={bgImageUrl}
          alt="MineVex AI Upper Background"
          className="w-full h-full object-cover object-[center_35%] filter brightness-90 contrast-110 transition-all duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/aa.jpg';
          }}
        />

        {/* High-Contrast Gradient Overlays for High Legibility & Cinematic Mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B0F] via-[#070B0F]/90 sm:via-[#070B0F]/70 to-transparent w-full md:w-3/4 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B0F] via-transparent to-[#070B0F]/60" />
        
        {/* Subtle Cyber Grid Texture */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-[92%] max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading, Subtitle, Text, and Action Buttons */}
        <div className="lg:col-span-7 space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFB020]/15 border border-[#FFB020]/30 text-[#FFB020] text-xs font-black tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020] animate-pulse" />
            AI MAVERICKS · SMART INDIA HACKATHON 2026
          </div>

          {/* Core Headline */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] font-['Inter',sans-serif]">
              SEE.
              <br />
              <span className="bg-gradient-to-r from-[#FFB020] via-[#FFA21F] to-[#FF6B35] bg-clip-text text-transparent">
                PREDICT.
              </span>
              <br />
              PROTECT.
            </h1>
            <p className="text-sm sm:text-base font-bold tracking-widest text-[#FFB020] uppercase font-mono pt-2">
              MINEVEX AI — INTELLIGENT MINING VEHICLE SAFETY
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#AEBBC4] max-w-xl leading-relaxed">
            An AI-powered safety architecture designed for heavy mining vehicles operating in challenging environments. MineVexAI combines computer vision, sensor fusion and intelligent risk assessment to improve situational awareness.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => handleScroll('#dashboard')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FFB020] to-[#FF8533] text-[#0A0D10] font-black text-xs uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-[#FFB020]/30 cursor-pointer"
            >
              <span>Launch Safety Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScroll('#accident-data')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#111A22]/90 hover:bg-[#16232E] border border-[#21303C] hover:border-[#FFB020]/40 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Explore Accident Data</span>
              <ArrowDown className="w-4 h-4 text-[#FFB020]" />
            </button>

            {/* Quick Upload Background Prompt for Owner */}
            <button
              onClick={onOpenOwnerPanel}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-black/40 hover:bg-black/60 border border-[#21303C] text-[11px] font-medium text-[#8EA0AD] hover:text-white transition-all cursor-pointer"
              title="Replace upper background picture"
            >
              <Upload className="w-3.5 h-3.5 text-[#35E28B]" />
              <span>{isCustomBg ? 'Firebase Custom BG' : 'Upload BG Picture'}</span>
            </button>
          </div>

          {/* Highlights Mini Row */}
          <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-[#8EA0AD]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#35E28B]" />
              <span>Zero-Blind-Spot Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#46D9FF]" />
              <span>YOLOv5s-Fog Deep Vision</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB020]" />
              <span>Predictive LSTM Trajectories</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Digital Mine HUD Visual Card */}
        <div className="lg:col-span-5">
          <div className="relative h-[380px] sm:h-[420px] rounded-2xl border border-[#21303C] bg-gradient-to-br from-[#111D26]/90 to-[#080C10]/95 shadow-2xl shadow-black/80 overflow-hidden flex flex-col justify-between p-4 group">
            {/* Top HUD Bar */}
            <div className="relative z-20 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1218]/90 border border-[#2A3A46] text-[11px] font-mono text-[#35E28B] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#35E28B] animate-ping" />
                ● SYSTEM ONLINE
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0B1218]/90 border border-[#2A3A46] text-[11px] font-mono text-[#B9C7CE]">
                MINE: BAILADILA / SECTOR 07
              </span>
            </div>

            {/* Central Simulated Mine Pit / Haul Road Grid */}
            <div className="relative w-full h-full my-2 overflow-hidden rounded-xl border border-[#162530] bg-[#070B0E]">
              {/* Topographical contours */}
              <div 
                className="absolute inset-0 opacity-25"
                style={{
                  background: 'radial-gradient(ellipse at 70% 30%, #24353d 0%, transparent 60%), linear-gradient(135deg, transparent 40%, #15222b 40%, #0d161d 65%, #182832 65%)'
                }}
              />

              {/* Haul Road Lines */}
              <div className="absolute -left-6 -right-6 top-1/2 h-4 bg-[#35434C] transform -rotate-12 shadow-[0_0_0_2px_#1B262F]">
                <div className="w-full h-0.5 border-t border-dashed border-[#FFB020]/40 my-1.5" />
              </div>
              <div className="absolute -left-6 -right-6 top-[72%] h-4 bg-[#35434C] transform rotate-8 shadow-[0_0_0_2px_#1B262F]">
                <div className="w-full h-0.5 border-t border-dashed border-[#46D9FF]/40 my-1.5" />
              </div>

              {/* Moving Vehicles */}
              {/* Truck A17 */}
              <div className="absolute left-[24%] top-[42%] -rotate-12 flex flex-col items-center">
                <div className="w-16 h-8 rounded-lg bg-[#0C161D] border-2 border-[#46D9FF] flex items-center justify-center shadow-[0_0_20px_rgba(70,217,255,0.4)] animate-pulse">
                  <span className="text-[9px] font-black text-[#46D9FF] font-mono">A17 · 31k</span>
                </div>
                <div className="w-0.5 h-6 bg-[#46D9FF]/40 border-r border-dashed" />
              </div>

              {/* Truck B08 */}
              <div className="absolute left-[64%] top-[60%] rotate-8 flex flex-col items-center">
                <div className="w-16 h-8 rounded-lg bg-[#0C161D] border-2 border-[#FFB020] flex items-center justify-center shadow-[0_0_20px_rgba(255,176,32,0.4)]">
                  <span className="text-[9px] font-black text-[#FFB020] font-mono">B08 · 25k</span>
                </div>
              </div>

              {/* Vehicle C03 */}
              <div className="absolute left-[42%] top-[74%] rotate-8 flex flex-col items-center">
                <div className="w-14 h-7 rounded-lg bg-[#0C161D] border-2 border-[#35E28B] flex items-center justify-center shadow-[0_0_15px_rgba(53,226,139,0.3)]">
                  <span className="text-[8px] font-black text-[#35E28B] font-mono">C03 · 18k</span>
                </div>
              </div>

              {/* Dynamic Scanning Laser sweep */}
              <div 
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFB020] to-transparent shadow-[0_0_15px_#FFB020] animate-[scan_3s_ease-in-out_infinite]"
                style={{ top: '50%' }}
              />

              {/* Conflict Vector Overlay */}
              <div className="absolute left-[36%] top-[45%] w-32 h-16 border-t-2 border-dashed border-[#FF4D5E] pointer-events-none transform rotate-18 opacity-80" />
              <div className="absolute left-[45%] top-[40%] px-2 py-0.5 rounded bg-[#FF4D5E]/20 border border-[#FF4D5E] text-[9px] font-mono text-[#FF4D5E] font-bold">
                CONFLICT: 4.2s
              </div>
            </div>

            {/* Bottom HUD Status */}
            <div className="relative z-20 flex items-center justify-between text-[11px] font-mono text-[#8EA0AD] pt-2 border-t border-[#182833]">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#FFB020]" />
                <span>LiDAR + Radar Mesh</span>
              </div>
              <span className="text-[#35E28B] font-bold">PREDICTIVE MODE: ARMED</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
