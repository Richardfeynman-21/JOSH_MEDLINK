import React from 'react';
import { HeartPulse, Activity } from 'lucide-react';

/**
 * LoadingFallback - Clinical pulse loading skeleton for route code-splitting
 * Designed with MedLink's signature teal (#0d9488) clinical aesthetic.
 */
export default function LoadingFallback({ message = 'Loading clinical portal...' }) {
  return (
    <div 
      className="w-full min-h-[60vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center animate-fadeIn"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* Central Clinical Pulse Indicator */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer radiating ripples */}
        <div className="absolute w-24 h-24 rounded-full bg-teal-500/10 animate-ping" />
        <div className="absolute w-20 h-20 rounded-full bg-teal-500/20 animate-pulse" />
        
        {/* Core Heart Pulse Icon Card */}
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-teal-600/30">
          <HeartPulse className="w-8 h-8 animate-pulse text-white" />
        </div>
      </div>

      {/* Clinical Status Text */}
      <div className="text-center space-y-2 max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-wide uppercase">
          <Activity className="w-3.5 h-3.5 text-teal-600 animate-spin" />
          <span>Synchronizing Formulary Data</span>
        </div>
        <h3 className="text-base font-bold text-slate-800 tracking-tight">
          {message}
        </h3>
        <p className="text-xs text-slate-500">
          Fetching verified pharmacy inventory, encrypted health records, and geospatial route coordinates...
        </p>
      </div>

      {/* Simulated Skeleton Cards Grid */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 opacity-75">
        {[1, 2, 3].map((item) => (
          <div 
            key={item} 
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-24 h-4 bg-slate-200 rounded-md animate-pulse" />
              <div className="w-12 h-4 bg-teal-100 rounded-full animate-pulse" />
            </div>
            <div className="w-full h-8 bg-slate-100 rounded-lg animate-pulse" />
            <div className="flex items-center gap-2 pt-2">
              <div className="w-6 h-6 rounded-md bg-teal-50 animate-pulse" />
              <div className="w-32 h-3 bg-slate-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
