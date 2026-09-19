import React from 'react';
import {
  HeartPulse,
  PhoneCall,
  ShieldCheck,
  Building2,
  Lock,
  ExternalLink,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react';

export default function LandingFooter({ onNavigate }) {
  const handleNav = (view, role) => {
    if (onNavigate) {
      onNavigate(view, role);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      
      {/* Top Emergency Hotlines Strip */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              24/7 Rapid Emergency Response:
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Immediate triage for rare biologics, snakebite antivenoms & pediatric ICU shortages
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:18006335465"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>MedLink: 1-800-MED-LINK</span>
            </a>

            <a
              href="tel:18002221222"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Poison Control: 1-800-222-1222</span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Dispatch Latency &lt; 8 mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sitemap & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Purpose Column (Spans 2 on large) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  Med<span className="text-teal-400">Link</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Real-Time Medicine Availability & Emergency Network
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Connecting patients with verified medicine stock across 480+ licensed hospital and community pharmacies in real time. Backed by 2-hour shelf reservations, bi-directional ERP synchronization, and emergency fast-track logistics.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400 text-xs">
              <div className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold">System Status: Operational</span>
              </div>
              <span>•</span>
              <span className="font-mono text-slate-400">v2.4 Clinical Build</span>
            </div>
          </div>

          {/* Column 1: For Patients */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              For Patients
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('search')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Medicine Directory & Stock Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('patient', 'dashboard')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Patient Dashboard & Refills
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('patient', 'intake')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Clinical Patient Intake
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('search')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  2-Hour Shelf Reservation Token
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('search')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Generic Savings Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: For Pharmacies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Pharmacy Partners
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('pharmacy', 'portal')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Dispensary Counter Terminal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pharmacy', 'register')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Partner Onboarding & Licensure
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pharmacy', 'erp')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  ERP Connectors (SAP / Marg / Oracle)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pharmacy', 'holds')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  2-Hour Shelf-Hold Queue Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pharmacy', 'emergency')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Emergency Reserve Quarantine
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Regulators & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Regulators & Audit
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('admin', 'overview')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Regulatory Admin Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin', 'licensure')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  State Drug Control Licensure Check
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin', 'shortages')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Regional Shortage Heatmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin', 'formulary')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Master Formulary & Bioequivalence
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin', 'audit')}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Schedule H / H1 Tamper-Evident Logs
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Medical Disclaimers */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-4 text-slate-500 text-[11px] leading-relaxed">
          <p>
            <strong>Regulatory & Clinical Disclaimer:</strong> MedLink is a specialized healthcare coordination platform designed to surface verified real-time medicine availability, coordinate 2-hour reservations, and facilitate emergency courier dispatch between licensed pharmacies and patients. MedLink is not a dispensing pharmacy and does not replace professional medical advice, diagnosis, or prescription issuance. All prescription-only (Schedule H / Rx) medications strictly require verification of an active, valid medical practitioner’s prescription prior to physical dispense or courier handoff.
          </p>
          <p>
            <strong>Emergency Care Notice:</strong> If you or someone you are assisting is experiencing an acute, life-threatening medical emergency (such as myocardial infarction, acute stroke, respiratory arrest, or massive trauma), immediately dial emergency emergency medical services (911 or 108) or present directly to the closest emergency trauma room. Do not rely solely on electronic search platforms for immediate resuscitation interventions.
          </p>
        </div>

        {/* Copyright & Bottom Certifications */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} MedLink Health Systems Inc. All rights reserved. CDSCO Registered & HIPAA Certified.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">HIPAA & Security</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Bioequivalence Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
