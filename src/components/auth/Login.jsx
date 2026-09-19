import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Activity,
  HeartPulse
} from 'lucide-react';
import { DEMO_PATIENT } from '../../data/mockPatientData';

export const Login = ({ onSwitchToRegister, onSwitchToForgot, onSuccess }) => {
  const { login, loginDemoPatient, rememberDevice, setRememberDevice } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Validation
  const validateForm = () => {
    if (!identifier.trim()) {
      setError('Please enter your Email or MedLink ID (#ML-XXXXXX)');
      return false;
    }
    if (!password) {
      setError('Please enter your secure password');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
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
      const res = login(identifier, password, rememberDevice);
      setIsLoading(false);
      if (res.success && onSuccess) {
        onSuccess();
      } else if (!res.success) {
        setError(res.error || 'Invalid credentials.');
      }
    }, 450);
  };

  const handleDemoLogin = () => {
    setIdentifier(DEMO_PATIENT.email);
    setPassword('EmergencyDemo2026!');
    loginDemoPatient();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 mb-3 shadow-inner border border-teal-100">
          <HeartPulse className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Patient Sign In
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Access your digital emergency ID, prescriptions & pharmacy coordination
        </p>
      </div>

      {/* Demo Patient Fast Track Banner */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200/80 shadow-sm relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600 fill-teal-600/20" />
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                Instant Evaluator Access
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Test full clinical features as <strong className="text-slate-800">Sarah Jenkins</strong> (ID: <span className="font-mono text-teal-700">#ML-849201</span>, Blood: <span className="text-rose-600 font-semibold">O-Neg</span>).
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-sm active:scale-[0.99]"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>One-Click Demo Patient Login</span>
          <ArrowRight className="w-3.5 h-3.5 ml-auto text-teal-200" />
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs leading-relaxed animate-shake">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          {/* Email or MedLink ID */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email or MedLink ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (error) setError('');
                }}
                placeholder="sarah@medlink.org or #ML-849201"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                autoComplete="username"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span>Tip: Enter your 6-digit MedLink ID or registered clinical email</span>
            </p>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              {onSwitchToForgot && (
                <button
                  type="button"
                  onClick={onSwitchToForgot}
                  className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Device & Security status */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
              />
              <span className="text-xs text-slate-600">Remember this clinical workstation</span>
            </label>
            <div className="flex items-center gap-1 text-[11px] text-teal-700 font-medium bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
              <ShieldCheck className="w-3 h-3 text-teal-600" />
              <span>HIPAA 256-Bit</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to MedLink</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Don't have a MedLink patient account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-semibold text-teal-600 hover:text-teal-700 hover:underline"
            >
              Start Clinical Intake
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
