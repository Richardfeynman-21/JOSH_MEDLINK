import React from 'react';
import { Tag, FileText, Hash, Grid, Sparkles } from 'lucide-react';
import { MEDICINE_CATEGORIES } from '../../data/mockMedicines';

export default function SearchModeSelector({
  activeMode,
  onSelectMode,
  selectedCategory,
  onSelectCategory,
}) {
  const modes = [
    {
      id: 'brand',
      label: 'Brand Name',
      icon: Tag,
      placeholder: 'e.g. Lipitor, Augmentin, Ventolin, Januvia, Dolonet',
      desc: 'Search by commercial proprietary brand name'
    },
    {
      id: 'generic',
      label: 'Generic Name',
      icon: FileText,
      placeholder: 'e.g. Atorvastatin, Amoxicillin-Clavulanate, Salbutamol, Metformin',
      desc: 'Search by active chemical salt or API molecule'
    },
    {
      id: 'med_id',
      label: 'Medicine ID / NDC / Batch',
      icon: Hash,
      placeholder: 'e.g. MED-8849, NDC-0071-0155-23, LT-2026-X8',
      desc: 'Direct lookup by National Drug Code, Hospital MED ID or Batch'
    },
    {
      id: 'category',
      label: 'Category Browsing',
      icon: Grid,
      placeholder: 'Browse by therapeutic medical department',
      desc: 'Explore curated essential drug formularies'
    },
  ];

  return (
    <div className="w-full space-y-3">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 shadow-inner">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => onSelectMode(mode.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-teal-800 shadow-sm border border-teal-100 ring-1 ring-teal-500/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{mode.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 bg-teal-50/60 px-3 py-1.5 rounded-lg border border-teal-100">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Real-time FHIR &amp; ERP inventory integration active</span>
        </div>
      </div>

      {/* Category Browsing Chips (Always accessible or highlighted when category mode active) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Therapeutic Categories
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-semibold text-teal-600 hover:text-teal-800 hover:underline cursor-pointer"
            >
              Reset Category
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
          {MEDICINE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-600/30'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
