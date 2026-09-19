import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { PatientDashboard } from './components/profile/PatientDashboard';
import { ToastContainer } from './components/common/ToastContainer';
import MedicineSearchMain from './components/search/MedicineSearchMain';
import { 
  HeartPulse, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles,
  LogOut,
  Pill,
  Search,
} from 'lucide-react';
import './App.css';

// Inner App component that consumes AuthContext
function MainApp() {
  const { user, isAuthenticated, logout, loginDemoPatient } = useAuth();

  // Navigation mode for evaluating components
  // 'search' | 'dashboard' | 'register' | 'login' | 'forgot'
  const [currentView, setCurrentView] = useState('search');

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* 24/7 Emergency Drug Access Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 text-white px-4 py-1.5 text-xs font-semibold shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="font-extrabold uppercase tracking-wider">Emergency Drug Protocol Active</span>
            <span className="hidden sm:inline text-rose-100 font-normal">| Universal O-Negative Blood & Anaphylaxis Fast-Track</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:18006335465"
              className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>24/7 Hotline: 1-800-MED-LINK</span>
            </a>
            <span className="text-rose-200 hidden md:inline">HIPAA Certified</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Platform Name */}
          <div 
            onClick={() => setCurrentView(isAuthenticated ? 'dashboard' : 'login')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30 group-hover:bg-teal-700 transition-colors">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 block leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Med<span className="text-teal-600">Link</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block leading-none">
                Clinical Patient System
              </span>
            </div>
          </div>

          {/* Navigation Mode Switcher for Evaluators */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
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
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-white text-teal-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Patient Dashboard
            </button>

            <button
              onClick={() => setCurrentView('register')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentView === 'register'
                  ? 'bg-white text-teal-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Clinical Intake (Register)
            </button>

            <button
              onClick={() => setCurrentView('login')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentView === 'login'
                  ? 'bg-white text-teal-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => setCurrentView('forgot')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentView === 'forgot'
                  ? 'bg-white text-teal-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Forgot Password (OTP)
            </button>
          </nav>

          {/* User Auth Pill / Demo Button */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    {user.bloodGroup}
                  </div>
                  <div className="hidden sm:block leading-tight">
                    <span className="text-xs font-bold text-slate-800 block">{user.fullName}</span>
                    <span className="text-[10px] font-mono text-teal-700">{user.id}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setCurrentView('login');
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                  title="Sign out of patient session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    loginDemoPatient();
                    setCurrentView('dashboard');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Demo Patient:</span>
                  <span>Sarah Jenkins</span>
                </button>
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex md:hidden items-center justify-around bg-slate-50 border-t border-slate-200 px-2 py-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setCurrentView('search')}
            className={`px-2.5 py-1 rounded-lg ${currentView === 'search' ? 'bg-teal-600 text-white font-bold' : 'text-slate-600'}`}
          >
            Search ⭐
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-2.5 py-1 rounded-lg ${currentView === 'dashboard' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('register')}
            className={`px-2.5 py-1 rounded-lg ${currentView === 'register' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
          >
            Intake
          </button>
          <button
            onClick={() => setCurrentView('login')}
            className={`px-2.5 py-1 rounded-lg ${currentView === 'login' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentView('forgot')}
            className={`px-2.5 py-1 rounded-lg ${currentView === 'forgot' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
          >
            OTP
          </button>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 pb-16">
        {currentView === 'search' && (
          <MedicineSearchMain />
        )}

        {currentView === 'dashboard' && (
          <PatientDashboard onOpenAuthModal={() => setCurrentView('login')} />
        )}

        {currentView === 'register' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Register
              onSwitchToLogin={() => setCurrentView('login')}
              onSuccess={() => setCurrentView('dashboard')}
            />
          </div>
        )}

        {currentView === 'login' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Login
              onSwitchToRegister={() => setCurrentView('register')}
              onSwitchToForgot={() => setCurrentView('forgot')}
              onSuccess={() => setCurrentView('dashboard')}
            />
          </div>
        )}

        {currentView === 'forgot' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ForgotPassword
              onSwitchToLogin={() => setCurrentView('login')}
            />
          </div>
        )}
      </main>

      {/* Clinical Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto text-slate-500 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-700 font-semibold">
            <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>MedLink Clinical Operating System & Emergency Drug Network</span>
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <span>HIPAA Compliant</span>
            <span>AES-256 Medical Encryption</span>
            <span>24/7 Formulary Sync</span>
            <span className="text-teal-700 font-medium">Metro City Regional Network</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
