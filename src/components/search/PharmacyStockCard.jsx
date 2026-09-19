import React from 'react';
import {
  MapPin,
  Clock,
  Car,
  Phone,
  Navigation,
  ShieldCheck,
  AlertOctagon,
  Lock,
  Star,
  RefreshCw,
  Package,
  Zap,
} from 'lucide-react';

export default function PharmacyStockCard({
  pharmacy,
  inventoryItem,
  medicine,
  onReserve,
  onRequestDelivery,
  onDirections,
  onCallPharmacy,
}) {
  if (!pharmacy || !inventoryItem) return null;

  // Render high-visibility status badge
  const renderStatusBadge = () => {
    switch (inventoryItem.status) {
      case 'IN_STOCK':
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black bg-teal-50 text-teal-800 border-2 border-teal-500 ring-4 ring-teal-500/10 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
            <span className="tracking-wide">IN STOCK ({inventoryItem.units} Units)</span>
          </div>
        );
      case 'LOW_STOCK':
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-50 text-amber-900 border-2 border-amber-400 ring-4 ring-amber-500/10 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="tracking-wide">LOW STOCK ({inventoryItem.units} Units Left)</span>
          </div>
        );
      case 'EMERGENCY_RESERVE':
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black bg-rose-50 text-rose-800 border-2 border-rose-500 ring-4 ring-rose-500/15 shadow-xs animate-pulse">
            <Lock className="w-3.5 h-3.5 text-rose-600" />
            <span className="tracking-wide">RESERVED FOR EMERGENCY / ICU ONLY ({inventoryItem.units} Units)</span>
          </div>
        );
      case 'OUT_OF_STOCK':
      default:
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-500 border border-slate-300">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>OUT OF STOCK</span>
          </div>
        );
    }
  };

  const isAvailable = inventoryItem.status === 'IN_STOCK' || inventoryItem.status === 'LOW_STOCK';
  const isEmergency = inventoryItem.status === 'EMERGENCY_RESERVE';
  const isOutOfStock = inventoryItem.status === 'OUT_OF_STOCK';

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
        isEmergency
          ? 'border-rose-300 ring-1 ring-rose-400/20'
          : isAvailable
          ? 'border-slate-200/90 hover:border-teal-300'
          : 'border-slate-200 opacity-80 bg-slate-50/50'
      }`}
    >
      <div className="p-4 md:p-5 space-y-4">
        {/* Header: Pharmacy Title, Distance & Status Badge */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
                {pharmacy.name}
              </h3>
              <span className="inline-flex items-center font-bold text-xs text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 font-mono">
                • {pharmacy.distanceKm} km away
              </span>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{pharmacy.address} (PIN: {pharmacy.pincode})</span>
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
              <div className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{pharmacy.rating}</span>
                <span className="text-slate-400 font-normal">({pharmacy.reviewsCount})</span>
              </div>

              <span className="text-slate-300">•</span>

              {pharmacy.open24x7 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Clock className="w-3 h-3 text-emerald-600" /> Open 24/7 Now
                </span>
              ) : (
                <span className="text-[11px] text-slate-500 font-medium">
                  {pharmacy.operatingHours}
                </span>
              )}

              {pharmacy.driveThru && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  <Car className="w-3 h-3 text-sky-600" /> Drive-thru
                </span>
              )}

              {pharmacy.emergencyReserveDesk && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  <AlertOctagon className="w-3 h-3 text-rose-600" /> Emergency Desk
                </span>
              )}
            </div>
          </div>

          {/* Right Status Badge */}
          <div className="shrink-0 sm:text-right">
            {renderStatusBadge()}
            {/* Live Inventory sync timestamp */}
            <div className="flex items-center sm:justify-end gap-1 text-[11px] text-slate-500 mt-2">
              <RefreshCw className="w-3 h-3 text-teal-600" />
              <span className="font-medium">{inventoryItem.lastSync}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Fulfillment Guarantee Info */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
                Pharmacy Unit Price
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg md:text-xl font-extrabold text-slate-900 font-mono">
                  ₹{inventoryItem.price.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500">/ pack</span>
              </div>
            </div>

            {inventoryItem.price < medicine.basePrice && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                ₹{(medicine.basePrice - inventoryItem.price).toFixed(2)} below avg
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>ERP Serialized Batch Verified</span>
            </div>
            {inventoryItem.canDeliver && (
              <div className="flex items-center gap-1 font-semibold text-teal-800">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Express 30m Dispatch</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: 4 Required Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Action 1: Hold & Reserve (2h Guarantee) */}
          <button
            type="button"
            onClick={() => onReserve(pharmacy, medicine, inventoryItem)}
            disabled={isOutOfStock}
            aria-label={isEmergency ? `Emergency reserve medicine at ${pharmacy.name}` : `Hold and reserve medicine for 2 hours at ${pharmacy.name}`}
            title={isEmergency ? 'Emergency ICU Priority Reservation' : '2-Hour Stock Reservation Guarantee'}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isEmergency
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{isEmergency ? 'Emergency Reserve (ICU Priority)' : 'Hold & Reserve (2h Guarantee)'}</span>
          </button>

          {/* Action 2: Request Delivery (30 mins) */}
          {inventoryItem.canDeliver && !isOutOfStock && !isEmergency && (
            <button
              type="button"
              onClick={() => onRequestDelivery(pharmacy, medicine, inventoryItem)}
              aria-label={`Request 30-minute express delivery from ${pharmacy.name}`}
              title="30-minute express courier delivery"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-teal-600" />
              <span>Request Delivery (30 mins)</span>
            </button>
          )}

          {/* Action 3: Get Directions */}
          <button
            type="button"
            onClick={() => onDirections(pharmacy)}
            aria-label={`Get directions to ${pharmacy.name}`}
            title={`Directions to ${pharmacy.address}`}
            className="px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-slate-500" />
            <span>Get Directions</span>
          </button>

          {/* Action 4: Call Pharmacy */}
          <button
            type="button"
            onClick={() => onCallPharmacy(pharmacy)}
            aria-label={`Call ${pharmacy.name} dispensary desk`}
            title={`Call ${pharmacy.phone}`}
            className="px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Call Pharmacy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
