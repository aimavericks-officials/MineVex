import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  MapPin, 
  CloudRain, 
  Waves, 
  ShieldCheck, 
  Bell, 
  Gauge
} from 'lucide-react';
import aaDamImg from '../assets/images/aa.jpg';
import damAerialImg from '../assets/images/dam_aerial_release.jpg';

interface HeroSectionProps {
  onExploreDashboard: () => void;
  onExploreIoT?: () => void;
}

export default function HeroSection({ onExploreDashboard }: HeroSectionProps) {
  // Count-up animation values
  const [zonesCount, setZonesCount] = useState(0);
  const [accuracyCount, setAccuracyCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setZonesCount(Math.min(12, Math.round(12 * progress)));
      setAccuracyCount(Math.min(97.6, Number((97.6 * progress).toFixed(1))));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 lg:pt-36 pb-16 flex flex-col justify-between overflow-hidden bg-[#02060D] scroll-mt-24"
    >
      {/* ================= CLEAN STATIC DAM IMAGE BACKGROUND (aa.jpg) ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={aaDamImg || '/images/aa.jpg'}
          alt="Aerial photograph of dam releasing water into mountain reservoir"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to public path if bundler asset fails
            (e.target as HTMLImageElement).src = '/images/aa.jpg';
          }}
          className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
        />

        {/* Cinematic Gradient Vignettes for High Visibility of Dam & Crisp Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060D]/90 via-[#02060D]/60 sm:via-[#02060D]/30 to-transparent w-full sm:w-4/5 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-[#02060D]/40" />
        
        {/* Subtle Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid-bg opacity-10" />
      </div>

      {/* ================= MAIN HERO CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[55vh]">
          
          {/* Left Column: Heading, Subtitle, CTA & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-8 flex flex-col items-start"
          >
            {/* Live System Indicator Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#08111F]/85 backdrop-blur-md border border-[#00B7FF]/30 text-xs font-mono text-[#00B7FF] shadow-[0_0_15px_rgba(0,183,255,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE RESERVOIR TELEMETRY ACTIVE</span>
            </div>

            {/* Big 3-Line Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-[#F5F7FA] mb-6">
              <span>Predict.</span>
              <br />
              <span>Protect.</span>
              <br />
              <span className="text-[#0084FF] drop-shadow-[0_0_25px_rgba(0,132,255,0.6)]">Respond.</span>
            </h1>

            {/* Concise Subtitle */}
            <p className="text-base sm:text-lg text-[#98A4B3] leading-relaxed max-w-xl mb-8 font-normal">
              FLOODX combines live water monitoring, GIS risk mapping, historical analysis and early-warning logic into one clean flood intelligence interface.
            </p>

            {/* Blue Rounded Button */}
            <div className="mb-14 flex items-center">
              <button
                id="hero-explore-dashboard-btn"
                onClick={onExploreDashboard}
                className="group px-7 py-3.5 rounded-full bg-[#006BFF] hover:bg-[#0058D6] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(0,107,255,0.4)] hover:shadow-[0_0_30px_rgba(0,107,255,0.7)] transition-all duration-200 cursor-pointer"
              >
                <span>Explore Live Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* 4 Stats in a clean horizontal row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 pt-6 border-t border-[#00B7FF]/10 w-full">
              {/* Stat 1: Monitored Zones */}
              <div className="flex items-center gap-3">
                <div className="text-[#00B7FF]">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-mono leading-none">
                    {zonesCount}
                  </div>
                  <div className="text-xs text-[#98A4B3] mt-1 font-medium whitespace-nowrap">
                    Monitored Zones
                  </div>
                </div>
              </div>

              {/* Stat 2: Prediction Accuracy */}
              <div className="flex items-center gap-3">
                <div className="text-[#00B7FF]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-mono leading-none">
                    {accuracyCount}%
                  </div>
                  <div className="text-xs text-[#98A4B3] mt-1 font-medium whitespace-nowrap">
                    Prediction Accuracy
                  </div>
                </div>
              </div>

              {/* Stat 3: Early Warnings */}
              <div className="flex items-center gap-3">
                <div className="text-[#00B7FF]">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-mono leading-none">
                    &lt; 3s
                  </div>
                  <div className="text-xs text-[#98A4B3] mt-1 font-medium whitespace-nowrap">
                    Warning Latency
                  </div>
                </div>
              </div>

              {/* Stat 4: 24 x 7 Monitoring */}
              <div className="flex items-center gap-3">
                <div className="text-[#00B7FF]">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-mono leading-none">
                    24 x 7
                  </div>
                  <div className="text-xs text-[#98A4B3] mt-1 font-medium whitespace-nowrap">
                    Live Monitoring
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Floating Location & Weather tags */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end mt-6 lg:mt-0 space-y-4">
            {/* Location Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-left lg:text-right bg-[#08111F]/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#00B7FF]/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center lg:justify-end gap-2 text-xs text-[#F5F7FA] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#00B7FF]" />
                <span>Damodar River Basin</span>
              </div>
              <div className="text-[11px] text-[#98A4B3] font-mono mt-0.5">
                22.5881° N, 88.2836° E
              </div>
            </motion.div>

            {/* Weather Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-left lg:text-right bg-[#08111F]/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#00B7FF]/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center lg:justify-end gap-2 text-xl font-bold text-[#F5F7FA] font-mono">
                <CloudRain className="w-5 h-5 text-[#00B7FF]" />
                <span>24°C</span>
                <span className="text-xs text-[#98A4B3] font-sans font-normal ml-1">Light Rain</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
