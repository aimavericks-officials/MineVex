import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GisDashboard from './components/GisDashboard';
import SmartWaterControl from './components/SmartWaterControl';
import ResearchSection from './components/ResearchSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ManualOverrideModal from './components/ManualOverrideModal';
import { 
  INITIAL_ZONES, 
  INITIAL_EVENT_LOGS, 
  INITIAL_TELEMETRY, 
  INITIAL_TEAM_MEMBERS 
} from './data/initialData';
import { MonitoredZone, LiveEventLog, TelemetryData, TeamMember } from './types';

const STORAGE_KEY_TEAM = 'floodx_team_roster_v3';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Core App State
  const [zones, setZones] = useState<MonitoredZone[]>(INITIAL_ZONES);
  const [eventLogs, setEventLogs] = useState<LiveEventLog[]>(INITIAL_EVENT_LOGS);
  const [telemetry, setTelemetry] = useState<TelemetryData>(INITIAL_TELEMETRY);
  
  // Team members with local persistence
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_TEAM);
      if (cached) {
        const parsed: TeamMember[] = JSON.parse(cached);
        // Clear out any old unsplash placeholder links so user has clean upload state
        return parsed.map((m) => ({
          ...m,
          avatarUrl: m.avatarUrl?.startsWith('data:image/') || m.avatarUrl?.startsWith('blob:') ? m.avatarUrl : ''
        }));
      }
    } catch (e) {
      console.warn('Failed to load cached team roster:', e);
    }
    return INITIAL_TEAM_MEMBERS;
  });

  const [isManualOverrideOpen, setIsManualOverrideOpen] = useState<boolean>(false);

  // Sync team members to localStorage
  const handleUpdateTeam = (newMembers: TeamMember[]) => {
    setTeamMembers(newMembers);
    try {
      localStorage.setItem(STORAGE_KEY_TEAM, JSON.stringify(newMembers));
    } catch (e) {
      console.error('Failed to persist team roster:', e);
    }
  };

  // Telemetry updates
  const handleUpdateTelemetry = (updated: Partial<TelemetryData>) => {
    setTelemetry((prev) => ({ ...prev, ...updated }));
  };

  // Add new event log
  const handleAddEventLog = (log: LiveEventLog) => {
    setEventLogs((prev) => [log, ...prev.slice(0, 19)]);
  };

  // Robust Navigation auto-scroll helper with navbar offset compensation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Defer slightly to ensure any mobile drawers or layout shifts settle
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = window.innerWidth < 768 ? 72 : 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = Math.max(0, elementPosition - navHeight);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Backup direct scrollIntoView fallback if needed
        setTimeout(() => {
          const checkRect = element.getBoundingClientRect();
          if (checkRect.top < 0 || checkRect.top > window.innerHeight) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    });
  };

  // ScrollSpy for Active Navbar Section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'platform', 'technology', 'research', 'team', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#02060D] text-[#F5F7FA] font-['Inter',sans-serif] selection:bg-[#006BFF]/30 selection:text-[#00B7FF]">
      
      {/* Booting Loading Sequence */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="relative">
        
        {/* 1. Hero Section */}
        <HeroSection
          onExploreDashboard={() => handleNavigate('platform')}
          onExploreIoT={() => handleNavigate('technology')}
        />

        {/* 2. GIS Dashboard Section */}
        <GisDashboard
          zones={zones}
          eventLogs={eventLogs}
          onAddEventLog={handleAddEventLog}
        />

        {/* 3. Smart Water Level Control Section */}
        <SmartWaterControl
          telemetry={telemetry}
          onUpdateTelemetry={handleUpdateTelemetry}
          onOpenManualOverride={() => setIsManualOverrideOpen(true)}
        />

        {/* 4. Research Section (IMD, CWC, ISRO, NASA + 8 Tech Cards) */}
        <ResearchSection />

        {/* 5. Team Section (Team Mavericks) */}
        <TeamSection
          teamMembers={teamMembers}
          onUpdateTeam={handleUpdateTeam}
        />

        {/* 6. Contact Section */}
        <ContactSection />

      </main>

      {/* 7. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Manual Override Sluice Controls Modal */}
      <ManualOverrideModal
        isOpen={isManualOverrideOpen}
        telemetry={telemetry}
        onUpdateTelemetry={handleUpdateTelemetry}
        onClose={() => setIsManualOverrideOpen(false)}
      />

    </div>
  );
}
