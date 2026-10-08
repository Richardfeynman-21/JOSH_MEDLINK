import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
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
  Scan,
  Sparkles,
  Plus,
  Stethoscope,
  Building2
} from 'lucide-react';
import OcrPrescriptionScanner from './OcrPrescriptionScanner';

export default function ReservationModal({
  isOpen,
  onClose,
  pharmacy,
  medicine,
  inventoryItem,
}) {
  const { user, createReservation, showToast } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [patientName, setPatientName] = useState(user?.fullName || 'Kavitha Sundaram');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '+91 98401 24892');
  const [hasUploadedRx, setHasUploadedRx] = useState(false);
  const [isOcrScannerOpen, setIsOcrScannerOpen] = useState(false);
  const [scannedRxData, setScannedRxData] = useState(null);
  const [additionalMedicines, setAdditionalMedicines] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    if (isOpen) {
      setIsConfirmed(false);
      setQuantity(1);
      setHasUploadedRx(false);
      setIsOcrScannerOpen(false);
      setScannedRxData(null);
      setAdditionalMedicines([]);
      if (user) {
        setPatientName(user.fullName || 'Kavitha Sundaram');
        setPatientPhone(user.phone || '+91 98401 24892');
      }
      const code = `MED-RES-${Math.floor(1000 + Math.random() * 9000)}-2H`;
      setReservationCode(code);
      setTimeLeft(7200);
    }
  }, [isOpen, pharmacy, medicine, user]);

  // Escape key dismiss listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Countdown timer for 2-hour guarantee
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

  const handleOcrComplete = (data) => {
    setScannedRxData(data.preset);
    setHasUploadedRx(true);
    setIsOcrScannerOpen(false);
    showToast(
      `Prescription verified from ${data.preset.hospital}. Doctor: ${data.preset.doctor}.`,
      'clinical',
      'AI OCR Verification Passed'
    );
  };

  const handleAddMedicineFromRx = (matchedDbMed, rxMed) => {
    if (additionalMedicines.some((m) => m.id === matchedDbMed.id)) {
      showToast(`${matchedDbMed.brandName} is already added to this reservation.`, 'info');
      return;
    }
    setAdditionalMedicines((prev) => [...prev, { ...matchedDbMed, rxInstructions: rxMed.dosage }]);
    showToast(`Added ${matchedDbMed.brandName} to your shelf hold reservation.`, 'success', 'Prescription Item Added');
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (createReservation) {
      const res = createReservation(pharmacy.id, medicine.id, quantity, {
        patientName,
        phone: patientPhone,
        patientMedId: user?.id || '#ML-849201',
        additionalMedicines
      });
      if (res?.token) {
        setReservationCode(res.token);
      }
    }
    setIsConfirmed(true);
  };

  const copyCode = () => {
    navigator?.clipboard?.writeText?.(reservationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const basePrice = (inventoryItem?.price || medicine.basePrice) * quantity;
  const extraPrice = additionalMedicines.reduce((acc, m) => acc + (m.basePrice || 0), 0);
  const totalPrice = basePrice + extraPrice;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <Package className="w-5 h-5 text-teal-200" aria-hidden="true" />
            </div>
            <div>
              <h3 id="reservation-modal-title" className="font-extrabold text-base md:text-lg leading-tight text-white">
                Hold &amp; Reserve (2-Hour Guarantee)
              </h3>
              <p className="text-xs text-teal-100/90">
                Guaranteed inventory shelf hold locked with Central Chennai ERP
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reservation dialog"
            className="text-teal-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {!isConfirmed ? (
            <form onSubmit={handleConfirmReservation} className="space-y-4">
              {/* Selected Medicine & Pharmacy Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                      Selected Primary Item
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-1">
                      {medicine.brandName}{' '}
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        ({medicine.strength})
                      </span>
                    </h4>
                    <p className="text-xs text-slate-600 font-medium">{medicine.genericName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">Unit Price</span>
                    <p className="text-base font-black text-slate-900 font-mono tabular-nums">
                      ₹{(inventoryItem?.price || medicine.basePrice).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Additional Rx Medicines Added via OCR */}
                {additionalMedicines.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 block">
                      Additional Prescribed Items Added via OCR ({additionalMedicines.length}):
                    </span>
                    {additionalMedicines.map((extra) => (
                      <div key={extra.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-teal-200/80">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                          <span className="font-bold text-slate-800">{extra.brandName}</span>
                          <span className="text-slate-500 text-[11px]">({extra.strength})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-800 tabular-nums">
                            ₹{extra.basePrice.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => setAdditionalMedicines((prev) => prev.filter((m) => m.id !== extra.id))}
                            className="text-slate-400 hover:text-rose-600 p-0.5"
                            aria-label={`Remove ${extra.brandName}`}
                          >
                            <X className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Pharmacy Node */}
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Building2 className="w-3.5 h-3.5 text-teal-600" aria-hidden="true" />
                    <span>{pharmacy.name}</span>
                  </div>
                  <span className="font-mono text-teal-800 font-bold">{pharmacy.distanceKm} km away</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label htmlFor="reservation-quantity-select" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Quantity Required (Packs / Units)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuantity(num)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border focus-visible:ring-2 focus-visible:ring-teal-500 ${
                        quantity === num
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num} {num === 1 ? 'Pack' : 'Packs'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reservation-patient-name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Patient Name *
                  </label>
                  <input
                    id="reservation-patient-name"
                    name="patientName"
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    autoComplete="name"
                    placeholder="e.g. Kavitha Sundaram…"
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="reservation-patient-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Mobile Number (For OTP/SMS) *
                  </label>
                  <input
                    id="reservation-patient-phone"
                    name="patientPhone"
                    type="tel"
                    inputMode="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="e.g. +91 98401 24892…"
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:bg-white focus:outline-none font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Prescription verification step (Mandatory for Rx drugs or optional for OTC) */}
              <div className="p-4 bg-gradient-to-r from-teal-50/70 to-cyan-50/70 border border-teal-200/80 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-700" aria-hidden="true" />
                    <span className="text-xs font-extrabold text-teal-950">
                      Doctor Prescription Verification (CDSCO Schedule H)
                    </span>
                  </div>
                  {medicine.prescriptionRequired ? (
                    <span className="text-[10px] font-black text-rose-700 uppercase bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-md">
                      Rx Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-teal-700 uppercase bg-teal-100/70 px-2 py-0.5 rounded-md">
                      Optional
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload your doctor prescription or run our <strong>Optical AI OCR Scanner</strong> to verify Schedule H compliance and auto-suggest all other prescribed medicines!
                </p>

                {/* If OCR Scanner Open */}
                {isOcrScannerOpen ? (
                  <OcrPrescriptionScanner
                    onScanComplete={handleOcrComplete}
                    onSelectMedicineForReservation={handleAddMedicineFromRx}
                    currentMedicineId={medicine.id}
                    onClose={() => setIsOcrScannerOpen(false)}
                  />
                ) : hasUploadedRx && scannedRxData ? (
                  /* Verified Rx Preview Card */
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                        <span className="text-xs font-bold text-slate-900">
                          {scannedRxData.hospital}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        OCR Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Prescribed by <strong className="text-slate-800">{scannedRxData.doctor}</strong> (Reg: {scannedRxData.regNo})
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsOcrScannerOpen(true)}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-1"
                      >
                        <Scan className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Re-Scan / View Rx Details</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Action Buttons to open Scanner */
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsOcrScannerOpen(true)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 transition-transform cursor-pointer inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                      <Scan className="w-4 h-4 text-cyan-200 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                      <span>Scan &amp; Verify Prescription with AI OCR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasUploadedRx(true)}
                      className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                      <span>Present Hardcopy at Counter</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Total & Policy Notice */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Pay at Counter:</span>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    ₹{totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Zero Advance Fee
                  </span>
                  <span>Held strictly for 120 minutes</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-teal-600/30 transition-colors cursor-pointer inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <span>Confirm Shelf Hold &amp; Generate Pickup Token</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          ) : (
            /* Confirmation Screen with Countdown */
            <div className="space-y-4 py-2 animate-fadeIn">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce motion-reduce:animate-none">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
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
                  <Clock className="w-4 h-4 text-amber-600 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Time Remaining to Pickup
                </span>
                <div className="text-3xl font-black text-amber-950 font-mono tracking-wider tabular-nums">
                  {formatTimer(timeLeft)}
                </div>
                <p className="text-[11px] text-amber-800">
                  Pharmacist hold expires if not claimed within 2 hours.
                </p>
              </div>

              {/* Reservation Code Card */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 shadow-xl">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block text-center font-bold">
                  Present this Reservation Token at Counter
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-black font-mono tracking-widest text-teal-300 tabular-nums">
                    {reservationCode}
                  </span>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
                    title="Copy token"
                    aria-label="Copy reservation token"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
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
                    <Phone className="w-3 h-3" aria-hidden="true" /> {pharmacy.phone}
                  </a>
                </div>
                <p className="text-slate-500">{pharmacy.address}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400"
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
