import React from 'react';
import {
  X,
  Phone,
  Navigation,
  ExternalLink,
} from 'lucide-react';

export function CallPharmacyModal({ isOpen, onClose, pharmacy }) {
  if (!isOpen || !pharmacy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden text-center p-6 space-y-4">
        <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mx-auto">
          <Phone className="w-7 h-7" />
        </div>

        <div>
          <h3 className="font-extrabold text-lg text-slate-900">
            Contact Pharmacy Desk
          </h3>
          <p className="text-xs text-slate-500 mt-1">{pharmacy.name}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            Direct Dispatch Line
          </span>
          <a
            href={`tel:${pharmacy.phone}`}
            className="text-2xl font-black text-teal-700 font-mono tracking-tight block mt-1 hover:underline"
          >
            {pharmacy.phone}
          </a>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            ✓ Verified Pharmacist On Duty (License: {pharmacy.verifiedLicense})
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <a
            href={`tel:${pharmacy.phone}`}
            className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" /> Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

export function DirectionsModal({ isOpen, onClose, pharmacy }) {
  if (!isOpen || !pharmacy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-teal-50 border border-teal-200 text-teal-700 rounded-xl flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Turn-by-Turn Route Navigation
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {pharmacy.distanceKm} km • ~6 mins driving
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Route Steps Preview */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <strong className="text-slate-800">Depart from Koramangala 5th Block</strong>
              <p className="text-slate-500 text-[11px]">Head east towards 80ft Road (400m)</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <strong className="text-slate-800">Turn left at Sony World Signal</strong>
              <p className="text-slate-500 text-[11px]">Continue on 12th Main Road for {pharmacy.distanceKm} km</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <strong className="text-slate-800">Arrive at {pharmacy.name}</strong>
              <p className="text-slate-500 text-[11px]">{pharmacy.address}</p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.coords.lat},${pharmacy.coords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
