import React from 'react';
import {
  MapPin,
  Clock,
  Car,
  AlertOctagon,
  CheckCircle2,
  RotateCcw,
  SlidersHorizontal,
  Navigation,
} from 'lucide-react';
import { DOSAGE_FORMS } from '../../data/mockMedicines';

export default function SearchFiltersBar({
  radiusKm,
  onRadiusChange,
  pincode,
  onPincodeChange,
  quickFilters,
  onToggleQuickFilter,
  rxFilter,
  onRxFilterChange,
  dosageFormFilter,
  onDosageFormChange,
  onResetFilters,
  activeFilterCount,
}) {
  const radiusOptions = [
    { value: 2, label: 'Within 2 km' },
    { value: 5, label: 'Within 5 km' },
    { value: 10, label: 'Within 10 km' },
    { value: 25, label: 'Within 25 km' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 md:p-5 space-y-4">
      {/* Top Row: Spatial Controls (Pincode & Distance Radius) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        {/* Patient Pincode / Location */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Patient Search Location
              </span>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-semibold px-1.5 py-0.2 rounded">
                Live GPS Sync
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-slate-500">Pincode:</span>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => onPincodeChange(e.target.value.replace(/\D/g, ''))}
                className="w-20 px-2 py-0.5 text-xs font-mono font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-teal-500"
                placeholder="560034"
              />
              <span className="text-xs text-slate-600 font-medium hidden sm:inline">
                Koramangala, Bengaluru
              </span>
              <button
                type="button"
                onClick={() => onPincodeChange('560034')}
                className="text-[11px] text-teal-600 hover:text-teal-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                title="Detect live coordinates"
              >
                <Navigation className="w-3 h-3" /> Detect
              </button>
            </div>
          </div>
        </div>

        {/* Distance / Radius Segmented Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 mr-1">Search Radius:</span>
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            {radiusOptions.map((opt) => {
              const isSelected = radiusKm === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onRadiusChange(opt.value)}
                  className={`px-3 py-1.5 font-semibold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-teal-800 shadow-sm border border-teal-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Middle Row: Quick Filter Toggles & Active Filter Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Quick Filters:
          </span>

          {/* In Stock Only */}
          <button
            type="button"
            onClick={() => onToggleQuickFilter('inStockOnly')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              quickFilters.inStockOnly
                ? 'bg-teal-600 text-white border-teal-600 shadow-sm ring-2 ring-teal-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${quickFilters.inStockOnly ? 'text-white' : 'text-teal-600'}`} />
            <span>In Stock Only</span>
          </button>

          {/* Open 24/7 Now */}
          <button
            type="button"
            onClick={() => onToggleQuickFilter('open24x7Only')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              quickFilters.open24x7Only
                ? 'bg-teal-600 text-white border-teal-600 shadow-sm ring-2 ring-teal-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${quickFilters.open24x7Only ? 'text-white' : 'text-slate-400'}`} />
            <span>Open 24/7 Now</span>
          </button>

          {/* Drive-thru Available */}
          <button
            type="button"
            onClick={() => onToggleQuickFilter('driveThruOnly')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              quickFilters.driveThruOnly
                ? 'bg-teal-600 text-white border-teal-600 shadow-sm ring-2 ring-teal-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <Car className={`w-3.5 h-3.5 ${quickFilters.driveThruOnly ? 'text-white' : 'text-slate-400'}`} />
            <span>Drive-thru Available</span>
          </button>

          {/* Emergency Reserve Available */}
          <button
            type="button"
            onClick={() => onToggleQuickFilter('emergencyReserveOnly')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              quickFilters.emergencyReserveOnly
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm ring-2 ring-rose-500/20'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 hover:border-rose-300'
            }`}
          >
            <AlertOctagon className={`w-3.5 h-3.5 ${quickFilters.emergencyReserveOnly ? 'text-white' : 'text-rose-600'}`} />
            <span>Emergency Reserve Available</span>
          </button>
        </div>

        {/* Reset Filters button */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50/80 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* Bottom Row: Prescription & Dosage Form Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-slate-100">
        {/* Prescription status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Prescription:</span>
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            {[
              { id: 'all', label: 'All Medicines' },
              { id: 'rx', label: 'Rx Required' },
              { id: 'otc', label: 'Over-the-Counter (OTC)' },
            ].map((rx) => {
              const isSelected = rxFilter === rx.id;
              return (
                <button
                  key={rx.id}
                  type="button"
                  onClick={() => onRxFilterChange(rx.id)}
                  className={`px-3 py-1 font-semibold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {rx.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dosage Form Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Dosage Form:</span>
          <div className="flex items-center gap-1">
            {DOSAGE_FORMS.map((form) => {
              const isSelected = dosageFormFilter === form;
              return (
                <button
                  key={form}
                  type="button"
                  onClick={() => onDosageFormChange(form)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white font-semibold shadow-sm'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {form}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
