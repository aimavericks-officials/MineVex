import React, { useState } from 'react';
import { SiteAssetsProvider } from './context/SiteAssetsContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AccidentDataSection from './components/AccidentDataSection';
import ProblemSection from './components/ProblemSection';
import MineVexDashboard from './components/MineVexDashboard';
import PipelineSection from './components/PipelineSection';
import ComputerVisionSection from './components/ComputerVisionSection';
import { 
  PredictiveEngineSection, 
  SensorFusionSection, 
  VisibilityLabSection, 
  ComparisonSection 
} from './components/PredictionSections';
import { OperationalAnalyticsSection, ArchitectureSection } from './components/ArchitectureSection';
import ResearchSection from './components/ResearchSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import OwnerPanelModal from './components/OwnerPanelModal';

function MineVexApp() {
  const [isOwnerPanelOpen, setIsOwnerPanelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070B0F] text-[#EEF4F7] font-sans antialiased selection:bg-[#FFB020]/30 selection:text-[#FFB020]">
      {/* Navigation Header */}
      <Navbar onOpenOwnerPanel={() => setIsOwnerPanelOpen(true)} />

      {/* Main Content Flow */}
      <main>
        {/* Upper Hero Section with Dynamic Background */}
        <HeroSection onOpenOwnerPanel={() => setIsOwnerPanelOpen(true)} />

        {/* 01 · DGMS Accident Data & Core Architecture Highlights (Screenshots 1 & 2) */}
        <AccidentDataSection />

        {/* 02 · The Problem in Open-Cast Mining */}
        <ProblemSection />

        {/* 03 · Live Console: MineVex Safety Dashboard (Sector 07 Simulation) */}
        <MineVexDashboard />

        {/* 04 · The Solution: Core Pipeline Flow */}
        <PipelineSection />

        {/* 05 · Computer Vision YOLOv5s-Fog & Terminal */}
        <ComputerVisionSection />

        {/* 06 · Predictive Risk Engine & Spatio-Temporal Forecasting */}
        <PredictiveEngineSection />

        {/* 07 · Sensor Fusion */}
        <SensorFusionSection />

        {/* 08 · Visibility Intelligence Lab (Interactive Slider) */}
        <VisibilityLabSection />

        {/* 09 · Before & After Comparison */}
        <ComparisonSection />

        {/* 10 · Operational Analytics */}
        <OperationalAnalyticsSection />

        {/* 11 · System Architecture & Technical Stack */}
        <ArchitectureSection />

        {/* 12 · Research & 7-Stage Foundation Papers (Screenshots 3, 4, 5) */}
        <ResearchSection />

        {/* 13 · Team: AI Mavericks (Retained Team Members) */}
        <TeamSection onOpenOwnerPanel={() => setIsOwnerPanelOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenOwnerPanel={() => setIsOwnerPanelOpen(true)} />

      {/* Owner Panel for Uploading Background & Images (Firebase-backed) */}
      <OwnerPanelModal
        isOpen={isOwnerPanelOpen}
        onClose={() => setIsOwnerPanelOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteAssetsProvider>
      <MineVexApp />
    </SiteAssetsProvider>
  );
}
