import React from 'react';
import { 
  Database, 
  Cpu, 
  Layers, 
  LineChart, 
  BellRing
} from 'lucide-react';

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-16 bg-[#02060D] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: TITLE, INTRO & TECH BADGES (4 Cols) ================= */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#006BFF] mb-1.5 font-mono">
                RESEARCH & DATA CREDIBILITY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight mb-4 leading-tight">
                Built on Trusted Data.
                <br />
                Powered by Advanced AI.
              </h2>
              <p className="text-xs sm:text-sm text-[#98A4B3] leading-relaxed mb-8">
                FLOODX integrates multi-source geospatial and hydrological datasets with state-of-the-art AI models for accurate flood prediction and intelligent decision-making.
              </p>
            </div>

            {/* 3 Tech Stack Badges matching mockup (Python, TensorFlow, Leaflet.js) */}
            <div className="flex items-center gap-3">
              {/* Python Badge */}
              <div className="flex-1 p-3 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-1.5 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M11.9 2C6.9 2 7.2 4.1 7.2 4.1L7.2 6.3L12.1 6.3L12.1 7.4L4.7 7.4C4.7 7.4 2 7.1 2 12.1C2 17.1 4.3 16.9 4.3 16.9L5.8 16.9L5.8 14.8C5.8 14.8 5.7 12.3 8.3 12.3L13.2 12.3C13.2 12.3 15.6 12.4 15.6 10L15.6 4.3C15.6 4.3 16 2 11.9 2ZM9.9 3.5C10.5 3.5 11 4 11 4.6C11 5.2 10.5 5.7 9.9 5.7C9.3 5.7 8.8 5.2 8.8 4.6C8.8 4 9.3 3.5 9.9 3.5Z" fill="#38BDF8"/>
                    <path d="M12.1 22C17.1 22 16.8 19.9 16.8 19.9L16.8 17.7L11.9 17.7L11.9 16.6L19.3 16.6C19.3 16.6 22 16.9 22 11.9C22 6.9 19.7 7.1 19.7 7.1L18.2 7.1L18.2 9.2C18.2 9.2 18.3 11.7 15.7 11.7L10.8 11.7C10.8 11.7 8.4 11.6 8.4 14L8.4 19.7C8.4 19.7 8 22 12.1 22ZM14.1 20.5C13.5 20.5 13 20 13 19.4C13 18.8 13.5 18.3 14.1 18.3C14.7 18.3 15.2 18.8 15.2 19.4C15.2 20 14.7 20.5 14.1 20.5Z" fill="#FBBF24"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-[#F5F7FA]">Python</span>
              </div>

              {/* TensorFlow Badge */}
              <div className="flex-1 p-3 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-1.5 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L3 7.5V16.5L7.5 14V9.5L12 7L16.5 9.5V14L21 16.5V7.5L12 2Z" fill="#F97316"/>
                    <path d="M12 11.5L7.5 14V18.5L12 21L16.5 18.5V14L12 11.5Z" fill="#EA580C"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-[#F5F7FA]">TensorFlow</span>
              </div>

              {/* Leaflet.js Badge */}
              <div className="flex-1 p-3 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center justify-center text-center shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-1.5 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.5 16.5L5.5 12.5L6.91 11.09L9.5 13.67L17.09 6.09L18.5 7.5L9.5 16.5Z" fill="#22C55E"/>
                  </svg>
                </div>
                <span className="text-xs font-semibold text-[#F5F7FA]">Leaflet.js</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: 2 ROWS OF 5 CARDS (8 Cols) ================= */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Top Row: 5 Official Scientific Data Sources matching mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              
              {/* Source 1: IMD */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#00B7FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#030712] border border-amber-500/40 p-1 flex items-center justify-center mb-2 shadow-inner">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-[10px] font-black text-black">
                    IMD
                  </div>
                </div>
                <div className="text-xs font-bold text-[#F5F7FA]">IMD</div>
                <div className="text-[10px] text-[#98A4B3] mt-0.5 leading-tight">India Meteorological Department</div>
              </div>

              {/* Source 2: CWC */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#00B7FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#030712] border border-[#006BFF]/40 p-1 flex items-center justify-center mb-2 shadow-inner">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#006BFF] to-[#00B7FF] flex items-center justify-center text-[10px] font-black text-white">
                    CWC
                  </div>
                </div>
                <div className="text-xs font-bold text-[#F5F7FA]">CWC</div>
                <div className="text-[10px] text-[#98A4B3] mt-0.5 leading-tight">Central Water Commission</div>
              </div>

              {/* Source 3: ISRO Bhuvan */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#00B7FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#030712] border border-orange-500/40 p-1 flex items-center justify-center mb-2 shadow-inner">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-[9px] font-black text-white">
                    ISRO
                  </div>
                </div>
                <div className="text-xs font-bold text-[#F5F7FA]">ISRO Bhuvan</div>
                <div className="text-[10px] text-[#98A4B3] mt-0.5 leading-tight">Satellite & Geospatial Data</div>
              </div>

              {/* Source 4: OpenStreetMap */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#00B7FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#030712] border border-emerald-500/40 p-1 flex items-center justify-center mb-2 shadow-inner">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-[9px] font-black text-black">
                    OSM
                  </div>
                </div>
                <div className="text-xs font-bold text-[#F5F7FA]">OpenStreetMap</div>
                <div className="text-[10px] text-[#98A4B3] mt-0.5 leading-tight">Open Source Mapping</div>
              </div>

              {/* Source 5: NASA SRTM */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#00B7FF]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#030712] border border-blue-500/40 p-1 flex items-center justify-center mb-2 shadow-inner">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-[9px] font-black text-white">
                    NASA
                  </div>
                </div>
                <div className="text-xs font-bold text-[#F5F7FA]">NASA SRTM</div>
                <div className="text-[10px] text-[#98A4B3] mt-0.5 leading-tight">Digital Elevation Model</div>
              </div>

            </div>

            {/* Bottom Row: 5 Processing Steps matching mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              
              {/* Step 1: Real-time Data Ingestion */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-2 flex items-center justify-center text-[#98A4B3]">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-[#F5F7FA] leading-tight">
                  Real-time Data Ingestion
                </div>
              </div>

              {/* Step 2: AI/ML Models */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-2 flex items-center justify-center text-[#98A4B3]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-[#F5F7FA] leading-tight">
                  AI/ML Models (TensorFlow)
                </div>
              </div>

              {/* Step 3: Geospatial Analysis */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-2 flex items-center justify-center text-[#98A4B3]">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-[#F5F7FA] leading-tight">
                  Geospatial Analysis (Leaflet.js)
                </div>
              </div>

              {/* Step 4: Predictive Insights */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-2 flex items-center justify-center text-[#98A4B3]">
                  <LineChart className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-[#F5F7FA] leading-tight">
                  Predictive Insights
                </div>
              </div>

              {/* Step 5: Early Warning Generation */}
              <div className="p-4 rounded-xl bg-[#08111F] border border-[#00B7FF]/15 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <div className="w-8 h-8 mb-2 flex items-center justify-center text-[#98A4B3]">
                  <BellRing className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-[#F5F7FA] leading-tight">
                  Early Warning Generation
                </div>
              </div>

            </div>

            {/* Academic Disclaimer */}
            <div className="text-center pt-2">
              <span className="text-[11px] text-[#98A4B3]">
                All datasets are publicly available and used strictly for academic & research purposes.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
