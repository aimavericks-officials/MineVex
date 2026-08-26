import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  AlertOctagon, 
  Power, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Cpu, 
  Radio, 
  RotateCcw
} from 'lucide-react';
import { TelemetryData } from '../types';

interface ManualOverrideModalProps {
  isOpen: boolean;
  telemetry: TelemetryData;
  onUpdateTelemetry: (newTelemetry: Partial<TelemetryData>) => void;
  onClose: () => void;
}

export default function ManualOverrideModal({
  isOpen,
  telemetry,
  onUpdateTelemetry,
  onClose,
}: ManualOverrideModalProps) {
  const [gate1, setGate1] = useState(telemetry.gate1Status === 'OPEN');
  const [gate2, setGate2] = useState(telemetry.gate2Status === 'OPEN');
  const [relay, setRelay] = useState(telemetry.relayActive);
  const [buzzer, setBuzzer] = useState(telemetry.buzzerActive);
  const [motorPwm, setMotorPwm] = useState(78);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleApplyOverrides = () => {
    onUpdateTelemetry({
      gate1Status: gate1 ? 'OPEN' : 'CLOSED',
      gate2Status: gate2 ? 'OPEN' : 'CLOSED',
      relayActive: relay,
      buzzerActive: buzzer,
      manualOverrideActive: true,
      flowRateLMin: gate1 ? 2450 : 800,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  const handleResetToAuto = () => {
    onUpdateTelemetry({
      gate1Status: 'OPEN',
      gate2Status: 'PARTIAL',
      relayActive: true,
      buzzerActive: false,
      manualOverrideActive: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        className="w-full max-w-lg bg-[#08111F] border border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-[#F5F7FA] relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#02060D] text-[#98A4B3] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#00B7FF]/20">
          <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/50 flex items-center justify-center text-amber-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase text-amber-400">
              SAFETY INTERLOCK SYSTEM
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#F5F7FA]">
              Dam Sluice Manual Override
            </h3>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#02060D] border border-amber-500/30 text-xs font-mono text-[#98A4B3] mb-6 flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Manual mode overrides autonomous Arduino AI decisions for 60 minutes.</span>
        </div>

        {/* Controls Grid */}
        <div className="space-y-4 mb-6">
          
          {/* Sluice Gate 1 */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/20">
            <div>
              <div className="text-sm font-bold text-[#F5F7FA]">Sluice Spillway Gate #1</div>
              <div className="text-[11px] text-[#98A4B3] font-mono">12V DC Worm Gear Motor</div>
            </div>
            <button
              onClick={() => setGate1(!gate1)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                gate1
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {gate1 ? 'FORCED OPEN' : 'CLOSED'}
            </button>
          </div>

          {/* Sluice Gate 2 */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/20">
            <div>
              <div className="text-sm font-bold text-[#F5F7FA]">Auxiliary Spillway Gate #2</div>
              <div className="text-[11px] text-[#98A4B3] font-mono">Secondary Relief Channel</div>
            </div>
            <button
              onClick={() => setGate2(!gate2)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                gate2
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {gate2 ? 'FORCED OPEN' : 'CLOSED'}
            </button>
          </div>

          {/* 5V Relay Actuator */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/20">
            <div>
              <div className="text-sm font-bold text-[#F5F7FA]">1-Channel 5V Relay Solenoid</div>
              <div className="text-[11px] text-[#98A4B3] font-mono">Pump & Motor Power Bus</div>
            </div>
            <button
              onClick={() => setRelay(!relay)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                relay
                  ? 'bg-[#006BFF] text-white shadow-[0_0_12px_rgba(0,107,255,0.5)]'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {relay ? 'ENERGIZED' : 'OFF'}
            </button>
          </div>

          {/* Active Buzzer Test */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/20">
            <div>
              <div className="text-sm font-bold text-[#F5F7FA]">Emergency Siren Beacon</div>
              <div className="text-[11px] text-[#98A4B3] font-mono">85dB Piezo Embankment Alert</div>
            </div>
            <button
              onClick={() => setBuzzer(!buzzer)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                buzzer
                  ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.7)] animate-pulse'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>{buzzer ? 'BEACON ACTIVE' : 'TEST BEACON'}</span>
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#00B7FF]/20">
          <button
            onClick={handleResetToAuto}
            className="flex items-center gap-1.5 text-xs font-mono text-[#98A4B3] hover:text-[#00B7FF]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to AI Auto Mode</span>
          </button>

          <button
            onClick={handleApplyOverrides}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            {isSaved ? 'Applied Overrides!' : 'Apply Overrides'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
