import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Heart, 
  AlertTriangle, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  Hospital, 
  AlertCircle 
} from 'lucide-react';
import { BLOOD_GROUPS, COMMON_ALLERGIES, COMMON_CONDITIONS } from '../../data/mockPatientData';

export const PatientRegister = ({ onSwitchToLogin, onSuccess }) => {
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Female',
    
    // Step 2: Emergency Health Profile
    bloodGroup: 'O-',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    chronicConditions: ['Asthma (Moderate Persistent)'],
    customAllergy: '',
    customCondition: '',

    // Step 3: Emergency Contact & Geo-matching
    emergencyContactName: '',
    emergencyContactRelation: 'Spouse',
    emergencyContactPhone: '',
    street: '',
    city: 'Metro City',
    state: 'CA',
    pincode: '94107',

    // Step 4: HIPAA & Consent
    hipaaConsent: false,
    emergencySharingConsent: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field change helper
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Allergy tags toggle
  const toggleAllergy = (allergy) => {
    setFormData((prev) => {
      const exists = prev.allergies.includes(allergy);
      const updated = exists
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy];
      return { ...prev, allergies: updated };
    });
  };

  // Add custom allergy
  const addCustomAllergy = () => {
    const val = formData.customAllergy.trim();
    if (val && !formData.allergies.includes(val)) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, val],
        customAllergy: ''
      }));
    }
  };

  // Chronic conditions toggle
  const toggleCondition = (condition) => {
    setFormData((prev) => {
      const exists = prev.chronicConditions.includes(condition);
      const updated = exists
        ? prev.chronicConditions.filter((c) => c !== condition)
        : [...prev.chronicConditions, condition];
      return { ...prev, chronicConditions: updated };
    });
  };

  // Add custom condition
  const addCustomCondition = () => {
    const val = formData.customCondition.trim();
    if (val && !formData.chronicConditions.includes(val)) {
      setFormData((prev) => ({
        ...prev,
        chronicConditions: [...prev.chronicConditions, val],
        customCondition: ''
      }));
    }
  };

  // Validation per step
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email format';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
    } else if (step === 2) {
      if (!formData.bloodGroup) newErrors.bloodGroup = 'Please select a blood group';
    } else if (step === 3) {
      if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
      if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = '24/7 emergency phone number is required';
      if (!formData.street.trim()) newErrors.street = 'Street address is required for pharmacy geo-matching';
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (formData.pincode.trim().length < 5) {
        newErrors.pincode = 'Valid 5-digit PIN/Postal code required';
      }
    } else if (step === 4) {
      if (!formData.hipaaConsent) {
        newErrors.hipaaConsent = 'You must acknowledge the HIPAA Privacy Agreement to create a patient profile';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      register(formData);
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    }, 600);
  };

  // Pre-fill demo intake template helper
  const handlePrefillTemplate = () => {
    setFormData({
      fullName: 'Sarah Jenkins',
      email: 'sarah.jenkins@medlink-patient.org',
      phone: '+1 (555) 382-9104',
      dob: '1992-04-14',
      gender: 'Female',
      bloodGroup: 'O-',
      allergies: ['Penicillin', 'Sulfa Drugs', 'NSAIDs (Ibuprofen/Aspirin)'],
      chronicConditions: ['Asthma (Moderate Persistent)', 'Hypertension (High Blood Pressure)'],
      customAllergy: '',
      customCondition: '',
      emergencyContactName: 'Michael Jenkins',
      emergencyContactRelation: 'Spouse',
      emergencyContactPhone: '+1 (555) 382-9188',
      street: '742 Evergreen Medical Parkway, Suite 3B',
      city: 'Metro City',
      state: 'CA',
      pincode: '94107',
      hipaaConsent: true,
      emergencySharingConsent: true,
    });
    setErrors({});
  };

  const stepTitles = [
    { num: 1, label: 'Personal', desc: 'Identity' },
    { num: 2, label: 'Health Profile', desc: 'Blood & Allergies' },
    { num: 3, label: 'Emergency & Geo', desc: 'Pharmacy Routing' },
    { num: 4, label: 'HIPAA Consent', desc: 'Verification' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mb-2 border border-teal-100">
          <Hospital className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Patient Intake & Registration
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Create your verified clinical profile for instant emergency dispatch & medicine access
        </p>

        {/* Rapid Fill helper button for testing */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handlePrefillTemplate}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <span>Pre-fill Sample Clinical Intake (Sarah Jenkins)</span>
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-4 gap-2">
          {stepTitles.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div
                key={step.num}
                className={`relative flex flex-col items-center text-center p-2 rounded-xl transition-all ${
                  isCurrent ? 'bg-teal-50/70 border border-teal-200/80' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-colors ${
                    isCompleted
                      ? 'bg-teal-600 text-white'
                      : isCurrent
                      ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <span className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-teal-900' : 'text-slate-700'}`}>
                  {step.label}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline leading-none mt-0.5">
                  {step.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intake Step Content Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h3 className="text-base font-bold text-slate-900">Personal & Identity Information</h3>
                <p className="text-xs text-slate-500">Required for clinical identity verification and hospital records matching.</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                      errors.fullName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="patient@medlink.org"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                        errors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+1 (555) 382-9104"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                        errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* DOB & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => updateField('dob', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                        errors.dob ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.dob && <p className="text-xs text-rose-500 mt-1">{errors.dob}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Biological Sex / Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary</option>
                    <option value="Other">Other / Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Emergency Health Profile */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                  <h3 className="text-base font-bold text-slate-900">Emergency Health Data</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Critical vitals used on your scannable Digital Emergency Medical ID in urgent scenarios.
                </p>
              </div>

              {/* Blood Group Selector with Badges */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Blood Group (ABO & Rh Factor) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BLOOD_GROUPS.map((bg) => {
                    const isSelected = formData.bloodGroup === bg.group;
                    const isUniversal = bg.group === 'O-' || bg.group === 'AB+';
                    return (
                      <button
                        type="button"
                        key={bg.group}
                        onClick={() => updateField('bloodGroup', bg.group)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-2 ring-rose-400'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
                        }`}
                      >
                        {isUniversal && (
                          <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-rose-600 text-white text-[9px] font-bold tracking-tight rounded-bl">
                            {bg.group === 'O-' ? 'UNIV DONOR' : 'UNIV RECIP'}
                          </div>
                        )}
                        <div className="text-lg font-black tracking-tight text-slate-900 font-mono">
                          {bg.group}
                        </div>
                        <div className="text-[11px] font-medium text-slate-600 mt-0.5 line-clamp-1">
                          {bg.badge}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight mt-1 line-clamp-1">
                          {bg.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {errors.bloodGroup && <p className="text-xs text-rose-500 mt-1">{errors.bloodGroup}</p>}
              </div>

              {/* Severe Allergy Tags */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Critical Drug & Substance Allergies</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Click to toggle</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2.5">
                  {COMMON_ALLERGIES.map((allergy) => {
                    const isChecked = formData.allergies.includes(allergy);
                    return (
                      <button
                        type="button"
                        key={allergy}
                        onClick={() => toggleAllergy(allergy)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-rose-50 border-rose-300 text-rose-800 font-semibold shadow-xs ring-1 ring-rose-400'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {isChecked && <span className="text-rose-600 mr-1 font-bold">!</span>}
                        {allergy}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Allergy Adder */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.customAllergy}
                    onChange={(e) => updateField('customAllergy', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomAllergy();
                      }
                    }}
                    placeholder="Add other allergy (e.g. Codeine)..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={addCustomAllergy}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Chronic Conditions */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Chronic Health Conditions
                </label>
                <div className="flex flex-wrap gap-2 mb-2.5">
                  {COMMON_CONDITIONS.map((cond) => {
                    const isChecked = formData.chronicConditions.includes(cond);
                    return (
                      <button
                        type="button"
                        key={cond}
                        onClick={() => toggleCondition(cond)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-teal-50 border-teal-300 text-teal-800 font-semibold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {cond}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Condition Adder */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.customCondition}
                    onChange={(e) => updateField('customCondition', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomCondition();
                      }
                    }}
                    placeholder="Add other chronic condition..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={addCustomCondition}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Emergency Contact & Geo-matching */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 mb-3">
                <h3 className="text-base font-bold text-slate-900">Emergency Contact & Pharmacy Geo-Location</h3>
                <p className="text-xs text-slate-500">
                  Designate who first responders should reach and configure your primary residence for nearest pharmacy dispatch.
                </p>
              </div>

              {/* 24/7 Emergency Contact Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>24/7 Primary Emergency Contact (Next of Kin / ICE)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => updateField('emergencyContactName', e.target.value)}
                      placeholder="e.g. Michael Jenkins"
                      className={`w-full px-3 py-2 bg-white border rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 ${
                        errors.emergencyContactName ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.emergencyContactName && (
                      <p className="text-[11px] text-rose-500 mt-0.5">{errors.emergencyContactName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Relationship
                    </label>
                    <select
                      value={formData.emergencyContactRelation}
                      onChange={(e) => updateField('emergencyContactRelation', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Child / Adult Child">Child / Adult Child</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Caregiver">Caregiver</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    24/7 Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
                    placeholder="+1 (555) 382-9188"
                    className={`w-full px-3 py-2 bg-white border rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-teal-500 ${
                      errors.emergencyContactPhone ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.emergencyContactPhone}</p>
                  )}
                </div>
              </div>

              {/* Location for Pharmacy Matching */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>Residential Location (Pharmacy Auto-Matching)</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => updateField('street', e.target.value)}
                    placeholder="742 Evergreen Medical Parkway, Suite 3B"
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 ${
                      errors.street ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                  {errors.street && <p className="text-xs text-rose-500 mt-1">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Residential Pincode *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => updateField('pincode', e.target.value)}
                      placeholder="94107"
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500 ${
                        errors.pincode ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.pincode && <p className="text-xs text-rose-500 mt-1">{errors.pincode}</p>}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="Metro City"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      placeholder="CA"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Auto-matching Feedback Card */}
                {formData.pincode && (
                  <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 flex items-center justify-between text-xs text-teal-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      <span>
                        Geo-Radius Check: <strong>3 Verified Pharmacies</strong> ready within 2.5 miles of {formData.pincode}
                      </span>
                    </div>
                    <span className="font-semibold text-teal-700 text-[11px] bg-white px-2 py-0.5 rounded border border-teal-100">
                      Auto-Linked
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Review & HIPAA Agreement */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 mb-2">
                <h3 className="text-base font-bold text-slate-900">Clinical Review & HIPAA Privacy Agreement</h3>
                <p className="text-xs text-slate-500">
                  Please review your clinical profile summary and authorize emergency data sharing.
                </p>
              </div>

              {/* Summary Preview Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{formData.fullName || 'New Patient'}</h4>
                    <p className="text-xs text-slate-500">{formData.email} • {formData.phone}</p>
                    <p className="text-xs text-slate-500">{formData.street}, {formData.city} {formData.pincode}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-extrabold font-mono border border-rose-200">
                      Blood: {formData.bloodGroup}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase block">Critical Allergies:</span>
                    <p className="font-medium text-rose-700">
                      {formData.allergies.length > 0 ? formData.allergies.join(', ') : 'None Reported'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase block">Emergency Contact:</span>
                    <p className="font-medium text-slate-800">
                      {formData.emergencyContactName} ({formData.emergencyContactRelation}) - {formData.emergencyContactPhone}
                    </p>
                  </div>
                </div>
              </div>

              {/* HIPAA Agreement Toggle */}
              <div className="space-y-3 pt-1">
                <div
                  onClick={() => updateField('hipaaConsent', !formData.hipaaConsent)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    formData.hipaaConsent
                      ? 'bg-teal-50/70 border-teal-300 ring-1 ring-teal-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.hipaaConsent}
                    onChange={(e) => updateField('hipaaConsent', e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-900">
                        HIPAA & Emergency Health Data Disclosure Authorization
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      I authorize MedLink to securely encrypt (AES-256) and share my critical blood group, medication history, and severe allergies with licensed emergency medical personnel, first responders, and coordinating pharmacies in acute health situations.
                    </p>
                  </div>
                </div>
                {errors.hipaaConsent && (
                  <p className="text-xs text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.hipaaConsent}</span>
                  </p>
                )}

                {/* Emergency Sharing Toggle */}
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.emergencySharingConsent}
                    onChange={(e) => updateField('emergencySharingConsent', e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                  />
                  <span className="text-xs text-slate-700">
                    Allow nearby participating 24/7 pharmacies to reserve critical formulary medications based on my location radius.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-teal-600/20 transition-all cursor-pointer ml-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-teal-700/25 transition-all cursor-pointer ml-auto disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Issuing MedLink ID...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Complete Intake & Issue ID</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Switch back to Login */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Already registered on MedLink?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
            >
              Sign In to Patient Portal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Also export as Register for alias compatibility
export const Register = PatientRegister;
