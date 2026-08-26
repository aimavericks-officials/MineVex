import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  AlertTriangle, 
  Layers, 
  Crosshair, 
  Maximize2,
  ArrowRight,
  ShieldAlert,
  Radio,
  Clock
} from 'lucide-react';
import L from 'leaflet';
import { MonitoredZone, LiveEventLog } from '../types';

interface GisDashboardProps {
  zones: MonitoredZone[];
  eventLogs: LiveEventLog[];
  onAddEventLog: (log: LiveEventLog) => void;
  onZoneSelect?: (zone: MonitoredZone) => void;
}

export default function GisDashboard({
  zones,
  eventLogs,
  onZoneSelect,
}: GisDashboardProps) {
  // Rainfall Simulator (250mm default as in mockup)
  const [rainfallMm, setRainfallMm] = useState<number>(250);
  const [activeZoneId, setActiveZoneId] = useState<string>('amta');
  const [mapType, setMapType] = useState<'satellite' | 'dark'>('satellite');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonLayersRef = useRef<{ [key: string]: L.Polygon | L.Circle }>({});
  const markerLayersRef = useRef<{ [key: string]: L.Marker | L.CircleMarker }>({});

  // Calculate dynamic risk based on rainfall simulator
  const calculatedRisk = useMemo(() => {
    const factor = (rainfallMm - 50) / 200; // 0 to 1.25
    return Math.min(98, Math.max(25, Math.round(55 + factor * 27)));
  }, [rainfallMm]);

  const estimatedImpact = useMemo(() => {
    if (rainfallMm >= 220) return 'High';
    if (rainfallMm >= 120) return 'Moderate';
    return 'Low';
  }, [rainfallMm]);

  // Leaflet Map Initialization with custom zones
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center around Howrah / Amta / Damodar region (22.58, 87.98)
      const map = L.map(mapContainerRef.current, {
        center: [22.58, 87.98],
        zoom: 10,
        zoomControl: false,
        attributionControl: false,
      });

      // Satellite Layer default
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 }
      ).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean previous layers
    Object.values(polygonLayersRef.current).forEach((layer) => (layer as L.Polygon).remove());
    Object.values(markerLayersRef.current).forEach((marker) => (marker as L.Marker).remove());
    polygonLayersRef.current = {};
    markerLayersRef.current = {};

    // 3 Specific Zones highlighted as in mockup:
    // 1. Amta, Howrah (Red - High Risk)
    // 2. Bagnan (Yellow - Moderate Risk)
    // 3. Udaynarayanpur (Green - Low Risk)

    const zonePolygons = [
      {
        id: 'amta',
        name: 'Amta, Howrah',
        label: 'High Risk',
        color: '#EF4444',
        fillColor: '#EF4444',
        center: [22.5833, 87.9833] as [number, number],
        coords: [
          [22.63, 87.94],
          [22.65, 88.01],
          [22.61, 88.06],
          [22.55, 88.04],
          [22.53, 87.96],
          [22.58, 87.92],
        ] as [number, number][],
      },
      {
        id: 'bagnan',
        name: 'Bagnan',
        label: 'Moderate Risk',
        color: '#EAB308',
        fillColor: '#EAB308',
        center: [22.4667, 87.9667] as [number, number],
        coords: [
          [22.53, 87.96],
          [22.55, 88.04],
          [22.48, 88.07],
          [22.42, 88.03],
          [22.43, 87.93],
          [22.49, 87.92],
        ] as [number, number][],
      },
      {
        id: 'udaynarayanpur',
        name: 'Udaynarayanpur',
        label: 'Low Risk',
        color: '#22C55E',
        fillColor: '#22C55E',
        center: [22.7167, 87.9667] as [number, number],
        coords: [
          [22.76, 87.93],
          [22.78, 88.01],
          [22.73, 88.05],
          [22.68, 88.04],
          [22.67, 87.95],
          [22.71, 87.92],
        ] as [number, number][],
      },
    ];

    zonePolygons.forEach((z) => {
      const poly = L.polygon(z.coords, {
        color: z.color,
        fillColor: z.fillColor,
        fillOpacity: 0.35,
        weight: 2,
      }).addTo(map);

      // Custom HTML Marker Label matching mockup tags (e.g. "Amta, Howrah \n High Risk")
      const tagHtml = `
        <div style="background: rgba(10, 16, 26, 0.85); border: 1px solid ${z.color}80; border-radius: 6px; padding: 4px 8px; font-family: Inter, sans-serif; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.6); pointer-events: auto; cursor: pointer;">
          <div style="color: #F5F7FA; font-size: 11px; font-weight: 700; line-height: 1.2;">${z.name}</div>
          <div style="color: ${z.color}; font-size: 9px; font-weight: 600; text-transform: capitalize;">${z.label}</div>
        </div>
      `;

      const icon = L.divIcon({
        html: tagHtml,
        className: 'custom-zone-label',
        iconSize: [110, 36],
        iconAnchor: [55, 18],
      });

      const marker = L.marker(z.center, { icon }).addTo(map);
      marker.on('click', () => {
        setActiveZoneId(z.id);
        const match = zones.find((item) => item.id === z.id);
        if (match && onZoneSelect) onZoneSelect(match);
      });

      polygonLayersRef.current[z.id] = poly;
      markerLayersRef.current[z.id] = marker;
    });

  }, [zones, onZoneSelect]);

  const toggleLayer = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((l) => {
      if (l instanceof L.TileLayer) map.removeLayer(l);
    });

    if (mapType === 'satellite') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map);
      setMapType('dark');
    } else {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18 }).addTo(map);
      setMapType('satellite');
    }
  };

  const resetView = () => {
    mapInstanceRef.current?.flyTo([22.58, 87.98], 10, { duration: 1 });
  };

  return (
    <section id="platform" className="relative py-16 bg-[#02060D] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow and Heading */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006BFF] mb-1.5 font-mono">
            AI FLOOD INTELLIGENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
            GIS Dashboard & Risk Overview
          </h2>
        </div>

        {/* 3-Column Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ================= LEFT COLUMN: RISK OVERVIEW & SIMULATOR (3.5 Cols) ================= */}
          <div className="lg:col-span-4 bg-[#08111F] rounded-2xl border border-[#00B7FF]/15 p-6 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div>
              {/* Highest Risk Zone */}
              <div className="pb-6 border-b border-[#00B7FF]/10">
                <span className="text-xs text-[#98A4B3] font-medium block mb-1">
                  Highest Risk Zone
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-rose-500">
                      Amta, Howrah
                    </h3>
                    <div className="mt-1.5">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        HIGH RISK
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Flood Risk Score & Sparkline */}
              <div className="py-6 border-b border-[#00B7FF]/10">
                <span className="text-xs text-[#98A4B3] font-medium block mb-1">
                  Flood Risk Score
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-4xl font-black text-rose-500">
                      {calculatedRisk}
                    </span>
                    <span className="text-sm text-[#98A4B3]">/100</span>
                  </div>

                  {/* Red Sparkline Graphic matching mockup */}
                  <div className="w-36 h-10 flex items-center justify-end">
                    <svg className="w-full h-full" viewBox="0 0 120 30" fill="none">
                      <path
                        d="M 0 20 L 15 22 L 30 18 L 45 25 L 60 14 L 75 19 L 90 8 L 105 15 L 120 4"
                        stroke="#EF4444"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* What-If Flood Simulator Slider */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-[#F5F7FA] mb-4">
                What-If Flood Simulator
              </h4>

              <div className="flex justify-between items-center text-xs text-[#98A4B3] mb-2 font-mono">
                <span>Adjust Rainfall (mm)</span>
                <span className="text-white font-semibold">{rainfallMm} mm</span>
              </div>

              <input
                type="range"
                min="0"
                max="500"
                value={rainfallMm}
                onChange={(e) => setRainfallMm(Number(e.target.value))}
                className="w-full h-1.5 bg-[#02060D] rounded-lg appearance-none cursor-pointer accent-[#00B7FF] mb-4"
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#98A4B3]">Estimated Impact</span>
                <span className={`font-bold ${
                  estimatedImpact === 'High' ? 'text-rose-500' :
                  estimatedImpact === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {estimatedImpact}
                </span>
              </div>
            </div>
          </div>

          {/* ================= MIDDLE COLUMN: SATELLITE GIS MAP (5 Cols) ================= */}
          <div className="lg:col-span-5 bg-[#08111F] rounded-2xl border border-[#00B7FF]/15 overflow-hidden relative min-h-[380px] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            
            {/* Map Canvas */}
            <div ref={mapContainerRef} className="w-full h-full min-h-[380px] z-0" />

            {/* Map Tools on Top Right matching mockup */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button
                onClick={toggleLayer}
                className="p-2 rounded-lg bg-[#08111F]/90 backdrop-blur-md border border-[#00B7FF]/30 text-[#F5F7FA] hover:text-[#00B7FF] transition-colors shadow-lg"
                title="Toggle Satellite / Dark Layer"
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={resetView}
                className="p-2 rounded-lg bg-[#08111F]/90 backdrop-blur-md border border-[#00B7FF]/30 text-[#F5F7FA] hover:text-[#00B7FF] transition-colors shadow-lg"
                title="Reset View"
              >
                <Crosshair className="w-4 h-4" />
              </button>
              <button
                onClick={resetView}
                className="p-2 rounded-lg bg-[#08111F]/90 backdrop-blur-md border border-[#00B7FF]/30 text-[#F5F7FA] hover:text-[#00B7FF] transition-colors shadow-lg"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: LIVE EVENT LOG (3.5 Cols) ================= */}
          <div className="lg:col-span-3 bg-[#08111F] rounded-2xl border border-[#00B7FF]/15 p-6 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#00B7FF]/10 mb-4">
                <h3 className="text-base font-bold text-[#F5F7FA]">
                  Live Event Log
                </h3>
              </div>

              {/* 5 Event Logs matching mockup */}
              <div className="space-y-4">
                {/* Log 1: High Risk Alert */}
                <div className="flex items-start justify-between text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-rose-400">High Risk Alert</div>
                      <div className="text-[11px] text-[#98A4B3]">Amta, Howrah</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#98A4B3]">11:24 AM</span>
                </div>

                {/* Log 2: Water Level Rising */}
                <div className="flex items-start justify-between text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-amber-300">Water Level Rising</div>
                      <div className="text-[11px] text-[#98A4B3]">Bagnan</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#98A4B3]">11:18 AM</span>
                </div>

                {/* Log 3: Moderate Rainfall */}
                <div className="flex items-start justify-between text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#00B7FF] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#00B7FF]">Moderate Rainfall</div>
                      <div className="text-[11px] text-[#98A4B3]">Udaynarayanpur</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#98A4B3]">11:10 AM</span>
                </div>

                {/* Log 4: Sensor Data Sync */}
                <div className="flex items-start justify-between text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#F5F7FA]">Sensor Data Sync</div>
                      <div className="text-[11px] text-[#98A4B3]">All Stations</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#98A4B3]">11:05 AM</span>
                </div>

                {/* Log 5: System Check */}
                <div className="flex items-start justify-between text-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-emerald-400">System Check</div>
                      <div className="text-[11px] text-[#98A4B3]">All Systems Normal</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#98A4B3]">11:00 AM</span>
                </div>
              </div>
            </div>

            {/* Bottom link matching mockup */}
            <div className="pt-4 border-t border-[#00B7FF]/10 mt-4">
              <button 
                onClick={() => {}} 
                className="flex items-center gap-1 text-xs font-semibold text-[#006BFF] hover:text-[#00B7FF] transition-colors"
              >
                <span>View Full Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
