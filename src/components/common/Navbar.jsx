import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  HeartPulse, 
  Pill, 
  User, 
  Building2, 
  ShieldAlert, 
  Sparkles, 
  LogOut, 
  ChevronDown, 
  Home, 
  Search,
  Check
} from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView }) => {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:bg-teal-700 transition-colors">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-slate-900 block leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Med<span className="text-teal-600">Link</span>
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block leading-none">
              Real-Time Drug Availability & Coordination
            </span>
          </div>
        </div>

        {/* Desktop Central Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              currentView === 'landing'
                ? 'bg-white text-teal-700 shadow-xs font-bold ring-1 ring-teal-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-slate-500" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setCurrentView('search')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              currentView === 'search'
                ? 'bg-white text-teal-700 shadow-xs font-bold ring-1 ring-teal-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-teal-600" />
            <span>Medicine Search ⭐</span>
          </button>

          <button
            onClick={() => setCurrentView('patient')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              currentView === 'patient'
                ? 'bg-white text-teal-700 shadow-xs font-bold ring-1 ring-teal-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>Patient Portal</span>
          </button>

          <button
            onClick={() => setCurrentView('pharmacy')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              currentView === 'pharmacy'
                ? 'bg-white text-teal-700 shadow-xs font-bold ring-1 ring-teal-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pharmacy Portal</span>
          </button>

          <button
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-white text-rose-700 shadow-xs font-bold ring-1 ring-rose-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Admin Portal</span>
          </button>
        </nav>

        {/* Quick Demo Switcher & Active User Status */}
        <div className="flex items-center gap-2">
          {/* Demo Dropdown Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 text-teal-800 border border-teal-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">Demo Switcher</span>
              <ChevronDown className="w-3 h-3 text-teal-600" />
            </button>

            {isDemoDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 space-y-1 z-50 animate-scaleUp"
                onMouseLeave={() => setIsDemoDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Instant Evaluator Logins
                </div>

                <button
                  type="button"
                  onClick={() => {
                    loginDemoPatient();
                    setCurrentView('patient');
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
                    <span className="text-[10px] text-slate-500">Sarah Jenkins (O-Neg)</span>
                  </div>
                  {role === 'patient' && <Check className="w-4 h-4 text-teal-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    loginDemoPharmacy();
                    setCurrentView('pharmacy');
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
                    <span className="text-[10px] text-slate-500">Green Cross 24/7 (DL-CA-84920)</span>
                  </div>
                  {role === 'pharmacy' && <Check className="w-4 h-4 text-teal-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    loginDemoAdmin();
                    setCurrentView('admin');
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
                    <span className="text-[10px] text-slate-500">Dr. Cole (Chief Officer)</span>
                  </div>
                  {role === 'admin' && <Check className="w-4 h-4 text-rose-600" />}
                </button>
              </div>
            )}
          </div>

          {/* Active User Status & Logout */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (role === 'patient') setCurrentView('patient');
                  else if (role === 'pharmacy') setCurrentView('pharmacy');
                  else if (role === 'admin') setCurrentView('admin');
                }}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-left"
              >
                <div className={`w-8 h-8 rounded-lg text-white font-bold text-xs flex items-center justify-center font-mono ${
                  role === 'admin' ? 'bg-rose-600' : role === 'pharmacy' ? 'bg-emerald-600' : 'bg-teal-600'
                }`}>
                  {role === 'admin' ? 'ADM' : role === 'pharmacy' ? 'RX' : (user.bloodGroup || 'PT')}
                </div>
                <div className="hidden sm:block leading-tight max-w-[120px] truncate">
                  <span className="text-xs font-bold text-slate-800 block truncate">
                    {user.fullName || user.name || 'User'}
                  </span>
                  <span className="text-[10px] font-mono text-teal-700 uppercase">
                    {role || 'Verified'}
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  logout();
                  setCurrentView('landing');
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                title="Sign out of session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('patient')}
              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="flex lg:hidden items-center justify-around bg-slate-50 border-t border-slate-200 px-2 py-2 text-xs font-semibold overflow-x-auto gap-1">
        <button
          onClick={() => setCurrentView('landing')}
          className={`px-2.5 py-1 rounded-lg ${currentView === 'landing' ? 'bg-teal-600 text-white font-bold' : 'text-slate-600'}`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentView('search')}
          className={`px-2.5 py-1 rounded-lg ${currentView === 'search' ? 'bg-teal-600 text-white font-bold' : 'text-slate-600'}`}
        >
          Search ⭐
        </button>
        <button
          onClick={() => setCurrentView('patient')}
          className={`px-2.5 py-1 rounded-lg ${currentView === 'patient' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
        >
          Patient
        </button>
        <button
          onClick={() => setCurrentView('pharmacy')}
          className={`px-2.5 py-1 rounded-lg ${currentView === 'pharmacy' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
        >
          Pharmacy
        </button>
        <button
          onClick={() => setCurrentView('admin')}
          className={`px-2.5 py-1 rounded-lg ${currentView === 'admin' ? 'bg-rose-600 text-white' : 'text-slate-600'}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
};
