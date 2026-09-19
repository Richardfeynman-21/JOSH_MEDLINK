import React from 'react';
import { PhoneCall, AlertTriangle, ShieldCheck } from 'lucide-react';

export const EmergencyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 text-white px-4 py-1.5 text-xs font-semibold shadow-inner border-b border-rose-800/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="font-extrabold uppercase tracking-wider">Emergency Drug Protocol Active</span>
          <span className="hidden md:inline text-rose-100 font-normal">| Universal O-Negative Blood & Anaphylaxis Fast-Track</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:18006335465"
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>24/7 Emergency Hotline: 1-800-MED-LINK</span>
          </a>
          <span className="text-rose-200 hidden lg:inline">HIPAA Certified</span>
        </div>
      </div>
    </div>
  );
};
