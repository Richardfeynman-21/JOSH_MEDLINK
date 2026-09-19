import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DigitalMedicalIdCard } from './DigitalMedicalIdCard';
import { EditablePersonalDetails } from './EditablePersonalDetails';
import { MedicalSummary } from './MedicalSummary';
import { PreferredPharmaciesList } from './PreferredPharmaciesList';
import { PrescriptionRefillHistory } from './PrescriptionRefillHistory';
import { 
  HeartPulse, 
  ShieldAlert, 
  Pill, 
  Building2, 
  User, 
  LogOut, 
  Activity, 
  QrCode
} from 'lucide-react';

export const PatientDashboard = ({ onOpenAuthModal }) => {
  const { user, logout, prescriptions, pharmacies, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'prescriptions' | 'pharmacies' | 'demographics'
  const [showEmergencyBadgeModal, setShowEmergencyBadgeModal] = useState(false);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto my-12 text-center bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
          <HeartPulse className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Patient Authentication Required</h3>
        <p className="text-sm text-slate-500">
          Sign in or register to inspect your verified digital medical ID, active prescriptions, and nearby pharmacies.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/20 transition-all cursor-pointer"
        >
          Open Patient Sign In / Registration
        </button>
      </div>
    );
  }

  const inTransitCount = (prescriptions || []).filter((p) => p.status === 'In Transit').length;
  const refillNeededCount = (prescriptions || []).filter((p) => p.status === 'Refill Needed').length;

  const handleSimulateEmergency = () => {
    setShowEmergencyBadgeModal(true);
    showToast('First-Responder EMT Triage Protocol simulated.', 'clinical', 'Emergency Access Simulation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Top Clinical Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-teal-300" />
                <span>Verified Patient Portal</span>
              </span>
              <span className="font-mono text-xs bg-white/10 px-2.5 py-1 rounded-full text-slate-200 border border-white/10">
                {user.id ? (user.id.startsWith('#') ? user.id : `#${user.id}`) : '#ML-PATIENT'}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-300 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-400/30">
                Blood: {user.bloodGroup || 'O-'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Welcome, {user.fullName || 'Patient'}
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/80 max-w-xl">
              Connected to <strong>{(pharmacies || []).find(p => p.isPrimary)?.name || 'Local 24/7 Pharmacy'}</strong> • {user.location?.city || 'Metro City'} zone ({user.location?.pincode || '94107'})
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSimulateEmergency}
              aria-label="Open EMT Emergency Scan View"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>EMT Emergency Scan View</span>
            </button>

            <button
              onClick={logout}
              aria-label="Sign out of patient session"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Ticker Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Critical Allergies</span>
            <p className="text-lg font-black text-rose-300 mt-0.5">{user.allergies?.length || 0} Alert Flags</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Prescriptions</span>
            <p className="text-lg font-black text-white mt-0.5">{(prescriptions || []).length} Active</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Deliveries</span>
            <p className="text-lg font-black text-teal-200 mt-0.5">
              {inTransitCount > 0 ? `${inTransitCount} En Route` : '0 Pending'}
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Refill Alerts</span>
            <p className={`text-lg font-black mt-0.5 ${refillNeededCount > 0 ? 'text-rose-400' : 'text-emerald-300'}`}>
              {refillNeededCount > 0 ? `${refillNeededCount} Needed` : 'All Filled'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Emergency ID & Overview', icon: Activity },
          { id: 'prescriptions', label: 'Prescriptions & Refills', count: refillNeededCount, icon: Pill },
          { id: 'pharmacies', label: 'Linked Pharmacies (24/7)', count: (pharmacies || []).length, icon: Building2 },
          { id: 'demographics', label: 'Contact & Residential Pincode', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white text-teal-700' : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Views */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Digital Emergency Medical ID Card */}
          <div className="lg:col-span-6 space-y-6">
            <DigitalMedicalIdCard />
          </div>

          {/* Right Column: Medical Summary & Quick Refill Preview */}
          <div className="lg:col-span-6 space-y-6">
            <MedicalSummary />
            <PrescriptionRefillHistory />
          </div>
        </div>
      )}

      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          <PrescriptionRefillHistory />
        </div>
      )}

      {activeTab === 'pharmacies' && (
        <div className="space-y-6">
          <PreferredPharmaciesList />
        </div>
      )}

      {activeTab === 'demographics' && (
        <div className="space-y-6">
          <EditablePersonalDetails />
        </div>
      )}

      {/* First-Responder Emergency Fullscreen Simulation Modal */}
      {showEmergencyBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 border-4 border-rose-500 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-rose-200">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldAlert className="w-6 h-6" />
                <span className="text-sm font-black uppercase tracking-widest">
                  EMT FIRST RESPONDER DIRECT TRIAGE VIEW
                </span>
              </div>
              <button
                onClick={() => setShowEmergencyBadgeModal(false)}
                aria-label="Exit EMT emergency triage simulation"
                className="text-slate-400 hover:text-slate-700 font-bold text-sm px-2 py-1 bg-slate-100 rounded-lg cursor-pointer"
              >
                Exit Simulation
              </button>
            </div>

            <DigitalMedicalIdCard />

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block font-bold">First-Responder Protocol Note:</strong>
              <p>
                Patient carries severe penicillin & NSAID anaphylaxis risks. For acute pain or infection, utilize non-penicillin beta-lactam alternatives or designated emergency formulary.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
