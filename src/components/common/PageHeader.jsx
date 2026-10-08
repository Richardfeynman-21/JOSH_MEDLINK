import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HeartPulse,
  Home,
  ChevronRight,
  LogIn,
  LogOut,
  Sparkles,
  Check,
  ChevronDown
} from 'lucide-react';

export default function PageHeader({
  breadcrumbs = [],
  title,
  badge,
  badgeVariant = 'teal',
  actions
}) {
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

  const getBadgeClass = () => {
    switch (badgeVariant) {
      case 'rose':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'cyan':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'teal':
      default:
        return 'bg-teal-50 text-teal-800 border-teal-200';
    }
  };

  return (
    <header className="sticky top-0 z-30 pt-3 pb-3 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent backdrop-blur-md">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-sm px-4 sm:px-5 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Brand Logo + Breadcrumbs Trail */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl"
            title="Return to MedLink Home"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <HeartPulse className="w-4 h-4" />
            </div>
            <span className="text-base font-black tracking-tight text-slate-900 font-sans hidden sm:inline">
              Med<span className="text-teal-600">Link</span>
            </span>
          </Link>

          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Breadcrumb Path */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold truncate">
            <Link to="/" className="hover:text-teal-700 flex items-center gap-1 shrink-0">
              <Home className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Home</span>
            </Link>

            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-teal-700 truncate max-w-[120px] sm:max-w-none">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-bold truncate max-w-[140px] sm:max-w-none">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}

            {badge && (
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border hidden lg:inline-block ${getBadgeClass()}`}>
                {badge}
              </span>
            )}
          </nav>
        </div>

        {/* Right: Actions, Demo Switcher, & Single Login Button */}
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          {actions}

          {/* Evaluator Demo Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
              aria-label="Toggle Demo Switcher"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span className="hidden xl:inline">Demo Switcher</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
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
                    navigate('/patient');
                    setIsDemoDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-xs ${
                    role === 'patient' ? 'bg-teal-50 text-teal-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">P</div>
                  <span className="flex-1 truncate">Demo Patient (Kavitha)</span>
                  {role === 'patient' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    loginDemoPharmacy();
                    navigate('/pharmacy');
                    setIsDemoDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-xs ${
                    role === 'pharmacy' ? 'bg-teal-50 text-teal-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">Rx</div>
                  <span className="flex-1 truncate">Demo Pharmacy (Apollo)</span>
                  {role === 'pharmacy' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    loginDemoAdmin();
                    navigate('/admin');
                    setIsDemoDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2 text-xs ${
                    role === 'admin' ? 'bg-rose-50 text-rose-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">Ad</div>
                  <span className="flex-1 truncate">Demo Admin (Dr. R. Sundararajan)</span>
                  {role === 'admin' && <Check className="w-3.5 h-3.5 text-rose-600" />}
                </button>
              </div>
            )}
          </div>

          {/* User Status OR Single Login Button */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-1.5">
              <Link
                to={role === 'pharmacy' ? '/pharmacy' : role === 'admin' ? '/admin' : '/patient'}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                title="Active Profile"
              >
                <div className={`w-6 h-6 rounded text-white font-bold text-[10px] flex items-center justify-center font-mono ${
                  role === 'admin' ? 'bg-rose-600' : role === 'pharmacy' ? 'bg-emerald-600' : 'bg-teal-600'
                }`}>
                  {role === 'admin' ? 'ADM' : role === 'pharmacy' ? 'RX' : (user.bloodGroup || 'PT')}
                </div>
                <span className="text-xs font-bold text-slate-800 max-w-[90px] truncate hidden sm:inline">
                  {user.fullName || user.name || 'User'}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-xs transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
