import React from 'react';
import { Cpu, Server, Radio, Database, ArrowDown, Layers, Terminal } from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';

export function OperationalAnalyticsSection() {
  const chartValues = [34, 52, 40, 67, 48, 73, 58, 84, 63, 76, 55, 88];

  return (
    <section id="analytics" className="py-20 bg-[#070B0F] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              10 · OPERATIONAL ANALYTICS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Operational awareness at a glance.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Real-time aggregate telemetry across Sector 07 haul circuits. Continuous logging tracks proactive interventions and risk reduction.
          </p>
        </div>

        {/* 4 Big Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <small className="text-xs font-mono text-[#8EA0AD] uppercase block">ACTIVE VEHICLES</small>
            <strong className="text-3xl font-black text-white font-mono block mt-1">24</strong>
            <span className="text-[11px] text-[#35E28B] font-mono mt-1 block">● 100% CAN Telemetry</span>
          </div>

          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <small className="text-xs font-mono text-[#8EA0AD] uppercase block">RISK EVENTS DETECTED</small>
            <strong className="text-3xl font-black text-[#FFB020] font-mono block mt-1">37</strong>
            <span className="text-[11px] text-[#A6B7C4] font-mono mt-1 block">Past 8-hour shift</span>
          </div>

          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <small className="text-xs font-mono text-[#8EA0AD] uppercase block">PREVENTATIVE ALERTS</small>
            <strong className="text-3xl font-black text-[#35E28B] font-mono block mt-1">18</strong>
            <span className="text-[11px] text-[#35E28B] font-mono mt-1 block">0 Near-miss incidents</span>
          </div>

          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <small className="text-xs font-mono text-[#8EA0AD] uppercase block">AVG PIPELINE LATENCY</small>
            <strong className="text-3xl font-black text-[#46D9FF] font-mono block mt-1">118 ms</strong>
            <span className="text-[11px] text-[#A6B7C4] font-mono mt-1 block">Edge inferencing</span>
          </div>
        </div>

        {/* Activity Distribution Chart */}
        <div className="p-6 rounded-2xl bg-[#091017] border border-[#21303C] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#8EA0AD]">
            <span>HOURLY INCIDENT SUPPRESSION PROFILE (00:00 - 12:00)</span>
            <span className="text-[#FFB020]">AVERAGE PREDICTIVE LEAD: 4.8 SECONDS</span>
          </div>

          <div className="h-44 flex items-end gap-2 sm:gap-3 pt-6 border-b border-[#1A2633] pb-2">
            {chartValues.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                <div
                  style={{ height: `${v}%` }}
                  className="w-full rounded-t-sm bg-gradient-to-t from-[#FFB020] to-[#FFD66B] group-hover:from-[#FF8533] group-hover:to-[#FFA21F] transition-all"
                />
                <span className="mt-2 text-[10px] font-mono text-[#5E717E] group-hover:text-white">
                  0{i + 1}h
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArchitectureSection() {
  const { getAssetUrl } = useSiteAssets();
  const diagramImg = getAssetUrl('architecture_diagram', '/images/arduino_zero.jpg');

  return (
    <section id="architecture" className="py-20 bg-[#05080B] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              11 · SYSTEM ARCHITECTURE & STACK
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              MineVex end-to-end architecture.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Built as a modular AI + IoT platform operating across ruggedized vehicle edge compute and central mine dispatch monitoring.
          </p>
        </div>

        {/* 4 Tech Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <h3 className="text-sm font-bold text-white mb-2 text-[#FFB020] font-mono">
              AI / MACHINE LEARNING
            </h3>
            <p className="text-xs text-[#8EA0AD] leading-relaxed">
              YOLOv5s-Fog · ByteTrack · PyTorch · Spatio-Temporal LSTM / GRU · Conflict Classifier
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <h3 className="text-sm font-bold text-white mb-2 text-[#46D9FF] font-mono">
              PERCEPTION & TRACKING
            </h3>
            <p className="text-xs text-[#8EA0AD] leading-relaxed">
              Deep SORT · Kalman Filter · Relative Velocity Ranging · Optical Flow · Occlusion Buffering
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <h3 className="text-sm font-bold text-white mb-2 text-[#35E28B] font-mono">
              EDGE HARDWARE & IOT
            </h3>
            <p className="text-xs text-[#8EA0AD] leading-relaxed">
              Automotive CAN Bus · ESP32-CAM · 77GHz FMCW Radar · Ultrasonic Transducers · High-G IMU
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0D141B] border border-[#21303C]">
            <h3 className="text-sm font-bold text-white mb-2 text-[#E2E8F0] font-mono">
              DISPATCH & CLOUD
            </h3>
            <p className="text-xs text-[#8EA0AD] leading-relaxed">
              Firebase Firestore · React SPA · TypeScript · WebSocket Telemetry Streams · Tailwind CSS
            </p>
          </div>
        </div>

        {/* 3-Tier Architecture Flow Visual */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090F14] border border-[#21303C] space-y-6">
          <div className="text-xs font-mono text-[#FFB020] uppercase font-bold tracking-wider">
            END-TO-END DATAFLOW PIPELINE
          </div>

          {/* Tier 1: Input Signals */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['CAMERA\nVideo Stream', 'SENSORS\nRadar / Ultrasonic', 'TELEMETRY\nSpeed / Payload', 'ENVIRONMENT\nVisibility / Slope', 'V2V MESH\nNearby Vehicles'].map((t) => (
              <div key={t} className="p-4 rounded-xl bg-[#101920] border border-[#243543] text-center font-mono text-xs text-white whitespace-pre-line font-bold">
                {t}
              </div>
            ))}
          </div>

          <div className="text-center text-[#FFB020] text-2xl font-bold">↓</div>

          {/* Tier 2: AI Processing */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['DATA FUSION\nSpatial Alignment', 'YOLO DETECTOR\nBounding Boxes', 'TRACKING\nByteTrack IDs', 'TRAJECTORY\nLSTM Forecast', 'RISK ENGINE\nConflict Analysis'].map((t) => (
              <div key={t} className="p-4 rounded-xl bg-[#12212C] border border-[#2B4254] text-center font-mono text-xs text-[#46D9FF] whitespace-pre-line font-bold">
                {t}
              </div>
            ))}
          </div>

          <div className="text-center text-[#FFB020] text-2xl font-bold">↓</div>

          {/* Tier 3: Action & Prevention */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['SAFE SPEED\nDynamic Limit', 'SAFE DISTANCE\nBuffer Envelope', 'DRIVER ALERT\nAudio & HUD', 'DISPATCH ROOM\nOverview Map', 'ANALYTICS\nAudit Logging'].map((t) => (
              <div key={t} className="p-4 rounded-xl bg-[#132219] border border-[#234A33] text-center font-mono text-xs text-[#35E28B] whitespace-pre-line font-bold">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
