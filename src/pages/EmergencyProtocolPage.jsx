import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import {
  Flame,
  PhoneCall,
  ShieldAlert,
  Building2,
  Home,
  ChevronRight
} from 'lucide-react';

// Critical Emergency Drug Formulary for Chennai Trauma Network
const EMERGENCY_DRUGS = [
  {
    id: 'em-antivenom-poly',
    name: 'Polyvalent Snake Antivenom IP (10 ml)',
    category: 'Antivenom',
    indication: 'Cobra, Krait, Russell’s Viper Envenomation',
    schedule: 'Schedule H Emergency',
    storage: 'Cold-Chain (2°C – 8°C)',
    priority: 'CRITICAL',
    pharmacies: [
      { name: 'Apollo Pharmacy 24/7 (Greams Road)', distance: '0.8 km', stock: 14, phone: '+91 44 2829 0200' },
      { name: 'Kauvery Hospital Emergency (Alwarpet)', distance: '2.4 km', stock: 8, phone: '+91 44 4000 6000' },
      { name: 'MIOT Hospitals 24/7 (Manapakkam)', distance: '6.5 km', stock: 12, phone: '+91 44 4200 2288' }
    ]
  },
  {
    id: 'em-epipen-03',
    name: 'Epinephrine Auto-Injector 0.3 mg (EpiPen)',
    category: 'Anaphylaxis',
    indication: 'Severe Allergic Anaphylactic Shock & Airway Collapse',
    schedule: 'Schedule H Prescription',
    storage: 'Controlled 20°C – 25°C',
    priority: 'HIGH',
    pharmacies: [
      { name: 'Apollo Pharmacy 24/7 (T. Nagar)', distance: '1.2 km', stock: 6, phone: '+91 98401 24892' },
      { name: 'MedPlus 24/7 Dispensary (Anna Nagar)', distance: '4.8 km', stock: 4, phone: '+91 44 2621 1144' },
      { name: 'Kauvery Hospital Emergency (Alwarpet)', distance: '2.4 km', stock: 9, phone: '+91 44 4000 6000' }
    ]
  },
  {
    id: 'em-alteplase-50',
    name: 'Alteplase tPA Recombinant 50 mg IV',
    category: 'Thrombolytics',
    indication: 'Acute Ischemic Stroke (< 4.5 hrs window) & Massive PE',
    schedule: 'Schedule H1 ICU',
    storage: 'Cold-Chain (2°C – 8°C)',
    priority: 'CRITICAL',
    pharmacies: [
      { name: 'Apollo Hospitals Greams Road Dispensary', distance: '0.8 km', stock: 5, phone: '+91 44 2829 0200' },
      { name: 'Kauvery Hospital Emergency (Alwarpet)', distance: '2.4 km', stock: 3, phone: '+91 44 4000 6000' }
    ]
  },
  {
    id: 'em-naloxone-04',
    name: 'Naloxone Hydrochloride 0.4 mg/ml Injection',
    category: 'Opioid Antidote',
    indication: 'Complete or Partial Opioid Overdose Reversal',
    schedule: 'Schedule H',
    storage: 'Room Temp (< 25°C)',
    priority: 'HIGH',
    pharmacies: [
      { name: 'Fortis Malar Emergency (Adyar)', distance: '3.9 km', stock: 11, phone: '+91 44 4289 2222' },
      { name: 'Apollo Pharmacy 24/7 (T. Nagar)', distance: '1.2 km', stock: 18, phone: '+91 98401 24892' }
    ]
  }
];

