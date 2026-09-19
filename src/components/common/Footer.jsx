import React from 'react';
import { ShieldCheck, HeartPulse, PhoneCall, ExternalLink } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-slate-500 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-800 font-bold">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-slate-900 block leading-tight">
                MedLink Healthcare Architecture
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                Intelligent Real-Time Medicine Availability, Pharmacy Coordination & Emergency Drug Access
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
            <button onClick={() => onNavigate('landing')} className="hover:text-teal-700 cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigate('search')} className="hover:text-teal-700 cursor-pointer">
              Medicine Search ⭐
            </button>
            <button onClick={() => onNavigate('patient')} className="hover:text-teal-700 cursor-pointer">
              Patient Portal
            </button>
            <button onClick={() => onNavigate('pharmacy')} className="hover:text-teal-700 cursor-pointer">
              Pharmacy Station
            </button>
            <button onClick={() => onNavigate('admin')} className="hover:text-rose-700 cursor-pointer">
              Admin Console
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span>HIPAA Compliant Protocol</span>
            <span>•</span>
            <span>AES-256 GCM Medical Encryption</span>
            <span>•</span>
            <span>DSCSA Batch Serialization</span>
            <span>•</span>
            <span className="text-teal-700 font-semibold">Metro Regional Network Node #CA-04</span>
          </div>
          <div>
            © 2026 MedLink Clinical Systems. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
