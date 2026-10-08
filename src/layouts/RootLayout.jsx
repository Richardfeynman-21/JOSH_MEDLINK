import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { EmergencyBanner } from '../components/common/EmergencyBanner';
import { ToastContainer } from '../components/common/ToastContainer';
import LoadingFallback from '../components/common/LoadingFallback';
import ScrollToTop from '../components/common/ScrollToTop';

export default function RootLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Skip to Main Content Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 px-4 py-2 bg-teal-700 text-white font-bold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
      >
        Skip to main content
      </a>

      {/* 24/7 Emergency Drug Protocol Header Banner */}
      <EmergencyBanner />

      {/* Main Multipage Navigation (Rendered strictly on the Home page) */}
      {isHomePage && <Navbar />}

      {/* Main Page Content Outlet */}
      <main id="main-content" className="flex-1 pb-16 relative">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Healthcare Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}
