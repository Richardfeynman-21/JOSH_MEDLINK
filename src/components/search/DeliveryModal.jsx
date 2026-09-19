import React, { useState } from 'react';
import {
  X,
  Zap,
  MapPin,
  ThermometerSnowflake,
  Bike,
  Building,
} from 'lucide-react';

export default function DeliveryModal({
  isOpen,
  onClose,
  pharmacy,
  medicine,
  inventoryItem,
}) {
  const [deliveryAddress, setDeliveryAddress] = useState(
    'Flat 402, Green Oaks Apartment, 5th Block, Koramangala, Bangalore - 560034'
  );
  const [patientPhone, setPatientPhone] = useState('+91 98450 12345');
  const [deliveryNotes, setDeliveryNotes] = useState('Ring doorbell twice / Call on arrival');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen || !pharmacy || !medicine) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderId(`DLV-${Math.floor(100000 + Math.random() * 900000)}`);
    setOrderPlaced(true);
  };

  const unitPrice = inventoryItem?.price || medicine.basePrice;
  const deliveryFee = 35.00;
  const totalPrice = unitPrice + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg leading-tight">
                Request Express Delivery (30 mins)
              </h3>
              <p className="text-xs text-slate-400">
                Direct pharmacy rider dispatch with cold-chain protection
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-4">
          {!orderPlaced ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Dispatch Route Card */}
              <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-900 uppercase tracking-wider">
                    Fulfillment Hub
                  </span>
                  <span className="font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                    ETA: ~{pharmacy.deliveryEtaMins || 25} mins
                  </span>
                </div>
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <Building className="w-4 h-4 text-teal-600" />
                  <span>{pharmacy.name}</span>
                  <span className="text-xs font-normal text-slate-500 font-mono">
                    ({pharmacy.distanceKm} km away)
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Item: <strong className="text-slate-900">{medicine.brandName}</strong> ({medicine.strength})
                </div>
              </div>

              {/* Cold Chain Courier Assurance */}
              {medicine.isColdChain && (
                <div className="p-3.5 bg-cyan-50 border border-cyan-300 rounded-2xl flex items-start gap-2.5 text-xs text-cyan-950">
                  <ThermometerSnowflake className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold uppercase tracking-wider block">
                      Cold Chain Secured Delivery Box
                    </span>
                    <p className="text-cyan-800">
                      Rider is assigned an insulated cooler with active calibrated 2°C–8°C thermal gel packs.
                    </p>
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Delivery Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Mobile Phone & Special Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Delivery Instructions
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Medicine Pack Price:</span>
                  <span className="font-mono font-bold text-slate-900">₹{unitPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-teal-600" />
                    Express Courier (within 30m):
                  </span>
                  <span className="font-mono font-bold text-slate-900">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total Payable:</span>
                  <span className="font-mono text-teal-700 text-base">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Confirm Express Dispatch • ₹{totalPrice.toFixed(2)}</span>
              </button>
            </form>
          ) : (
            /* Order Placed Tracking Screen */
            <div className="space-y-4 py-2 text-center">
              <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                <Bike className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Express Delivery Dispatched!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Order ID: <strong className="font-mono text-slate-800">{orderId}</strong>
                </p>
              </div>

              {/* Live Tracking Timeline */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800">Pharmacy Order Verified</span>
                    <span className="text-[10px] text-slate-400 block">Pharmacist picked from sealed batch</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                    <Bike className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-900">Rider Dispatched (En Route)</span>
                    <span className="text-[10px] text-teal-700 block">Estimated delivery in 24 mins</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-700">Handover &amp; OTP Verification</span>
                    <span className="text-[10px] text-slate-400 block">{deliveryAddress}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
