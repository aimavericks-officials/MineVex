import React, { useState } from 'react';
import { Activity, ShieldAlert, Zap, ArrowRight, Gauge, Clock, Sliders, Eye, Radio } from 'lucide-react';

export function PredictiveEngineSection() {
  const steps = [
    'Current State',
    'Object Tracking',
    'Trajectory Prediction',
    'Risk Assessment',
    'Driver Recommendation',
  ];

  return (
    <section className="py-20 bg-[#070B0F] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              06 · PREDICTIVE RISK ENGINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Detection is not the finish line.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            The concept combines present vehicle kinematics with recent spatio-temporal movement and environmental context to forecast developing collisions seconds before impact.
          </p>
        </div>

        {/* Big Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141B] border border-[#21303C] space-y-8">
          {/* Flow Steps */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold font-mono">
            {steps.map((s, idx) => (
              <React.Fragment key={s}>
                <span className="px-4 py-2.5 rounded-xl bg-[#101922] border border-[#21303C] text-white shadow-sm">
                  {s}
                </span>
                {idx < steps.length - 1 && (
                  <span className="text-[#FFB020] font-bold text-sm">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <hr className="border-[#182632]" />

          {/* Analytics 4 Big Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                TRUCK A17
              </small>
              <strong className="text-2xl sm:text-3xl font-black text-white font-mono block mt-1">
                32 km/h
              </strong>
              <span className="text-[11px] text-[#697B87] mt-0.5 block font-mono">current ground speed</span>
            </div>

            <div className="p-5 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                TRUCK B08
              </small>
              <strong className="text-2xl sm:text-3xl font-black text-white font-mono block mt-1">
                45 m
              </strong>
              <span className="text-[11px] text-[#697B87] mt-0.5 block font-mono">current distance</span>
            </div>

            <div className="p-5 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                TIME TO CONFLICT
              </small>
              <strong className="text-2xl sm:text-3xl font-black text-[#FF4D5E] font-mono block mt-1">
                4.2 s
              </strong>
              <span className="text-[11px] text-[#697B87] mt-0.5 block font-mono">predictive model estimate</span>
            </div>

            <div className="p-5 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                RECOMMENDED ACTION
              </small>
              <strong className="text-2xl sm:text-3xl font-black text-[#FFB020] font-mono block mt-1">
                18 km/h
              </strong>
              <span className="text-[11px] text-[#697B87] mt-0.5 block font-mono">safe deceleration limit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SensorFusionSection() {
  const sensors = [
    {
      icon: '📷',
      title: 'Camera',
      desc: 'High-dynamic range optical feeds with YOLOv5s-Fog classification for daytime, dust, and illuminated tunnel driving.',
    },
    {
      icon: '📡',
      title: 'Radar',
      desc: '77 GHz millimeter-wave radar for impenetrable dust and dense fog penetration with direct Doppler relative velocity.',
    },
    {
      icon: '〰️',
      title: 'Ultrasonic',
      desc: 'Short-range wide-angle acoustic transducer array providing close-quarter bumper and tyre hazard envelope safety.',
    },
    {
      icon: '🛰️',
      title: 'Vehicle + Environment',
      desc: 'Onboard IMU pitch/roll, payload load cells, road grade percentage, and GPS positioning to contextualize stopping physics.',
    },
  ];

  return (
    <section className="py-20 bg-[#05080B] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              07 · SENSOR FUSION
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              One safety picture from multiple signals.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            No single sensor operates reliably under every open-cast mining hazard. MineVex fuses diverse complementary modalities into an unified state model.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sensors.map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0D141B] to-[#091017] border border-[#21303C] hover:border-[#FFB020]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4 p-2 w-fit rounded-xl bg-[#111A22] border border-[#21303C]">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs text-[#8EA0AD] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VisibilityLabSection() {
  const [vis, setVis] = useState(68);

  const speed = Math.max(10, Math.round(10 + (vis - 10) * 0.24));
  const dist = Math.round(95 - vis * 0.63);
  const risk = vis < 30 ? 'CRITICAL' : vis < 55 ? 'HIGH' : vis < 80 ? 'MODERATE' : 'LOW';
  const condition = vis < 30 ? 'SEVERE FOG' : vis < 55 ? 'LOW VISIBILITY' : vis < 80 ? 'MODERATE' : 'CLEAR';
  const mode = vis < 45 ? 'RADAR + ATTENTION VISION' : 'FULL MULTI-SENSOR FUSION';

  const riskColor = 
    risk === 'CRITICAL' ? 'text-[#FF4D5E]' :
    risk === 'HIGH' ? 'text-[#FFB020]' :
    risk === 'MODERATE' ? 'text-[#46D9FF]' : 'text-[#35E28B]';

  return (
    <section id="visibility" className="py-20 bg-[#070B0F] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              08 · VISIBILITY INTELLIGENCE LAB
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              What happens when visibility drops?
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Interact with the environmental visibility slider below to observe how the AI safety controller dynamically adapts maximum permitted speed and buffer envelopes in real time.
          </p>
        </div>

        {/* Interactive Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141B] border border-[#21303C] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <small className="text-xs font-mono text-[#8EA0AD] tracking-wider uppercase block">
                SIMULATED ENVIRONMENTAL VISIBILITY
              </small>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono mt-1">
                {vis} <span className="text-xl text-[#8EA0AD] font-normal">meters</span>
              </div>
            </div>

            <div className={`px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider ${
              risk === 'CRITICAL' ? 'bg-[#FF4D5E]/15 border-[#FF4D5E]/40 text-[#FF4D5E]' :
              risk === 'HIGH' ? 'bg-[#FFB020]/15 border-[#FFB020]/40 text-[#FFB020]' :
              'bg-[#35E28B]/15 border-[#35E28B]/40 text-[#35E28B]'
            }`}>
              CONDITION: {condition}
            </div>
          </div>

          {/* Slider input */}
          <div className="space-y-2">
            <input
              type="range"
              min="10"
              max="120"
              value={vis}
              onChange={(e) => setVis(Number(e.target.value))}
              className="w-full h-2.5 bg-[#1B2934] rounded-lg appearance-none cursor-pointer accent-[#FFB020]"
            />
            <div className="flex justify-between text-[11px] font-mono text-[#6A7C89]">
              <span>10m (Dense Fog / Dust Storm)</span>
              <span>65m (Moderate)</span>
              <span>120m (Clear Atmosphere)</span>
            </div>
          </div>

          {/* Real-time Math Output Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#182632]">
            <div className="p-4 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                RECOMMENDED SPEED
              </small>
              <strong className="text-2xl font-black text-[#FFB020] font-mono block mt-1">
                {speed} km/h
              </strong>
            </div>

            <div className="p-4 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                MIN. SAFE DISTANCE
              </small>
              <strong className="text-2xl font-black text-white font-mono block mt-1">
                {dist} m
              </strong>
            </div>

            <div className="p-4 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                SYSTEM RISK STATE
              </small>
              <strong className={`text-2xl font-black font-mono block mt-1 ${riskColor}`}>
                {risk}
              </strong>
            </div>

            <div className="p-4 rounded-xl bg-[#091017] border border-[#21303C]">
              <small className="text-xs font-mono text-[#8EA0AD] uppercase block">
                ACTIVE DETECTION MODE
              </small>
              <strong className="text-sm font-bold text-[#46D9FF] font-mono block mt-2">
                {mode}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComparisonSection() {
  return (
    <section className="py-20 bg-[#05080B] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              09 · PARADIGM SHIFT
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Reactive → predictive safety.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Traditional haul road protocol waits for human eyes to spot an obstacle before initiating stopping maneuvers. MineVex continuously predicts conflicts seconds ahead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Without MineVex */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141B] border border-[#3B1F23] space-y-4">
            <h3 className="text-lg font-bold text-[#FF4D5E] flex items-center gap-2">
              <span>✕</span>
              <span>Without MineVex (Conventional Operations)</span>
            </h3>
            <p className="text-xs text-[#8EA0AD]">
              Heavy haul trucks rely solely on human eyesight and basic mirrors. Severe fog or sudden dust kicks leave zero reaction margin.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold pt-4">
              <span className="px-3 py-2 rounded-lg bg-[#141014] border border-[#331C20] text-[#E2E8F0]">
                Visual Detection
              </span>
              <span className="text-[#FF4D5E]">→</span>
              <span className="px-3 py-2 rounded-lg bg-[#141014] border border-[#331C20] text-[#E2E8F0]">
                Human Latency
              </span>
              <span className="text-[#FF4D5E]">→</span>
              <span className="px-3 py-2 rounded-lg bg-[#141014] border border-[#331C20] text-[#E2E8F0]">
                Emergency Brake
              </span>
              <span className="text-[#FF4D5E]">→</span>
              <span className="px-3 py-2 rounded-lg bg-[#3A141A] border border-[#6B242C] text-[#FF7884]">
                Critical Incident
              </span>
            </div>
          </div>

          {/* Card 2: With MineVex */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D141B] border border-[#1E3B2A] space-y-4">
            <h3 className="text-lg font-bold text-[#35E28B] flex items-center gap-2">
              <span>✓</span>
              <span>With MineVex (Predictive AI Mesh)</span>
            </h3>
            <p className="text-xs text-[#8EA0AD]">
              Multi-sensor fusion reads through zero visibility, predicts intersecting paths up to 6 seconds early, and issues proactive speed limits.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold pt-4">
              <span className="px-3 py-2 rounded-lg bg-[#0F1E16] border border-[#214732] text-[#E2E8F0]">
                Sense
              </span>
              <span className="text-[#35E28B]">→</span>
              <span className="px-3 py-2 rounded-lg bg-[#0F1E16] border border-[#214732] text-[#E2E8F0]">
                Detect
              </span>
              <span className="text-[#35E28B]">→</span>
              <span className="px-3 py-2 rounded-lg bg-[#0F1E16] border border-[#214732] text-[#E2E8F0]">
                Predict
              </span>
              <span className="text-[#35E28B]">→</span>
              <span className="px-3 py-2 rounded-lg bg-[#0F1E16] border border-[#214732] text-[#E2E8F0]">
                Warn
              </span>
              <span className="text-[#35E28B]">→</span>
              <span className="px-3 py-2 rounded-lg bg-[#153B25] border border-[#2C754B] text-[#71F2B0]">
                Safely Prevent
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
