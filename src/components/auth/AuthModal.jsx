import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';
import { X } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialView = 'login', onSuccess }) => {
  const [view, setView] = useState(initialView);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 sm:p-4">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-2 sm:p-4">
          {view === 'login' && (
            <Login
              onSwitchToRegister={() => setView('register')}
              onSwitchToForgot={() => setView('forgot')}
              onSuccess={() => {
                if (onSuccess) onSuccess();
                if (onClose) onClose();
              }}
            />
          )}

          {view === 'register' && (
            <Register
              onSwitchToLogin={() => setView('login')}
              onSuccess={() => {
                if (onSuccess) onSuccess();
                if (onClose) onClose();
              }}
            />
          )}

          {view === 'forgot' && (
            <ForgotPassword
              onSwitchToLogin={() => setView('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};
