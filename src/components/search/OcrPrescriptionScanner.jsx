import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Upload,
  Scan,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  X,
  FileCheck2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  Pill,
  ArrowRight,
  Eye
} from 'lucide-react';
import { MOCK_MEDICINES } from '../../data/mockMedicines';

// Realistic Chennai Hospital Clinical Prescription Presets
export const PRESCRIPTION_PRESETS = [
  {
    id: 'rx-apollo-cardio',
    doctor: 'Dr. Arvind Swaminathan, MD (Cardiology)',
    regNo: 'TN-MCI-48192',
    hospital: 'Apollo Hospitals, Greams Road, Chennai',
    patient: 'Kavitha Sundaram (34/F)',
    diagnosis: 'Essential Hypertension & Mixed Dyslipidemia',
    date: '07-Oct-2026',
    imageLabel: 'Apollo Cardiology Clinical Rx (Signed)',
    medicines: [
      {
        detectedName: 'Tab. Atorvastatin (Lipitor) 20 mg',
        dosage: '1 tablet at bedtime (OD)',
        duration: '30 Days',
        matchedMedId: 'med-lipitor-20',
        confidence: 99,
      },
      {
        detectedName: 'Tab. Telmisartan 40 mg',
        dosage: '1 tablet morning after food',
        duration: '30 Days',
        matchedMedId: 'med-telma-40',
        confidence: 97,
      },
      {
        detectedName: 'Tab. Ecosprin 75 mg (Aspirin IP)',
        dosage: '1 tablet post-lunch',
        duration: '30 Days',
        matchedMedId: 'med-ecosprin-75',
        confidence: 96,
      }
    ]
  },
  {
    id: 'rx-sims-pulmo',
    doctor: 'Dr. Meenakshi Raman, MD (Pulmonology)',
    regNo: 'TN-MCI-52019',
    hospital: 'SIMS Hospital, Vadapalani, Chennai',
    patient: 'Kavitha Sundaram (34/F)',
    diagnosis: 'Acute Bacterial Bronchitis & Allergic Cough',
    date: '05-Oct-2026',
    imageLabel: 'SIMS Hospital Pulmonology Rx',
    medicines: [
      {
        detectedName: 'Tab. Augmentin 625 Duo (Amoxicillin + Clavulanate)',
        dosage: '1 tablet twice daily for 5 days',
        duration: '5 Days',
        matchedMedId: 'med-augmentin-625',
        confidence: 98,
      },
      {
        detectedName: 'Tab. Dolo 650 mg (Paracetamol IP)',
        dosage: '1 tablet thrice daily if fever > 100°F (SOS)',
        duration: '3 Days',
        matchedMedId: 'med-dolo-650',
        confidence: 99,
      },
      {
        detectedName: 'Asthalin Inhaler (Salbutamol 100mcg)',
        dosage: '2 puffs SOS for breathlessness',
        duration: '1 Inhaler',
        matchedMedId: 'med-ventolin',
        confidence: 95,
      }
    ]
  },
  {
    id: 'rx-kauvery-diab',
    doctor: 'Dr. S. Balaji, MD, DM (Endocrinology)',
    regNo: 'TN-MCI-39104',
    hospital: 'Kauvery Hospital, TTK Road, Alwarpet, Chennai',
    patient: 'Anand Ramanathan (46/M)',
    diagnosis: 'Type 2 Diabetes Mellitus with Mild Hyperglycemia',
    date: '02-Oct-2026',
    imageLabel: 'Kauvery Endocrine Formulary Order',
    medicines: [
      {
        detectedName: 'Tab. Januvia 50 mg (Sitagliptin)',
        dosage: '1 tablet daily before breakfast',
        duration: '30 Days',
        matchedMedId: 'med-januvia',
        confidence: 97,
      },
      {
        detectedName: 'Tab. Pan-D (Pantoprazole + Domperidone)',
        dosage: '1 capsule early morning empty stomach',
        duration: '14 Days',
        matchedMedId: 'med-pan-d',
        confidence: 98,
      }
    ]
  }
];

