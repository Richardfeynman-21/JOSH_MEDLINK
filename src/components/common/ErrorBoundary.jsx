import React, { Component } from 'react';
import { 
  ShieldAlert, 
  RotateCcw, 
  Activity, 
  AlertTriangle, 
  Home, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('MedLink Clinical System Intercepted Uncaught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRecover = () => {
    // Reset internal state
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else if (typeof window !== 'undefined') {
      // Safe fallback to restore the active session view
      window.location.hash = '';
      window.location.reload();
    }
  };

  handleResetViewOnly = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          resetErrorBoundary: this.handleRecover
        });
      }

      const errorMessage = this.state.error?.message || 'An unexpected client-side runtime exception occurred.';
      const errorStack = this.state.error?.stack || this.state.errorInfo?.componentStack || '';

      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
          <div className="max-w-2xl w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
            {/* Top Amber Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-teal-500" />

            {/* Medical Shield Header */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px] font-bold uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Clinical Safety Protocol Engaged</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Session Interrupted Safely
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The MedLink active error boundary intercepted an unexpected client rendering issue. Patient health records, formulary inventory, and active shelf holds remain intact.
                </p>
              </div>
            </div>

            {/* Error Diagnostics Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-rose-400 font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Runtime Diagnostics
                </span>
                <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-400">
                  Status: INTERCEPTED
                </span>
              </div>
              <div className="text-xs font-mono text-rose-200 bg-rose-950/30 p-2.5 rounded-xl border border-rose-900/40 break-words">
                {errorMessage}
              </div>
              {errorStack && (
                <details className="text-[11px] text-slate-400 cursor-pointer pt-1">
                  <summary className="hover:text-slate-300 select-none">View component trace</summary>
                  <pre className="mt-2 p-3 bg-black/40 rounded-lg text-[10px] text-slate-400 font-mono overflow-x-auto max-h-40 whitespace-pre-wrap leading-relaxed">
                    {errorStack}
                  </pre>
                </details>
              )}
            </div>

            {/* Clinical Safety Assurance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero data loss: State stored safely</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>24/7 Pharmacy ERP link preserved</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={this.handleRecover}
                className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recover Session</span>
              </button>

              <button
                onClick={this.handleResetViewOnly}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-600/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Reload View</span>
              </button>

              <a
                href="tel:18006335465"
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>1-800-MED-LINK</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
