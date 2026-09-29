import React from 'react';
import { EyeOff, AlertOctagon, Clock, Mountain } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: EyeOff,
      title: 'Low Visibility',
      desc: 'Dense fog, suspended particulate dust, and harsh weather reduce the useful visual range of heavy equipment operators to under 30 meters.',
    },
    {
      icon: AlertOctagon,
      title: 'Blind Zones',
      desc: 'Ultra-class haul trucks feature massive geometric blind spots extending up to 15 meters in front and alongside the chassis.',
    },
    {
      icon: Clock,
      title: 'Reaction Time',
      desc: 'At typical haulage speeds with 200+ ton payloads, human perception and brake latency are often insufficient to prevent catastrophic impact.',
    },
    {
      icon: Mountain,
      title: 'Road Dynamics',
      desc: 'Steep haul road gradients (8–12%), loose gravel slip, and dynamic brake fade drastically alter stopping distance envelopes.',
    },
  ];

  return (
    <section className="py-20 bg-[#070B0F] border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-black tracking-[0.16em] text-[#FFB020] uppercase font-mono mb-2">
              02 · THE PROBLEM
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Mining conditions change faster than human reaction.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8EA0AD] max-w-lg leading-relaxed">
            Fog, dust, blind spots, mixed traffic, road gradients and heavy vehicles create a hazardous safety environment. MineVex is designed around earlier detection and predictive awareness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0D141B] to-[#091017] border border-[#21303C] hover:border-[#FFB020]/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#111C24] border border-[#233542] flex items-center justify-center text-[#FFB020] group-hover:scale-110 transition-transform mb-4 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FFB020] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#8EA0AD] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-[#526470] mt-5 pt-3 border-t border-[#16232D]">
                  FACTOR 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
