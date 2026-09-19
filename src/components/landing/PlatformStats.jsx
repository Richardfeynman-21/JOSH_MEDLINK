import React, { useState, useEffect } from 'react';
import {
  Building2,
  Pill,
  Clock,
  Truck,
  TrendingUp,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function PlatformStats() {
  // Live pulse state to give a subtle real-time breathing feel
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((prev) => (prev + 1) % 1000);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const STAT_ITEMS = [
    {
      id: 'pharmacies',
      value: '480+',
      label: 'Verified Partner Pharmacies',
      description: 'Hospital & community dispensaries connected via live ERP APIs in Metro Area.',
      trend: '+14 joined this month',
      trendPositive: true,
      icon: Building2,
      accentColor: 'teal',
      badge: '100% CDSCO Licensed',
    },
    {
      id: 'medicines',
      value: '14,250+',
      label: 'Real-Time Medicines Indexed',
      description: 'Synchronized live batch numbers, dosage strengths & bioequivalent generics.',
      trend: '99.4% Stock accuracy rate',
      trendPositive: true,
      icon: Pill,
      accentColor: 'cyan',
      badge: 'Live ERP Feeds',
    },
    {
      id: 'holds',
      value: '28,400+',
      label: '2-Hour Shelf-Holds Fulfilled',
      description: 'Zero patient turnaways once a 2-hour encrypted reservation token is generated.',
      trend: 'Avg pickup within 41 mins',
      trendPositive: true,
      icon: Clock,
      accentColor: 'emerald',
      badge: 'Zero Walk-Away Rate',
    },
    {
      id: 'delivery',
      value: '24 mins',
      label: 'Average Emergency Delivery',
      description: 'Cold-chain biologics, insulin & critical care couriers mobilized on fast-track.',
      trend: '24/7 dedicated dispatch',
      trendPositive: true,
      icon: Truck,
      accentColor: 'rose',
      badge: 'Cold-Chain Certified',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Real-time Telemetry Status Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Real-Time Regional Network Health
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-xs text-slate-500">
                All 480 node gateways operational • Central sync latency: <span className="font-mono font-bold text-teal-700">38ms</span> • Zero downtime reported
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Telemetry verified via ISO-27001 Secure Gateway</span>
          </div>
        </div>

        {/* 4 Counter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white transition-colors flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                      {item.value}
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mt-1">
                      {item.label}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-teal-700 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    {item.trend}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mini Live Ticker of network events */}
        <div className="p-3 bg-white rounded-xl border border-slate-200/70 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
              Live Feed
            </span>
            <span className="text-slate-700">
              Just now: <strong>Green Cross 24/7</strong> fulfilled reservation <span className="font-mono text-teal-700 font-semibold">#RES-8849</span> (Lipitor 20mg)
            </span>
          </div>
          <span className="text-slate-400 text-[11px] font-mono">
            Next telemetry pulse in 3s
          </span>
        </div>

      </div>
    </section>
  );
}
