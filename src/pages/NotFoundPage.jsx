import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { HeartPulse, Home, Search, Flame } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <PageHeader
        breadcrumbs={[
          { label: 'Error 404' }
        ]}
        badge="Route Not Found"
        badgeVariant="rose"
      />

      <div className="min-h-[55vh] flex items-center justify-center px-4 py-8">
        <div className="relative max-w-lg w-full bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-10 text-center space-y-6 antigravity-float">
          {/* Ambient Glow */}
          <div 
            aria-hidden="true"
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-teal-500/15 rounded-full blur-2xl pointer-events-none"
          />

          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto shadow-inner">
            <HeartPulse className="w-8 h-8 animate-pulse motion-reduce:animate-none" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Error 404 • Destination Unknown
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Page Not Located on Health Grid
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              The pharmaceutical route or resource you requested does not exist on the MedLink Chennai network.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>

            <Link
              to="/search"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search Medicines</span>
            </Link>

            <Link
              to="/emergency"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs border border-rose-200 transition-colors"
            >
              <Flame className="w-4 h-4 text-rose-600" />
              <span>108 SOS</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
