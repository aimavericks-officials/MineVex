import { Github, Twitter, Linkedin, Youtube, Mail, ArrowUp } from 'lucide-react';
import floodxLogoImg from '../assets/images/floodx_logo.png';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-[#02060D] border-t border-[#00B7FF]/15 text-[#98A4B3] py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Left: Brand & Description */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006BFF] to-[#00B7FF] p-0.5 flex items-center justify-center shadow-[0_0_10px_rgba(0,183,255,0.3)]">
                <div className="w-full h-full bg-[#02060D] rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={floodxLogoImg || '/images/floodx_logo.png'} 
                    alt="AI Mavericks FLOODX Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/floodx_logo.png';
                    }}
                  />
                </div>
              </div>
              <span className="font-black tracking-wider text-base text-[#F5F7FA]">
                FLOOD<span className="text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">X</span>
              </span>
            </div>
            <span className="hidden sm:inline text-[#98A4B3]/40">|</span>
            <span className="text-[#98A4B3] text-[11px] max-w-md">
              AI-Powered Flood Prediction, Smart Water Level Control &amp; Early Warning IoT System
            </span>
          </div>

          {/* Center: Built with Team Mavericks for SIH 2026 */}
          <div className="text-center text-[11px] text-[#98A4B3]">
            Built with <span className="text-rose-500">♡</span> by <span className="text-[#F5F7FA] font-semibold">Team Mavericks</span> for <span className="text-[#00B7FF]">Smart India Hackathon 2026</span>
          </div>

          {/* Right: Socials, Copyright & Scroll Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-[#98A4B3]">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5F7FA] transition-colors">
                <Github className="w-3.5 h-3.5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00B7FF] transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="mailto:contact@floodx.ai" className="hover:text-[#F5F7FA] transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <span className="text-[11px] text-[#98A4B3]/60 hidden lg:inline">
              © 2026 FLOODX.
            </span>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-[#08111F] border border-[#00B7FF]/20 hover:border-[#00B7FF]/50 text-[#98A4B3] hover:text-white transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
