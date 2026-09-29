import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';
import { useSiteAssets } from '../context/SiteAssetsContext';

interface FooterProps {
  onOpenOwnerPanel: () => void;
}

export default function Footer({ onOpenOwnerPanel }: FooterProps) {
  const { getAssetUrl } = useSiteAssets();
  const logoUrl = getAssetUrl('minevex_logo', '/images/floodx_logo.png');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#05080B] border-t border-[#16222C] text-[#71828D] text-xs font-mono">
      <div className="w-[92%] max-w-[1180px] mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB020] to-[#FF6B35] p-0.5 overflow-hidden">
              <img
                src={logoUrl}
                alt="MineVex AI Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/floodx_logo.png';
                }}
              />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wide">
                MINEVEX AI
              </span>
              <span className="text-[#8EA0AD] ml-2 font-normal">
                by AI Mavericks
              </span>
            </div>
          </div>

          {/* Slogan */}
          <div className="text-center font-bold tracking-widest text-[#FFB020] uppercase">
            SEE · PREDICT · PROTECT
          </div>

          {/* Back to top & Owner Link */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenOwnerPanel}
              className="text-[#8EA0AD] hover:text-[#FFB020] transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Panel</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#111A22] border border-[#21303C] text-white hover:text-[#FFB020] transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-[#121B22] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#556672]">
          <div>
            © 2026 MineVex AI · AI Mavericks · Smart India Hackathon 2026
          </div>
          <div>
            Data sources: DGMS, MDPI, IEEE, IFAC, ScienceDirect
          </div>
        </div>
      </div>
    </footer>
  );
}
