import { useState, useEffect } from 'react';
import { 
  Waves, 
  CloudRain, 
  Activity, 
  Gauge, 
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowDownCircle,
  Sliders,
  Zap,
  Radio,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { TelemetryData } from '../types';
import RiverWaterLevelCard from './RiverWaterLevelCard';

interface SmartWaterControlProps {
  telemetry: TelemetryData;
  onUpdateTelemetry: (newTelemetry: Partial<TelemetryData>) => void;
  onOpenManualOverride: () => void;
}

export default function SmartWaterControl({
  telemetry,
  onOpenManualOverride,
}: SmartWaterControlProps) {
  // Gate Aperture & IoT Automated Discharge State
  const [gateAperture, setGateAperture] = useState<number>(45);
  const [isAutomatedMode, setIsAutomatedMode] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Simulated live telemetry stream calculations based on gate aperture
  const calculatedDischarge = (gateAperture * 7.92).toFixed(1); // m³/s
  const calculatedVelocity = (8 + (gateAperture / 100) * 12).toFixed(1); // m/s
  const isOptimalFlow = gateAperture >= 30 && gateAperture <= 65;

  // Live timestamp clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="technology" className="relative py-16 bg-[#02060D] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow, Title and Subtitle */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#006BFF] mb-1.5 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#006BFF] animate-ping" />
              <span>HYDRO CONTROL &amp; AUTOMATED DAM RELEASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight mb-2">
              Smart Dam Water Release System
            </h2>
            <p className="text-sm text-[#98A4B3] max-w-2xl">
              Automated IoT discharge rate optimization, hydro-gate telemetry, and AI-governed flood prevention control.
            </p>
          </div>

          {/* Mode Badge Indicator */}
          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#08111F] border border-[#00B7FF]/30 text-xs font-mono text-[#00B7FF] flex items-center gap-2 shadow-lg">
              <Cpu className="w-4 h-4 text-[#00B7FF]" />
              <span className="font-bold">IoT SERVO-GATE PROTOCOL: ACTIVE</span>
            </div>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ================= LEFT COLUMN: 4 METRIC TILES (3 Cols) ================= */}
          <div className="lg:col-span-3 flex flex-col gap-3.5 justify-between">
            
            {/* Tile 1: Water Level */}
            <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#98A4B3] mb-1 font-medium">
                  <Waves className="w-4 h-4 text-[#00B7FF]" />
                  <span>Water Level (cm)</span>
                </div>
                <div className="text-[11px] text-[#98A4B3] font-mono">
                  Threshold: 450 cm
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-[#0084FF]">
                {telemetry.waterLevelCm}
              </div>
            </div>

            {/* Tile 2: Rainfall */}
            <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#98A4B3] mb-1 font-medium">
                  <CloudRain className="w-4 h-4 text-emerald-400" />
                  <span>Rainfall (mm/hr)</span>
                </div>
                <div className="text-[11px] text-[#98A4B3] font-mono">
                  Threshold: 50 mm/hr
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-emerald-400">
                {telemetry.rainfallMmH}
              </div>
            </div>

            {/* Tile 3: Flow Rate */}
            <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#98A4B3] mb-1 font-medium">
                  <Activity className="w-4 h-4 text-[#0084FF]" />
                  <span>Flow Rate (m³/s)</span>
                </div>
                <div className="text-[11px] text-[#98A4B3] font-mono">
                  Calculated Discharge
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-[#0084FF]">
                {calculatedDischarge}
              </div>
            </div>

            {/* Tile 4: Reservoir Level */}
            <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#98A4B3] mb-1 font-medium">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  <span>Reservoir Capacity</span>
                </div>
                <div className="text-[11px] text-[#98A4B3] font-mono">
                  Safe Limit: &lt;85%
                </div>
              </div>
              <div className="text-3xl font-black font-mono text-amber-400">
                {telemetry.reservoirPercent}%
              </div>
            </div>

          </div>

          {/* ================= MIDDLE COLUMN: HYDRO CONTROL & DISCHARGE SIMULATOR (6 Cols) ================= */}
          <div className="lg:col-span-6 bg-[#08111F] rounded-2xl border border-[#00B7FF]/20 p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            
            {/* Header info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#006BFF]/20 border border-[#00B7FF]/40 text-[#00B7FF] font-mono text-[11px] font-bold">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#00B7FF]" />
                  <span>IOT HYDRO-GATE ENGINE</span>
                </div>
                <span className="text-xs font-mono text-[#F5F7FA] font-semibold hidden sm:inline">
                  Automated Sluice Spillway
                </span>
              </div>

              <div className="text-[11px] font-mono text-[#98A4B3] flex items-center gap-2">
                <span>{currentTime}</span>
              </div>
            </div>

            {/* Main Interactive Dam Sluice & Flow Hydrodynamics Panel */}
            <div className="relative w-full rounded-xl overflow-hidden border border-[#00B7FF]/20 bg-gradient-to-b from-[#040E1E] via-[#02060D] to-[#040E1E] p-4 sm:p-5 shadow-inner">
              
              {/* Top Telemetry Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <div className="p-2.5 rounded-lg bg-[#08111F]/90 border border-[#00B7FF]/20 text-center">
                  <div className="text-[10px] font-mono text-[#98A4B3] uppercase">Gate Aperture</div>
                  <div className="text-lg font-black font-mono text-[#00B7FF]">{gateAperture}%</div>
                  <div className="text-[9px] text-[#98A4B3] font-mono">Servo Elevation</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#08111F]/90 border border-[#00B7FF]/20 text-center">
                  <div className="text-[10px] font-mono text-[#98A4B3] uppercase">Discharge Rate</div>
                  <div className="text-lg font-black font-mono text-[#F5F7FA]">{calculatedDischarge} <span className="text-xs text-[#98A4B3]">m³/s</span></div>
                  <div className="text-[9px] text-emerald-400 font-mono">Controlled Output</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#08111F]/90 border border-[#00B7FF]/20 text-center">
                  <div className="text-[10px] font-mono text-[#98A4B3] uppercase">Chute Velocity</div>
                  <div className="text-lg font-black font-mono text-[#00B7FF]">{calculatedVelocity} <span className="text-xs text-[#98A4B3]">m/s</span></div>
                  <div className="text-[9px] text-[#98A4B3] font-mono">Laminar Flow</div>
                </div>
              </div>

              {/* Dynamic Hydrodynamic Water Channel Visualization */}
              <div className="relative h-32 sm:h-36 rounded-lg bg-[#020712] border border-[#00B7FF]/30 overflow-hidden mb-4 p-3 flex flex-col justify-between">
                
                {/* Visual Water Wave Level */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#006BFF]/60 via-[#00B7FF]/40 to-[#00B7FF]/20 transition-all duration-500 flex items-center justify-center overflow-hidden"
                  style={{ height: `${Math.min(95, Math.max(20, gateAperture * 0.9 + 15))}%` }}
                >
                  {/* Flow animation waves */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent animate-pulse" />
                  <div className="w-full text-center text-xs font-mono font-bold text-white drop-shadow-[0_0_8px_rgba(0,183,255,1)] flex items-center justify-center gap-2">
                    <Waves className="w-4 h-4 animate-bounce text-cyan-300" />
                    <span>HYDRO-DYNAMIC DISCHARGE: {calculatedDischarge} m³/s</span>
                  </div>
                </div>

                {/* Sluice Gate Position Graphic Overlay */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px]">
                  <div className="px-2 py-0.5 rounded bg-black/70 border border-[#00B7FF]/30 text-[#00B7FF]">
                    UPSTREAM RESERVOIR: 412 cm
                  </div>
                  <div className="px-2 py-0.5 rounded bg-black/70 border border-emerald-500/40 text-emerald-400">
                    STATUS: {isOptimalFlow ? 'OPTIMAL DISCHARGE' : 'HIGH VOLUME DISCHARGE'}
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between font-mono text-[10px]">
                  <div className="px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[#98A4B3]">
                    CHANNEL: SPILLWAY CHUTE 01
                  </div>
                  <div className="px-2 py-0.5 rounded bg-black/70 border border-[#00B7FF]/40 text-[#00B7FF]">
                    DOWNSTREAM VELOCITY: {calculatedVelocity} m/s
                  </div>
                </div>

              </div>

              {/* Sluice Gate Aperture Slider Control */}
              <div className="p-3 rounded-xl bg-[#08111F] border border-[#00B7FF]/20">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#98A4B3] flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#00B7FF]" />
                    <span>Automated Sluice Gate Elevation:</span>
                  </span>
                  <span className="text-[#00B7FF] font-bold">{gateAperture}% OPEN</span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="100"
                  value={gateAperture}
                  onChange={(e) => {
                    setGateAperture(Number(e.target.value));
                    setIsAutomatedMode(false);
                  }}
                  className="w-full h-2 bg-[#02060D] rounded-lg appearance-none cursor-pointer accent-[#00B7FF]"
                />

                <div className="flex items-center justify-between text-[10px] font-mono text-[#98A4B3] mt-1.5">
                  <span>10% (Minimum Ecological Flow)</span>
                  <span>50% (Standard Regulation)</span>
                  <span>100% (Full Flood Spillway)</span>
                </div>
              </div>

            </div>

            {/* Bottom Status summary */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#98A4B3] px-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Continuous IoT Automated Water Release Mode Active
              </span>
              <span className="text-[#00B7FF]">
                AI Discharge Optimization: ON
              </span>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: RIVER WATER LEVEL SIMULATOR & TELEMETRY (3 Cols) ================= */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3">
            {/* The Capsule River Water Level simulation card */}
            <RiverWaterLevelCard
              initialLevel={38}
              className="w-full flex-1"
            />

            {/* Quick Manual Override button bar below panel */}
            <button
              onClick={onOpenManualOverride}
              className="w-full py-2.5 rounded-xl border border-rose-500/40 hover:bg-rose-500/10 text-rose-400 text-xs font-mono font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>MANUAL GATE OVERRIDE</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
