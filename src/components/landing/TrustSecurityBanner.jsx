import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  PhoneCall,
  CheckCircle2,
  FileCheck,
  Award,
  ExternalLink,
  Copy,
  Check,
  Building2,
  HeartPulse,
} from 'lucide-react';

export default function TrustSecurityBanner() {
  const [copiedNumber, setCopiedNumber] = useState(false);

  const handleCopyHotline = () => {
    navigator.clipboard?.writeText('1-800-633-5465');
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const TRUST_PILLARS = [
    {
      title: 'HIPAA & 256-Bit Medical Encryption',
      desc: 'All health records, patient IDs, and prescription attachments are encrypted at rest with AES-256 and transmitted exclusively over TLS 1.3 tunnels.',
      icon: Lock,
      badge: 'ISO-27001 & SOC-2',
    },
    {
      title: 'Mandatory Pharmacy Licensure Verification',
      desc: 'Every dispensing location is dynamically validated against State Drug Control databases. Facilities with expired or contested licenses are auto-quarantined.',
      icon: FileCheck,
      badge: 'Form 20/21B Compliant',
    },
    {
      title: '24/7 Clinical Emergency Hotline',
      desc: 'Connect with on-duty clinical pharmacists within 30 seconds for critical drug shortages, pediatric dosage reconciliations, and hospital transfers.',
      icon: PhoneCall,
      badge: 'Toll-Free 24/7 Access',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Institutional Trust & Regulatory Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Safety, Security & Uncompromised Clinical Standards
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            MedLink operates under the strictest healthcare privacy protocols and statutory drug authority mandates.
          </p>
        </div>

        {/* 3 Main Institutional Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-white/5 hover:bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-600/20 border border-teal-500/30 text-teal-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-teal-300">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified & Active</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated 24/7 Clinical Emergency Callout Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-teal-950/80 border-2 border-rose-500/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>Priority Clinical Drug Access Desk</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              Life-Threatening Medication Shortage or Trauma Triage?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Our clinical response desk mobilizes emergency hospital transfers, antivenom reserves, and critical ICU supplies across the state network.
            </p>
          </div>

          {/* Hotline Action Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="tel:18006335465"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-black text-sm transition-colors shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 1-800-MED-LINK</span>
            </a>

            <button
              onClick={handleCopyHotline}
              className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
              title="Copy phone number to clipboard"
            >
              {copiedNumber ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Number</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Institutional Accreditation Logos / Badges Strip */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-around gap-6 text-slate-400 text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            HIPAA HITECH Certified
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-teal-400" />
            ISO/IEC 27001 Security
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            CDSCO & US-FDA Formulary Sync
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-teal-400" />
            256-Bit SHA End-to-End Vault
          </span>
        </div>

      </div>
    </section>
  );
}
