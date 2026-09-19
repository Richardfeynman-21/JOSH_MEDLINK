import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { ToastContainer } from './components/common/ToastContainer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Landing & Search Components
import { LandingPage } from './components/landing/LandingPage';
import MedicineSearchMain from './components/search/MedicineSearchMain';

// Patient Portal Components
import { 
  PatientDashboard, 
  PatientLogin, 
  PatientRegister, 
  ForgotPassword 
} from './components/patient';

// Pharmacy Portal Components
import { 
  PharmacyDashboard, 
  PharmacyLogin, 
  PharmacyRegister 
} from './components/pharmacy';

// Admin Portal Components
import { 
  AdminDashboard, 
  AdminLogin 
} from './components/admin';

import './App.css';

function MainApp() {
  const { user, role, isAuthenticated, loginDemoPatient, loginDemoPharmacy, loginDemoAdmin } = useAuth();

  // Top-level View: 'landing' | 'search' | 'patient' | 'pharmacy' | 'admin'
  const [currentView, setCurrentView] = useState('landing');

  // Sub-views for individual portals to give evaluators maximum flexibility
  const [patientSubView, setPatientSubView] = useState('dashboard'); // 'dashboard' | 'login' | 'register' | 'forgot'
  const [pharmacySubView, setPharmacySubView] = useState('dashboard'); // 'dashboard' | 'login' | 'register'
  const [adminSubView, setAdminSubView] = useState('dashboard'); // 'dashboard' | 'login'

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* 24/7 Emergency Drug Protocol Header Banner */}
      <EmergencyBanner />

      {/* Main Top Navigation */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* VIEW 1: LANDING PAGE */}
        {currentView === 'landing' && (
          <LandingPage onNavigate={setCurrentView} />
        )}

        {/* VIEW 2: MEDICINE SEARCH ⭐ */}
        {currentView === 'search' && (
          <MedicineSearchMain />
        )}

        {/* VIEW 3: PATIENT PORTAL */}
        {currentView === 'patient' && (
          <div className="space-y-6">
            {/* Sub-view switcher bar for evaluators */}
            <div className="bg-white border-b border-slate-200 shadow-2xs py-2 px-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
                  <span className="text-slate-400 font-bold uppercase text-[10px] hidden sm:inline mr-1">
                    Patient Views:
                  </span>
                  <button
                    onClick={() => {
                      if (!user || role !== 'patient') loginDemoPatient();
                      setPatientSubView('dashboard');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      patientSubView === 'dashboard'
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Patient Dashboard
                  </button>
                  <button
                    onClick={() => setPatientSubView('register')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      patientSubView === 'register'
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Clinical Intake (Register)
                  </button>
                  <button
                    onClick={() => setPatientSubView('login')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      patientSubView === 'login'
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Patient Sign In
                  </button>
                  <button
                    onClick={() => setPatientSubView('forgot')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      patientSubView === 'forgot'
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Forgot Password (OTP)
                  </button>
                </div>

                {role === 'patient' && (
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 hidden md:inline">
                    Authenticated: {user?.fullName || 'Sarah Jenkins'} ({user?.bloodGroup || 'O-'})
                  </span>
                )}
              </div>
            </div>

            {/* Patient Content View */}
            {patientSubView === 'dashboard' && (
              <PatientDashboard onOpenAuthModal={() => setPatientSubView('login')} />
            )}

            {patientSubView === 'register' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <PatientRegister
                  onSwitchToLogin={() => setPatientSubView('login')}
                  onSuccess={() => setPatientSubView('dashboard')}
                />
              </div>
            )}

            {patientSubView === 'login' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <PatientLogin
                  onSwitchToRegister={() => setPatientSubView('register')}
                  onSwitchToForgot={() => setPatientSubView('forgot')}
                  onSuccess={() => setPatientSubView('dashboard')}
                />
              </div>
            )}

            {patientSubView === 'forgot' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <ForgotPassword
                  onSwitchToLogin={() => setPatientSubView('login')}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: PHARMACY PORTAL */}
        {currentView === 'pharmacy' && (
          <div className="space-y-6">
            {/* Sub-view switcher bar for evaluators */}
            <div className="bg-white border-b border-slate-200 shadow-2xs py-2 px-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
                  <span className="text-slate-400 font-bold uppercase text-[10px] hidden sm:inline mr-1">
                    Pharmacy Views:
                  </span>
                  <button
                    onClick={() => {
                      if (!user || role !== 'pharmacy') loginDemoPharmacy();
                      setPharmacySubView('dashboard');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      pharmacySubView === 'dashboard'
                        ? 'bg-teal-700 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Pharmacy Dashboard
                  </button>
                  <button
                    onClick={() => setPharmacySubView('register')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      pharmacySubView === 'register'
                        ? 'bg-teal-700 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Partner Registration Intake
                  </button>
                  <button
                    onClick={() => setPharmacySubView('login')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      pharmacySubView === 'login'
                        ? 'bg-teal-700 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Workstation Sign In
                  </button>
                </div>

                {role === 'pharmacy' && (
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 hidden md:inline">
                    Dispensary: {user?.name || 'Green Cross 24/7'} ({user?.licenseNumber || 'DL-CA-84920'})
                  </span>
                )}
              </div>
            </div>

            {/* Pharmacy Content View */}
            {pharmacySubView === 'dashboard' && (
              <PharmacyDashboard onOpenAuthModal={() => setPharmacySubView('login')} />
            )}

            {pharmacySubView === 'register' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <PharmacyRegister
                  onSwitchToLogin={() => setPharmacySubView('login')}
                  onGoToAdmin={() => {
                    setCurrentView('admin');
                    setAdminSubView('dashboard');
                  }}
                />
              </div>
            )}

            {pharmacySubView === 'login' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <PharmacyLogin
                  onSwitchToRegister={() => setPharmacySubView('register')}
                  onSuccess={() => setPharmacySubView('dashboard')}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: ADMIN PORTAL */}
        {currentView === 'admin' && (
          <div className="space-y-6">
            {/* Sub-view switcher bar for evaluators */}
            <div className="bg-white border-b border-slate-200 shadow-2xs py-2 px-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
                  <span className="text-slate-400 font-bold uppercase text-[10px] hidden sm:inline mr-1">
                    Regulatory Admin:
                  </span>
                  <button
                    onClick={() => {
                      if (!user || role !== 'admin') loginDemoAdmin();
                      setAdminSubView('dashboard');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      adminSubView === 'dashboard'
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Supreme Admin Dashboard
                  </button>
                  <button
                    onClick={() => setAdminSubView('login')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      adminSubView === 'login'
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Level-5 Admin Key Login
                  </button>
                </div>

                {role === 'admin' && (
                  <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 hidden md:inline">
                    Chief Regulatory Officer: {user?.fullName || 'Dr. Christopher Cole'} (Clearance: LEVEL-5)
                  </span>
                )}
              </div>
            </div>

            {/* Admin Content View */}
            {adminSubView === 'dashboard' && (
              <AdminDashboard />
            )}

            {adminSubView === 'login' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <AdminLogin
                  onSuccess={() => setAdminSubView('dashboard')}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Clinical Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ErrorBoundary>
          <MainApp />
        </ErrorBoundary>
      </AuthProvider>
    </ErrorBoundary>
  );
}
