import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

export const EmergencyBanner = () => {
  return (
    <aside 
      aria-label="24/7 Emergency Drug Protocol"
      className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 text-white px-4 py-1.5 text-xs font-semibold shadow-inner border-b border-rose-800/40 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
          <span className="w-2 h-2 rounded-full bg-white animate-ping motion-reduce:animate-none" aria-hidden="true" />
          <span className="font-extrabold uppercase tracking-wider">Chennai Emergency Drug Protocol Active</span>
          <span className="hidden md:inline text-rose-100 font-normal">| Trauma ICU Fast-Track &amp; Snake Antivenom Stocks</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/emergency"
            className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3 h-3 text-rose-200" aria-hidden="true" />
            <span>Trauma Stock Locator</span>
            <ArrowRight className="w-2.5 h-2.5" aria-hidden="true" />
          </Link>
          <a
            href="tel:108"
            className="inline-flex items-center gap-1.5 bg-white text-rose-900 hover:bg-rose-50 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold transition-colors shadow-2xs"
            title="Call Tamil Nadu 108 Emergency Ambulance"
          >
            <PhoneCall className="w-3 h-3 text-rose-600" aria-hidden="true" />
            <span>Tamil Nadu 108 Emergency</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
