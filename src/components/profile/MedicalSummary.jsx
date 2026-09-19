import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Stethoscope, 
  AlertTriangle, 
  HeartHandshake, 
  Plus, 
  X, 
  PhoneCall, 
  Building2, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { COMMON_ALLERGIES, COMMON_CONDITIONS } from '../../data/mockPatientData';

export const MedicalSummary = () => {
  const { user, updateProfile, showToast } = useAuth();

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);

  if (!user) return null;

  const handleRemoveAllergy = (allergyToRemove) => {
    const updated = user.allergies.filter((a) => a !== allergyToRemove);
    updateProfile({ allergies: updated });
    showToast(`Removed ${allergyToRemove} from allergy registry.`, 'info');
  };

  const handleAddAllergy = (allergyToAdd) => {
    const clean = allergyToAdd.trim();
    if (!clean || user.allergies.includes(clean)) return;
    updateProfile({ allergies: [...user.allergies, clean] });
    setNewAllergy('');
    setShowAddAllergy(false);
    showToast(`Added ${clean} to critical allergy alerts.`, 'clinical', 'Emergency Alert Updated');
  };

  const handleRemoveCondition = (condToRemove) => {
    const updated = user.chronicConditions.filter((c) => c !== condToRemove);
    updateProfile({ chronicConditions: updated });
    showToast(`Removed condition: ${condToRemove}.`, 'info');
  };

  const handleAddCondition = (condToAdd) => {
    const clean = condToAdd.trim();
    if (!clean || user.chronicConditions.includes(clean)) return;
    updateProfile({ chronicConditions: [...user.chronicConditions, clean] });
    setNewCondition('');
    setShowAddCondition(false);
    showToast(`Added ${clean} to diagnosed chronic conditions.`, 'success');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <Stethoscope className="w-5 h-5 text-teal-600" />
            <span>Clinical Medical Summary</span>
          </h3>
          <p className="text-xs text-slate-500">
            Certified electronic health summary shared with ER and in-network pharmacies
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>EHR Verified</span>
        </div>
      </div>

      {/* Primary Physician Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/70 to-slate-50 border border-teal-200/70 relative">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
          Assigned Primary Physician & Care Team
        </span>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="text-base font-extrabold text-slate-900">
              {user.primaryPhysician?.name || 'Dr. Rachel Vance, MD'}
            </h4>
            <p className="text-xs font-semibold text-teal-800">
              {user.primaryPhysician?.specialty || 'Pulmonology & Internal Medicine'}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {user.primaryPhysician?.hospital || 'St. Jude Medical Center'}
              </span>
            </div>
          </div>

          <a
            href={`tel:${user.primaryPhysician?.phone || '+15559021100'}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-teal-300 hover:bg-teal-50 text-teal-800 text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
            <span>Call Clinic ({user.primaryPhysician?.phone || '+1 555-902-1100'})</span>
          </a>
        </div>
      </div>

      {/* Critical Allergies Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#E11D48]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Documented Severe Allergies ({user.allergies?.length || 0})
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowAddAllergy(!showAddAllergy)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:text-rose-800 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Allergy</span>
          </button>
        </div>

        {/* Add Allergy Popover */}
        {showAddAllergy && (
          <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 animate-fadeIn space-y-2">
            <span className="text-xs font-bold text-rose-900 block">Select from common triggers or enter custom:</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_ALLERGIES.filter(a => !user.allergies.includes(a)).slice(0, 6).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleAddAllergy(item)}
                  className="px-2 py-1 bg-white border border-rose-200 text-rose-800 rounded-md text-[11px] font-medium hover:bg-rose-100"
                >
                  + {item}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAllergy(newAllergy);
                  }
                }}
                placeholder="Enter specific medicine or food allergen..."
                className="flex-1 px-3 py-1.5 bg-white border border-rose-300 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={() => handleAddAllergy(newAllergy)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* Allergy Badges */}
        <div className="flex flex-wrap gap-2">
          {user.allergies && user.allergies.map((allergy) => (
            <div
              key={allergy}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>{allergy}</span>
              <button
                type="button"
                onClick={() => handleRemoveAllergy(allergy)}
                className="text-rose-400 hover:text-rose-700 transition-colors p-0.5 rounded cursor-pointer"
                title={`Remove ${allergy}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chronic Health Conditions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-teal-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Chronic Conditions ({user.chronicConditions?.length || 0})
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowAddCondition(!showAddCondition)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Condition</span>
          </button>
        </div>

        {/* Add Condition Popover */}
        {showAddCondition && (
          <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200 animate-fadeIn space-y-2">
            <span className="text-xs font-bold text-teal-900 block">Select condition or type custom:</span>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_CONDITIONS.filter(c => !user.chronicConditions.includes(c)).slice(0, 5).map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => handleAddCondition(cond)}
                  className="px-2 py-1 bg-white border border-teal-200 text-teal-800 rounded-md text-[11px] font-medium hover:bg-teal-100"
                >
                  + {cond}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCondition(newCondition);
                  }
                }}
                placeholder="Enter diagnosed medical condition..."
                className="flex-1 px-3 py-1.5 bg-white border border-teal-300 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={() => handleAddCondition(newCondition)}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* Condition Badges */}
        <div className="flex flex-wrap gap-2">
          {user.chronicConditions && user.chronicConditions.map((cond) => (
            <div
              key={cond}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold"
            >
              <span>{cond}</span>
              <button
                type="button"
                onClick={() => handleRemoveCondition(cond)}
                className="text-teal-400 hover:text-teal-700 transition-colors p-0.5 rounded cursor-pointer"
                title={`Remove ${cond}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
