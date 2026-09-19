import React from 'react';
import {
  ThermometerSnowflake,
  ShieldCheck,
  AlertTriangle,
  ArrowRightLeft,
  Info,
  CheckCircle,
  Building2,
  FileBadge2,
  TrendingDown,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function MedicineDetailCard({
  medicine,
  onOpenGenericModal,
  onSwitchToGeneric,
}) {
  if (!medicine) return null;

  const generic = medicine.genericEquivalent;
  const savingsAmount = medicine.basePrice - (generic?.price || 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden transition-all">
      {/* Top Clinical Ribbon */}
      <div className="bg-slate-900 text-white px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono font-bold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
            <FileBadge2 className="w-3.5 h-3.5" /> {medicine.medId}
          </span>
          <span className="text-slate-300">NDC: <span className="font-mono text-slate-100">{medicine.ndc}</span></span>
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
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {medicine.brandName}
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg">
                {medicine.strength}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg">
                {medicine.dosageForm}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg">
                {medicine.categoryLabel}
              </span>
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
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {medicine.manufacturer}
              </span>
              <span>•</span>
              <span>Pack: <strong className="text-slate-700">{medicine.packSize}</strong></span>
              <span>•</span>
              <span>Indications: <span className="text-slate-600">{medicine.indications}</span></span>
            </div>
          </div>

          {/* Badges & Base Reference Price */}
          <div className="flex md:flex-col items-end justify-between md:justify-start gap-2 shrink-0">
            {medicine.prescriptionRequired ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs shadow-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Prescription Required (Rx)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs shadow-xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Over-the-Counter (OTC)</span>
              </div>
            )}

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Avg. Reference Price</span>
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-xl md:text-2xl font-extrabold text-slate-900 font-mono">
                  ₹{medicine.basePrice.toFixed(2)}
                </span>
                {medicine.mrp && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    ₹{medicine.mrp.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Storage Condition Alert Box */}
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
            medicine.isColdChain
              ? 'bg-cyan-50/80 border-cyan-300 text-cyan-950 ring-1 ring-cyan-500/20'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}
        >
          {medicine.isColdChain ? (
            <div className="w-8 h-8 rounded-lg bg-cyan-200/80 text-cyan-800 flex items-center justify-center shrink-0 mt-0.5">
              <ThermometerSnowflake className="w-5 h-5 text-cyan-700 animate-pulse" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-amber-700" />
            </div>
          )}

          <div className="text-xs space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs uppercase tracking-wider">
                {medicine.isColdChain
                  ? 'Cold Chain Protocol Mandated'
                  : 'Storage & Handling Specification'}
              </span>
              {medicine.isColdChain && (
                <span className="bg-cyan-700 text-white font-bold text-[10px] px-2 py-0.2 rounded-full">
                  2°C – 8°C Strict
                </span>
              )}
            </div>
            <p className="font-medium">{medicine.storageAlert}</p>
            {medicine.isColdChain && (
              <p className="text-[11px] text-cyan-800 font-normal">
                Dispatched in validated thermal containers with active Bluetooth datalogger for temperature compliance.
              </p>
            )}
          </div>
        </div>

        {/* Generic Alternative Comparison Callout: 'Smart Generic Switch - Save up to 60%' */}
        {generic && (
          <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-300/80 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-white p-4 md:p-5 shadow-sm">
            {/* Savings Ribbon */}
            <div className="absolute top-0 right-0">
              <div className="bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Save {generic.savingsPercent}%
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold uppercase tracking-wider border border-emerald-200">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-700" />
                    Smart Generic Switch
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-100/60 px-2 py-0.5 rounded border border-teal-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                    {generic.bioequivalenceStatus}
                  </span>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                    <span>Switch to {generic.brandName}</span>
                    <span className="text-xs font-normal text-slate-500">
                      by {generic.manufacturer}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {generic.description}
                  </p>
                  <p className="text-[11px] text-teal-900 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                    <span>Bioequivalence Match: {generic.activeIngredientsMatch}</span>
                  </p>
                </div>
              </div>

              {/* Pricing comparison box & action buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0 bg-white/90 p-3.5 rounded-xl border border-emerald-200/90 shadow-xs">
                <div className="text-left sm:text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 line-through font-mono">
                      ₹{medicine.basePrice.toFixed(2)}
                    </span>
                    <span className="text-xl md:text-2xl font-black text-emerald-700 font-mono">
                      ₹{generic.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    You save ₹{savingsAmount.toFixed(2)} per pack ({generic.savingsPercent}%)
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenGenericModal}
                    className="flex-1 sm:flex-initial px-3 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <span>View Bioequivalence</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={onSwitchToGeneric}
                    className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
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
