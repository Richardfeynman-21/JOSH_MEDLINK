import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, ShieldAlert, Sparkles, Pill } from 'lucide-react';

export default function PredictiveSearchBar({
  searchQuery,
  onSearchChange,
  activeMode,
  allMedicines,
  onSelectMedicine,
  recentSearches,
  onClearRecentSearches,
  onRemoveRecentSearch,
  placeholderText,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Filter medicines predictively based on query and active mode
  const filteredSuggestions = React.useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();
    if (!q) return [];

    return allMedicines.filter((med) => {
      if (activeMode === 'brand') {
        return med.brandName.toLowerCase().includes(q);
      } else if (activeMode === 'generic') {
        return (
          med.genericName.toLowerCase().includes(q) ||
          med.genericEquivalent.brandName.toLowerCase().includes(q)
        );
      } else if (activeMode === 'med_id') {
        return (
          med.medId.toLowerCase().includes(q) ||
          med.ndc.toLowerCase().includes(q) ||
          med.batchNo.toLowerCase().includes(q)
        );
      } else {
        // Across all fields
        return (
          med.brandName.toLowerCase().includes(q) ||
          med.genericName.toLowerCase().includes(q) ||
          med.medId.toLowerCase().includes(q) ||
          med.ndc.toLowerCase().includes(q) ||
          med.categoryLabel.toLowerCase().includes(q)
        );
      }
    }).slice(0, 6); // Max 6 fast suggestions
  }, [searchQuery, activeMode, allMedicines]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlight index when suggestion list changes
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredSuggestions]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
        handleSelect(filteredSuggestions[highlightedIndex]);
      } else if (filteredSuggestions.length > 0) {
        handleSelect(filteredSuggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (medicine) => {
    onSelectMedicine(medicine);
    setIsOpen(false);
  };

  const handleRecentClick = (text) => {
    onSearchChange(text);
    // Find matching medicine if any
    const found = allMedicines.find(
      (m) =>
        m.brandName.toLowerCase() === text.toLowerCase() ||
        m.medId.toLowerCase() === text.toLowerCase()
    );
    if (found) {
      onSelectMedicine(found);
    }
    setIsOpen(false);
  };

  // Helper to highlight matching text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-amber-100 text-teal-900 font-bold px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Box */}
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-teal-600" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          className="w-full pl-12 pr-12 py-3.5 bg-white text-slate-900 placeholder:text-slate-400 text-sm md:text-base rounded-2xl border-2 border-slate-200 hover:border-slate-300 focus:border-teal-600 focus:outline-none shadow-sm transition-all"
        />

        {searchQuery ? (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
            title="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="absolute right-3.5 hidden sm:flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-md border border-slate-200/80 text-[10px] font-mono text-slate-500 uppercase">
            <span>ESC to close</span>
          </div>
        )}
      </div>

      {/* Dropdown Suggestions & Recent Searches */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* If there is a search query */}
          {searchQuery.trim() ? (
            <div>
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-[11px] text-teal-800">
                  Matching Medicines ({filteredSuggestions.length})
                </span>
                <span className="text-[11px] text-slate-400">
                  Mode: <strong className="text-slate-700 capitalize">{activeMode.replace('_', ' ')}</strong>
                </span>
              </div>

              {filteredSuggestions.length > 0 ? (
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {filteredSuggestions.map((med, idx) => {
                    const isHighlighted = idx === highlightedIndex;
                    const inStockCount = med.pharmacyInventory.filter(
                      (p) => p.status === 'IN_STOCK'
                    ).length;

                    return (
                      <div
                        key={med.id}
                        onClick={() => handleSelect(med)}
                        onMouseEnter={() => setHighlightedIndex(idx)}
                        className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                          isHighlighted ? 'bg-teal-50/70 text-teal-950' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Pill className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-slate-900">
                                {highlightMatch(med.brandName, searchQuery)}
                              </span>
                              <span className="text-xs text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                                {med.strength}
                              </span>
                              {med.prescriptionRequired ? (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                                  Rx Required
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                  OTC
                                </span>
                              )}
                              {med.isColdChain && (
                                <span className="text-[10px] font-semibold text-cyan-800 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded">
                                  ❄️ Cold Chain
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 truncate mt-0.5">
                              <span className="text-slate-400">Salt:</span>{' '}
                              {highlightMatch(med.genericName, searchQuery)}
                            </p>

                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                              <span>Mfg: {med.manufacturer}</span>
                              <span>•</span>
                              <span className="font-mono">ID: {med.medId}</span>
                              <span>•</span>
                              <span className="font-mono">NDC: {med.ndc}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex flex-col items-end">
                          <span className="text-sm font-bold text-slate-900 font-mono">
                            ₹{med.basePrice.toFixed(2)}
                          </span>
                          <span className="text-[11px] font-medium text-teal-600 flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                            {inStockCount > 0 ? `${inStockCount} pharmacies stock` : 'Check stock'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-1 opacity-0 group-hover:opacity-100" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500">
                  <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-80" />
                  <p className="font-semibold text-slate-800 text-sm">
                    No medicine matching &ldquo;{searchQuery}&rdquo; in {activeMode.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try switching tabs (e.g. Generic Name, Medicine ID) or check the spelling.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Recent Searches when query is empty */
            <div>
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Recent Searches</span>
                </div>
                {recentSearches && recentSearches.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearRecentSearches}
                    className="text-[11px] font-medium text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {recentSearches && recentSearches.length > 0 ? (
                <div className="p-2">
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-900 text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200/80 transition-colors group"
                      >
                        <button
                          type="button"
                          onClick={() => handleRecentClick(item)}
                          className="cursor-pointer font-medium"
                        >
                          {item}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveRecentSearch(item);
                          }}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  No recent searches yet. Search by Brand Name, Generic Molecule, or NDC code.
                </div>
              )}

              {/* Popular quick jump shortcuts */}
              <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-teal-700">
                  <Sparkles className="w-3.5 h-3.5" /> Popular Formulary:
                </span>
                <div className="flex items-center gap-2">
                  {['Augmentin 625 Duo', 'Lipitor', 'Ventolin', 'Januvia'].map((popular) => (
                    <button
                      key={popular}
                      type="button"
                      onClick={() => handleRecentClick(popular)}
                      className="text-teal-700 hover:underline cursor-pointer font-semibold"
                    >
                      {popular}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
