import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HeartPulse, 
  Pill, 
  Sparkles, 
  LogOut, 
  ChevronDown, 
  Check,
  Scan,
  LogIn,
  Flame,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const { 
    user, 
    role, 
    isAuthenticated, 
    logout, 
    loginDemoPatient, 
    loginDemoPharmacy, 
    loginDemoAdmin 
  } = useAuth();

  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 pt-3 pb-2 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/85 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-lg shadow-teal-950/5 px-4 sm:px-5 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Telemetry Tag */}
          <Link 
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl"
            aria-label="MedLink Chennai Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-700/25 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900 font-sans">
                  Med<span className="text-teal-600">Link</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full border border-teal-200">
                  Chennai Grid
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold hidden md:block">
                Real-Time Drug Availability &amp; Coordination
              </span>
            </div>
          </Link>

          {/* Center Navigation Shortcuts */}
          <nav aria-label="Home Quick Navigation" className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
            <Link
              to="/search"
              className="px-3.5 py-2 rounded-xl hover:text-teal-800 hover:bg-teal-50/80 transition-colors flex items-center gap-1.5"
            >
              <Pill className="w-3.5 h-3.5 text-teal-600" />
              <span>Search Medicines</span>
            </Link>

            <Link
              to="/ocr-scanner"
              className="px-3.5 py-2 rounded-xl hover:text-cyan-800 hover:bg-cyan-50/80 transition-colors flex items-center gap-1.5"
            >
              <Scan className="w-3.5 h-3.5 text-cyan-600" />
              <span>Optical Rx Scanner</span>
            </Link>

            <Link
              to="/emergency"
              className="px-3.5 py-2 rounded-xl text-rose-700 hover:text-rose-900 hover:bg-rose-50/80 transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>24/7 Trauma SOS</span>
            </Link>
          </nav>

          {/* Right Action: Demo Evaluator Menu + Single Elegant Login Button */}
          <div className="flex items-center gap-2.5">
            {/* Instant Evaluator Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
                aria-label="Toggle Demo Switcher"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden sm:inline">Demo Switcher</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isDemoDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 space-y-1 z-50 animate-scaleUp"
                  onMouseLeave={() => setIsDemoDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Instant Evaluator Demo Logins
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      loginDemoPatient();
                      navigate('/patient');
                      setIsDemoDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2.5 ${
                      role === 'patient' ? 'bg-teal-50 text-teal-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                      P
                    </div>
                    <div className="leading-tight flex-1">
                      <span className="text-xs font-bold block text-slate-800">Demo Patient</span>
                      <span className="text-[10px] text-slate-500">Kavitha Sundaram (Chennai)</span>
                    </div>
                    {role === 'patient' && <Check className="w-4 h-4 text-teal-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginDemoPharmacy();
                      navigate('/pharmacy');
                      setIsDemoDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2.5 ${
                      role === 'pharmacy' ? 'bg-teal-50 text-teal-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      Rx
                    </div>
                    <div className="leading-tight flex-1">
                      <span className="text-xs font-bold block text-slate-800">Demo Pharmacy</span>
                      <span className="text-[10px] text-slate-500">Apollo Pharmacy 24/7 (T. Nagar)</span>
                    </div>
                    {role === 'pharmacy' && <Check className="w-4 h-4 text-teal-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      loginDemoAdmin();
                      navigate('/admin');
                      setIsDemoDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-2.5 ${
                      role === 'admin' ? 'bg-rose-50 text-rose-900' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                      Ad
                    </div>
                    <div className="leading-tight flex-1">
                      <span className="text-xs font-bold block text-slate-800">Demo Admin</span>
                      <span className="text-[10px] text-slate-500">Dr. R. Sundararajan (CDSCO TN)</span>
                    </div>
                    {role === 'admin' && <Check className="w-4 h-4 text-rose-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* SINGLE HIGH-END LOGIN BUTTON (OR ACTIVE USER PROFILE) */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={role === 'pharmacy' ? '/pharmacy' : role === 'admin' ? '/admin' : '/patient'}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg text-white font-bold text-xs flex items-center justify-center font-mono ${
                    role === 'admin' ? 'bg-rose-600' : role === 'pharmacy' ? 'bg-emerald-600' : 'bg-teal-600'
                  }`}>
                    {role === 'admin' ? 'ADM' : role === 'pharmacy' ? 'RX' : (user.bloodGroup || 'PT')}
                  </div>
                  <div className="hidden sm:block leading-tight max-w-[120px] truncate text-left">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      {user.fullName || user.name || 'User'}
                    </span>
                    <span className="text-[10px] font-mono text-teal-700 uppercase">
                      {role || 'Verified'}
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign out of session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* SINGLE ELEGANT LOGIN BUTTON */
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white text-xs font-extrabold shadow-md shadow-teal-700/20 hover:shadow-lg hover:shadow-teal-700/30 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 group"
              >
                <LogIn className="w-4 h-4 text-teal-200 group-hover:translate-x-0.5 transition-transform" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
