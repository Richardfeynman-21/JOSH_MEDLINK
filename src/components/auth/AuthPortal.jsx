import React, { useState } from 'react';
import { 
  HeartPulse, 
  Building2, 
  ShieldAlert, 
  ArrowLeft, 
  KeyRound, 
  UserCheck, 
  Lock, 
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { PatientLogin } from '../patient/PatientLogin';
import { PatientRegister } from '../patient/PatientRegister';
import { ForgotPassword } from '../patient/ForgotPassword';
import { PharmacyLogin } from '../pharmacy/PharmacyLogin';
import { PharmacyRegister } from '../pharmacy/PharmacyRegister';
import { AdminLogin } from '../admin/AdminLogin';
import { useAuth } from '../../context/AuthContext';

export default function AuthPortal({
  initialRole = 'patient',
  initialMode = 'login',
  onSuccess,
  onNavigateHome,
  onNavigateSearch
}) {
  const [activeRole, setActiveRole] = useState(initialRole); // 'patient' | 'pharmacy' | 'admin'
  const [activeMode, setActiveMode] = useState(initialMode); // 'login' | 'register' | 'forgot'
  const { user, isAuthenticated, role: currentRole, logout } = useAuth();

  const handleRoleSelect = (roleKey) => {
    setActiveRole(roleKey);
    if (activeMode === 'forgot') {
      setActiveMode('login');
    }
    if (roleKey === 'admin') {
      setActiveMode('login');
    }
  };

  const handleAuthSuccess = (roleKey) => {
    if (onSuccess) {
      onSuccess(roleKey || activeRole);
    }
  };

  // Color theme per active role
  const getRoleTheme = () => {
    switch (activeRole) {
      case 'pharmacy':
        return {
          glow: 'from-emerald-500/15 via-teal-500/10 to-transparent',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          accentBorder: 'border-emerald-500',
          ring: 'focus-visible:ring-emerald-500',
        };
      case 'admin':
        return {
          glow: 'from-rose-500/15 via-slate-900/10 to-transparent',
          badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
          accentBorder: 'border-rose-500',
          ring: 'focus-visible:ring-rose-500',
        };
      case 'patient':
      default:
        return {
          glow: 'from-teal-500/15 via-cyan-500/10 to-transparent',
          badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
          accentBorder: 'border-teal-500',
          ring: 'focus-visible:ring-teal-500',
        };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="relative min-h-[calc(100vh-8rem)] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start">
      {/* Antigravity Ambient Spatial Backdrop Glow */}
      <div 
        className={`absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b ${theme.glow} rounded-full blur-3xl pointer-events-none transition-all duration-700`}
        aria-hidden="true" 
      />

      {/* Top Breadcrumb & Quick Nav */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 z-10">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </button>

        {onNavigateSearch && (
          <button
            type="button"
            onClick={onNavigateSearch}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-teal-200 shadow-2xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Live Medicines</span>
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl z-10 space-y-6">
        {/* Role Selector Tabs (Patient | Pharmacy | Admin) */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/90 p-2 shadow-sm">
          <div className="text-center pb-2 pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Select Operating Portal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* 1. Patient Portal */}
            <button
              type="button"
              onClick={() => handleRoleSelect('patient')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                activeRole === 'patient'
                  ? 'bg-teal-50/90 border-teal-400 shadow-xs ring-1 ring-teal-400/40 text-slate-900'
                  : 'bg-white/60 border-slate-200/80 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-transform ${
                activeRole === 'patient' ? 'bg-teal-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
              }`}>
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="leading-tight min-w-0">
                <span className="text-xs font-bold block truncate text-slate-900">Patient Portal</span>
                <span className="text-[10px] text-slate-500 block truncate">Digital ID &amp; Refills</span>
              </div>
            </button>

            {/* 2. Pharmacy Workstation */}
            <button
              type="button"
              onClick={() => handleRoleSelect('pharmacy')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                activeRole === 'pharmacy'
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-xs ring-1 ring-emerald-400/40 text-slate-900'
                  : 'bg-white/60 border-slate-200/80 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-transform ${
                activeRole === 'pharmacy' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
              }`}>
                <Building2 className="w-5 h-5" />
              </div>
              <div className="leading-tight min-w-0">
                <span className="text-xs font-bold block truncate text-slate-900">Pharmacy Workstation</span>
                <span className="text-[10px] text-slate-500 block truncate">Dispensary ERP &amp; Hold</span>
              </div>
            </button>

            {/* 3. Regulatory Admin */}
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                activeRole === 'admin'
                  ? 'bg-rose-50/90 border-rose-400 shadow-xs ring-1 ring-rose-400/40 text-slate-900'
                  : 'bg-white/60 border-slate-200/80 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-transform ${
                activeRole === 'admin' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="leading-tight min-w-0">
                <span className="text-xs font-bold block truncate text-slate-900">Regulatory Admin</span>
                <span className="text-[10px] text-slate-500 block truncate">CDSCO / State Board</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sub-Mode Toggle for Patient & Pharmacy (Sign In vs Register) */}
        {activeRole !== 'admin' && activeMode !== 'forgot' && (
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveMode('login')}
                className={`px-5 py-2 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  activeMode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('register')}
                className={`px-5 py-2 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  activeMode === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {activeRole === 'pharmacy' ? 'Partner Registration' : 'New Patient Intake'}
              </button>
            </div>
          </div>
        )}

        {/* Active Role & Form Card */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl p-4 sm:p-6 lg:p-8">
          {/* If Forgot Password Mode Active */}
          {activeMode === 'forgot' && (
            <ForgotPassword
              onSwitchToLogin={() => setActiveMode('login')}
            />
          )}

          {/* PATIENT ROLE */}
          {activeRole === 'patient' && activeMode === 'login' && (
            <PatientLogin
              onSwitchToRegister={() => setActiveMode('register')}
              onSwitchToForgot={() => setActiveMode('forgot')}
              onSuccess={() => handleAuthSuccess('patient')}
            />
          )}

          {activeRole === 'patient' && activeMode === 'register' && (
            <PatientRegister
              onSwitchToLogin={() => setActiveMode('login')}
              onSuccess={() => handleAuthSuccess('patient')}
            />
          )}

          {/* PHARMACY ROLE */}
          {activeRole === 'pharmacy' && activeMode === 'login' && (
            <PharmacyLogin
              onSwitchToRegister={() => setActiveMode('register')}
              onSuccess={() => handleAuthSuccess('pharmacy')}
            />
          )}

          {activeRole === 'pharmacy' && activeMode === 'register' && (
            <PharmacyRegister
              onSwitchToLogin={() => setActiveMode('login')}
              onGoToAdmin={() => {
                setActiveRole('admin');
                setActiveMode('login');
              }}
            />
          )}

          {/* ADMIN ROLE */}
          {activeRole === 'admin' && (
            <AdminLogin
              onSuccess={() => handleAuthSuccess('admin')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
