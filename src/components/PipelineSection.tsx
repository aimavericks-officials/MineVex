import React from 'react';
import { Camera, Layers, Scan, Cpu, AlertTriangle, Radio } from 'lucide-react';

export default function PipelineSection() {
  const row1 = [
    { title: 'CAMERA', subtitle: 'Visual stream', icon: Camera },
    { title: 'DATA FUSION', subtitle: 'Sensor state', icon: Layers },
    { title: 'YOLO + TRACKING', subtitle: 'Objects + IDs', icon: Scan },
  ];

  const row2 = [
    { title: 'TRAJECTORY', subtitle: 'LSTM / GRU', icon: Cpu },
    { title: 'RISK ENGINE', subtitle: 'Conflict analysis', icon: AlertTriangle },
    { title: 'ALERT', subtitle: 'Speed + distance', icon: Radio },
  ];

  return (
    <section id="technology" className="py-20 bg-[#070B0F] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              04 · THE SOLUTION
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              From raw signals to an actionable warning.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            MineVex separates perception, tracking, prediction and decision logic so each pipeline stage can be independently benchmarked and hardened.
          </p>
        </div>

        {/* Engine Pipeline Flowchart */}
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            {row1.map((item, idx) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.title}>
                  <div className="p-5 rounded-2xl bg-[#0D151C] border border-[#21303C] hover:border-[#FFB020]/40 transition-all text-center flex flex-col items-center justify-center gap-2 group">
                    <div className="w-9 h-9 rounded-lg bg-[#14202B] border border-[#233543] flex items-center justify-center text-[#FFB020] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-bold text-white font-mono tracking-wider">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#8EA0AD]">
                      {item.subtitle}
                    </div>
                  </div>

                  {idx < row1.length - 1 && (
                    <div className="hidden md:flex justify-center text-[#FFB020] text-xl font-bold">
                      →
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Transfer connector */}
          <div className="hidden md:flex justify-end pr-16 text-[#FFB020] text-xl font-bold">
            ↓
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            {row2.map((item, idx) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.title}>
                  <div className="p-5 rounded-2xl bg-[#0D151C] border border-[#21303C] hover:border-[#46D9FF]/40 transition-all text-center flex flex-col items-center justify-center gap-2 group">
                    <div className="w-9 h-9 rounded-lg bg-[#14202B] border border-[#233543] flex items-center justify-center text-[#46D9FF] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-bold text-white font-mono tracking-wider">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#8EA0AD]">
                      {item.subtitle}
                    </div>
                  </div>

                  {idx < row2.length - 1 && (
                    <div className="hidden md:flex justify-center text-[#46D9FF] text-xl font-bold">
                      →
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
