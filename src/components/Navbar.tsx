import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Radio, ArrowUpRight } from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';

interface NavbarProps {
  onOpenOwnerPanel: () => void;
}

export default function Navbar({ onOpenOwnerPanel }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getAssetUrl, isOwner } = useSiteAssets();

  const logoUrl = getAssetUrl('minevex_logo', '/images/floodx_logo.png');

  const navLinks = [
    { label: 'Accident Data', href: '#accident-data' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Technology', href: '#technology' },
    { label: 'Computer Vision', href: '#vision' },
    { label: 'Visibility Lab', href: '#visibility' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Research', href: '#research' },
    { label: 'Team', href: '#team' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-20 bg-[#070B0F]/90 backdrop-blur-xl border-b border-[#16222C]">
      <div className="w-[92%] max-w-[1240px] h-full mx-auto flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#home" 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFB020] via-[#FF8533] to-[#FF4D5E] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#FFB020]/25 group-hover:shadow-[#FFB020]/40 transition-all">
            <div className="w-full h-full bg-[#070B0F] rounded-[10px] overflow-hidden flex items-center justify-center">
              <img
                src={logoUrl}
                alt="MineVex AI Logo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/floodx_logo.png';
                }}
              />
            </div>
            {/* Pulsing micro indicator */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#35E28B] border-2 border-[#070B0F] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#35E28B] border-2 border-[#070B0F]" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.2em] text-[#FFB020] uppercase font-mono">
              AI MAVERICKS
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-[#FFB020] transition-colors">
                MINEVEX
              </span>
              <span className="text-lg font-black tracking-tight text-[#FFB020]">
                AI
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-[#A9B8C2]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="hover:text-white hover:text-[#FFB020] transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFB020] group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111A22] border border-[#21303C] text-[11px] text-[#A9B8C2]">
            <Radio className="w-3 h-3 text-[#35E28B] animate-pulse" />
            <span className="font-mono text-[#35E28B] font-bold">SECTOR 07</span>
            <span className="text-[#647683]">|</span>
            <span>SIMULATION</span>
          </div>

          {/* Owner Panel Trigger */}
          <button
            onClick={onOpenOwnerPanel}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isOwner 
                ? 'bg-[#35E28B]/15 text-[#35E28B] border-[#35E28B]/40 hover:bg-[#35E28B]/25'
                : 'bg-[#111A22] text-[#FFB020] border-[#FFB020]/30 hover:bg-[#FFB020]/15'
            }`}
            title="Open Owner Image Upload Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isOwner ? 'Owner Active' : 'Owner Panel'}</span>
          </button>

          {/* Dashboard Action Button */}
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#dashboard');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFB020] hover:bg-[#FFC14D] text-[#0A0D10] text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-[#FFB020]/25 hover:translate-y-[-1px] active:translate-y-0"
          >
            <span>Open Dashboard</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[#A9B8C2] hover:text-white hover:bg-[#111A22] border border-[#21303C]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-20 left-0 right-0 bg-[#070B0F]/95 backdrop-blur-2xl border-b border-[#21303C] p-5 shadow-2xl animate-fade-in space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="p-3 rounded-lg bg-[#0E161E] border border-[#1b2832] text-[#A9B8C2] hover:text-white hover:border-[#FFB020]/50"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerPanel();
              }}
              className="w-full py-2.5 rounded-xl bg-[#111A22] border border-[#FFB020]/40 text-[#FFB020] text-xs font-bold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Owner Panel (Upload Pictures)</span>
            </button>
            <a
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#dashboard');
              }}
              className="w-full py-2.5 rounded-xl bg-[#FFB020] text-[#0A0D10] text-xs font-black uppercase text-center tracking-wider"
            >
              Launch Safety Console
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
