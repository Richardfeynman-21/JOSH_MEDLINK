import React, { useState, useMemo } from 'react';
import {
  MOCK_MEDICINES,
  MOCK_PHARMACIES,
  RECENT_SEARCHES_DEFAULT,
} from '../../data/mockMedicines';
import SearchModeSelector from './SearchModeSelector';
import PredictiveSearchBar from './PredictiveSearchBar';
import SearchFiltersBar from './SearchFiltersBar';
import MedicineDetailCard from './MedicineDetailCard';
import PharmacyStockCard from './PharmacyStockCard';
import InteractivePharmacyMap from './InteractivePharmacyMap';
import ReservationModal from './ReservationModal';
import DeliveryModal from './DeliveryModal';
import GenericComparisonModal from './GenericComparisonModal';
import { CallPharmacyModal, DirectionsModal } from './PharmacyActionModals';
import {
  Building2,
  ArrowUpDown,
} from 'lucide-react';

export default function MedicineSearchMain() {
  // Search Mode state: 'brand' | 'generic' | 'med_id' | 'category'
  const [activeMode, setActiveMode] = useState('brand');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Selected Medicine state (defaults to first medicine Lipitor 20mg)
  const [selectedMedicine, setSelectedMedicine] = useState(MOCK_MEDICINES[0]);

  // Spatial & Filtering state
  const [pincode, setPincode] = useState('560034');
  const [radiusKm, setRadiusKm] = useState(10);
  const [quickFilters, setQuickFilters] = useState({
    inStockOnly: false,
    open24x7Only: false,
    driveThruOnly: false,
    emergencyReserveOnly: false,
  });
  const [rxFilter, setRxFilter] = useState('all'); // 'all' | 'rx' | 'otc'
  const [dosageFormFilter, setDosageFormFilter] = useState('All Forms');
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'price' | 'stock'

  // View mode for pharmacies: 'split' | 'list' | 'map'
  const [viewMode, setViewMode] = useState('split');

  // Recent Searches
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES_DEFAULT);

  // Modals state
  const [activeReservation, setActiveReservation] = useState(null); // { pharmacy, medicine, item }
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [activeCallPharmacy, setActiveCallPharmacy] = useState(null);
  const [activeDirectionsPharmacy, setActiveDirectionsPharmacy] = useState(null);

  // Dynamic placeholder based on active mode
  const placeholderText = useMemo(() => {
    switch (activeMode) {
      case 'brand':
        return 'Search by Brand Name (e.g. Lipitor, Augmentin, Ventolin, Januvia, Dolonet)...';
      case 'generic':
        return 'Search by Generic Salt / Molecule (e.g. Atorvastatin, Salbutamol, Sitagliptin)...';
      case 'med_id':
        return 'Search by Medicine ID / NDC / Batch (e.g. MED-8849, NDC-0071-0155-23, LT-2026-X8)...';
      case 'category':
        return 'Filter by category or type drug name...';
      default:
        return 'Search medicine by brand, salt, or ID...';
    }
  }, [activeMode]);

  // Handle mode select
  const handleSelectMode = (modeId) => {
    setActiveMode(modeId);
  };

  // Handle category select
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId !== 'all') {
      const match = MOCK_MEDICINES.find((m) => m.category === catId);
      if (match) setSelectedMedicine(match);
    }
  };

  // Handle selecting a medicine from search suggestions
  const handleSelectMedicine = (med) => {
    setSelectedMedicine(med);
    // Add to recent searches if not already there
    if (!recentSearches.includes(med.brandName)) {
      setRecentSearches([med.brandName, ...recentSearches.slice(0, 4)]);
    }
  };

  // Toggle quick filters
  const handleToggleQuickFilter = (key) => {
    setQuickFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setRadiusKm(25);
    setQuickFilters({
      inStockOnly: false,
      open24x7Only: false,
      driveThruOnly: false,
      emergencyReserveOnly: false,
    });
    setRxFilter('all');
    setDosageFormFilter('All Forms');
    setSelectedCategory('all');
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (radiusKm !== 25) count++;
    if (quickFilters.inStockOnly) count++;
    if (quickFilters.open24x7Only) count++;
    if (quickFilters.driveThruOnly) count++;
    if (quickFilters.emergencyReserveOnly) count++;
    if (rxFilter !== 'all') count++;
    if (dosageFormFilter !== 'All Forms') count++;
    if (selectedCategory !== 'all') count++;
    return count;
  }, [radiusKm, quickFilters, rxFilter, dosageFormFilter, selectedCategory]);

  // Handle switching to Generic Medicine
  const handleSwitchToGeneric = () => {
    if (!selectedMedicine?.genericEquivalent) return;
    setIsGenericModalOpen(false);
    // Find or simulate generic item
    alert(
      `Switched to Generic: ${selectedMedicine.genericEquivalent.brandName} (${selectedMedicine.genericEquivalent.savingsPercent}% savings applied)`
    );
  };

  // Process pharmacy inventory for the selected medicine
  const filteredPharmacies = useMemo(() => {
    if (!selectedMedicine) return [];

    return MOCK_PHARMACIES.map((pharmacy) => {
      // Find inventory entry for selected medicine in this pharmacy
      const inventoryEntry = selectedMedicine.pharmacyInventory.find(
        (inv) => inv.pharmacyId === pharmacy.id
      );

      return {
        ...pharmacy,
        inventory: inventoryEntry || {
          status: 'OUT_OF_STOCK',
          units: 0,
          price: selectedMedicine.basePrice,
          lastSync: 'Sync pending',
          canReserve: false,
          canDeliver: false,
        },
      };
    })
      .filter((pharmacy) => {
        // Distance filter
        if (pharmacy.distanceKm > radiusKm) return false;

        // Quick Filters
        if (quickFilters.inStockOnly && pharmacy.inventory.status !== 'IN_STOCK') {
          return false;
        }
        if (quickFilters.open24x7Only && !pharmacy.open24x7) {
          return false;
        }
        if (quickFilters.driveThruOnly && !pharmacy.driveThru) {
          return false;
        }
        if (
          quickFilters.emergencyReserveOnly &&
          pharmacy.inventory.status !== 'EMERGENCY_RESERVE'
        ) {
          return false;
        }

        // Dosage Form filter on medicine
        if (
          dosageFormFilter !== 'All Forms' &&
          selectedMedicine.dosageForm !== dosageFormFilter
        ) {
          return false;
        }

        // Rx filter
        if (rxFilter === 'rx' && !selectedMedicine.prescriptionRequired) return false;
        if (rxFilter === 'otc' && selectedMedicine.prescriptionRequired) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') {
          return a.distanceKm - b.distanceKm;
        } else if (sortBy === 'price') {
          return a.inventory.price - b.inventory.price;
        } else if (sortBy === 'stock') {
          return b.inventory.units - a.inventory.units;
        }
        return 0;
      });
  }, [selectedMedicine, radiusKm, quickFilters, dosageFormFilter, rxFilter, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Clinical Clarity Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-teal-500/10 pointer-events-none blur-2xl" />
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 border border-teal-500/40 text-teal-200 text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            <span>MedLink Real-Time Search &amp; Spatial Inventory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Intelligent Medicine Availability &amp; Emergency Drug Access
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Multi-mode clinical search across certified regional pharmacies. Live ERP synchronization, cold-chain assurance, instant 2-hour reservations, and guaranteed bioequivalent generic switches.
          </p>
        </div>
      </div>

      {/* 1. Multi-Mode Search Interface */}
      <section className="space-y-4">
        <SearchModeSelector
          activeMode={activeMode}
          onSelectMode={handleSelectMode}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        <PredictiveSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeMode={activeMode}
          allMedicines={MOCK_MEDICINES}
          onSelectMedicine={handleSelectMedicine}
          recentSearches={recentSearches}
          onClearRecentSearches={() => setRecentSearches([])}
          onRemoveRecentSearch={(item) =>
            setRecentSearches((prev) => prev.filter((s) => s !== item))
          }
          placeholderText={placeholderText}
        />
      </section>

      {/* 2. Search Filters & Spatial Controls */}
      <section>
        <SearchFiltersBar
          radiusKm={radiusKm}
          onRadiusChange={setRadiusKm}
          pincode={pincode}
          onPincodeChange={setPincode}
          quickFilters={quickFilters}
          onToggleQuickFilter={handleToggleQuickFilter}
          rxFilter={rxFilter}
          onRxFilterChange={setRxFilter}
          dosageFormFilter={dosageFormFilter}
          onDosageFormChange={setDosageFormFilter}
          onResetFilters={handleResetFilters}
          activeFilterCount={activeFilterCount}
        />
      </section>

      {/* 3. Rich Medicine Header & Detail Card */}
      {selectedMedicine && (
        <section>
          <MedicineDetailCard
            medicine={selectedMedicine}
            onOpenGenericModal={() => setIsGenericModalOpen(true)}
            onSwitchToGeneric={() => setIsGenericModalOpen(true)}
          />
        </section>
      )}

      {/* 4 & 5. Real-Time Pharmacy Stock & Interactive Map / List View Toggle */}
      <section className="space-y-4">
        {/* Results Header with Sort & View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-lg font-bold text-slate-900">
                Verified Nearby Pharmacies
              </h2>
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-teal-800 bg-teal-50 border border-teal-200 rounded-full">
                {filteredPharmacies.length} Facilities Found
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing availability within <strong className="text-slate-800">{radiusKm} km</strong> of PIN{' '}
              <strong className="text-slate-800 font-mono">{pincode}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                <option value="distance">Nearest Distance</option>
                <option value="price">Lowest Price</option>
                <option value="stock">Highest In Stock</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                List
              </button>
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 font-semibold rounded-lg transition-all cursor-pointer hidden lg:inline-block ${
                  viewMode === 'split'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Split
              </button>
              <button
                type="button"
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === 'map'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>

        {/* Content Views: Split View, Map Only, or List Only */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Cols: Pharmacy Cards */}
            <div className="lg:col-span-7 space-y-4">
              {filteredPharmacies.length > 0 ? (
                filteredPharmacies.map((pharmacy) => (
                  <PharmacyStockCard
                    key={pharmacy.id}
                    pharmacy={pharmacy}
                    inventoryItem={pharmacy.inventory}
                    medicine={selectedMedicine}
                    onReserve={(p, m, inv) =>
                      setActiveReservation({ pharmacy: p, medicine: m, inventoryItem: inv })
                    }
                    onRequestDelivery={(p, m, inv) =>
                      setActiveDelivery({ pharmacy: p, medicine: m, inventoryItem: inv })
                    }
                    onDirections={(p) => setActiveDirectionsPharmacy(p)}
                    onCallPharmacy={(p) => setActiveCallPharmacy(p)}
                  />
                ))
              ) : (
                <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                  <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="font-bold text-slate-800 text-base">No Pharmacies Match Filters</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try expanding your distance radius from {radiusKm} km to 25 km or clearing strict toggles like &ldquo;In Stock Only&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Reset Filter Parameters
                  </button>
                </div>
              )}
            </div>

            {/* Right 5 Cols: Sticky Interactive Map */}
            <div className="lg:col-span-5 lg:sticky lg:top-4">
              <InteractivePharmacyMap
                pharmacies={filteredPharmacies}
                selectedMedicine={selectedMedicine}
                onSelectPharmacy={(p) => {
                  const el = document.getElementById(p.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onReserve={(p, m, inv) =>
                  setActiveReservation({ pharmacy: p, medicine: m, inventoryItem: inv })
                }
                viewMode={viewMode}
                onChangeViewMode={setViewMode}
              />
            </div>
          </div>
        )}

        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map((pharmacy) => (
                <PharmacyStockCard
                  key={pharmacy.id}
                  pharmacy={pharmacy}
                  inventoryItem={pharmacy.inventory}
                  medicine={selectedMedicine}
                  onReserve={(p, m, inv) =>
                    setActiveReservation({ pharmacy: p, medicine: m, inventoryItem: inv })
                  }
                  onRequestDelivery={(p, m, inv) =>
                    setActiveDelivery({ pharmacy: p, medicine: m, inventoryItem: inv })
                  }
                  onDirections={(p) => setActiveDirectionsPharmacy(p)}
                  onCallPharmacy={(p) => setActiveCallPharmacy(p)}
                />
              ))
            ) : (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">No Pharmacies Match Filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try expanding your distance radius or resetting your search filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Reset Filter Parameters
                </button>
              </div>
            )}
          </div>
        )}

        {viewMode === 'map' && (
          <div className="w-full">
            <InteractivePharmacyMap
              pharmacies={filteredPharmacies}
              selectedMedicine={selectedMedicine}
              onSelectPharmacy={() => {}}
              onReserve={(p, m, inv) =>
                setActiveReservation({ pharmacy: p, medicine: m, inventoryItem: inv })
              }
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
            />
          </div>
        )}
      </section>

      {/* Interactive Modals */}
      {/* 1. Hold & Reserve Modal */}
      <ReservationModal
        isOpen={Boolean(activeReservation)}
        onClose={() => setActiveReservation(null)}
        pharmacy={activeReservation?.pharmacy}
        medicine={activeReservation?.medicine}
        inventoryItem={activeReservation?.inventoryItem}
      />

      {/* 2. Express Delivery Modal */}
      <DeliveryModal
        isOpen={Boolean(activeDelivery)}
        onClose={() => setActiveDelivery(null)}
        pharmacy={activeDelivery?.pharmacy}
        medicine={activeDelivery?.medicine}
        inventoryItem={activeDelivery?.inventoryItem}
      />

      {/* 3. Generic Comparison Modal */}
      <GenericComparisonModal
        isOpen={isGenericModalOpen}
        onClose={() => setIsGenericModalOpen(false)}
        medicine={selectedMedicine}
        onSwitchConfirmed={handleSwitchToGeneric}
      />

      {/* 4. Call Pharmacy Modal */}
      <CallPharmacyModal
        isOpen={Boolean(activeCallPharmacy)}
        onClose={() => setActiveCallPharmacy(null)}
        pharmacy={activeCallPharmacy}
      />

      {/* 5. Directions Modal */}
      <DirectionsModal
        isOpen={Boolean(activeDirectionsPharmacy)}
        onClose={() => setActiveDirectionsPharmacy(null)}
        pharmacy={activeDirectionsPharmacy}
      />
    </div>
  );
}