export default function EmergencyProtocolPage() {
  const { showToast } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [reservedDrugs, setReservedDrugs] = useState({});

  const filteredDrugs = selectedCategory === 'ALL'
    ? EMERGENCY_DRUGS
    : EMERGENCY_DRUGS.filter((d) => d.category === selectedCategory);

  const handleInstantEmergencyHold = (drug, pharmacy) => {
    const holdCode = `EM-DISPATCH-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservedDrugs((prev) => ({
      ...prev,
      [drug.id]: { holdCode, pharmacyName: pharmacy.name, time: new Date().toLocaleTimeString() }
    }));
    showToast(
      `Instant Emergency Hold activated for ${drug.name} at ${pharmacy.name}. Token: ${holdCode}`,
      'clinical',
      'Trauma Fast-Track Locked'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      {/* Sleek Page Header with Brand Logo & Single Login Button */}
      <PageHeader
        breadcrumbs={[
          { label: 'Chennai Trauma Emergency Protocol' }
        ]}
        badge="State Protocol Active"
        badgeVariant="rose"
        actions={
          <a
            href="tel:108"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 108</span>
          </a>
        }
      />

      {/* Emergency Header Hero with Antigravity Glow */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-10 border border-rose-500/40 shadow-2xl relative overflow-hidden">
        <div 
          aria-hidden="true"
          className="absolute -right-20 -top-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-bold border border-rose-500/40">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping motion-reduce:animate-none" />
            <span>Tamil Nadu State Trauma Protocol Activated</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            24/7 Critical Trauma Drug &amp; Antidote Fast-Track
          </h1>

          <p className="text-sm text-rose-100 leading-relaxed">
            Zero-delay dispatch protocol for life-saving pharmaceuticals. Direct hotline connections to Apollo Greams Road, Kauvery Alwarpet, SIMS Vadapalani, and Tamil Nadu 108 Emergency Medical Services.
          </p>
        </div>
      </div>

      {/* Direct Emergency Quick-Dial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="tel:108"
          className="p-5 rounded-3xl bg-white border border-rose-200 hover:border-rose-400 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-3 group antigravity-float"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-wider">
              Ambulance &amp; EMS
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 block font-mono">108</span>
            <span className="text-xs text-slate-500 block mt-1">Tamil Nadu Emergency Response</span>
          </div>
        </a>

        <a
          href="tel:1066"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-3 group antigravity-float"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider">
              Apollo Trauma Hub
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-3xl font-black text-slate-900 block font-mono">1066</span>
            <span className="text-xs text-slate-500 block mt-1">Apollo Greams Road Emergency</span>
          </div>
        </a>

        <a
          href="tel:+914440006000"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-3 group antigravity-float"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
              Kauvery Emergency
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 block font-mono">044-4000 6000</span>
            <span className="text-xs text-slate-500 block mt-1">Kauvery Hospital Alwarpet</span>
          </div>
        </a>

        <a
          href="tel:1800425108"
          className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-3 group antigravity-float"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">
              Poison Control
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 block font-mono">1800-425-108</span>
            <span className="text-xs text-slate-500 block mt-1">TN Poison Information Centre</span>
          </div>
        </a>
      </div>

      {/* Critical Trauma Stock Locator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Chennai Real-Time ICU &amp; Antidote Stock
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live shelf hold tokens reserve emergency drugs instantly for courier or ambulance pick-up.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['ALL', 'Antivenom', 'Anaphylaxis', 'Thrombolytics', 'Opioid Antidote'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Drug Stock Cards */}
        <div className="space-y-4">
          {filteredDrugs.map((drug) => {
            const reservation = reservedDrugs[drug.id];

            return (
              <div
                key={drug.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90 space-y-4 hover:border-rose-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-200">
                        {drug.priority}
                      </span>
                      <span className="text-xs text-slate-500 font-mono font-medium">
                        {drug.schedule} • {drug.storage}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 mt-1">
                      {drug.name}
                    </h3>
                    <p className="text-xs text-slate-600">
                      Indication: {drug.indication}
                    </p>
                  </div>

                  {reservation && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-left sm:text-right shrink-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                        Locked for Dispatch:
                      </span>
                      <span className="text-xs font-mono font-black text-emerald-900 block">
                        {reservation.holdCode}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {reservation.pharmacyName} ({reservation.time})
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock across 24/7 pharmacies */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {drug.pharmacies.map((ph, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col justify-between space-y-2 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 text-xs">
                          <span className="font-bold text-slate-800 truncate">{ph.name.split('(')[0]}</span>
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                            {ph.stock} Units
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {ph.distance} away
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <a
                          href={`tel:${ph.phone.replace(/[^0-9+]/g, '')}`}
                          className="flex-1 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold text-center transition-colors flex items-center justify-center gap-1"
                        >
                          <PhoneCall className="w-3 h-3 text-slate-500" />
                          <span>Call Station</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleInstantEmergencyHold(drug, ph)}
                          className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-extrabold text-center transition-colors cursor-pointer shadow-2xs"
                        >
                          Lock 2-Hr Hold
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
