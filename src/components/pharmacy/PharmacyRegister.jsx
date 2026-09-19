import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Building2, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Car, 
  Snowflake, 
  AlertTriangle, 
  Upload, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileCheck2
} from 'lucide-react';

export const PharmacyRegister = ({ onSwitchToLogin, onGoToAdmin }) => {
  const { registerPharmacy } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    taxId: '',
    pharmacistInCharge: '',
    pharmacistRegId: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    open24x7: true,
    driveThru: false,
    emergencyReserveDesk: true,
    coldChainCertified: true,
    licenseDocName: 'DL_CERTIFICATE_UPLOAD.pdf',
    notes: ''
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedPharmacy, setSubmittedPharmacy] = useState(null);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Pharmacy business name is required';
    if (!formData.licenseNumber.trim()) errs.licenseNumber = 'Valid Drug License # is mandatory';
    if (!formData.pharmacistInCharge.trim()) errs.pharmacistInCharge = 'Pharmacist in-Charge Name is required';
    if (!formData.email.trim()) errs.email = 'Pharmacy official email is required';
    if (!formData.phone.trim()) errs.phone = 'Dispensary telephone number is required';
    if (!formData.address.trim()) errs.address = 'Physical facility street address is required';
    if (!formData.pincode.trim()) errs.pincode = 'Facility PIN code is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const created = registerPharmacy({
        ...formData,
        licenseDocName: uploadedFile ? uploadedFile.name : 'DL_STATE_BOARD_VERIFIED.pdf'
      });
      setIsSubmitting(false);
      setSubmittedPharmacy(created);
    }, 600);
  };

  const handlePreFillSample = () => {
    setFormData({
      name: 'Apex Care Specialty & Oncology Drugs',
      licenseNumber: 'DL-CA-99214',
      taxId: 'TAX-US-991204',
      pharmacistInCharge: 'Dr. Elena Rostova, PharmD',
      pharmacistRegId: 'RPH-2025-4109',
      email: 'elena@apexcare.org',
      phone: '+1 (555) 883-9102',
      address: '742 Evergreen Blvd, Suite 100, Medical District',
      pincode: '560048',
      open24x7: true,
      driveThru: true,
      emergencyReserveDesk: true,
      coldChainCertified: true,
      licenseDocName: 'DL_CERT_APEX_2026.pdf',
      notes: 'Trauma support capable facility with ultra-low cryogenic freezer for biopharmaceuticals.'
    });
    setErrors({});
  };

  if (submittedPharmacy) {
    return (
      <div className="max-w-xl mx-auto my-8 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-5 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Status: Pending Regulatory Approval
          </span>
          <h3 className="text-2xl font-black text-slate-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Application Submitted for Board Audit!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your registration for <strong>{submittedPharmacy.name}</strong> (License: <span className="font-mono text-teal-700 font-bold">{submittedPharmacy.licenseNumber}</span>) has been securely submitted to the Central Licensing Directorate.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Application Reference ID:</span>
            <span className="font-mono font-bold text-slate-900">{submittedPharmacy.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Pharmacist in-Charge:</span>
            <span className="font-semibold text-slate-800">{submittedPharmacy.pharmacistInCharge}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Physical Zone:</span>
            <span className="font-semibold text-slate-800">{submittedPharmacy.pincode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Reviewed By:</span>
            <span className="font-semibold text-teal-700">Dr. Christopher Cole (Chief Regulatory Officer)</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            Back to Pharmacy Login
          </button>

          {onGoToAdmin && (
            <button
              type="button"
              onClick={onGoToAdmin}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-700/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Open Admin Approval Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 mb-3 border border-teal-100 shadow-inner">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Pharmacy Partner Onboarding
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Enroll your pharmacy into MedLink's real-time inventory network, emergency fast-track & 2-hour shelf-hold system
        </p>

        {/* Pre-fill helper for fast testing */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handlePreFillSample}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-fill Sample Application (Apex Care Specialty Drugs)</span>
          </button>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Facility Identity */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Facility & Licensing Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pharmacy / Chemist Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Green Cross 24/7 Pharmacy"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                    errors.name ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Drug License Number (State/Central Board) *
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => updateField('licenseNumber', e.target.value)}
                  placeholder="e.g. DL-CA-99214"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                    errors.licenseNumber ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                  }`}
                />
                {errors.licenseNumber && <p className="text-xs text-rose-500 mt-1">{errors.licenseNumber}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pharmacist In-Charge Name *
                </label>
                <input
                  type="text"
                  value={formData.pharmacistInCharge}
                  onChange={(e) => updateField('pharmacistInCharge', e.target.value)}
                  placeholder="e.g. Dr. Elena Rostova, PharmD"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                    errors.pharmacistInCharge ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                  }`}
                />
                {errors.pharmacistInCharge && <p className="text-xs text-rose-500 mt-1">{errors.pharmacistInCharge}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pharmacist State Registration ID
                </label>
                <input
                  type="text"
                  value={formData.pharmacistRegId}
                  onChange={(e) => updateField('pharmacistRegId', e.target.value)}
                  placeholder="e.g. RPH-2025-4109"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Location */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Contact & Physical Location
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="orders@apexcare.org"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                    errors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dispensary Desk Telephone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+1 (555) 883-9102"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                    errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                  }`}
                />
                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Facility Physical Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="742 Evergreen Blvd, Suite 100"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                    errors.address ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                  }`}
                />
                {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Postal PIN Code *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                  placeholder="560048"
                  className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                    errors.pincode ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                  }`}
                />
                {errors.pincode && <p className="text-xs text-rose-500 mt-1">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tax / EIN Registration
                </label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => updateField('taxId', e.target.value)}
                  placeholder="TAX-US-991204"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Capabilities Toggles */}
          <div className="space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Facility Operational Capabilities
              </h3>
              <p className="text-xs text-slate-500">Enable features your physical site supports for regional emergency routing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.open24x7}
                  onChange={(e) => updateField('open24x7', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    <span className="text-xs font-bold text-slate-900">24/7 Continuous Operation</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Staffed round-the-clock for emergency night-time prescriptions.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.driveThru}
                  onChange={(e) => updateField('driveThru', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-slate-700" />
                    <span className="text-xs font-bold text-slate-900">Drive-Thru Window</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Contactless rapid drive-thru pickup window available.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.emergencyReserveDesk}
                  onChange={(e) => updateField('emergencyReserveDesk', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">Emergency & ICU Drug Reserve Desk</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Dedicated shelf allocation for critical trauma & antidote drugs.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.coldChainCertified}
                  onChange={(e) => updateField('coldChainCertified', e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Snowflake className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">Cold-Chain Temperature Controlled (2°C - 8°C)</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Insulin, biologics & vaccine certified refrigeration storage.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: License Document Upload Simulation */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Drug License Certificate Verification Document (PDF / Scan)
            </label>
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-teal-50/30 transition-colors text-center cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.png,.jpg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedFile(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center space-y-1">
                {uploadedFile ? (
                  <>
                    <FileCheck2 className="w-8 h-8 text-teal-600" />
                    <p className="text-xs font-bold text-slate-800">{uploadedFile.name}</p>
                    <span className="text-[11px] text-teal-700 font-semibold">Document attached ready for verification</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-slate-400" />
                    <p className="text-xs font-semibold text-slate-700">
                      Click to upload Drug License Certificate (PDF or Image)
                    </p>
                    <span className="text-[11px] text-slate-400">
                      Sample default: {formData.licenseDocName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Transmitting Dossier to Board...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Submit Pharmacy Partner Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
