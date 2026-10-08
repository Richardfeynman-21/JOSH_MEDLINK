import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OcrPrescriptionScanner from '../components/search/OcrPrescriptionScanner';
import PageHeader from '../components/common/PageHeader';
import {
  Home,
  ChevronRight,
  Scan,
  ArrowRight,
  FileCheck2,
  Search,
  ArrowLeft
} from 'lucide-react';

export default function PrescriptionScanPage() {
  const navigate = useNavigate();
  const [lastScannedResult, setLastScannedResult] = useState(null);

  const handleScanComplete = (scanPayload) => {
    setLastScannedResult(scanPayload);
  };

  const handleSelectMedicine = (matchedDbMed) => {
    if (matchedDbMed?.id) {
      navigate(`/medicine/${matchedDbMed.id}`);
    } else if (matchedDbMed?.brandName) {
      navigate(`/search?q=${encodeURIComponent(matchedDbMed.brandName)}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
      {/* Sleek Page Header with Brand Logo & Single Login Button */}
      <PageHeader
        breadcrumbs={[
          { label: 'Medicine Search', href: '/search' },
          { label: 'AI Prescription Scanner' }
        ]}
        badge="Vision OCR Active"
        badgeVariant="cyan"
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-teal-500/30 shadow-xl space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono font-bold border border-teal-500/40">
          <Scan className="w-3.5 h-3.5 text-cyan-400 animate-pulse motion-reduce:animate-none" />
          <span>CDSCO &amp; Tamil Nadu Formulary Optical Reader</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Optical Character Recognition (OCR) Prescription Hub
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Upload any handwritten or digital doctor prescription from Apollo Greams Road, SIMS Vadapalani, or Kauvery Alwarpet. Our vision model parses physician registrations, extracts dosages, and connects to live inventory across Chennai.
        </p>
      </div>

      {/* Main Interactive Scanner Component */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-4 sm:p-6">
        <OcrPrescriptionScanner
          onScanComplete={handleScanComplete}
          onSelectMedicineForReservation={handleSelectMedicine}
        />
      </div>

      {/* Detected Results Quick Action Card */}
      {lastScannedResult?.preset && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Prescription Verified: {lastScannedResult.preset.hospital}
                </h2>
                <p className="text-xs text-slate-600">
                  Doctor: <strong>{lastScannedResult.preset.doctor}</strong> • Patient: <strong>{lastScannedResult.preset.patient}</strong>
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              100% OCR Match
            </span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to={`/search?q=${encodeURIComponent(lastScannedResult.preset.medicines[0]?.detectedName.split(' ')[1] || '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search Detected Items in Chennai Pharmacies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
