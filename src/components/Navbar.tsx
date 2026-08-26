import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Home, 
  LayoutDashboard, 
  Cpu, 
  Database, 
  Users, 
  Mail,
  Sparkles
} from 'lucide-react';
import floodxLogoImg from '../assets/images/floodx_logo.png';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({
  activeSection,
  onNavigate,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'platform', label: 'Platform', icon: LayoutDashboard },
    { id: 'technology', label: 'Technology', icon: Cpu },
    { id: 'research', label: 'Research', icon: Database },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleLinkClick = (id: string, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    // Close drawer immediately
    setMobileMenuOpen(false);
    // Trigger navigation with immediate scroll execution
    onNavigate(id);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#02060D]/95 backdrop-blur-xl border-b border-[#00B7FF]/20 py-2.5 sm:py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
          : 'bg-[#02060D]/60 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: FLOODX Logo */}
          <button
            id="nav-logo-btn"
            onClick={(e) => handleLinkClick('home', e)}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer focus:outline-none touch-manipulation text-left"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#006BFF] via-[#00B7FF] to-[#38BDF8] p-[1.5px] flex items-center justify-center shadow-[0_0_18px_rgba(0,183,255,0.4)] group-hover:shadow-[0_0_28px_rgba(0,183,255,0.7)] transition-all">
              <div className="w-full h-full bg-[#02060D] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={floodxLogoImg || '/images/floodx_logo.png'}
                  alt="AI Mavericks FLOODX Logo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/floodx_logo.png';
                  }}
                />
              </div>
              {/* Pulsing micro indicator */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00B7FF] rounded-full animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00B7FF] rounded-full ring-2 ring-[#02060D]" />
            </div>

            <div className="flex flex-col items-start leading-none">
              <div className="flex items-center tracking-tight">
                <span className="text-lg sm:text-2xl font-black tracking-wider text-[#F5F7FA]">FLOOD</span>
                <span className="text-lg sm:text-2xl font-black tracking-wider text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.8)] ml-0.5">X</span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono font-semibold uppercase tracking-widest text-[#00B7FF]/90 mt-0.5">
                Control &amp; Alert
              </span>
            </div>
          </button>

          {/* Center: Navigation Links (Desktop: md and up) */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer rounded-lg ${
                    isActive
                      ? 'text-[#00B7FF] font-semibold'
                      : 'text-[#98A4B3] hover:text-[#F5F7FA] hover:bg-[#08111F]/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-[#006BFF] to-[#00B7FF] rounded-full shadow-[0_0_8px_rgba(0,183,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: AI MAVERICKS Badge (Desktop) & Mobile Drawer Toggle */}
          <div className="flex items-center gap-2">
            {/* AI MAVERICKS Badge */}
            <div
              id="ai-mavericks-badge"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#08111F] border border-[#00B7FF]/30 shadow-[0_0_15px_rgba(0,183,255,0.2)]"
            >
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#00B7FF] whitespace-nowrap">
                AI MAVERICKS
              </span>
            </div>

            {/* Mobile Menu Button (md:hidden so it works on all screens < 768px) */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#08111F] border border-[#00B7FF]/30 text-[#F5F7FA] hover:text-[#00B7FF] hover:border-[#00B7FF] focus:outline-none cursor-pointer touch-manipulation active:scale-95 transition-all shadow-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00B7FF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE HORIZONTAL QUICK SCROLL BAR ================= */}
        {/* Allows instant 1-touch auto-scroll to Platform, Technology, etc. on small screens without even opening drawer! */}
        <div className="md:hidden mt-2.5 pt-2 border-t border-[#00B7FF]/15 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const Icon = link.icon;
            return (
              <button
                key={`mobile-quick-${link.id}`}
                id={`mobile-quick-btn-${link.id}`}
                onClick={(e) => handleLinkClick(link.id, e)}
                className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all touch-manipulation active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-[#006BFF] text-white shadow-[0_0_10px_rgba(0,107,255,0.6)] border border-[#00B7FF]'
                    : 'bg-[#08111F]/90 text-[#98A4B3] border border-white/10 hover:text-white hover:border-[#00B7FF]/30'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE FULL EXPANDED DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden bg-[#08111F]/98 backdrop-blur-2xl border-b border-[#00B7FF]/30 px-4 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#00B7FF]/15">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#00B7FF] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00B7FF]" />
                <span>Quick Jump To Section</span>
              </span>
              <span className="text-[10px] font-mono text-[#98A4B3]">Touch to auto-scroll</span>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    id={`mobile-drawer-link-${link.id}`}
                    onClick={(e) => handleLinkClick(link.id, e)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all touch-manipulation active:scale-98 cursor-pointer ${
                      isActive
                        ? 'bg-[#006BFF] text-white border border-[#00B7FF] shadow-[0_0_15px_rgba(0,107,255,0.4)]'
                        : 'bg-[#02060D] text-[#98A4B3] border border-[#00B7FF]/15 hover:text-[#F5F7FA] hover:border-[#00B7FF]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-[#08111F] text-[#00B7FF]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="tracking-wide">{link.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {isActive && (
                        <span className="text-[10px] font-mono uppercase bg-white/20 px-2 py-0.5 rounded text-white mr-1">
                          Current
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#98A4B3]'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#00B7FF]/15 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#02060D] border border-[#00B7FF]/20">
                <span className="text-xs text-[#98A4B3] font-mono">System AI Status:</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live (AI MAVERICKS)
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
