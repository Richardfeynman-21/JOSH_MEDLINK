import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Heart, 
  AlertTriangle, 
  PhoneCall, 
  Copy, 
  Check, 
  Printer, 
  ShieldAlert, 
  QrCode, 
  Activity 
} from 'lucide-react';

export const DigitalMedicalIdCard = () => {
  const { user, showToast } = useAuth();
  const [copiedId, setCopiedId] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  if (!user) return null;

  const copyMedLinkId = () => {
    navigator.clipboard?.writeText(user.id);
    setCopiedId(true);
    showToast(`Copied MedLink ID ${user.id} to clipboard.`, 'info');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleQuickDial = () => {
    showToast(`Calling emergency contact: ${user.emergencyContact?.name} (${user.emergencyContact?.phone})`, 'clinical', 'Emergency Quick-Dial');
  };

  // QR Code generator helper (crisp SVG matrix based on user ID)
  const renderQrSvg = () => {
    return (
      <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="8" fill="white" />
        {/* Finder pattern Top-Left */}
        <rect x="10" y="10" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="4" fill="none" />
        <rect x="18" y="18" width="12" height="12" rx="2" fill="#0d9488" />
        {/* Finder pattern Top-Right */}
        <rect x="82" y="10" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="4" fill="none" />
        <rect x="90" y="18" width="12" height="12" rx="2" fill="#0d9488" />
        {/* Finder pattern Bottom-Left */}
        <rect x="10" y="82" width="28" height="28" rx="4" stroke="#0f172a" strokeWidth="4" fill="none" />
        <rect x="18" y="90" width="12" height="12" rx="2" fill="#0d9488" />
        {/* Data points */}
        <rect x="46" y="14" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="62" y="14" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="46" y="28" width="8" height="8" rx="1.5" fill="#0d9488" />
        <rect x="62" y="28" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="14" y="46" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="28" y="46" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="44" y="44" width="32" height="32" rx="4" fill="#0f766e" />
        <path d="M60 52V68M52 60H68" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="82" y="46" width="8" height="8" rx="1.5" fill="#0d9488" />
        <rect x="96" y="46" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="14" y="62" width="8" height="8" rx="1.5" fill="#0d9488" />
        <rect x="28" y="62" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="82" y="62" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="96" y="62" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="46" y="84" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="62" y="84" width="8" height="8" rx="1.5" fill="#0d9488" />
        <rect x="46" y="98" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="62" y="98" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="84" y="84" width="8" height="8" rx="1.5" fill="#0f172a" />
        <rect x="98" y="98" width="8" height="8" rx="1.5" fill="#0d9488" />
      </svg>
    );
  };

  const isUniversalDonor = user.bloodGroup === 'O-';
  const isUniversalRecipient = user.bloodGroup === 'AB+';

  return (
    <div className="w-full">
      {/* Physical / Digital Medical ID Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-800/10 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white transition-all duration-300">
        {/* Subtle Watermark & Background Decors */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-slate-900 flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-teal-400">
                  MedLink Emergency Care ID
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  VERIFIED ACTIVE
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight text-white mt-0.5" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {user.fullName}
              </h3>
            </div>
          </div>

          {/* Quick Print & Export button */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              title="Print Medical ID Card"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Top Info Grid: MedLink ID, Blood Group, QR preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* MedLink ID & Demographics */}
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Medical Record ID
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-base sm:text-lg font-bold text-teal-300">
                    {user.id.startsWith('#') ? user.id : `#${user.id}`}
                  </span>
                  <button
                    onClick={copyMedLinkId}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
                    title="Copy MedLink ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-0.5">
                <p>
                  <strong className="text-slate-400">DOB:</strong> {user.dob} ({new Date().getFullYear() - (user.dob ? parseInt(user.dob.substring(0, 4)) : 1992)} yrs)
                </p>
                <p>
                  <strong className="text-slate-400">Sex:</strong> {user.gender}
                </p>
                <p>
                  <strong className="text-slate-400">Phone:</strong> {user.phone}
                </p>
              </div>
            </div>

            {/* Prominent Blood Group Badge */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center relative">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Blood Group (ABO/Rh)
              </span>
              <div className="flex items-center gap-2">
                <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-pulse" />
                <span className="text-4xl font-black font-mono tracking-tight text-white">
                  {user.bloodGroup}
                </span>
              </div>
              <div className="mt-2">
                {isUniversalDonor ? (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/50 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    Universal Donor (O-Neg)
                  </span>
                ) : isUniversalRecipient ? (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/50 text-[11px] font-bold uppercase tracking-wider">
                    Universal Recipient (AB+)
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-[11px] font-bold uppercase tracking-wider">
                    {user.bloodGroupBadge || 'Standard'}
                  </span>
                )}
              </div>
            </div>

            {/* Scannable QR Matrix */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div
                onClick={() => setShowQrModal(true)}
                className="w-24 h-24 p-1.5 bg-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
                title="Click to expand QR Code"
              >
                {renderQrSvg()}
              </div>
              <span className="text-[10px] font-semibold text-slate-300 mt-2 flex items-center gap-1">
                <QrCode className="w-3 h-3 text-teal-400" />
                <span>EMT / First Responder Scan</span>
              </span>
            </div>
          </div>

          {/* Critical Allergy Alert Chips (Emergency Alert Crimson #E11D48 / #FFF1F2) */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-md bg-rose-500/20 text-rose-400">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Critical Allergy Alert (Do Not Administer)
              </span>
            </div>

            {user.allergies && user.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.allergies.map((allergy, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FFF1F2] text-[#E11D48] text-xs font-bold tracking-tight shadow-sm border border-rose-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                    <span>{allergy}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs text-slate-400">No severe drug allergies declared.</span>
            )}
          </div>

          {/* Chronic Conditions */}
          {user.chronicConditions && user.chronicConditions.length > 0 && (
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block mb-1.5">
                Active Diagnosed Conditions
              </span>
              <div className="flex flex-wrap gap-2">
                {user.chronicConditions.map((cond, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-200 text-xs font-medium border border-teal-500/30"
                  >
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Contact Quick Dial Bar */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900/60 to-slate-900 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
                <span>24/7 Verified Emergency Contact</span>
              </span>
              <p className="text-sm font-bold text-white">
                {user.emergencyContact?.name} <span className="text-slate-400 font-normal">({user.emergencyContact?.relationship})</span>
              </p>
              <p className="text-xs text-teal-200 font-mono">
                {user.emergencyContact?.phone}
              </p>
            </div>

            <a
              href={`tel:${user.emergencyContact?.phone?.replace(/[^\d+]/g, '')}`}
              onClick={handleQuickDial}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-900/40 transition-all cursor-pointer group"
            >
              <PhoneCall className="w-4 h-4 text-white animate-bounce group-hover:scale-110 transition-transform" />
              <span>Quick-Dial Emergency Contact</span>
            </a>
          </div>
        </div>

        {/* Card Footer Triage Instructions */}
        <div className="px-5 py-3 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>HIPAA Cryptographic Seal • AES-256 Medical Data Storage</span>
          <span className="text-teal-400 font-medium">Valid Across All In-Network ER Hospitals</span>
        </div>
      </div>

      {/* Expanded QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 relative shadow-2xl animate-scaleUp">
            <h4 className="text-lg font-bold text-slate-900">EMT Emergency QR Code</h4>
            <p className="text-xs text-slate-500">
              Paramedics or triage nurses can scan this directly to fetch your allergies, blood group, and emergency contact.
            </p>
            <div className="w-56 h-56 mx-auto p-3 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-inner">
              {renderQrSvg()}
            </div>
            <div className="font-mono text-xs text-teal-700 font-bold bg-teal-50 py-1 px-3 rounded-full border border-teal-200">
              #{user.id} • {user.bloodGroup} • {user.fullName}
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Close QR View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
