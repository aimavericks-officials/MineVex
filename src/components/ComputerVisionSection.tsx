import React, { useState, useEffect } from 'react';
import { Terminal, Camera, Shield, Eye, Scan, RefreshCw } from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';

export default function ComputerVisionSection() {
  const { getAssetUrl } = useSiteAssets();
  const cvFrameImg = getAssetUrl('cv_preview', '/images/dam_aerial_release.jpg');

  const [activeFrameTime, setActiveFrameTime] = useState(118);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFrameTime(Math.floor(112 + Math.random() * 12));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="vision" className="py-20 bg-[#05080B] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              05 · COMPUTER VISION & DEEP LEARNING
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              See what the operator sees — and more.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Prototype visualization of YOLOv5s-Fog object detection, appearance-based Deep SORT tracking, and spatial bounding box projections.
          </p>
        </div>

        {/* Demo Grid: CV Frame + Terminal Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: CV Box (7 cols) */}
          <div className="lg:col-span-7 relative h-[360px] sm:h-[400px] rounded-2xl border border-[#21303C] overflow-hidden bg-[#0A1115] shadow-2xl flex flex-col justify-between p-4 group">
            {/* Visual background (custom uploaded by owner or fallback) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <img
                src={cvFrameImg}
                alt="Computer Vision Optical Feed"
                className="w-full h-full object-cover filter brightness-75 contrast-125 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/dam_aerial_release.jpg';
                }}
              />
              {/* Scanline simulation */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05080B] via-transparent to-[#05080B]/60" />
            </div>

            {/* Top CV Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#07100B]/90 border border-[#31553F] text-[11px] font-mono text-[#35E28B] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#35E28B] animate-ping" />
                ● VISION ENGINE / YOLOv5s-FOG
              </div>
              <div className="text-[10px] font-mono text-[#B9C7CE] bg-[#070B0F]/90 px-2.5 py-1 rounded border border-[#1E2E39]">
                RES: 1280×720 @ 30 FPS
              </div>
            </div>

            {/* Bounding Box 1: Truck A17 */}
            <div className="absolute left-[16%] top-[34%] w-40 sm:w-44 h-24 border-2 border-[#35E28B] bg-[#09140D]/75 rounded-md p-2 text-white font-mono text-[10px] shadow-[0_0_15px_rgba(53,226,139,0.3)] animate-pulse">
              <div className="font-bold text-[#35E28B] flex items-center justify-between">
                <span>TRUCK · A17</span>
                <span className="text-[9px]">ID: 01</span>
              </div>
              <div className="text-[#DFF5E5] mt-1">CONF: 0.94 · 31 km/h</div>
              <div className="text-[9px] text-[#A2C7AD]">DIST: 45m · HEADING: 142°</div>
            </div>

            {/* Bounding Box 2: Truck B08 */}
            <div className="absolute left-[54%] top-[48%] w-44 sm:w-48 h-24 border-2 border-[#FFB020] bg-[#1A1209]/80 rounded-md p-2 text-white font-mono text-[10px] shadow-[0_0_15px_rgba(255,176,32,0.3)]">
              <div className="font-bold text-[#FFB020] flex items-center justify-between">
                <span>TRUCK · B08</span>
                <span className="text-[9px]">ID: 02</span>
              </div>
              <div className="text-[#FFEED1] mt-1">CONF: 0.91 · 25 km/h</div>
              <div className="text-[9px] text-[#D8B984]">CONFLICT PREDICTED IN 4.2s</div>
            </div>

            {/* Bounding Box 3: Vehicle C03 */}
            <div className="absolute left-[36%] top-[68%] w-32 h-16 border-2 border-[#46D9FF] bg-[#09141B]/75 rounded-md p-1.5 text-white font-mono text-[9px] shadow-[0_0_12px_rgba(70,217,255,0.3)]">
              <div className="font-bold text-[#46D9FF]">VEHICLE · C03</div>
              <div className="text-[#C6EEF9]">CONF: 0.87 · 18 km/h</div>
            </div>

            {/* Bottom Optical Telemetry */}
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#A8BCC9] bg-[#070B0F]/90 px-3 py-1.5 rounded-lg border border-[#1E2E39]">
              <span>TARGETS IDENTIFIED: 03</span>
              <span>ESTIMATED FOG ATTENUATION: 32%</span>
            </div>
          </div>

          {/* Right: Terminal Pipeline Log (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#070B0F] border border-[#21303C] p-5 font-mono text-xs shadow-2xl flex flex-col justify-between">
            <div>
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A2632]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D5E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFB020]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#35E28B]" />
                  <span className="text-[11px] text-[#768794] ml-2">minevex-core.sh</span>
                </div>
                <span className="text-[10px] text-[#35E28B] flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  ONLINE
                </span>
              </div>

              {/* Terminal Log Lines */}
              <div className="space-y-2 text-[#9DEBBF]">
                <p className="text-[#7F919E]">&gt; MineVex perception pipeline initialized</p>
                <p className="text-[#FFB020]">[OK] Frame received: 1280×720 @ 30fps</p>
                <p>[OK] Objects detected: 03 (2 Class-CAT797, 1 LightVehicle)</p>
                <p>[OK] ByteTrack IDs maintained across occlusion: [01, 02, 03]</p>
                <p>[OK] Relative spatial distance estimated: 45.2 meters</p>
                <p className="text-[#FF7884] font-bold">[WARN] Conflict trajectory calculated: A17 ↔ B08</p>
                <p className="text-[#FFB020]">[AI] Recommended safe speed: ≤ 18 km/h</p>
                <p className="text-[#46D9FF]">[AI] Minimum stopping distance: ≥ 55 m</p>
              </div>
            </div>

            {/* Terminal Latency Footnote */}
            <div className="pt-4 border-t border-[#182633] flex items-center justify-between text-[11px] text-[#6F8290]">
              <span>System latency: {activeFrameTime} ms</span>
              <span className="text-[#FFB020]">DEMO MODE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
