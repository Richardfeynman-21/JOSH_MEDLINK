import React, { useState } from 'react';
import {
  Search,
  Pill,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  MapPin,
  QrCode,
  Building2,
  Zap,
} from 'lucide-react';

export default function LandingHero({ onSearch, onNavigate }) {
  const [heroQuery, setHeroQuery] = useState('');

  // Popular medicine suggestion pills
  const SUGGESTION_PILLS = [
    { label: 'Augmentin 625 Duo', query: 'Augmentin', category: 'Antibiotic', stock: 'In Stock' },
    { label: 'Ventolin HFA', query: 'Ventolin', category: 'Respiratory', stock: 'In Stock' },
    { label: 'Lipitor 20mg', query: 'Lipitor', category: 'Cardiac', stock: 'In Stock' },
    { label: 'Januvia 100mg', query: 'Januvia', category: 'Diabetes', stock: 'In Stock' },
    { label: 'Lantus SoloStar', query: 'Lantus', category: 'Cold Chain', stock: 'Cold Chain' },
    { label: 'EpiPen 0.3mg', query: 'Epinephrine', category: 'Emergency', stock: 'Emergency' },
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const queryToUse = heroQuery.trim() || 'Lipitor';
    if (onSearch) {
      onSearch(queryToUse);
    } else if (onNavigate) {
      onNavigate('search');
    }
  };

  const handlePillClick = (query) => {
    setHeroQuery(query);
    if (onSearch) {
      onSearch(query);
    } else if (onNavigate) {
      onNavigate('search');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-slate-50 to-white pt-6 pb-16 lg:pb-24 border-b border-slate-200/80">
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl" />
        <div className="absolute top-12 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl" />
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-300/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Live Emergency Ticker & System Telemetry Bar */}
        <div className="mb-8 inline-flex flex-wrap items-center gap-2 p-1.5 pr-4 rounded-full bg-white border border-teal-200/80 shadow-xs text-xs font-semibold text-slate-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-600 text-white font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="tracking-wide uppercase text-[10px]">Live Telemetry</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-bold text-teal-900">24/7 Emergency Drug Access Active</span>
            <span className="text-slate-300">•</span>
            <span className="text-teal-700 font-semibold">480+ Pharmacies Online</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-slate-600">14,250+ Medicines Indexed</span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <span className="hidden md:inline text-emerald-700 font-semibold">99.4% Stock Accuracy</span>
          </div>
        </div>

        {/* Hero Grid: Two Columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, Quick Search, Pills, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Impactful Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Connecting Patients with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600">
                Verified Medicine Availability
              </span>{' '}
              in Real Time
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl">
              Eliminate frantic pharmacy visits and unanswered phone calls. MedLink directly
              integrates with local pharmacy ERPs to guarantee physical shelf stock, provide instant
              <span className="font-semibold text-slate-800"> 2-hour shelf reservations</span>, and mobilize 24/7 emergency drug dispatch.
            </p>

            {/* Hero Quick Search Bar Container */}
            <div className="pt-2">
              <form
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 bg-white rounded-2xl shadow-xl shadow-teal-950/5 border-2 border-teal-500/30 focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all flex flex-col sm:flex-row items-stretch gap-2"
              >
                <div className="flex-1 flex items-center gap-3 px-3">
                  <Search className="w-5 h-5 text-teal-600 shrink-0" />
                  <input
                    type="text"
                    value={heroQuery}
                    onChange={(e) => setHeroQuery(e.target.value)}
                    placeholder="Search by medicine name (e.g. Augmentin, Lipitor), generic salt, or ID..."
                    className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none"
                  />
                  {heroQuery && (
                    <button
                      type="button"
                      onClick={() => setHeroQuery('')}
                      className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2 py-1 rounded bg-slate-100 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md shadow-teal-600/30 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group shrink-0"
                >
                  <span>Search Stock</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Medicine Suggestion Pills */}
              <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Popular:
                </span>
                {SUGGESTION_PILLS.map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => handlePillClick(pill.query)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 hover:border-teal-300 font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>{pill.label}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        pill.stock === 'Cold Chain'
                          ? 'bg-cyan-100 text-cyan-800'
                          : pill.stock === 'Emergency'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {pill.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges Ribbon */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>2-Hour Shelf Hold Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>HIPAA & FHIR-HL7 Compliant</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>100% Verified Pharmacy Licenses</span>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate && onNavigate('search')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Pill className="w-4 h-4 text-teal-400" />
                <span>Open Full Medicine Directory</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('patient')}
                className="px-5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs sm:text-sm transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-teal-600" />
                <span>Patient Portal & Medical ID</span>
              </button>

              <a
                href="tel:18006335465"
                className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                <span>Emergency: 1-800-MED-LINK</span>
              </a>
            </div>

          </div>

          {/* Right Column: Live Clinical Telemetry Snapshot & Interactive Preview Card */}
          <div className="lg:col-span-5 relative">
            {/* Background glowing frame */}
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl" />

            <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-5">
              
              {/* Card Header: Live Network Feed */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
                    Live ERP Dispense Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-semibold border border-teal-200/60">
                  Node #482 Online
                </span>
              </div>

              {/* Sample Verified Stock Match Showcase */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                      Verified Stock Available
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                      Lipitor (Atorvastatin) 20 mg
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pfizer Inc. • NDC 0071-0155-23 • Strip of 10 Tablets
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 block leading-tight">₹198.50</span>
                    <span className="text-[10px] text-slate-400 line-through">MRP ₹235.00</span>
                  </div>
                </div>

                {/* Pharmacy Location & Real-Time Sync Indicator */}
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Green Cross 24/7 Pharmacy</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    <span>0.8 km away</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-200">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    142 Units in Stock
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    Synced 2 mins ago via Central ERP
                  </span>
                </div>
              </div>

              {/* Simulated 2-Hour Reservation Guarantee Token */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-900 to-slate-900 text-white space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-teal-300 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    2-Hour Shelf-Hold Active
                  </span>
                  <span className="font-mono text-[11px] text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded">
                    01:54:18 Remaining
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Encrypted Reservation Token
                    </span>
                    <span className="text-sm font-mono font-black text-white tracking-widest">
                      RES-8849-LIVE
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
                    <QrCode className="w-6 h-6" />
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-white/10">
                  <span>Medicine pulled & held behind counter</span>
                  <span className="text-emerald-400 font-semibold">100% Guaranteed</span>
                </div>
              </div>

              {/* Bioequivalence Switcher Teaser Micro-bar */}
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Generic Equivalent Available: <strong>Atorva 20</strong></span>
                </div>
                <span className="font-bold text-emerald-700 bg-white px-2 py-0.5 rounded shadow-2xs">
                  Save 60% (₹79.40)
                </span>
              </div>

              {/* Call-to-action button inside card */}
              <button
                onClick={() => {
                  if (onSearch) onSearch('Lipitor');
                  else if (onNavigate) onNavigate('search');
                }}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Explore Verified Availability Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
