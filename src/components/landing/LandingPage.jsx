import React from 'react';
import { 
  HeartPulse, 
  Search, 
  Pill, 
  Building2, 
  ShieldAlert, 
  Activity, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Snowflake, 
  User,
  Users, 
  ShieldCheck, 
  Truck, 
  Lock,
  PhoneCall,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LandingPage = ({ onNavigate }) => {
  const { loginDemoPatient, loginDemoPharmacy, loginDemoAdmin } = useAuth();

  return (
    <div className="space-y-16 py-8 animate-fadeIn">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-teal-800/30">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            {/* Ticker Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Clinical Healthcare Network</span>
              <span className="text-teal-300 font-normal">| 2026 Edition</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Real-Time Medicine Availability & Emergency Drug Access
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              MedLink synchronizes patient electronic health records, 24/7 retail pharmacy ERP inventory, and trauma-level emergency protocols into an intelligent, unified digital network.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('search')}
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search Live Medicine Availability ⭐</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('patient')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors cursor-pointer"
              >
                Patient Emergency Portal
              </button>

              <button
                onClick={() => onNavigate('pharmacy')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors cursor-pointer"
              >
                Pharmacy Workstation
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>CDSCO & FDA Validated</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>HIPAA Encrypted Records</span>
              </div>
              <div className="flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-blue-400" />
                <span>Cold-Chain 2°C-8°C Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS TELEMETRY RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-teal-600 block">99.8%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Live Stock Accuracy
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 block">&lt; 15 min</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Trauma Drug Dispatch
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 block">60%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Bio-Equivalent Savings
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
            <span className="text-3xl sm:text-4xl font-black text-rose-600 block">2-Hour</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Guaranteed Shelf Hold
            </span>
          </div>
        </div>
      </section>

      {/* 3 LOGIN TYPES & ROLE-BASED PORTALS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Multi-Role Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Three Dedicated Clinical Operating Portals
          </h2>
          <p className="text-sm text-slate-500">
            Engineered with strict role separation for patients, licensed pharmacy dispensaries, and supreme regulatory admin authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* PORTAL 1: PATIENT */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-teal-500 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  Clinical Intake & Passport
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Patient Portal</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Digital emergency medical ID with Universal O-Negative badge, severe allergy alerts, one-click prescription refills, and live shelf-hold tokens.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>EMT Scannable QR ID Matrix</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>2-Hour Guaranteed Shelf Holds</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>One-Click Home Delivery Refills</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  loginDemoPatient();
                  onNavigate('patient');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Demo Patient: Sarah Jenkins (O-)</span>
              </button>

              <button
                onClick={() => onNavigate('patient')}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Patient Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* PORTAL 2: PHARMACY */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Dispensary ERP & Coordination
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Pharmacy Portal</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Real-time stock management with live search sync, 2-hour reservation shelf bays, cold-chain courier dispatch, and store operational settings.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real-Time Inline Stock Editor</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2-Hour Countdown Hold Queue</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Emergency / ICU Drug Quarantining</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  loginDemoPharmacy();
                  onNavigate('pharmacy');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Demo Pharmacy: Green Cross 24/7</span>
              </button>

              <button
                onClick={() => onNavigate('pharmacy')}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Pharmacy Station</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* PORTAL 3: ADMIN */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-rose-500 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Regulatory Board & Telemetry
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">Admin Portal</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  5 supreme control tabs: pharmacy licensing approvals, patient oversight, pharmacy station telemetry, master formulary, and immutable audit logs.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>State Board Licensure Review</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Central Formulary Price Ceilings</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Real-Time Cryptographic Event Stream</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  loginDemoAdmin();
                  onNavigate('admin');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Demo Admin: Dr. Christopher Cole</span>
              </button>

              <button
                onClick={() => onNavigate('admin')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Admin Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REAL-TIME STATE COORDINATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-500/30">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-widest">
              Live State Synchronization Active
            </span>
            <h3 className="text-2xl font-black" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Instant Cross-Portal Reactivity
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
              When a pharmacy adjusts inventory in their Pharmacy Portal, or Admin approves a new pharmacy, the change propagates instantly to Medicine Search results and Admin oversight dashboards without requiring page reloads.
            </p>
          </div>

          <button
            onClick={() => onNavigate('search')}
            className="px-6 py-3 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-black text-xs shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            Try Live Search Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
