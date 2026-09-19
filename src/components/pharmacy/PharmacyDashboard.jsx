import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  Package, 
  Clock, 
  Truck, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  LogOut, 
  RefreshCw, 
  Snowflake, 
  Car, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  Timer, 
  ArrowRight,
  Pill,
  ChevronDown,
  Info
} from 'lucide-react';
import { STOCK_STATUSES, MEDICINE_CATEGORIES, DOSAGE_FORMS } from '../../data/mockMedicines';

export const PharmacyDashboard = ({ onOpenAuthModal }) => {
  const {
    user,
    role,
    logout,
    medicines,
    updateMedicineInventory,
    addMedicineToInventory,
    toggleEmergencyReserve,
    reservations,
    completeReservation,
    cancelReservation,
    deliveryOrders,
    dispatchDeliveryOrder,
    updatePharmacySettings,
    showToast
  } = useAuth();

  // Active Tab: 'inventory' | 'reservations' | 'deliveries' | 'settings'
  const [activeTab, setActiveTab] = useState('inventory');

  // Inventory filter state
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // Add Drug Modal
  const [isAddDrugModalOpen, setIsAddDrugModalOpen] = useState(false);
  const [newDrugForm, setNewDrugForm] = useState({
    brandName: '',
    genericName: '',
    strength: '500 mg',
    category: 'antibiotics',
    dosageForm: 'Tablets',
    price: 180,
    units: 35,
    batchNo: 'BT-2026-N1',
    expiryDate: '2027-10',
    prescriptionRequired: true,
    isColdChain: false,
    isEmergencyReserve: false
  });

  // Settings State
  const [storeSettings, setStoreSettings] = useState({
    open24x7: user?.open24x7 ?? true,
    driveThru: user?.driveThru ?? true,
    emergencyReserveDesk: user?.emergencyReserveDesk ?? true,
    lowStockThreshold: user?.lowStockThreshold ?? 15,
    criticalICUReserveRatio: user?.criticalICUReserveRatio ?? 20,
    pharmacistInCharge: user?.pharmacistInCharge || 'Dr. Rajiv Menon, PharmD',
    phone: user?.phone || '+1 (555) 234-8849'
  });

  const pharmacyId = user?.id || 'pharma-1';

  // Live Timer tick for 2-hour reservations countdown
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter medicines for this pharmacy
  const pharmacyInventoryList = useMemo(() => {
    return medicines
      .map((med) => {
        const inv = med.pharmacyInventory?.find((i) => i.pharmacyId === pharmacyId) || {
          pharmacyId,
          status: 'OUT_OF_STOCK',
          units: 0,
          price: med.basePrice,
          batchNo: med.batchNo || 'PENDING',
          expiryDate: '2027-08',
          lastSync: 'Sync pending'
        };
        return {
          medicine: med,
          inv
        };
      })
      .filter(({ medicine, inv }) => {
        // Search query
        if (inventorySearch.trim()) {
          const q = inventorySearch.toLowerCase();
          const matchBrand = medicine.brandName.toLowerCase().includes(q);
          const matchGen = medicine.genericName.toLowerCase().includes(q);
          const matchId = medicine.medId?.toLowerCase().includes(q);
          const matchBatch = inv.batchNo?.toLowerCase().includes(q);
          if (!matchBrand && !matchGen && !matchId && !matchBatch) return false;
        }

        // Category filter
        if (categoryFilter !== 'all' && medicine.category !== categoryFilter) {
          return false;
        }

        // Stock status filter
        if (stockFilter !== 'all' && inv.status !== stockFilter) {
          return false;
        }

        return true;
      });
  }, [medicines, pharmacyId, inventorySearch, categoryFilter, stockFilter]);

  // Reservation counts
  const activeHoldReservations = reservations.filter((r) => r.status === 'HOLDING');
  const activeDeliveryOrders = deliveryOrders.filter((d) => d.status !== 'DELIVERED');

  // Handle direct inline stock modification
  const handleStockDelta = (medId, currentUnits, delta) => {
    const newUnits = Math.max(0, currentUnits + delta);
    updateMedicineInventory(pharmacyId, medId, { units: newUnits });
  };

  const handleStockInputChange = (medId, value) => {
    const parsed = parseInt(value, 10);
    const newUnits = isNaN(parsed) ? 0 : Math.max(0, parsed);
    updateMedicineInventory(pharmacyId, medId, { units: newUnits });
  };

  // Add new drug submit
  const handleAddDrugSubmit = (e) => {
    e.preventDefault();
    if (!newDrugForm.brandName.trim()) {
      showToast('Brand Name is required to add drug.', 'error');
      return;
    }

    addMedicineToInventory(pharmacyId, newDrugForm);
    setIsAddDrugModalOpen(false);
    setNewDrugForm({
      brandName: '',
      genericName: '',
      strength: '500 mg',
      category: 'antibiotics',
      dosageForm: 'Tablets',
      price: 180,
      units: 35,
      batchNo: `BT-${Math.floor(1000 + Math.random() * 9000)}`,
      expiryDate: '2027-10',
      prescriptionRequired: true,
      isColdChain: false,
      isEmergencyReserve: false
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updatePharmacySettings(pharmacyId, storeSettings);
  };

  // Helper for reservation timer countdown
  const getRemainingTimeDisplay = (expiresAt) => {
    const diffMs = expiresAt - currentTime;
    if (diffMs <= 0) {
      return { text: 'EXPIRED', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    }
    const mins = Math.floor(diffMs / 60000);
    const secs = Math.floor((diffMs % 60000) / 1000);
    const text = `${mins}m ${secs < 10 ? '0' : ''}${secs}s remaining`;
    if (mins < 15) {
      return { text, color: 'text-rose-700 bg-rose-50 border-rose-300 font-bold animate-pulse' };
    }
    if (mins < 45) {
      return { text, color: 'text-amber-800 bg-amber-50 border-amber-300 font-semibold' };
    }
    return { text, color: 'text-teal-800 bg-teal-50 border-teal-200 font-medium' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Pharmacy Master Command Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-teal-800/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                <span>Licensed Dispensary Station</span>
              </span>
              <span className="font-mono text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-200 border border-white/10">
                License: {user?.licenseNumber || 'DL-CA-84920'}
              </span>
              {storeSettings.open24x7 && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
                  <Clock className="w-3 h-3" />
                  <span>24/7 ACTIVE</span>
                </span>
              )}
              {storeSettings.driveThru && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-200 bg-sky-500/20 px-2.5 py-1 rounded-full border border-sky-400/30">
                  <Car className="w-3 h-3" />
                  <span>Drive-Thru Window</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user?.name || 'Green Cross 24/7 Pharmacy'}
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/80 max-w-xl">
              Pharmacist in-Charge: <strong>{storeSettings.pharmacistInCharge}</strong> • {user?.address || '12th Main Road, Koramangala'} (PIN: {user?.pincode || '560034'})
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddDrugModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-900/40 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Drug to Inventory</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Workstation Logout</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Formulary Catalog</span>
            <p className="text-xl font-black text-white mt-0.5">{medicines.length} Medicines</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Active 2-Hour Shelf Holds</span>
            <p className="text-xl font-black text-amber-300 mt-0.5">
              {activeHoldReservations.length} Reserved Holds
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Courier Deliveries</span>
            <p className="text-xl font-black text-teal-200 mt-0.5">
              {activeDeliveryOrders.length} Pending Courier
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Emergency ICU Desk</span>
            <p className="text-xl font-black text-rose-300 mt-0.5">
              {medicines.filter(m => m.pharmacyInventory?.some(i => i.pharmacyId === pharmacyId && i.status === 'EMERGENCY_RESERVE')).length} Drugs Guarded
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'inventory', label: 'Live Inventory Manager', count: pharmacyInventoryList.length, icon: Package },
          { id: 'reservations', label: '2-Hour Shelf-Hold Queue', count: activeHoldReservations.length, icon: Timer },
          { id: 'deliveries', label: 'Courier Delivery Orders', count: activeDeliveryOrders.length, icon: Truck },
          { id: 'settings', label: 'Dispensary & Facility Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-teal-700 text-white shadow-sm shadow-teal-700/20'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white text-teal-800' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: LIVE INVENTORY MANAGER */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Search inventory by Brand, Generic Molecule, NDC, or Batch #..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Drug Categories</option>
                {MEDICINE_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Stock Statuses</option>
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock (&lt; 10)</option>
                <option value="EMERGENCY_RESERVE">Emergency / ICU Only</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>

              <button
                onClick={() => setIsAddDrugModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ml-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Drug</span>
              </button>
            </div>
          </div>

          {/* Real-time Inventory Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Live Shelved Formulary ({pharmacyInventoryList.length} SKUs Listed)
                </h3>
              </div>
              <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Stock changes sync immediately with patient search & emergency dispatch
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3.5">Medicine & Strength</th>
                    <th className="p-3.5">Generic Molecule</th>
                    <th className="p-3.5">Category & Class</th>
                    <th className="p-3.5">Batch / Expiry</th>
                    <th className="p-3.5">Unit Price</th>
                    <th className="p-3.5 text-center">Live Units (Stock)</th>
                    <th className="p-3.5">Stock Status</th>
                    <th className="p-3.5 text-right">Emergency Reserve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pharmacyInventoryList.map(({ medicine, inv }) => {
                    const isEmergency = inv.status === 'EMERGENCY_RESERVE';
                    const isOutOfStock = inv.units === 0 || inv.status === 'OUT_OF_STOCK';
                    const isLowStock = inv.units > 0 && inv.units < 10;

                    return (
                      <tr key={medicine.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Brand Name & MedId */}
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 text-sm">
                            {medicine.brandName}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                              {medicine.medId}
                            </span>
                            <span className="text-slate-500 text-[11px] font-medium">
                              {medicine.strength} • {medicine.dosageForm}
                            </span>
                            {medicine.isColdChain && (
                              <span className="text-[10px] text-blue-600 bg-blue-50 px-1 py-0.5 rounded font-semibold flex items-center gap-0.5">
                                <Snowflake className="w-2.5 h-2.5" /> 2-8°C
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Generic Molecule */}
                        <td className="p-3.5 text-slate-600 max-w-xs">
                          <div className="font-medium text-slate-800">{medicine.genericName}</div>
                          <div className="text-[11px] text-slate-400">{medicine.manufacturer}</div>
                        </td>

                        {/* Category */}
                        <td className="p-3.5 text-slate-600">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            {medicine.categoryLabel || medicine.category}
                          </span>
                        </td>

                        {/* Batch & Expiry */}
                        <td className="p-3.5 font-mono text-[11px] text-slate-600">
                          <div className="font-bold text-slate-800">{inv.batchNo || medicine.batchNo}</div>
                          <div className="text-slate-400">Exp: {inv.expiryDate || '2027-08'}</div>
                        </td>

                        {/* Unit Price */}
                        <td className="p-3.5 font-bold font-mono text-slate-900">
                          ${inv.price?.toFixed(2) || medicine.basePrice?.toFixed(2)}
                        </td>

                        {/* Inline Stock Quantity Editor */}
                        <td className="p-3.5 text-center">
                          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                            <button
                              onClick={() => handleStockDelta(medicine.id, inv.units, -1)}
                              className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 shadow-xs"
                              disabled={inv.units <= 0}
                              title="Decrement 1 unit"
                            >
                              -
                            </button>

                            <input
                              type="number"
                              min="0"
                              value={inv.units}
                              onChange={(e) => handleStockInputChange(medicine.id, e.target.value)}
                              className="w-14 text-center font-mono font-black text-sm bg-transparent border-none focus:outline-none text-slate-900"
                            />

                            <button
                              onClick={() => handleStockDelta(medicine.id, inv.units, 1)}
                              className="w-6 h-6 rounded-lg bg-white hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                              title="Increment 1 unit"
                            >
                              +
                            </button>

                            <button
                              onClick={() => handleStockDelta(medicine.id, inv.units, 10)}
                              className="px-1.5 h-6 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-[10px] flex items-center justify-center transition-colors cursor-pointer border border-teal-200 shadow-xs"
                              title="Fast add 10 units"
                            >
                              +10
                            </button>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="p-3.5">
                          {isEmergency ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] border border-rose-300">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              <span>ICU / TRAUMA ONLY</span>
                            </span>
                          ) : isOutOfStock ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] border border-slate-300">
                              <span>OUT OF STOCK</span>
                            </span>
                          ) : isLowStock ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-300">
                              <span>LOW ({inv.units} Left)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>IN STOCK</span>
                            </span>
                          )}
                        </td>

                        {/* Toggle Emergency / ICU Only Reserve */}
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => toggleEmergencyReserve(pharmacyId, medicine.id, inv.status)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                              isEmergency
                                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200'
                            }`}
                          >
                            <AlertTriangle className="w-3 h-3" />
                            <span>{isEmergency ? 'Guarded for ICU' : 'Tag for ICU'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 2-HOUR SHELF-HOLD QUEUE */}
      {activeTab === 'reservations' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Timer className="w-4 h-4 text-teal-600" />
                <span>Live 2-Hour Patient Shelf-Hold Reservations</span>
              </h3>
              <p className="text-xs text-slate-500">
                Medicines physically placed in pickup bays. Automatically releases back to stock if not dispensed within 120 minutes.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              {activeHoldReservations.length} Holds In-Bay
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map((res) => {
              const remaining = getRemainingTimeDisplay(res.expiresAt);
              const isHolding = res.status === 'HOLDING';
              const isDispensed = res.status === 'DISPENSED';
              const isCancelled = res.status === 'CANCELLED';

              return (
                <div
                  key={res.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isHolding
                      ? 'bg-white border-teal-500/80 shadow-md ring-1 ring-teal-500/20'
                      : isDispensed
                      ? 'bg-slate-50 border-slate-200 opacity-80'
                      : 'bg-rose-50/40 border-rose-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          {res.token}
                        </span>
                        {res.priority === 'EMERGENCY' && (
                          <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-black uppercase">
                            EMERGENCY FAST TRACK
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900">{res.patientName}</h4>
                      <p className="text-xs text-slate-500">
                        Patient ID: <span className="font-mono font-semibold text-slate-700">{res.patientMedId}</span> • Blood: <strong className="text-rose-600">{res.bloodGroup}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs border ${remaining.color}`}>
                        {isHolding ? remaining.text : res.status}
                      </span>
                      <div className="text-[11px] font-bold text-slate-500 mt-1">
                        Shelf: <span className="text-slate-800">{res.shelfNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Drug & Quantity Details */}
                  <div className="my-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{res.medicineName}</span>
                      <span className="text-slate-500 text-[11px]">Qty: {res.quantity} unit(s) reserved</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        ${res.totalPrice?.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-teal-700 font-semibold block">Rx Verified</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  {isHolding && (
                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => cancelReservation(res.id, 'Patient cancelled or expired')}
                        className="px-3.5 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel & Restock
                      </button>

                      <button
                        type="button"
                        onClick={() => completeReservation(res.id)}
                        className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Dispensed / Complete</span>
                      </button>
                    </div>
                  )}

                  {isDispensed && (
                    <div className="pt-2 text-right">
                      <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Successfully Dispensed & Invoiced</span>
                      </span>
                    </div>
                  )}

                  {isCancelled && (
                    <div className="pt-2 text-right">
                      <span className="text-xs font-semibold text-rose-700">
                        Cancelled • Units returned to live shelf
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: COURIER DELIVERY ORDERS */}
      {activeTab === 'deliveries' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-600" />
                <span>Courier Home Delivery & Cold-Chain Dispatch Queue</span>
              </h3>
              <p className="text-xs text-slate-500">
                Assures continuous 2°C - 8°C cold-chain tracking for temperature-sensitive drugs like insulin.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
              {deliveryOrders.length} Orders Recorded
            </span>
          </div>

          <div className="space-y-3">
            {deliveryOrders.map((order) => {
              const isReady = order.status === 'DISPATCH_READY';
              const isInTransit = order.status === 'IN_TRANSIT';

              return (
                <div
                  key={order.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {order.orderRef}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900">{order.patientName}</h4>
                      <span className="text-xs text-slate-500">({order.patientMedId})</span>

                      {order.coldChainRequired ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold">
                          <Snowflake className="w-3 h-3 text-blue-600" />
                          <span>Cold-Chain Vault: 4.2°C Certified</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          Standard Ambient Pack
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-2">
                      <span>Delivery To: <strong className="text-slate-800">{order.deliveryAddress}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span>Phone: <strong className="text-slate-800">{order.phone}</strong></span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
                          {item.qty}x {item.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="text-right">
                      <span className="font-mono text-base font-black text-slate-900">
                        ${order.totalAmount?.toFixed(2)}
                      </span>
                      <p className="text-[11px] text-slate-400">Placed {order.placedAt}</p>
                    </div>

                    {isReady && (
                      <button
                        onClick={() => dispatchDeliveryOrder(order.id)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dispatch to Courier</span>
                      </button>
                    )}

                    {isInTransit && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>In Transit (ETA: {order.etaMins} mins)</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: STORE PROFILE & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Store Profile & Operational Parameters
              </h3>
              <p className="text-xs text-slate-500">
                Configure telemetry indicators displayed to patients and regional trauma networks.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeSettings.open24x7}
                  onChange={(e) => setStoreSettings({ ...storeSettings, open24x7: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span className="text-xs font-bold text-slate-900">24/7 Operating Hours</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Visible on patient map with 24/7 Emergency Badge.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={storeSettings.driveThru}
                  onChange={(e) => setStoreSettings({ ...storeSettings, driveThru: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-slate-700" />
                    <span className="text-xs font-bold text-slate-900">Drive-Thru Window Service</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Enables drive-thru express pickup option for emergency shelf-holds.</p>
                </div>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Emergency Low Stock Alert Threshold (Units)
                  </label>
                  <input
                    type="number"
                    value={storeSettings.lowStockThreshold}
                    onChange={(e) => setStoreSettings({ ...storeSettings, lowStockThreshold: parseInt(e.target.value) || 10 })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Triggers reorder flag when stock drops below this.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Critical ICU Stock Reservation Ratio (%)
                  </label>
                  <input
                    type="number"
                    value={storeSettings.criticalICUReserveRatio}
                    onChange={(e) => setStoreSettings({ ...storeSettings, criticalICUReserveRatio: parseInt(e.target.value) || 20 })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">% of high-potency antibiotics quarantined for ICU orders.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pharmacist In-Charge
                  </label>
                  <input
                    type="text"
                    value={storeSettings.pharmacistInCharge}
                    onChange={(e) => setStoreSettings({ ...storeSettings, pharmacistInCharge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dispensary Desk Phone
                  </label>
                  <input
                    type="text"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-700/20 transition-all cursor-pointer"
              >
                Save Facility Parameters
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: ADD DRUG TO INVENTORY & FORMULARY */}
      {isAddDrugModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Add Drug to Live Shelf</h4>
                  <p className="text-xs text-slate-500">Will be instantly discoverable across MedLink Search</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddDrugModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddDrugSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={newDrugForm.brandName}
                  onChange={(e) => setNewDrugForm({ ...newDrugForm, brandName: e.target.value })}
                  placeholder="e.g. Amoxil Forte, Norvasc, Ventolin"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Generic Molecule</label>
                  <input
                    type="text"
                    value={newDrugForm.genericName}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, genericName: e.target.value })}
                    placeholder="e.g. Amoxicillin Trihydrate"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Strength</label>
                  <input
                    type="text"
                    value={newDrugForm.strength}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, strength: e.target.value })}
                    placeholder="e.g. 500 mg, 100 mcg"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newDrugForm.category}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                  >
                    {MEDICINE_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dosage Form</label>
                  <select
                    value={newDrugForm.dosageForm}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, dosageForm: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                  >
                    {DOSAGE_FORMS.filter(f => f !== 'All Forms').map((form) => (
                      <option key={form} value={form}>{form}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Units</label>
                  <input
                    type="number"
                    value={newDrugForm.units}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, units: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newDrugForm.price}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Batch #</label>
                  <input
                    type="text"
                    value={newDrugForm.batchNo}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, batchNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDrugForm.isEmergencyReserve}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, isEmergencyReserve: e.target.checked })}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="font-bold text-rose-800">Tag as Emergency / ICU Only Reserve</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newDrugForm.isColdChain}
                    onChange={(e) => setNewDrugForm({ ...newDrugForm, isColdChain: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium text-slate-700">Requires 2°C - 8°C Cold-Chain Storage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddDrugModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm cursor-pointer"
                >
                  Confirm & Sync Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
