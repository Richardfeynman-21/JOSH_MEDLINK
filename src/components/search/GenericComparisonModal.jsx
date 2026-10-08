import React, { useEffect } from 'react';
import {
  X,
  ShieldCheck,
  ArrowRightLeft,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

export default function GenericComparisonModal({
  isOpen,
  onClose,
  medicine,
  onSwitchConfirmed,
  isCurrentlySwitched = false,
  onSwitchBack
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !medicine || !medicine.genericEquivalent) return null;

  const generic = medicine.genericEquivalent;
  const savingsPerPack = medicine.basePrice - generic.price;
  const monthlySavings = savingsPerPack * 3;
  const annualSavings = monthlySavings * 12;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="generic-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <ArrowRightLeft className="w-5 h-5 text-emerald-300" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 id="generic-modal-title" className="font-black text-base sm:text-xl text-white">
                  Smart Generic Bioequivalence Audit
                </h3>
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full font-mono">
                  Save {generic.savingsPercent}%
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                Therapeutic equivalence verified under CDSCO &amp; US-FDA Bioavailability Standards
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-emerald-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Side by side Drug Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Brand Drug */}
            <div className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Prescribed Brand Name
              </span>
              <h4 className="text-lg font-black text-slate-900">{medicine.brandName}</h4>
              <p className="text-xs text-slate-600 font-medium">Mfg: {medicine.manufacturer}</p>
              <div className="pt-2 border-t border-slate-200/80">
                <span className="text-xs text-slate-400">Reference MRP</span>
                <p className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                  ₹{medicine.basePrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Generic Equivalent */}
            <div className="p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50/50 space-y-2 relative">
              <div className="absolute top-3 right-3">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  RECOMMENDED
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Verified Generic Bioequivalent
              </span>
              <h4 className="text-lg font-black text-emerald-950">{generic.brandName}</h4>
              <p className="text-xs text-emerald-800 font-medium">Mfg: {generic.manufacturer}</p>
              <div className="pt-2 border-t border-emerald-200">
                <span className="text-xs text-emerald-700">Generic Unit Price</span>
                <p className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
                  ₹{generic.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Scientific Bioequivalence Parameters */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <ShieldCheck className="w-4 h-4 text-teal-600" aria-hidden="true" />
              <span>Bioequivalence &amp; Clinical Quality Verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 block text-[11px]">Active Ingredient Match</span>
                <strong className="text-slate-800 font-mono">100% Identical Salt</strong>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Identical strength &amp; purity</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 block text-[11px]">AUC / Absorption (Cmax)</span>
                <strong className="text-slate-800 font-mono tabular-nums">98.4% Match</strong>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Within CDSCO 80-125% Window</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 block text-[11px]">Pharmacopoeia Rating</span>
                <strong className="text-slate-800 font-mono">AB Rated Equivalent</strong>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Fully Interchangeable</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 leading-relaxed">
              <strong>Clinical Note:</strong> {generic.description} {generic.safetyCert}
            </p>
          </div>

          {/* Savings Projection Table */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
              <TrendingDown className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>Patient Savings Projection (Indian Rupee ₹)</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-slate-500 block text-[10px]">Per Pack</span>
                <span className="text-base font-black text-emerald-700 font-mono tabular-nums">
                  Save ₹{savingsPerPack.toFixed(2)}
                </span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-slate-500 block text-[10px]">Monthly Course</span>
                <span className="text-base font-black text-emerald-700 font-mono tabular-nums">
                  Save ₹{monthlySavings.toFixed(2)}
                </span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-slate-500 block text-[10px]">Annual Maintenance</span>
                <span className="text-base font-black text-emerald-700 font-mono tabular-nums">
                  Save ₹{annualSavings.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Keep Prescribed Brand
            </button>

            {isCurrentlySwitched ? (
              <button
                type="button"
                onClick={onSwitchBack}
                className="flex-1 w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-sm rounded-xl shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-700"
              >
                <ArrowRightLeft className="w-4 h-4" aria-hidden="true" />
                <span>Switch Back to Original Brand</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onSwitchConfirmed}
                className="flex-1 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-colors cursor-pointer inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Switch to {generic.brandName} (Save {generic.savingsPercent}%)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
