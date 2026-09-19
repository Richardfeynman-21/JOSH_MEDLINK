import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Car, 
  Phone, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const PreferredPharmaciesList = () => {
  const { pharmacies, setPrimaryPharmacy, showToast } = useAuth();

  const handleCallPharmacy = (name, phone) => {
    showToast(`Connecting to ${name} dispensary desk (${phone})...`, 'info', 'Dispensary Dispatch');
  };

  const handleDirections = (name, address) => {
    showToast(`Calculating fastest emergency route to ${name} (${address})...`, 'info', 'Routing Assistant');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <Building2 className="w-5 h-5 text-teal-600" />
            <span>Preferred & Linked Pharmacies</span>
          </h3>
          <p className="text-xs text-slate-500">
            Real-time networked pharmacies linked to your residential pincode for automatic emergency drug delivery
          </p>
        </div>
        <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
          3 Pharmacies In-Range
        </span>
      </div>

      {/* Pharmacy Cards */}
      <div className="space-y-4">
        {pharmacies.map((pharmacy) => {
          return (
            <div
              key={pharmacy.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                pharmacy.isPrimary
                  ? 'border-teal-500 bg-gradient-to-br from-teal-50/50 via-white to-emerald-50/30 shadow-md ring-1 ring-teal-500'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      {pharmacy.name}
                    </h4>

                    {pharmacy.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[11px] font-bold shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Primary Dispatch</span>
                      </span>
                    )}

                    {pharmacy.is24Hours && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                        <Clock className="w-3 h-3 text-rose-500" />
                        <span>24/7 OPEN</span>
                      </span>
                    )}

                    {pharmacy.hasDriveThru && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        <Car className="w-3 h-3 text-slate-500" />
                        <span>Drive-Thru</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{pharmacy.address} (Pincode: {pharmacy.pincode})</span>
                  </p>
                </div>

                {/* Real-Time Distance & Formulary Stock */}
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-teal-50 text-teal-800 font-mono text-xs font-bold border border-teal-200">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>{pharmacy.distanceMiles} miles away</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    {pharmacy.inStockScore}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${pharmacy.phone}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCallPharmacy(pharmacy.name, pharmacy.phone);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pharmacy.phone}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDirections(pharmacy.name, pharmacy.address)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>Route & Map</span>
                  </button>
                </div>

                {!pharmacy.isPrimary ? (
                  <button
                    type="button"
                    onClick={() => setPrimaryPharmacy(pharmacy.id)}
                    className="text-xs font-semibold text-teal-600 hover:text-teal-800 hover:underline cursor-pointer"
                  >
                    Set as Primary Rx Routing
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-teal-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Active Route for Emergency Auto-Fulfill</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
