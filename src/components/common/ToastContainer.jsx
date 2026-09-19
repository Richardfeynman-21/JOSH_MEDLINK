import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, ShieldAlert, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, dismissToast } = useAuth();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = 'border-teal-500 bg-white text-slate-800 shadow-teal-900/10';
        let icon = <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />;

        if (toast.type === 'error') {
          borderClass = 'border-rose-500 bg-rose-50 text-slate-900 shadow-rose-900/10';
          icon = <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
        } else if (toast.type === 'clinical') {
          borderClass = 'border-teal-600 bg-teal-950 text-white shadow-teal-950/20';
          icon = <ShieldAlert className="w-5 h-5 text-teal-300 flex-shrink-0" />;
        } else if (toast.type === 'info') {
          borderClass = 'border-slate-300 bg-white text-slate-800 shadow-slate-900/10';
          icon = <Info className="w-5 h-5 text-slate-600 flex-shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 ${borderClass}`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${toast.type === 'clinical' ? 'text-teal-200' : 'text-slate-500'}`}>
                  {toast.title}
                </p>
              )}
              <p className={`text-sm font-medium leading-snug ${toast.type === 'clinical' ? 'text-teal-50' : 'text-slate-800'}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
