import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  Upload,
  Copy,
  Check,
  Phone,
  ArrowRight,
  Package,
} from 'lucide-react';

export default function ReservationModal({
  isOpen,
  onClose,
  pharmacy,
  medicine,
  inventoryItem,
}) {
  const [quantity, setQuantity] = useState(1);
  const [patientName, setPatientName] = useState('Rahul Verma');
  const [patientPhone, setPatientPhone] = useState('+91 98450 12345');
  const [hasUploadedRx, setHasUploadedRx] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      setQuantity(1);
      const code = `MED-RES-${Math.floor(1000 + Math.random() * 9000)}-2H`;
      setReservationCode(code);
      setTimeLeft(7200);
    }
  }, [isOpen, pharmacy, medicine]);

  useEffect(() => {
    if (!isConfirmed) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isConfirmed]);

  if (!isOpen || !pharmacy || !medicine) return null;

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(reservationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPrice = (inventoryItem?.price || medicine.basePrice) * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-teal-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-800/80 border border-teal-500/50 flex items-center justify-center">
              <Package className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="font-extrabold text-base md:text-lg leading-tight">
                Hold &amp; Reserve (2-Hour Guarantee)
              </h3>
              <p className="text-xs text-teal-100/90">
                Guaranteed inventory shelf hold powered by Central ERP lock
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-teal-200 hover:text-white p-1.5 rounded-full hover:bg-teal-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-4">
          {!isConfirmed ? (
            <form onSubmit={handleConfirmReservation} className="space-y-4">
              {/* Medicine & Pharmacy Card Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      Medicine Selected
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      {medicine.brandName}{' '}
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        ({medicine.strength})
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500">{medicine.genericName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Unit Price</span>
                    <p className="text-base font-bold text-slate-900 font-mono">
                      ₹{(inventoryItem?.price || medicine.basePrice).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {pharmacy.name}
                  </span>
                  <span className="font-mono text-teal-700 font-bold">
                    {pharmacy.distanceKm} km away
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Pack Quantity
                </label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuantity(num)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        quantity === num
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {num} {num === 1 ? 'Pack' : 'Packs'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Mobile Number (For OTP/Pickup SMS)
                  </label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:border-teal-600 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Prescription verification toggle if Rx required */}
              {medicine.prescriptionRequired && (
                <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-rose-900">
                        Doctor Prescription Required (Schedule H)
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-100 px-2 py-0.5 rounded">
                      Mandatory
                    </span>
                  </div>
                  <p className="text-xs text-rose-800/80">
                    Pharmacist must verify prescription upon pickup. Upload digital copy now or present hardcopy at counter.
                  </p>
                  <button
                    type="button"
                    onClick={() => setHasUploadedRx(!hasUploadedRx)}
                    className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      hasUploadedRx
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-50'
                    }`}
                  >
                    {hasUploadedRx ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Rx Document Attached (Verified)</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Digital Rx / e-Prescription</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Total & Policy Notice */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Pay at Counter:</span>
                  <div className="text-xl font-black text-slate-900 font-mono">
                    ₹{totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5" /> Zero Advance Fee
                  </span>
                  <span>Held strictly for 120 minutes</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Confirm Shelf Hold &amp; Generate Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Confirmation Screen with Countdown */
            <div className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Shelf Hold Confirmed!
                </h4>
                <p className="text-xs text-slate-600">
                  {quantity}x {medicine.brandName} reserved at {pharmacy.name}.
                </p>
              </div>

              {/* Countdown Bar */}
              <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl text-center space-y-1">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                  Time Remaining to Pickup
                </span>
                <div className="text-3xl font-black text-amber-950 font-mono tracking-wider">
                  {formatTimer(timeLeft)}
                </div>
                <p className="text-[11px] text-amber-800">
                  Pharmacist hold expires if not claimed within 2 hours.
                </p>
              </div>

              {/* Reservation Code Card */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block text-center font-bold">
                  Present this Reservation Token at Counter
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-black font-mono tracking-widest text-teal-300">
                    {reservationCode}
                  </span>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 cursor-pointer"
                    title="Copy token"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  SMS sent to <strong className="text-slate-200 font-mono">{patientPhone}</strong>
                </p>
              </div>

              {/* Pharmacy Details & Direct Dial */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{pharmacy.name}</span>
                  <a
                    href={`tel:${pharmacy.phone}`}
                    className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> {pharmacy.phone}
                  </a>
                </div>
                <p className="text-slate-500">{pharmacy.address}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close &amp; Return to Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
