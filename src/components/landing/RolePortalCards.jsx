import React, { useState } from 'react';
import {
  User,
  Building2,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  QrCode,
  Truck,
  Activity,
  FileText,
  AlertTriangle,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  X,
  Lock,
} from 'lucide-react';

export default function RolePortalCards({ onNavigate }) {
  // Modal state for previewing Pharmacy Partner or Admin specifications
  const [activeModal, setActiveModal] = useState(null); // 'pharmacy_partner' | 'admin_oversight' | null

  const handleAction = (view, role) => {
    if (onNavigate) {
      onNavigate(view, role);
    }
  };

  return (
    <section id="portals-section" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Three Dedicated Portals • One Integrated Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tailored Workflows for Every Healthcare Stakeholder
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            Whether you are a patient seeking urgent prescription drugs, a community dispensary managing real-time inventory, or a health regulator auditing drug supply integrity.
          </p>
        </div>

        {/* 3 Role Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Patient Portal */}
          <div className="flex flex-col bg-slate-50/70 hover:bg-white rounded-3xl border-2 border-teal-500/30 hover:border-teal-600 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 p-6 sm:p-8 relative group">
            <div className="absolute top-0 right-0 transform translate-y-4 -translate-x-4">
              <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-[10px] font-extrabold uppercase tracking-wide">
                Direct Patient Access
              </span>
            </div>

            {/* Portal Badge & Icon */}
            <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 mb-6 group-hover:scale-105 transition-transform">
              <User className="w-7 h-7" />
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                For Patients & Caregivers
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Patient Portal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instant medicine availability search, guaranteed 2-hour shelf holds, digital emergency medical ID, and doorstep courier delivery.
              </p>
            </div>

            {/* Feature Highlights */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Find Medicines in 2 Clicks:</strong> Real-time unit counts across 480+ local pharmacies.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>2-Hour Shelf-Hold Guarantee:</strong> Physical shelf lock with QR reservation token.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <QrCode className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Digital Emergency Medical ID:</strong> Immediate first-responder access to blood type and allergy profiles.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>30-Minute Courier Delivery:</strong> Express temperature-controlled dispatch for critical treatments.</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <button
                onClick={() => handleAction('patient', 'dashboard')}
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <span>Enter Patient Portal</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAction('search')}
                  className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-teal-600" />
                  <span>Search Stock</span>
                </button>
                <button
                  onClick={() => handleAction('patient', 'intake')}
                  className="py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Intake</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Pharmacy Partner Portal */}
          <div className="flex flex-col bg-slate-50/70 hover:bg-white rounded-3xl border-2 border-cyan-500/30 hover:border-cyan-600 hover:shadow-xl hover:shadow-cyan-900/5 transition-all duration-300 p-6 sm:p-8 relative group">
            <div className="absolute top-0 right-0 transform translate-y-4 -translate-x-4">
              <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-extrabold uppercase tracking-wide">
                480+ Pharmacies Active
              </span>
            </div>

            {/* Portal Badge & Icon */}
            <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-600/20 mb-6 group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider block">
                For Community & Hospital Dispensaries
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Pharmacy Partner Portal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect your pharmacy ERP to eliminate phone inquiries, streamline counter holds, and reserve emergency ICU drug allocations.
              </p>
            </div>

            {/* Feature Highlights */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Zero-Friction ERP Sync:</strong> Live two-way integration with SAP, Marg, Oracle Health & Tally.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>2-Hour Reservation Desk:</strong> Barcode check-in for reserved medicines with zero counter bottleneck.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Emergency & ICU Ring-Fencing:</strong> Quarantine critical antidotes & trauma drugs for priority cases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Activity className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <span><strong>Expanded Patient Reach:</strong> Turn searching patients in your district into verified dispensed orders.</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('pharmacy', 'portal');
                  else setActiveModal('pharmacy_partner');
                }}
                className="w-full py-3 px-4 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm shadow-md shadow-cyan-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <span>Enter Pharmacy Portal</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveModal('pharmacy_partner')}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border border-cyan-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
                <span>Partner Registration & ERP Specs</span>
              </button>
            </div>
          </div>

          {/* Card 3: Regulatory & Healthcare Admin Portal */}
          <div className="flex flex-col bg-slate-50/70 hover:bg-white rounded-3xl border-2 border-slate-400/30 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 p-6 sm:p-8 relative group">
            <div className="absolute top-0 right-0 transform translate-y-4 -translate-x-4">
              <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 text-[10px] font-extrabold uppercase tracking-wide">
                Regulatory Grade
              </span>
            </div>

            {/* Portal Badge & Icon */}
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/20 mb-6 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7 text-teal-400" />
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                For Health Authorities & Regulators
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Regulatory Admin Portal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Supervise state pharmacy licenses, audit Schedule H controlled substances, track drug shortage heatmaps, and govern formulary bioequivalence.
              </p>
            </div>

            {/* Feature Highlights */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <span><strong>License Verification & Approvals:</strong> Automated cross-checks with State Drug Control registries.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <span><strong>Controlled Drug Audit Trails:</strong> Tamper-evident logging for Schedule H, H1 & X narcotics.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Activity className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <span><strong>Drug Shortage Heatmap:</strong> Real-time regional stockpile alerts for antibiotics & pediatric syrups.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <span><strong>Master Formulary Governance:</strong> US-FDA & CDSCO generic equivalence matching database.</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('admin', 'overview');
                  else setActiveModal('admin_oversight');
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md shadow-slate-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <span>Enter Admin Portal</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setActiveModal('admin_oversight')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>Compliance & Audit Protocols</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Modal: Pharmacy Partner Details / Registration Dialog */}
      {activeModal === 'pharmacy_partner' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider">Pharmacy Partner Network</span>
                <h3 className="text-xl font-black text-slate-900">Partner Registration & ERP Integration</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Connect your community or hospital pharmacy to MedLink's real-time medicine network in 3 straightforward steps:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">State Drug License Verification</h4>
                  <p className="text-xs text-slate-500">Provide your Form 20 or Form 21B Retail Drug License number for automated CDSCO validation.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">15-Minute ERP Plug-in</h4>
                  <p className="text-xs text-slate-500">Supported native connectors: SAP Pharma, Oracle Health, Marg ERP, CIMS, and Tally Prime.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Activate 2-Hour Reservation Desk</h4>
                  <p className="text-xs text-slate-500">Receive instant push notifications when patients reserve stock, with one-touch barcode release.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveModal(null);
                  if (onNavigate) onNavigate('pharmacy', 'register');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm shadow-md transition-colors"
              >
                Proceed to Partner Registration
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal: Regulatory Admin / Compliance Dialog */}
      {activeModal === 'admin_oversight' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Regulatory Control Center</span>
                <h3 className="text-xl font-black text-slate-900">Compliance, Licensure & Audit Telemetry</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              MedLink enforces strict compliance protocols in accordance with CDSCO (Drugs and Cosmetics Act) and US-FDA 21 CFR Part 11:
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-semibold">Automated License Revocation Check</span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Active (Every 24h)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-semibold">Schedule H1 Electronic Register</span>
                <span className="text-teal-700 font-bold bg-teal-100 px-2 py-0.5 rounded">Tamper-Evident SHA-256</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="font-semibold">Regional Pediatric Shortage Alert</span>
                <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">0 Critical Deficits</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveModal(null);
                  if (onNavigate) onNavigate('admin', 'audit');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors"
              >
                Open Admin Audit Dashboard
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
