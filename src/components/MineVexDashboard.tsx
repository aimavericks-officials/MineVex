import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Gauge, 
  Maximize2, 
  Radio, 
  ShieldAlert, 
  Truck, 
  Compass,
  ArrowRight,
  Sliders
} from 'lucide-react';

export default function MineVexDashboard() {
  const [selectedTruck, setSelectedTruck] = useState<'A17' | 'B08' | 'C03'>('A17');
  const [isAlertAck, setIsAlertAck] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAcknowledge = () => {
    setIsAlertAck(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const vehicles = {
    A17: {
      id: 'A17',
      name: 'HAUL TRUCK A17',
      type: 'CAT 797F (400 Ton)',
      speed: 31,
      distanceToObstacle: 45,
      risk: 'HIGH',
      status: 'CRITICAL',
      payload: 380,
      heading: 142,
    },
    B08: {
      id: 'B08',
      name: 'HAUL TRUCK B08',
      type: 'Komatsu 930E (320 Ton)',
      speed: 25,
      distanceToObstacle: 45,
      risk: 'ELEVATED',
      status: 'WARNING',
      payload: 310,
      heading: 198,
    },
    C03: {
      id: 'C03',
      name: 'SERVICE ROVER C03',
      type: 'Toyota LandCruiser HZJ79',
      speed: 18,
      distanceToObstacle: 120,
      risk: 'LOW',
      status: 'SAFE',
      payload: 2.5,
      heading: 65,
    },
  };

  const activeVeh = vehicles[selectedTruck];

  return (
    <section id="dashboard" className="py-20 bg-[#05080B] border-b border-[#16222C] relative">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              03 · LIVE CONSOLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              MineVex Safety Dashboard
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Interactive demonstration interface for dispatch operators and onboard heavy vehicle telematics. Values simulate Sector 07 haul road conditions.
          </p>
        </div>

        {/* Console Container */}
        <div className="rounded-2xl bg-[#070B0F] border border-[#21303C] shadow-2xl overflow-hidden p-5 sm:p-6 space-y-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1A2632]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#35E28B] animate-pulse" />
              <div className="font-mono text-sm font-black text-white tracking-wide">
                MINE OPERATIONS / SECTOR 07
              </div>
              <span className="text-xs text-[#526470]">|</span>
              <span className="text-xs font-mono text-[#8EA0AD]">BENCH LEVEL 440m</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-2.5 py-1 rounded-full bg-[#0B1B13] border border-[#24543D] text-[11px] font-mono text-[#35E28B] font-bold flex items-center gap-1.5">
                <span>●</span>
                <span>LIVE SIMULATION</span>
              </div>
              <span className="text-xs font-mono text-[#6A7B87]">FPS: 59.8</span>
            </div>
          </div>

          {/* Grid: Left Map + Right Telemetry */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Digital Mine Map (8 cols) */}
            <div className="lg:col-span-8 relative h-[420px] sm:h-[460px] rounded-xl border border-[#1B2A34] overflow-hidden bg-[#0A1116] flex flex-col justify-between p-4 group">
              {/* Mine Map Background Elements */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  background: 'radial-gradient(circle at 30% 35%, #22343E 0%, transparent 60%), linear-gradient(35deg, #070D12 0%, #111D25 35%, #070D12 70%)'
                }}
              />

              {/* Haul Contour Curves */}
              <div className="absolute -left-20 top-20 w-[600px] h-[210px] rounded-[50%] border-2 border-[#243540] -rotate-12 pointer-events-none" />
              <div className="absolute left-[300px] top-[210px] w-[500px] h-[170px] rounded-[50%] border-2 border-[#243540] rotate-12 pointer-events-none" />

              {/* Vector Navigation Routes */}
              <div className="absolute left-[25%] top-[34%] w-[380px] h-0.5 bg-[#46D9FF]/40 rotate-20 pointer-events-none" />
              <div className="absolute left-[42%] top-[70%] w-[310px] h-0.5 bg-[#46D9FF]/40 -rotate-35 pointer-events-none" />
              <div className="absolute left-[39%] top-[70%] w-[250px] h-0.5 bg-[#FFB020]/40 -rotate-90 pointer-events-none" />

              {/* Top Map Label */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="text-[10px] font-mono text-[#7F919C] tracking-widest uppercase bg-[#070B0F]/80 px-2 py-1 rounded border border-[#1E2E39]">
                  DIGITAL MINE MAP · REAL-TIME VEHICLE TRACKING
                </div>
                <div className="text-[10px] font-mono text-[#46D9FF] bg-[#070B0F]/80 px-2 py-1 rounded border border-[#1E2E39]">
                  3 ACTIVE NODES DETECTED
                </div>
              </div>

              {/* Nodes and Vehicles */}
              {/* Node 1 */}
              <div className="absolute left-[24%] top-[31%] w-3 h-3 rounded-full bg-[#35E28B] shadow-[0_0_16px_#35E28B]" />
              {/* Node 2 - Warn */}
              <div className="absolute left-[62%] top-[49%] w-3.5 h-3.5 rounded-full bg-[#FFB020] shadow-[0_0_18px_#FFB020] animate-pulse" />
              {/* Node 3 - Danger */}
              <div className="absolute left-[73%] top-[73%] w-3.5 h-3.5 rounded-full bg-[#FF4D5E] shadow-[0_0_18px_#FF4D5E] animate-ping" />
              <div className="absolute left-[73%] top-[73%] w-3.5 h-3.5 rounded-full bg-[#FF4D5E]" />

              {/* Interactive Vehicle Chips on Map */}
              {/* Truck A17 */}
              <button
                onClick={() => setSelectedTruck('A17')}
                className={`absolute left-[30%] top-[38%] px-3 py-1.5 rounded-md font-mono text-[11px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                  selectedTruck === 'A17'
                    ? 'bg-[#142633] text-[#46D9FF] border-[#46D9FF] ring-2 ring-[#46D9FF]/40 scale-105'
                    : 'bg-[#0E1A22] text-[#A6C0CF] border-[#223544] hover:border-[#46D9FF]'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-[#46D9FF]" />
                <span>TRUCK A17</span>
              </button>

              {/* Truck B08 */}
              <button
                onClick={() => setSelectedTruck('B08')}
                className={`absolute left-[56%] top-[52%] px-3 py-1.5 rounded-md font-mono text-[11px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                  selectedTruck === 'B08'
                    ? 'bg-[#291D11] text-[#FFB020] border-[#FFB020] ring-2 ring-[#FFB020]/40 scale-105'
                    : 'bg-[#0E1A22] text-[#A6C0CF] border-[#223544] hover:border-[#FFB020]'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-[#FFB020]" />
                <span>TRUCK B08</span>
              </button>

              {/* Vehicle C03 */}
              <button
                onClick={() => setSelectedTruck('C03')}
                className={`absolute left-[68%] top-[66%] px-3 py-1.5 rounded-md font-mono text-[11px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${
                  selectedTruck === 'C03'
                    ? 'bg-[#10241A] text-[#35E28B] border-[#35E28B] ring-2 ring-[#35E28B]/40 scale-105'
                    : 'bg-[#0E1A22] text-[#A6C0CF] border-[#223544] hover:border-[#35E28B]'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-[#35E28B]" />
                <span>VEHICLE C03</span>
              </button>

              {/* Conflict Vector Overlay between A17 and B08 */}
              <div className="absolute left-[36%] top-[41%] w-48 h-10 border-t-2 border-dashed border-[#FF4D5E] pointer-events-none transform rotate-18 opacity-90 animate-pulse" />

              {/* Bottom Map Legend */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#8EA0AD] bg-[#070B0F]/90 p-2.5 rounded-lg border border-[#1E2E39]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#35E28B]" /> Normal (C03)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FFB020]" /> Elevated (B08)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF4D5E]" /> Conflict Vector (A17 ↔ B08)
                  </span>
                </div>
                <span>Coordinate System: WGS84 UTM 44N</span>
              </div>
            </div>

            {/* Right: Telemetry & Collision Alert (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3">
              {/* Metric 1: Visibility */}
              <div className="p-4 rounded-xl bg-[#0D141B] border border-[#21303C]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8EA0AD] flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#46D9FF]" />
                    Simulated Visibility
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFB020]/15 text-[#FFB020] font-bold">
                    MODERATE FOG
                  </span>
                </div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  68 m
                </div>
                <div className="w-full h-1.5 bg-[#1A2630] rounded-full mt-2.5 overflow-hidden">
                  <div className="w-[58%] h-full bg-[#35E28B] rounded-full" />
                </div>
              </div>

              {/* Metric 2: Speed & Distance */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0D141B] border border-[#21303C]">
                  <span className="text-[11px] font-mono text-[#8EA0AD] block">
                    Recommended Speed
                  </span>
                  <strong className="text-xl font-black text-[#FFB020] font-mono block mt-1">
                    22 km/h
                  </strong>
                  <span className="text-[10px] text-[#6A7B87] font-mono">Current: 31 km/h</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0D141B] border border-[#21303C]">
                  <span className="text-[11px] font-mono text-[#8EA0AD] block">
                    Safe Distance
                  </span>
                  <strong className="text-xl font-black text-white font-mono block mt-1">
                    52 m
                  </strong>
                  <span className="text-[10px] text-[#6A7B87] font-mono">Current: 45 m</span>
                </div>
              </div>

              {/* Metric 3: Collision Risk */}
              <div className="p-4 rounded-xl bg-[#0D141B] border border-[#21303C]">
                <span className="text-xs font-mono text-[#8EA0AD] block">
                  Collision Risk
                </span>
                <div className="text-3xl font-black text-[#FFB020] font-mono mt-1">
                  HIGH
                </div>
                <p className="text-[11px] text-[#A0B0BC] mt-0.5">
                  Predicted intersection conflict detected within 5 seconds
                </p>
              </div>

              {/* Metric 4: Collision Warning Alert Box */}
              <div className={`p-4 rounded-xl border transition-all ${
                isAlertAck 
                  ? 'bg-[#0E1A14] border-[#24543D]' 
                  : 'bg-[#1A0D10] border-[#5B2A30] shadow-lg shadow-[#FF4D5E]/10 animate-pulse'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${isAlertAck ? 'text-[#35E28B]' : 'text-[#FF4D5E]'}`} />
                  <strong className={`text-xs font-mono tracking-wider ${isAlertAck ? 'text-[#35E28B]' : 'text-[#FF4D5E]'}`}>
                    {isAlertAck ? '✓ ALERT ACKNOWLEDGED' : '⚠ COLLISION WARNING'}
                  </strong>
                </div>

                <p className="text-xs text-[#AEB8BD] my-2 leading-relaxed">
                  A17 → B08 · predicted conflict in <b className="text-white font-mono">4.2 sec</b> at haul junction J4
                </p>

                <button
                  onClick={handleAcknowledge}
                  disabled={isAlertAck}
                  className={`w-full py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isAlertAck
                      ? 'bg-[#14261C] text-[#35E28B] border border-[#24543D] cursor-default'
                      : 'bg-[#FF4D5E] hover:bg-[#FF6675] text-white active:scale-95 shadow-md shadow-[#FF4D5E]/30 cursor-pointer'
                  }`}
                >
                  {isAlertAck ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Monitoring Continues</span>
                    </>
                  ) : (
                    <span>Acknowledge Alert</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Vehicle Detail Drawer */}
        <div className="p-4 rounded-xl bg-[#0D141B] border border-[#1F2E3A] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[#8EA0AD]">SELECTED UNIT:</span>
            <span className="text-white font-bold">{activeVeh.name}</span>
            <span className="px-2 py-0.5 rounded bg-[#16232E] text-[#46D9FF]">{activeVeh.type}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[#8EA0AD]">
            <span>SPEED: <strong className="text-white">{activeVeh.speed} km/h</strong></span>
            <span>PROXIMITY: <strong className="text-white">{activeVeh.distanceToObstacle} m</strong></span>
            <span>PAYLOAD: <strong className="text-white">{activeVeh.payload} tons</strong></span>
            <span>HEADING: <strong className="text-white">{activeVeh.heading}°</strong></span>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#0B1711] border border-[#345040] text-[#BDF5D1] shadow-2xl flex items-center gap-2.5 animate-slide-up text-xs font-mono">
          <CheckCircle className="w-4 h-4 text-[#35E28B] shrink-0" />
          <span>Alert acknowledged — telemetry continuous recording.</span>
        </div>
      )}
    </section>
  );
}
