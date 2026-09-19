import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldAlert, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  KeyRound, 
  Activity, 
  Server
} from 'lucide-react';
import { DEFAULT_ADMIN } from '../../data/mockPharmacyAdminData';

export const AdminLogin = ({ onSuccess }) => {
  const { loginAdmin, loginDemoAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email.trim()) {
      setError('Please enter your Administrative clearance email');
      return false;
    }
    if (!accessKey.trim()) {
      setError('Please enter your Level-5 Security Access Key');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      const res = loginAdmin(email, accessKey);
      setIsLoading(false);
      if (res.success && onSuccess) {
        onSuccess();
      } else if (!res.success) {
        setError(res.error || 'Access Denied: Invalid Administrative Credentials');
      }
    }, 500);
  };

  const handleDemoAdminLogin = () => {
    setEmail(DEFAULT_ADMIN.email);
    setAccessKey(DEFAULT_ADMIN.accessKey);
    loginDemoAdmin();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 mb-3 border border-rose-200 shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Supreme Platform Administration
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Central Directorate of Pharmacy Licensing, Formulary Regulation & Platform Telemetry
        </p>
      </div>

      {/* Demo Admin Fast Track Banner */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 shadow-lg text-white relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400 fill-teal-400/20" />
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                Supreme Regulatory Fast Track
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Authenticate instantly as <strong className="text-white">{DEFAULT_ADMIN.fullName}</strong> ({DEFAULT_ADMIN.title}).
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDemoAdminLogin}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white transition-all shadow-md active:scale-[0.99] cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Demo Admin Login: Chief Regulatory Officer</span>
          <ArrowRight className="w-3.5 h-3.5 ml-auto text-teal-200" />
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs leading-relaxed animate-shake">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
              <div className="flex-1 font-semibold">{error}</div>
            </div>
          )}

          {/* Admin Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Administrative Officer Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Server className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="admin@medlink.org"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                autoComplete="email"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Restricted to authorized MedLink central regulatory personnel
            </p>
          </div>

          {/* Security Access Key */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Level-5 Security Access Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showKey ? 'text' : 'password'}
                value={accessKey}
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  if (error) setError('');
                }}
                placeholder="ML-SUPREME-2026"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all font-mono"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                tabIndex={-1}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Decrypting Level-5 Master Credentials...</span>
              </>
            ) : (
              <>
                <span>Access Supreme Regulatory Console</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
