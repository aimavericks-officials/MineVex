import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Radio, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Emergency Basin Telemetry & Early Warning');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#02060D] overflow-hidden scroll-mt-24">
      {/* Background Decorators */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#006BFF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08111F] border border-[#00B7FF]/30 mb-3 shadow-[0_0_15px_rgba(0,183,255,0.15)]">
            <Radio className="w-4 h-4 text-[#00B7FF] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00B7FF]">
              Disaster Response & Research Inquiries
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F7FA] tracking-tight mb-4">
            Contact Command Center
          </h2>
          <p className="text-sm sm:text-base text-[#98A4B3] leading-relaxed">
            Connect directly with the FLOODX Engineering team, request regional sensor grid deployment, or report urgent embankment vulnerability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left: Glassmorphism Contact Form (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel shadow-[0_0_40px_rgba(0,107,255,0.15)] relative">
            <h3 className="text-xl font-bold text-[#F5F7FA] mb-2 flex items-center gap-2">
              <span>Send Secure Dispatch Message</span>
            </h3>
            <p className="text-xs text-[#98A4B3] mb-6">
              Transmissions are logged with Common Alerting Protocol (CAP) encryption.
            </p>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono mb-6 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Your message was securely transmitted to the FLOODX hydrological dispatch queue. Our duty team will respond shortly.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organization.gov.in"
                    className="w-full px-4 py-3 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
                  Subject / Inquiry Type
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF] transition-colors"
                >
                  <option value="Emergency Basin Telemetry & Early Warning">Emergency Basin Telemetry & Early Warning</option>
                  <option value="IoT Sensor Grid Regional Deployment">IoT Sensor Grid Regional Deployment</option>
                  <option value="AI Hydrological Model Research Collaboration">AI Hydrological Model Research Collaboration</option>
                  <option value="Embankment Vulnerability Field Report">Embankment Vulnerability Field Report</option>
                  <option value="General Public Inquiry">General Public Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#98A4B3] uppercase mb-1.5">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your location, hydrological station query, or collaboration proposal..."
                  className="w-full px-4 py-3 rounded-xl bg-[#02060D] border border-[#00B7FF]/30 text-[#F5F7FA] text-sm focus:outline-none focus:border-[#00B7FF] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#006BFF] to-[#00B7FF] hover:from-[#0052cc] hover:to-[#0099d6] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(0,183,255,0.4)] hover:shadow-[0_0_35px_rgba(0,183,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right: Emergency Hotline & Command Center Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* 24/7 Hotline Card */}
            <div className="p-6 rounded-2xl bg-[#08111F] border border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-400">
                    URGENT CIVIL DEFENSE
                  </span>
                  <h4 className="text-base font-bold text-[#F5F7FA]">
                    24/7 Flood Disaster Dispatch
                  </h4>
                </div>
              </div>

              <p className="text-xs text-[#98A4B3] mb-4">
                For immediate dam overflow emergencies and civil defense evacuation coordination:
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#F5F7FA]">
                  <Phone className="w-4 h-4 text-rose-400" />
                  <strong className="text-rose-300 text-sm">+91 (033) 2479-8800 / 1070 (Toll Free)</strong>
                </div>
                <div className="flex items-center gap-2 text-[#98A4B3]">
                  <Mail className="w-4 h-4 text-[#00B7FF]" />
                  <span>emergency@floodx.ai</span>
                </div>
              </div>
            </div>

            {/* Field Operations Command Centre */}
            <div className="p-6 rounded-2xl bg-[#08111F] border border-[#00B7FF]/25 shadow-[0_0_20px_rgba(0,107,255,0.08)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#02060D] border border-[#00B7FF]/40 text-[#00B7FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#00B7FF]">
                    FIELD HYDROLOGY HQ
                  </span>
                  <h4 className="text-base font-bold text-[#F5F7FA]">
                    Damodar Basin Command Center
                  </h4>
                </div>
              </div>

              <div className="text-xs text-[#98A4B3] leading-relaxed space-y-1 font-sans">
                <p>FLOODX Hydroinformatics Laboratory & Telemetry Grid</p>
                <p>River Research Institute Sector, Salt Lake / Howrah Station</p>
                <p className="font-mono text-[#00B7FF]">West Bengal, India • 700091</p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#00B7FF]/15 flex items-center justify-between text-[11px] font-mono text-[#98A4B3]">
                <span>Status: <strong className="text-emerald-400">OPERATIONAL</strong></span>
                <span>Response SLA: &lt;15m</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
