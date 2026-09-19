import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Pill, 
  RotateCw, 
  Clock, 
  Truck, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  ShieldAlert, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export const PrescriptionRefillHistory = () => {
  const { prescriptions, requestRefill } = useAuth();
  const [requestingId, setRequestingId] = useState(null);

  const handleRefillClick = (rxId) => {
    setRequestingId(rxId);
    setTimeout(() => {
      requestRefill(rxId);
      setRequestingId(null);
    }, 500);
  };

  const getStatusBadge = (status, eta) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Active Rx</span>
        </span>
      );
    }
    if (status === 'In Transit') {
      return (
        <div className="flex flex-col items-start sm:items-end">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold shadow-xs">
            <Truck className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span>In Transit • Courier En Route</span>
          </span>
          {eta && (
            <span className="text-[11px] font-semibold text-teal-700 mt-1">
              {eta}
            </span>
          )}
        </div>
      );
    }
    if (status === 'Refill Needed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Refill Needed (0 Left)</span>
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <Pill className="w-5 h-5 text-teal-600" />
            <span>Prescriptions & Refill Management</span>
          </h3>
          <p className="text-xs text-slate-500">
            Automated formulary sync, refill monitoring & one-click expedited pharmacy requests
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
          <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
          <span>Allergy Guard Checked</span>
        </div>
      </div>

      {/* Prescription Cards List */}
      <div className="space-y-4">
        {prescriptions.map((rx) => {
          const isRefillNeeded = rx.status === 'Refill Needed';
          const isInTransit = rx.status === 'In Transit';
          const isRequesting = requestingId === rx.id;

          return (
            <div
              key={rx.id}
              className={`p-5 rounded-2xl border transition-all ${
                isRefillNeeded
                  ? 'border-rose-300 bg-rose-50/30'
                  : isInTransit
                  ? 'border-teal-400 bg-teal-50/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">{rx.name}</h4>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {rx.rxNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{rx.strength}</p>
                  <p className="text-[11px] text-teal-700 font-semibold">{rx.category}</p>
                </div>

                <div>
                  {getStatusBadge(rx.status, rx.courierEta)}
                </div>
              </div>

              {/* Directions & Doctor Details */}
              <div className="my-3 py-1 space-y-1.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                  <strong className="text-slate-900 block text-[11px] uppercase tracking-wider mb-0.5">
                    Dosage & Directions:
                  </strong>
                  {rx.directions}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-500 pt-1 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-400">Prescribing Physician:</span>
                    <p className="text-slate-700 font-medium">{rx.doctor}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400">Last Filled:</span>
                    <p className="text-slate-700 font-medium">{rx.lastFilled}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400">Refills Remaining:</span>
                    <p className={`font-bold ${rx.refillsRemaining === 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {rx.refillsRemaining} remaining
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dispensary: <strong className="text-slate-700">{rx.pharmacy}</strong></span>
                </div>

                {/* One-Click Refill CTA Button */}
                {isInTransit ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-100 text-teal-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Courier Tracking Active</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isRequesting}
                    onClick={() => handleRefillClick(rx.id)}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer ${
                      isRefillNeeded
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                    }`}
                  >
                    {isRequesting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Authorizing Refill...</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>One-Click Refill Order</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
