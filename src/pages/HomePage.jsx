import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Snowflake,
  Sparkles,
  User,
  Building2,
  ShieldAlert,
  Flame,
  Scan,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { loginDemoPatient, loginDemoPharmacy, loginDemoAdmin } = useAuth();
  const [heroSearchQuery, setHeroSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION WITH SPATIAL AMBIENT DEPTH */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-4 sm:mx-6 lg:mx-8 rounded-3xl border border-white/10 shadow-2xl">
        {/* Antigravity Ambient Spatial Backdrop Glows */}
        <div 
          aria-hidden="true"
          className="absolute -top-32 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"
        />
        <div 
          aria-hidden="true"
          className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse motion-reduce:animate-none" />
              <span>Chennai Central Health Grid Active • Real-Time Dispensary Telemetry</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Instant Medicine Availability &amp; Pharmacy Coordination.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Eliminate emergency drug shortages across Greater Chennai. Query live stock at Apollo Greams Road, Kauvery, SIMS and regional dispensaries with guaranteed 2-hour shelf holds and AI OCR prescription extraction.
            </p>

            {/* Live Interactive Search Box */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-2xl">
              <div className="relative flex items-center shadow-2xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 focus-within:ring-2 focus-within:ring-teal-400 focus-within:border-teal-400 transition-all">
                <Search className="w-5 h-5 text-teal-400 ml-3.5 shrink-0" aria-hidden="true" />
                <input
                  type="text"
                  value={heroSearchQuery}
                  onChange={(e) => setHeroSearchQuery(e.target.value)}
                  placeholder="Search medicine (e.g., Lipitor, Augmentin, Dolo 650, Telma 40)…"
                  className="w-full bg-transparent border-0 px-3 py-3 text-white placeholder-slate-400 text-sm focus:outline-none"
                  aria-label="Search medicine availability"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Search Stock</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/search"
                className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-lg shadow-teal-600/30 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search Live Medicine Availability ⭐</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>

              <Link
                to="/ocr-scanner"
                className="px-4 py-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 font-bold text-xs border border-cyan-400/40 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Scan className="w-4 h-4 text-cyan-400" />
                <span>AI Prescription Scanner</span>
              </Link>

              <Link
                to="/emergency"
                className="px-4 py-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 font-bold text-xs border border-rose-400/40 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-rose-400" />
                <span>24/7 Trauma SOS</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" aria-hidden="true" />
                <span>CDSCO &amp; TN Drug Control Validated</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" aria-hidden="true" />
                <span>HIPAA Encrypted Patient Records</span>
              </div>
              <div className="flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <span>Cold-Chain 2°C–8°C Temperature Telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHENNAI METRICS TELEMETRY RIBBON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center antigravity-float">
            <span className="text-3xl sm:text-4xl font-black text-teal-600 block tabular-nums">99.8%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Live Stock Accuracy
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center antigravity-float">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 block tabular-nums">&lt; 15 min</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Trauma Drug Dispatch
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center antigravity-float">
            <span className="text-3xl sm:text-4xl font-black text-emerald-600 block tabular-nums">60%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Bioequivalent Savings
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center antigravity-float">
            <span className="text-3xl sm:text-4xl font-black text-rose-600 block tabular-nums">2-Hour</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">
              Guaranteed Shelf Hold
            </span>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED ROLE-BASED PORTALS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Multi-Role Clinical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Three Dedicated Operating Portals
          </h2>
          <p className="text-sm text-slate-500">
            Strict role separation for patients, licensed pharmacy dispensaries, and supreme regulatory admin authorities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {/* PORTAL 1: PATIENT */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-teal-500 transition-all flex flex-col justify-between space-y-6 group antigravity-float">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <User className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  Clinical Intake &amp; Passport
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
                type="button"
                onClick={() => {
                  loginDemoPatient();
                  navigate('/patient');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Demo Patient: Kavitha Sundaram (O-)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/patient"
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 text-center"
                >
                  <span>Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/auth?role=patient&mode=login"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 text-center"
                >
                  <span>Sign In / Reg</span>
                </Link>
              </div>
            </div>
          </div>

          {/* PORTAL 2: PHARMACY */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between space-y-6 group antigravity-float">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Dispensary ERP &amp; Coordination
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
                type="button"
                onClick={() => {
                  loginDemoPharmacy();
                  navigate('/pharmacy');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Demo Pharmacy: Apollo (T. Nagar)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/pharmacy"
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 text-center"
                >
                  <span>Workstation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/auth?role=pharmacy&mode=login"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 text-center"
                >
                  <span>Pharmacy Login</span>
                </Link>
              </div>
            </div>
          </div>

          {/* PORTAL 3: ADMIN */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-rose-500 transition-all flex flex-col justify-between space-y-6 group antigravity-float">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  Regulatory Board &amp; Telemetry
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
                type="button"
                onClick={() => {
                  loginDemoAdmin();
                  navigate('/admin');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Demo Admin: Dr. R. Sundararajan</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/admin"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 text-center"
                >
                  <span>Admin Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/auth?role=admin&mode=login"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 text-center"
                >
                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI OPTICAL PRESCRIPTION SCANNER PROMO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-teal-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono font-bold border border-teal-500/40">
              <Scan className="w-3.5 h-3.5" />
              <span>Optical Character Recognition (OCR)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Scan Your Doctor&apos;s Prescription Instantly
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upload handwritten or digital doctor prescriptions from Apollo, Kauvery, or SIMS. Our AI extracts medicine names, dosages, and Schedule H compliance, cross-referencing live Chennai dispensary inventory in seconds.
            </p>
            <div className="pt-2">
              <Link
                to="/ocr-scanner"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/25 transition-transform"
              >
                <Scan className="w-4 h-4" />
                <span>Launch Fullscreen Rx Scanner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
