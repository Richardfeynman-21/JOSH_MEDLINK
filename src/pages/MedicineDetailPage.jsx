import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_MEDICINES, MOCK_PHARMACIES } from '../data/mockMedicines';
import ReservationModal from '../components/search/ReservationModal';
import PageHeader from '../components/common/PageHeader';
import {
  Home,
  ChevronRight,
  Building2,
  ThermometerSnowflake,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ArrowRightLeft,
  MapPin,
  Package,
  Scan,
  ArrowLeft,
  Car
} from 'lucide-react';

export default function MedicineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find base medicine
  const baseMedicine = useMemo(() => {
    return MOCK_MEDICINES.find((m) => m.id === id) || null;
  }, [id]);

  // Bi-directional generic switch state
  const [isSwitchedToGeneric, setIsSwitchedToGeneric] = useState(false);

  // Reservation modal state
  const [reservationModalData, setReservationModalData] = useState(null);

  // Active display medicine (either switched generic or original brand)
  const displayMedicine = useMemo(() => {
    if (!baseMedicine) return null;
    if (isSwitchedToGeneric && baseMedicine.genericEquivalent) {
      const gen = baseMedicine.genericEquivalent;
      const discount = (gen.savingsPercent || 60) / 100;
      return {
        ...baseMedicine,
        id: `generic-${baseMedicine.id}`,
        brandName: gen.brandName,
        genericName: baseMedicine.genericName,
        basePrice: gen.price || Math.round(baseMedicine.basePrice * (1 - discount)),
        manufacturer: gen.manufacturer || 'Cipla / Jan Aushadhi',
        isGeneric: true,
        savingsPercent: gen.savingsPercent || 60,
        pharmacyInventory: baseMedicine.pharmacyInventory?.map((inv) => ({
          ...inv,
          price: Math.round(inv.price * (1 - discount)),
        })),
      };
    }
    return baseMedicine;
  }, [baseMedicine, isSwitchedToGeneric]);

  // Join pharmacy details with inventory
  const pharmacyStockList = useMemo(() => {
    if (!displayMedicine) return [];
    return MOCK_PHARMACIES.map((ph) => {
      const inv = displayMedicine.pharmacyInventory?.find((i) => i.pharmacyId === ph.id);
      return {
        ...ph,
        stockStatus: inv?.stockStatus || 'out_of_stock',
        quantity: inv?.quantity || 0,
        price: inv?.price || displayMedicine.basePrice,
        verifiedAt: inv?.verifiedAt || '15 mins ago',
      };
    }).sort((a, b) => {
      if (a.stockStatus === 'in_stock' && b.stockStatus !== 'in_stock') return -1;
      if (b.stockStatus === 'in_stock' && a.stockStatus !== 'in_stock') return 1;
      return a.distance - b.distance;
    });
  }, [displayMedicine]);

  if (!baseMedicine) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-md">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Medicine Record Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested pharmaceutical item &ldquo;{id}&rdquo; was not found in the CDSCO Chennai registry.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Medicine Search</span>
        </Link>
      </div>
    );
  }

  const generic = baseMedicine.genericEquivalent;
  const savingsAmount = generic ? baseMedicine.basePrice - generic.price : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      {/* Sleek Page Header with Brand Logo & Single Login Button */}
      <PageHeader
        breadcrumbs={[
          { label: 'Medicine Search', href: '/search' },
          { label: displayMedicine.brandName }
        ]}
        badge={displayMedicine.scheduleClass}
        badgeVariant="teal"
        actions={
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
          </Link>
        }
      />

      {/* Main Medicine Detail Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                {displayMedicine.dosageForm} • {displayMedicine.strength}
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                CDSCO {displayMedicine.scheduleClass}
              </span>
              {displayMedicine.isGeneric && (
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                  Bioequivalent Generic Selected
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {displayMedicine.brandName}
            </h1>

            <p className="text-base text-teal-800 font-semibold font-mono">
              Active Molecule: {displayMedicine.genericName}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-slate-700 font-medium">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {displayMedicine.manufacturer}
              </span>
              <span>•</span>
              <span>Pack Size: <strong className="text-slate-800">{displayMedicine.packSize}</strong></span>
              <span>•</span>
              <span>Indication: <strong className="text-slate-800">{displayMedicine.indications}</strong></span>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left lg:text-right shrink-0 space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">
              Reference Retail Price
            </span>
            <div className="flex items-baseline lg:justify-end gap-1.5">
              <span className="text-3xl font-black text-slate-900 font-mono tabular-nums">
                ₹{displayMedicine.basePrice.toFixed(2)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ pack</span>
            </div>
            <span className="text-xs text-teal-700 font-semibold block">
              {displayMedicine.prescriptionRequired ? 'Schedule H Prescribed Drug' : 'Over-the-Counter (OTC)'}
            </span>
          </div>
        </div>

        {/* Clinical Storage & Compliance Ribbons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
            displayMedicine.coldChainRequired ? 'bg-blue-50/70 border-blue-200 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <ThermometerSnowflake className={`w-4 h-4 shrink-0 mt-0.5 ${
              displayMedicine.coldChainRequired ? 'text-blue-600' : 'text-slate-500'
            }`} />
            <div className="text-xs">
              <span className="font-bold block">
                {displayMedicine.coldChainRequired ? 'Cold Chain Storage (2°C – 8°C)' : 'Room Temp (< 25°C)'}
              </span>
              <span className="text-[11px] text-slate-500">{displayMedicine.storageTemp}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border bg-slate-50 border-slate-200 flex items-start gap-2.5 text-slate-800">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold block">CDSCO Regulatory Schedule</span>
              <span className="text-[11px] text-slate-500">{displayMedicine.scheduleClass}</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
            displayMedicine.prescriptionRequired ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
          }`}>
            {displayMedicine.prescriptionRequired ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <span className="font-bold block">
                {displayMedicine.prescriptionRequired ? 'Schedule H Prescribed Drug' : 'General Sale OTC Item'}
              </span>
              <span className="text-[11px] text-slate-500">
                {displayMedicine.prescriptionRequired ? 'Doctor prescription required' : 'No doctor prescription mandatory'}
              </span>
            </div>
          </div>
        </div>

        {/* BI-DIRECTIONAL GENERIC ALTERNATIVE SWITCHER */}
        {isSwitchedToGeneric ? (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Active: Bioequivalent Generic Selection
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    Currently Viewing: {displayMedicine.brandName}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Switched from original brand <strong className="text-slate-800">{baseMedicine.brandName}</strong>. Identical molecule <strong className="text-teal-900">{baseMedicine.genericName}</strong>.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSwitchedToGeneric(false)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2 shrink-0"
              >
                <ArrowRightLeft className="w-4 h-4 text-slate-600" />
                <span>Switch Back to Original Brand ({baseMedicine.brandName})</span>
              </button>
            </div>
          </div>
        ) : generic && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Bioequivalent Generic Alternative Available
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      Save {generic.savingsPercent}%
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {generic.brandName} <span className="text-xs font-normal text-slate-500">by {generic.manufacturer}</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {generic.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 bg-white/90 p-3 rounded-xl border border-emerald-200">
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                      ₹{baseMedicine.basePrice.toFixed(2)}
                    </span>
                    <span className="text-xl font-black text-emerald-700 font-mono tabular-nums">
                      ₹{generic.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800">
                    Save ₹{savingsAmount.toFixed(2)} per pack
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSwitchedToGeneric(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-colors cursor-pointer"
                >
                  Switch &amp; Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CHENNAI PHARMACY INVENTORY & 2-HOUR SHELF HOLD LIST */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Chennai Real-Time Dispensary Availability
            </h2>
            <p className="text-xs text-slate-500">
              Live stock status across 7 verified Chennai medical centers. Guaranteed 2-hour shelf reserve.
            </p>
          </div>

          <Link
            to="/ocr-scanner"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition-colors"
          >
            <Scan className="w-3.5 h-3.5 text-teal-600" />
            <span>Scan Doctor Prescription</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pharmacyStockList.map((pharmacy) => {
            const isInStock = pharmacy.stockStatus === 'in_stock';
            const isLowStock = pharmacy.stockStatus === 'low_stock';

            return (
              <div
                key={pharmacy.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 antigravity-float"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                        {pharmacy.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{pharmacy.area}, Chennai ({pharmacy.pincode})</span>
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                      isInStock
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isLowStock
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {isInStock ? `${pharmacy.quantity} in stock` : isLowStock ? `${pharmacy.quantity} left` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-mono font-semibold">
                      {pharmacy.distance} km away
                    </span>
                    {pharmacy.open24x7 && (
                      <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded font-bold">
                        24/7 Dispensary
                      </span>
                    )}
                    {pharmacy.driveThru && (
                      <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded flex items-center gap-1">
                        <Car className="w-3 h-3" /> Drive-Thru
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Unit Price:</span>
                    <span className="text-base font-black text-slate-900 font-mono tabular-nums">
                      ₹{pharmacy.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={!isInStock && !isLowStock}
                    onClick={() => {
                      setReservationModalData({
                        pharmacy,
                        medicine: displayMedicine,
                        inventoryItem: { price: pharmacy.price, quantity: pharmacy.quantity },
                      });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <Package className="w-4 h-4" />
                    <span>{isInStock || isLowStock ? 'Reserve (2-Hour Hold)' : 'Notify When In Stock'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reservation Modal Dialog */}
      {reservationModalData && (
        <ReservationModal
          isOpen={Boolean(reservationModalData)}
          onClose={() => setReservationModalData(null)}
          pharmacy={reservationModalData.pharmacy}
          medicine={reservationModalData.medicine}
          inventoryItem={reservationModalData.inventoryItem}
        />
      )}
    </div>
  );
}