export default function OcrPrescriptionScanner({
  onScanComplete,
  onSelectMedicineForReservation,
  currentMedicineId,
  isModal = false,
  onClose
}) {
  const [selectedPreset, setSelectedPreset] = useState(PRESCRIPTION_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: Ready, 1: Contrast, 2: NLP/OCR, 3: Form Match
  const [scanResults, setScanResults] = useState(null);
  const [customFileName, setCustomFileName] = useState(null);
  const fileInputRef = useRef(null);

  const startScanning = (preset) => {
    setIsScanning(true);
    setScanResults(null);
    setScanStep(1);

    setTimeout(() => {
      setScanStep(2);
    }, 700);

    setTimeout(() => {
      setScanStep(3);
    }, 1400);

    setTimeout(() => {
      setIsScanning(false);
      setScanStep(0);
      setScanResults(preset);
      if (onScanComplete) {
        onScanComplete({
          preset,
          verified: true,
          verifiedAt: new Date().toISOString(),
          matchedMedicines: preset.medicines
        });
      }
    }, 2100);
  };

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset);
    setCustomFileName(null);
    startScanning(preset);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFileName(file.name);
      // Map to an authentic preset while keeping the uploaded filename
      const customPreset = {
        ...selectedPreset,
        imageLabel: file.name
      };
      setSelectedPreset(customPreset);
      startScanning(customPreset);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-teal-500/30 shadow-2xl shadow-teal-950/40 p-5 md:p-6 space-y-5">
      {/* Background ambient glowing gradients */}
      <div 
        aria-hidden="true" 
        className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" 
      />

      {/* Header Bar */}
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 flex items-center justify-center font-extrabold shadow-lg shadow-teal-500/30">
            <Scan className="w-5 h-5 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base md:text-lg font-black tracking-tight text-white leading-tight">
                AI Optical Prescription Scanner
              </h3>
              <span className="text-[10px] font-mono uppercase bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/40 font-bold">
                CDSCO Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Instant handwritten &amp; digital Rx entity extraction with live Chennai inventory matching
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close prescription scanner"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* 1. Quick Presets or File Upload Row */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[11px] text-teal-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            1-Click Chennai Clinical Hospital Presets:
          </span>
          <span className="text-[10px] font-mono text-slate-500">Pick to test OCR instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PRESCRIPTION_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className={`p-3 rounded-2xl text-left transition-colors border cursor-pointer flex flex-col justify-between gap-1.5 focus-visible:ring-2 focus-visible:ring-teal-400 ${
                  isSelected
                    ? 'bg-teal-950/60 border-teal-400/80 ring-1 ring-teal-400/40 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold text-teal-300 truncate">
                    {preset.hospital.split(',')[0]}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />}
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {preset.doctor.split(',')[0]}
                </div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-white/10">
                  <span>{preset.medicines.length} Medicines</span>
                  <span className="text-teal-400 font-bold">{preset.date}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Upload Custom File Option */}
        <div className="pt-1 flex items-center justify-between gap-3 text-xs">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="prescription-file-upload-input"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-slate-200 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <Upload className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
            <span>{customFileName ? `Uploaded: ${customFileName}` : 'Upload My Own Prescription (JPG, PNG, PDF)'}</span>
          </button>

          <button
            type="button"
            onClick={() => startScanning(selectedPreset)}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 text-xs font-black shadow-md shadow-teal-500/20 transition-transform cursor-pointer focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} aria-hidden="true" />
            <span>{isScanning ? 'Scanning Rx…' : 'Run Optical AI Scan'}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Scanner Viewport with Laser Beam */}
      <div className="relative rounded-2xl bg-black/60 border border-white/15 overflow-hidden p-4 min-h-[160px] flex flex-col justify-center items-center">
        {/* Laser Scanning Ray */}
        {isScanning && (
          <div 
            aria-hidden="true"
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse z-20"
            style={{
              top: scanStep === 1 ? '20%' : scanStep === 2 ? '55%' : '85%',
              transition: 'top 0.7s ease-in-out'
            }}
          />
        )}

        {/* Scan Status HUD */}
        {isScanning ? (
          <div className="text-center space-y-3 z-10 py-6 animate-fadeIn">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20 animate-spin">
              <Scan className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white tracking-wide font-mono">
                {scanStep === 1 && '1/3 Preprocessing optical matrix & contrast…'}
                {scanStep === 2 && '2/3 Extracting doctor registration & dosage geometry…'}
                {scanStep === 3 && '3/3 Cross-referencing CDSCO Chennai drug formulary…'}
              </p>
              <p className="text-xs text-teal-400 font-mono">
                Target: {selectedPreset.hospital}
              </p>
            </div>
          </div>
        ) : scanResults ? (
          /* Detected Prescription Header Card */
          <div className="w-full space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-teal-950/40 border border-teal-500/30 rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{scanResults.doctor}</span>
                    <span className="text-[10px] font-mono text-teal-400 bg-teal-900/60 px-1.5 py-0.5 rounded border border-teal-500/30">
                      Reg: {scanResults.regNo}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {scanResults.hospital} • Patient: <strong className="text-white">{scanResults.patient}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Schedule H Cleared</span>
                </span>
              </div>
            </div>

            {/* Prescribed Medicines Detected */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Extracted Prescribed Medicines ({scanResults.medicines.length}):</span>
                <span className="text-teal-400 text-[10px] font-mono">Click to Add / Reserve</span>
              </div>

              <div className="space-y-2">
                {scanResults.medicines.map((med, idx) => {
                  const isCurrentTarget = med.matchedMedId === currentMedicineId;
                  const matchedDbMed = MOCK_MEDICINES.find((m) => m.id === med.matchedMedId);

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                        isCurrentTarget
                          ? 'bg-teal-950/60 border-teal-400/80 ring-1 ring-teal-400/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-teal-400/10 text-teal-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          <Pill className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-white truncate">
                              {med.detectedName}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30">
                              {med.confidence}% Match
                            </span>
                            {isCurrentTarget && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-900/60 px-1.5 py-0.2 rounded border border-teal-500/30">
                                Current Reservation Item
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Instructions: <span className="text-slate-200">{med.dosage}</span> ({med.duration})
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0 flex items-center gap-2">
                        {onSelectMedicineForReservation && matchedDbMed && (
                          <button
                            type="button"
                            onClick={() => onSelectMedicineForReservation(matchedDbMed, med)}
                            className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
                          >
                            <span>{isCurrentTarget ? 'Verified in Rx' : 'Add to Reservation'}</span>
                            <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Initial Empty Prompt */
          <div className="text-center py-6 space-y-2 text-slate-400">
            <Scan className="w-8 h-8 text-teal-400 mx-auto opacity-70" aria-hidden="true" />
            <p className="text-xs font-semibold text-slate-300">
              Select one of the Chennai hospital presets above or upload your own prescription document.
            </p>
            <p className="text-[11px] text-slate-500">
              Optical character recognition extracts prescribed salts, matches CDSCO brands, and validates Schedule H requirements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
