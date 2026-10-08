import React from 'react';
import { Link } from 'react-router-dom';
import {
  ThermometerSnowflake,
  ShieldCheck,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle,
  Building2,
  FileBadge2,
  TrendingDown,
  ExternalLink,
} from 'lucide-react';

export default function MedicineDetailCard({
  medicine,
  onOpenGenericModal,
  onSwitchToGeneric,
  isSwitchedToGeneric = false,
  onSwitchBackToBrand,
  originalBrandMedicine
}) {
  if (!medicine) return null;

  const generic = medicine.genericEquivalent;
  const savingsAmount = medicine.basePrice - (generic?.price || 0);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/40 overflow-hidden transition-colors">
      {/* Top Clinical Ribbon */}
      <div className="bg-slate-900 text-white px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono font-bold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
            <FileBadge2 className="w-3.5 h-3.5" aria-hidden="true" /> {medicine.medId}
          </span>
          <span className="text-slate-300">CDSCO/NDC: <span className="font-mono text-slate-100">{medicine.ndc}</span></span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Batch: <span className="font-mono text-slate-100">{medicine.batchNo}</span></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Therapeutic Class:</span>
          <span className="font-medium text-slate-200">{medicine.therapeuticClass}</span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
                {medicine.brandName}
              </h2>
              <span className="px-2.5 py-0.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg">
                {medicine.strength}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg">
                {medicine.dosageForm}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg">
                {medicine.categoryLabel}
              </span>
              {isSwitchedToGeneric && (
                <span className="px-2.5 py-0.5 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-lg">
                  Bioequivalent Generic
                </span>
              )}
            </div>

            {/* Generic composition & manufacturer */}
            <p className="text-sm md:text-base text-slate-700 font-medium flex items-center gap-1.5 mt-1">
              <span className="text-slate-400 font-normal">Active Molecule / Salt:</span>
              <span className="font-semibold text-teal-900 bg-teal-50/70 px-2 py-0.5 rounded border border-teal-100">
                {medicine.genericName}
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                {medicine.manufacturer}
              </span>
              <span>•</span>
              <span>Pack: <strong className="text-slate-700">{medicine.packSize}</strong></span>
              <span>•</span>
              <span>Indications: <span className="text-slate-600">{medicine.indications}</span></span>
              <span>•</span>
              <Link
                to={`/medicine/${medicine.id.replace('generic-', '')}`}
                className="inline-flex items-center gap-1 font-bold text-teal-700 hover:text-teal-900 hover:underline"
              >
                <span>Standalone Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Average Retail Reference Price */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left md:text-right shrink-0">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              Average MRP Reference
            </span>
            <div className="flex items-baseline md:justify-end gap-1.5 mt-0.5">
              <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                ₹{medicine.basePrice.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ pack</span>
            </div>
            <span className="text-[11px] text-teal-700 font-medium block mt-0.5">
              {medicine.prescriptionRequired ? 'Requires Doctor Rx' : 'Over-the-Counter (OTC)'}
            </span>
          </div>
        </div>

        {/* Clinical Assurance & Storage Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Storage & Cold Chain */}
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            medicine.coldChainRequired
              ? 'bg-blue-50/70 border-blue-200 text-blue-900'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <ThermometerSnowflake className={`w-4 h-4 shrink-0 mt-0.5 ${
              medicine.coldChainRequired ? 'text-blue-600' : 'text-slate-500'
            }`} aria-hidden="true" />
            <div className="text-xs">
              <span className="font-bold block">
                {medicine.coldChainRequired ? 'Cold Chain Storage (2°C – 8°C)' : 'Room Temp (< 25°C)'}
              </span>
              <span className="text-[11px] text-slate-500">{medicine.storageTemp}</span>
            </div>
          </div>

          {/* Regulatory Schedule */}
          <div className="p-3 rounded-xl border bg-slate-50 border-slate-200 flex items-start gap-2.5 text-slate-800">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs">
              <span className="font-bold block">CDSCO / FDA Schedule</span>
              <span className="text-[11px] text-slate-500">{medicine.scheduleClass}</span>
            </div>
          </div>

          {/* Controlled Substance / Schedule H Warning */}
          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
            medicine.prescriptionRequired
              ? 'bg-amber-50/70 border-amber-200 text-amber-900'
              : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
          }`}>
            {medicine.prescriptionRequired ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div className="text-xs">
              <span className="font-bold block">
                {medicine.prescriptionRequired ? 'Schedule H Prescribed Drug' : 'General Sale OTC Item'}
              </span>
              <span className="text-[11px] text-slate-500">
                {medicine.prescriptionRequired ? 'Strict verification required' : 'No doctor prescription mandatory'}
              </span>
            </div>
          </div>
        </div>

        {/* GENERIC SWITCHER MODULE */}
        {isSwitchedToGeneric ? (
          /* STATE A: CURRENTLY SWITCHED TO GENERIC -> OFFER SWITCH BACK */
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Active: Bioequivalent Generic Selection
                    </span>
                    <span className="text-xs font-bold text-emerald-700 font-mono">
                      Cost-saving active
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                    Currently Viewing: {medicine.brandName}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Switched from original brand <strong className="text-slate-800">{originalBrandMedicine?.brandName}</strong>. Identical molecule <strong className="text-teal-900">{medicine.genericName}</strong>.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onSwitchBackToBrand}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <ArrowRightLeft className="w-4 h-4 text-slate-600" aria-hidden="true" />
                <span>Switch Back to Original Brand ({originalBrandMedicine?.brandName})</span>
              </button>
            </div>
          </div>
        ) : generic && (
          /* STATE B: CURRENTLY VIEWING ORIGINAL BRAND -> OFFER GENERIC SWITCH */
          <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-300/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                  <ArrowRightLeft className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Bioequivalent Generic Alternative Available
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      Save {generic.savingsPercent}%
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {generic.brandName}{' '}
                    <span className="text-xs font-normal text-slate-500">
                      by {generic.manufacturer}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {generic.description}
                  </p>
                  <p className="text-[11px] text-teal-900 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                    <span>Bioequivalence Match: {generic.activeIngredientsMatch}</span>
                  </p>
                </div>
              </div>

              {/* Pricing comparison box & action buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0 bg-white/90 p-3.5 rounded-xl border border-emerald-200/90 shadow-xs">
                <div className="text-left sm:text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                      ₹{medicine.basePrice.toFixed(2)}
                    </span>
                    <span className="text-xl md:text-2xl font-black text-emerald-700 font-mono tabular-nums">
                      ₹{generic.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
                    You save ₹{savingsAmount.toFixed(2)} per pack ({generic.savingsPercent}%)
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenGenericModal}
                    className="flex-1 sm:flex-initial px-3 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <span>View Bioequivalence</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={onSwitchToGeneric}
                    className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <span>Switch &amp; Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
