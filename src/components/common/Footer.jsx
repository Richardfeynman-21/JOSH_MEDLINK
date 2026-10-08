import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, PhoneCall, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-slate-500 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-800 font-bold">
            <Link to="/" className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs hover:bg-teal-700 transition-colors">
              <HeartPulse className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-sm font-extrabold text-slate-900 block leading-tight">
                MedLink Healthcare Architecture
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                Intelligent Real-Time Medicine Availability, Pharmacy Coordination &amp; Emergency Drug Access
              </span>
            </div>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <Link to="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <Link to="/search" className="hover:text-teal-700 transition-colors">
              Medicine Search ⭐
            </Link>
            <Link to="/ocr-scanner" className="hover:text-teal-700 transition-colors">
              Optical Rx Scanner
            </Link>
            <Link to="/patient" className="hover:text-teal-700 transition-colors">
              Patient Portal
            </Link>
            <Link to="/pharmacy" className="hover:text-teal-700 transition-colors">
              Pharmacy Station
            </Link>
            <Link to="/admin" className="hover:text-rose-700 transition-colors">
              Admin Console
            </Link>
            <Link to="/emergency" className="text-rose-600 hover:text-rose-700 font-bold transition-colors">
              24/7 Trauma Protocol
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
              CDSCO &amp; Tamil Nadu Drug Control Validated
            </span>
            <span>•</span>
            <span>AES-256 GCM Medical Encryption</span>
            <span>•</span>
            <span>Schedule H Rx Verifications</span>
            <span>•</span>
            <span className="text-teal-700 font-bold font-mono">Tamil Nadu Central Health Node #TN-CHN-01</span>
          </div>
          <div className="font-mono">
            © 2026 MedLink Chennai Network. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
