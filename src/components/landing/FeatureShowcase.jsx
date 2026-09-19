import React, { useState } from 'react';
import {
  RefreshCw,
  Clock,
  AlertTriangle,
  Zap,
  CheckCircle2,
  XCircle,
  QrCode,
  ShieldCheck,
  Building2,
  TrendingDown,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Truck,
  PhoneOff,
  Database,
  Sliders,
} from 'lucide-react';

export default function FeatureShowcase({ onNavigate, onQuickSearch }) {
  // Active pillar tab: 'erp_sync' | 'shelf_hold' | 'emergency_track' | 'generic_switcher'
  const [activePillar, setActivePillar] = useState('erp_sync');

  // Generic switcher interactive state (monthly strips slider)
  const [stripCount, setStripCount] = useState(2);

  const PILLARS = [
    {
      id: 'erp_sync',
      title: 'Real-Time ERP Stock',
      shortDesc: 'Live POS & warehouse sync eliminates frantic phone calls.',
      icon: RefreshCw,
      badge: 'Zero Phone Tag',
    },
    {
      id: 'shelf_hold',
      title: '2-Hour Shelf-Hold',
      shortDesc: 'Guaranteed physical reservation prevents walking in empty-handed.',
      icon: Clock,
      badge: 'Guaranteed Availability',
    },
    {
      id: 'emergency_track',
      title: 'Emergency Fast-Track',
      shortDesc: 'Instant priority routing for antivenoms, biologics & ICU drugs.',
      icon: AlertTriangle,
      badge: 'Life-Saving Priority',
    },
    {
      id: 'generic_switcher',
      title: 'Smart Generic Switcher',
      shortDesc: 'FDA & CDSCO bioequivalent alternatives save up to 60%.',
      icon: Zap,
      badge: 'Cost Savings',
    },
  ];

  // Calculated generic savings
  const brandPricePerStrip = 198.50; // Lipitor
  const genericPricePerStrip = 79.40; // Atorva
  const brandTotal = (brandPricePerStrip * stripCount).toFixed(2);
  const genericTotal = (genericPricePerStrip * stripCount).toFixed(2);
  const monthlySavings = (brandTotal - genericTotal).toFixed(2);
  const annualSavings = (monthlySavings * 12).toFixed(2);

  return (
    <section id="features-section" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Core Value Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Engineered for Clinical Precision & Human Urgency
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Every layer of the MedLink platform is built to solve systemic failures in acute pharmaceutical procurement and patient access.
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 ring-2 ring-teal-600'
                    : 'bg-transparent text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {pillar.badge}
                  </span>
                </div>
                <div>
                  <h3 className={`text-sm font-black ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.title}
                  </h3>
                  <p
                    className={`text-xs line-clamp-2 mt-0.5 ${
                      isActive ? 'text-teal-100' : 'text-slate-500'
                    }`}
                  >
                    {pillar.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Display */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 transition-all duration-300">
          
          {/* Pillar 1: Real-Time ERP Inventory Sync */}
          {activePillar === 'erp_sync' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  ERP & POS Telemetry
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Never Call 10 Pharmacies in a Frantic Panic Again
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Traditional medicine search requires calling dispensary after dispensary, only to be put on hold or arrive at the store after the last box was sold.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  MedLink's <strong>FHIR-HL7 Bi-Directional Connector</strong> ties directly into local pharmacy POS terminals (SAP, Oracle, Marg, Tally). As soon as a cashier scans a barcode at checkout, our system updates the available stock in milliseconds.
                </p>

                <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Live unit count verification (not outdated daily batch snapshots)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Exact batch expiry and cold-chain temperature compliance logged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Cross-regional visibility spanning 480+ verified neighborhood stores</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate && onNavigate('search')}
                    className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Try Live Stock Search Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visual Interactive Comparison Card */}
              <div className="lg:col-span-6 space-y-4">
                {/* Traditional Process (Red / Negative) */}
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                    <span className="flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Traditional Process: Frantic Calling
                    </span>
                    <span className="font-mono text-rose-600 font-extrabold">~45 Mins Wasted</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Patient calls 6 pharmacies while stuck in traffic. Pharmacist says "we have 1 box", but by the time the patient drives 4km, another walk-in customer already purchased it.
                  </p>
                </div>

                {/* MedLink Process (Teal / Positive) */}
                <div className="p-5 rounded-2xl bg-teal-50 border-2 border-teal-500/40 space-y-3 shadow-md">
                  <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                      MedLink Live ERP Sync
                    </span>
                    <span className="font-mono text-teal-700 font-extrabold">Instant &lt; 2s</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-teal-200 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Green Cross 24/7 Pharmacy</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                        142 Units in Stock
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Database className="w-3 h-3 text-teal-600" />
                        SAP Pharma Gateway Sync
                      </span>
                      <span className="font-mono text-teal-700 font-semibold">Verified 1 min ago</span>
                    </div>
                  </div>

                  <div className="text-xs text-teal-900 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Physical box immediately pulled & locked for 2 hours with 1 tap.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 2: 2-Hour Shelf-Hold Guarantee */}
          {activePillar === 'shelf_hold' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Guaranteed Counter Lock
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Your Medicine Is Held Before You Even Start the Car
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Nothing is more distressing than rushing across town during a medical emergency only to find out the requested drug was sold 5 minutes before your arrival.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  With MedLink’s <strong>2-Hour Shelf-Hold Guarantee</strong>, reserving a medicine transmits an encrypted priority alert to the pharmacy terminal. The pharmacist physically takes the drug off the shelf, affixes your reservation barcode, and stores it in the dedicated MedLink hold bin.
                </p>

                <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Digital QR token for zero-friction scan-and-go pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>No advance payment needed for initial 2-hour physical hold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Real-time countdown timer ensures peace of mind during transit</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate && onNavigate('search')}
                    className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Medication for 2 Hours</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visual Interactive 2-Hour Reservation Token Demo */}
              <div className="lg:col-span-6">
                <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-teal-500/30 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-black uppercase tracking-wider text-teal-300">
                        Shelf Reservation Active
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-md">
                      01:58:42 Remaining
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                        Patient Hold Token
                      </span>
                      <div className="text-2xl font-mono font-black text-white tracking-wider">
                        MED-2026-8849
                      </div>
                      <span className="text-xs text-teal-300 font-semibold mt-1 block">
                        Augmentin 625 Duo (Strip of 10)
                      </span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0">
                      <QrCode className="w-12 h-12 text-slate-900" />
                    </div>
                  </div>

                  <div className="p-3.5 bg-white/10 rounded-2xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Dispensary:</span>
                      <strong className="text-white">Apollo Central SuperSpecialty</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Physical Shelf Status:</span>
                      <strong className="text-emerald-400">Locked in Bin #B-04</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Total to pay at counter:</span>
                      <strong className="text-white font-mono">₹201.20</strong>
                    </div>
                  </div>

                  <div className="text-center text-[11px] text-slate-400">
                    Simply show this QR code at the dispensary counter for instant dispensing.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 3: Emergency & Critical Care Fast-Track */}
          {activePillar === 'emergency_track' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>24/7 Critical Care Corridor</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Direct Coordination for Rare Biologics, Antivenoms & ICU Drugs
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  In acute trauma, anaphylaxis, snakebite envenomation, or ICU decompensation, minutes matter. MedLink operates a dedicated <strong>Critical Care Fast-Track Corridor</strong> connecting Level 1 trauma centers and specialized regional drug depots.
                </p>

                <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Instant priority dispatch for Polyvalent Snake Antivenom & Rabies Immunoglobulin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Cold-chain validated temperature telemetry (2°C - 8°C) logged continuously</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Direct phone hotline to on-duty clinical pharmacist: <strong>1-800-MED-LINK</strong></span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="tel:18006335465"
                    className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Emergency Hotline: 1-800-MED-LINK</span>
                  </a>
                  <button
                    onClick={() => {
                      if (onQuickSearch) onQuickSearch('Emergency');
                      else if (onNavigate) onNavigate('search');
                    }}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    View Emergency Drug Registry
                  </button>
                </div>
              </div>

              {/* Visual Emergency Stock Telemetry Table */}
              <div className="lg:col-span-6 space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-lg space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800 uppercase tracking-wider">
                      Regional Emergency Depot Reserves
                    </span>
                    <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-mono">
                      Priority Corridor Open
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Item 1 */}
                    <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200/80 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 block">Polyvalent Snake Antivenom (Liquid)</strong>
                        <span className="text-[11px] text-slate-500">Serum Institute • Cold-chain (2-8°C)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-rose-700 font-extrabold block">24 Vials Held</span>
                        <span className="text-[10px] text-slate-500">Dispatch in 8 mins</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 block">EpiPen 0.3mg (Epinephrine Auto-Injector)</strong>
                        <span className="text-[11px] text-slate-500">Viatris • Anaphylaxis Fast-Track</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-700 font-extrabold block">18 Units Ready</span>
                        <span className="text-[10px] text-slate-500">24/7 Dispatch</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 block">Human Albumin 20% Infusion (100 ml)</strong>
                        <span className="text-[11px] text-slate-500">Baxter • ICU Shock / Hypovolemia</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-700 font-extrabold block">36 Bottles Ready</span>
                        <span className="text-[10px] text-slate-500">Hospital Reserve</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                    <span>Monitored 24/7 by State Emergency Medical Grid</span>
                    <span className="font-bold text-teal-700">0 Shortages Today</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pillar 4: Smart Generic Bio-Equivalence Switcher */}
          {activePillar === 'generic_switcher' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Therapeutic Equivalence & Affordability
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Verified CDSCO & FDA Bioequivalent Substitutes Save Up to 60%
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Patients often pay inflated brand-name markups simply because they aren't informed about identical, clinically certified generic alternatives.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  MedLink's clinical engine checks active pharmaceutical ingredients (API), peak bioavailability (Cmax), and therapeutic indices to provide certified bioequivalent options with full pricing transparency.
                </p>

                <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Identical active chemical molecule, potency, and route of administration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct savings calculated instantly before you purchase or reserve</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full physician and pharmacist compliance guidelines displayed</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onQuickSearch) onQuickSearch('Lipitor');
                      else if (onNavigate) onNavigate('search');
                    }}
                    className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Compare Generics in Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Interactive Generic Savings Calculator Widget */}
              <div className="lg:col-span-6">
                <div className="p-6 rounded-3xl bg-emerald-50/60 border-2 border-emerald-500/40 space-y-5 shadow-lg">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                    <div>
                      <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">
                        Interactive Savings Calculator
                      </span>
                      <h4 className="text-base font-black text-slate-900">
                        Lipitor 20mg vs. Atorva 20 (Generic)
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-black text-xs">
                      Save 60%
                    </span>
                  </div>

                  {/* Quantity Slider */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Monthly Dosage Required:</span>
                      <span className="text-teal-800 font-mono text-sm">
                        {stripCount} {stripCount === 1 ? 'Strip (10 tabs)' : 'Strips (20 tabs)'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="6"
                      value={stripCount}
                      onChange={(e) => setStripCount(Number(e.target.value))}
                      className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>1 Strip (10 days)</span>
                      <span>3 Strips (1 month)</span>
                      <span>6 Strips (2 months)</span>
                    </div>
                  </div>

                  {/* Pricing Comparison Grid */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                      <span className="text-[11px] text-slate-400 font-semibold uppercase block">
                        Brand Name (Lipitor)
                      </span>
                      <span className="text-xl font-black text-slate-900 font-mono mt-1 block">
                        ₹{brandTotal}
                      </span>
                      <span className="text-[10px] text-slate-500">₹198.50 / strip</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-emerald-600 text-white shadow-md">
                      <span className="text-[11px] text-emerald-100 font-semibold uppercase block">
                        Certified Generic (Atorva)
                      </span>
                      <span className="text-xl font-black text-white font-mono mt-1 block">
                        ₹{genericTotal}
                      </span>
                      <span className="text-[10px] text-emerald-200">₹79.40 / strip</span>
                    </div>
                  </div>

                  {/* Savings Summary Banner */}
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Calculated Annual Savings:</span>
                      <span className="text-emerald-700 font-black text-base font-mono">
                        ₹{annualSavings} saved / year
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-1 rounded">
                      Bioequivalence: 98.4% Cmax
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
