import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, ShieldAlert, Cpu, Radio, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('BOOTING AI HYDRAULIC CORE...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const stages = [
      { at: 15, text: 'INITIALIZING TELEMETRY SENSOR GRID...' },
      { at: 35, text: 'CONNECTING TO ISRO BHUVAN & IMD RADAR...' },
      { at: 60, text: 'LOADING NEURAL RUNOFF PREDICTION MODEL...' },
      { at: 80, text: 'SYNCHRONIZING ARDUINO IOT NODES...' },
      { at: 95, text: 'FLOODX GIS MAP VECTOR TILES READY' },
      { at: 100, text: 'SYSTEM ONLINE • READY' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setStage('SYSTEM ONLINE • READY');
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 400);
          }, 500);
          return 100;
        }

        const currentStage = stages.find((s) => next >= s.at && prev < s.at);
        if (currentStage) {
          setStage(currentStage.text);
        }

        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#02060D] text-[#F5F7FA] overflow-hidden"
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full bg-[#006BFF]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
            {/* Pulsing Glowing Logo */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 20px rgba(0, 183, 255, 0.3)',
                  '0 0 45px rgba(0, 183, 255, 0.7)',
                  '0 0 20px rgba(0, 183, 255, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-2xl bg-[#08111F] border border-[#00B7FF]/40 flex items-center justify-center mb-6"
            >
              <Waves className="w-10 h-10 text-[#00B7FF]" />
            </motion.div>

            {/* Brand Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl font-black tracking-wider text-[#F5F7FA]">FLOOD</span>
              <span className="text-3xl font-black tracking-wider text-[#00B7FF] neon-text-glow">X</span>
              <span className="px-2 py-0.5 text-xs font-mono font-semibold bg-[#006BFF]/20 text-[#00B7FF] border border-[#00B7FF]/30 rounded">
                v2.6
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#98A4B3] mb-8 font-mono">
              AI-Powered Flood Prediction System
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-[#08111F] border border-[#00B7FF]/20 rounded-full h-2 p-0.5 mb-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#006BFF] to-[#00B7FF] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Status Text & Percentage */}
            <div className="w-full flex items-center justify-between font-mono text-xs text-[#98A4B3]">
              <span className="flex items-center gap-1.5 truncate text-[#00B7FF]/90">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#00B7FF]" />
                {stage}
              </span>
              <span className="font-bold text-[#F5F7FA] pl-2">{progress}%</span>
            </div>

            {/* Telemetry Sub-indicators */}
            <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-4 border-t border-[#00B7FF]/10 text-[11px] font-mono text-center text-[#98A4B3]">
              <div className="flex items-center justify-center gap-1">
                <Cpu className="w-3 h-3 text-[#00B7FF]" />
                <span>AI MODEL</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Radio className="w-3 h-3 text-[#10B981]" />
                <span>IOT MESH</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#00B7FF]" />
                <span>GIS SYNC</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
