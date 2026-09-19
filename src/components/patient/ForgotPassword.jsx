import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  KeyRound, 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  RotateCw, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Check 
} from 'lucide-react';

export const ForgotPassword = ({ onSwitchToLogin }) => {
  const { showToast } = useAuth();

  // Step state: 1 = Identifier, 2 = 6-digit OTP, 3 = New Password
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('sarah.jenkins@medlink-patient.org');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);

  // New Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const otpInputRefs = useRef([]);

  // Resend Countdown Timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Step 1: Submit Identifier & Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your registered email or phone number');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setResendTimer(60);
      showToast('Security verification code sent. Demo code: 749201', 'info', 'OTP Dispatched');
      // Focus first cell
      setTimeout(() => {
        if (otpInputRefs.current[0]) otpInputRefs.current[0].focus();
      }, 100);
    }, 500);
  };

  // Step 2: Handle OTP cell change
  const handleOtpChange = (index, value) => {
    // Only accept numeric digit
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Handle single character
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Advance focus if character entered
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Paste 6 digits
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleFillDemoOtp = () => {
    setOtp(['7', '4', '9', '2', '0', '1']);
    setError('');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setError('Please enter the full 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      showToast('Verification successful! You can now choose a new clinical password.', 'success', 'Identity Confirmed');
    }, 450);
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(60);
    showToast('A new 6-digit code has been generated and dispatched (Demo: 749201).', 'info', 'OTP Resent');
  };

  // Step 3: Password Strength Analysis
  const passwordChecks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  };

  const strengthScore = Object.values(passwordChecks).filter(Boolean).length;

  const getStrengthLabel = () => {
    if (strengthScore <= 1) return { text: 'Weak', color: 'text-rose-500', bg: 'bg-rose-500', width: '25%' };
    if (strengthScore === 2) return { text: 'Fair', color: 'text-amber-500', bg: 'bg-amber-500', width: '50%' };
    if (strengthScore === 3) return { text: 'Good', color: 'text-teal-500', bg: 'bg-teal-500', width: '75%' };
    return { text: 'Strong (Clinical Grade)', color: 'text-teal-600', bg: 'bg-teal-600', width: '100%' };
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (strengthScore < 3) {
      setError('Please meet at least 3 password security criteria for medical data encryption');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Your MedLink password has been updated securely. Please sign in.', 'success', 'Password Updated');
      onSwitchToLogin();
    }, 500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 mb-3 border border-teal-100">
          <KeyRound className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Account Recovery
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Secure 3-step identity verification for your protected medical records
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === s ? 'w-8 bg-teal-600' : step > s ? 'w-3 bg-teal-300' : 'w-3 bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Card Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 p-6 sm:p-8">
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {/* STEP 1: Enter Identifier */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Email or Phone Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. sarah.jenkins@medlink-patient.org"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                We'll transmit a one-time 6-digit cryptographic passcode (OTP) to this channel.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Dispatching Code...</span>
                </>
              ) : (
                <>
                  <span>Send 6-Digit Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: 6-Slot Interactive OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fadeIn">
            <div>
              <div className="text-center mb-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Verification Code Sent
                </span>
                <p className="text-xs font-mono text-slate-800 font-semibold mt-0.5">{identifier}</p>
              </div>

              {/* 6-Slot OTP Cells */}
              <div className="flex justify-center gap-2 sm:gap-2.5 my-3" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-12 sm:w-12 sm:h-14 text-center font-mono text-xl font-extrabold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-xs"
                  />
                ))}
              </div>

              {/* Demo Helper Pill */}
              <div className="flex items-center justify-center mt-2">
                <button
                  type="button"
                  onClick={handleFillDemoOtp}
                  className="text-[11px] text-teal-700 font-medium bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  Quick Fill Demo Code: <strong className="font-mono">749201</strong>
                </button>
              </div>
            </div>

            {/* Resend Timer */}
            <div className="text-center pt-1">
              {resendTimer > 0 ? (
                <p className="text-xs text-slate-500">
                  Resend code in <strong className="font-mono text-teal-700">{resendTimer}s</strong>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Contact</span>
              </button>

              <button
                type="submit"
                disabled={isLoading || otp.join('').length < 6}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-sm shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Confirm Code'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Set New Password & Live Strength Meter */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                New Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Choose new password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Security Rating:</span>
                    <span className={`font-bold ${getStrengthLabel().color}`}>
                      {getStrengthLabel().text}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getStrengthLabel().bg}`}
                      style={{ width: getStrengthLabel().width }}
                    />
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                    <div className={`flex items-center gap-1 ${passwordChecks.length ? 'text-teal-700' : 'text-slate-400'}`}>
                      <Check className={`w-3 h-3 ${passwordChecks.length ? 'text-teal-600' : 'text-slate-300'}`} />
                      <span>8+ Characters</span>
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? 'text-teal-700' : 'text-slate-400'}`}>
                      <Check className={`w-3 h-3 ${passwordChecks.uppercase ? 'text-teal-600' : 'text-slate-300'}`} />
                      <span>Uppercase letter</span>
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.number ? 'text-teal-700' : 'text-slate-400'}`}>
                      <Check className={`w-3 h-3 ${passwordChecks.number ? 'text-teal-600' : 'text-slate-300'}`} />
                      <span>Number included</span>
                    </div>
                    <div className={`flex items-center gap-1 ${passwordChecks.special ? 'text-teal-700' : 'text-slate-400'}`}>
                      <Check className={`w-3 h-3 ${passwordChecks.special ? 'text-teal-600' : 'text-slate-300'}`} />
                      <span>Special symbol (@#$)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Repeat new password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-rose-500 mt-1">Passwords do not match yet</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || strengthScore < 3 || newPassword !== confirmPassword}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Updating Security Keys...' : 'Save New Password & Sign In'}
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Back to Login */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Patient Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
