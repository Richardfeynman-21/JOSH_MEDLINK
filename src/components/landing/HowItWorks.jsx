import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Building2,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Smartphone,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function HowItWorks({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    {
      number: '01',
      title: 'Search (Brand, Generic, or Drug ID)',
      subtitle: 'Instant clinical autocomplete and NDC/CDSCO salt matching',
      description:
        'Type your prescribed medication name, active generic salt, or scan the prescription code. MedLink instantly checks live availability across 480+ local pharmacies within your radius.',
      badge: 'Step 1: Intelligent Lookup',
      icon: Search,
      preview: {
        headline: 'Instant Live Autocomplete',
        items: [
          'Brand Name: Augmentin 625 Duo (GSK)',
          'Generic Salt: Amoxicillin 500mg + Clavulanate 125mg',
          'Dosage Form: Oral Film-Coated Tablet',
          'Rx Requirement: Valid Doctor Prescription Required',
        ],
        tip: 'Filter by 24/7 dispensaries, drive-thru access, or pediatric formulations.',
      },
    },
    {
      number: '02',
      title: 'Locate Nearby Pharmacy with Live Stock',
      subtitle: 'Accurate physical unit counts verified through pharmacy ERPs',
      description:
        'Compare nearby dispensaries by live in-stock counts, verified retail price, distance, and closing time. Green pins denote ample supply, amber warns of low stock (<10 units), and red denotes emergency ICU reserves.',
      badge: 'Step 2: Geolocation & Stock Verification',
      icon: MapPin,
      preview: {
        headline: 'Verified Real-Time Inventory Status',
        items: [
          'Green Cross 24/7 (0.8 km) - 142 units in stock',
          'Apollo Central (1.4 km) - 86 units in stock',
          'MedPlus Supercare (2.1 km) - 4 units left (Low Stock Alert)',
        ],
        tip: 'Color-coded telemetry pins update automatically via bi-directional sync.',
      },
    },
    {
      number: '03',
      title: 'Hold for 2h or Request 30-min Courier Delivery',
      subtitle: 'Choose between in-person pickup with guaranteed shelf hold or direct courier',
      description:
        'Lock the medication physically behind the pharmacy counter for 2 hours with zero upfront deposit, or request temperature-monitored courier dispatch straight to your residence or clinic.',
      badge: 'Step 3: Instant Reservation or Dispatch',
      icon: Clock,
      preview: {
        headline: 'Dual Fulfillment Options',
        items: [
          'Option A: Free 2-Hour In-Store Shelf Hold (Pull & Lock Guarantee)',
          'Option B: 30-Minute Courier Dispatch with live temperature log',
          'Reservation Token: Encrypted alphanumeric code with QR check-in',
        ],
        tip: 'Pharmacists receive instant audible alerts on their dispensary terminals.',
      },
    },
    {
      number: '04',
      title: 'Pick Up or Receive at Doorstep',
      subtitle: 'Zero-wait counter checkout or tamper-evident doorstep handoff',
      description:
        'Show your digital QR token at the priority pickup counter for immediate handoff without waiting in regular pharmacy lines. For deliveries, verify tamper-evident packaging and track couriers in real time.',
      badge: 'Step 4: Seamless Patient Handoff',
      icon: CheckCircle2,
      preview: {
        headline: 'Guaranteed Dispensing Handoff',
        items: [
          'Counter scan: 1-second QR barcode verification',
          'Digital receipt & batch tracking automatically logged to medical profile',
          'Continuous pharmacist support via 24/7 in-app emergency line',
        ],
        tip: 'Prescriptions are permanently archived in your HIPAA-compliant digital vault.',
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Seamless 4-Step Patient Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How MedLink Delivers Unbroken Medicine Access
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            From emergency prescription to verified pill in hand — four streamlined steps eliminate anxiety and delays.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-black font-mono px-2 py-0.5 rounded-md ${
                      isCurrent ? 'bg-white/20 text-white' : 'bg-white text-teal-700 shadow-2xs'
                    }`}
                  >
                    {step.number}
                  </span>
                  <Icon className={`w-5 h-5 ${isCurrent ? 'text-teal-200' : 'text-slate-400'}`} />
                </div>

                <div>
                  <h3 className={`text-sm font-black leading-tight ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${isCurrent ? 'text-teal-100' : 'text-slate-500'}`}>
                    {step.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-semibold">
                  <span className={isCurrent ? 'text-teal-200' : 'text-teal-700'}>
                    {isCurrent ? 'Active View' : 'Explore Step →'}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isCurrent ? 'text-teal-200' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Detailed Step Breakdown Card */}
        {STEPS[activeStep] && (
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            
            {/* Left: Step Explanations */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
                {STEPS[activeStep].badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {STEPS[activeStep].title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {STEPS[activeStep].description}
              </p>

              {/* Step Navigation Dots */}
              <div className="pt-3 flex items-center gap-2">
                {STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeStep === idx ? 'w-8 bg-teal-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => onNavigate && onNavigate('search')}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Experience Step in Live Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {activeStep < 3 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Next Step ({activeStep + 2}/4) →
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveStep(0)}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    Restart Workflow Tour
                  </button>
                )}
              </div>
            </div>

            {/* Right: Realistic UI Mockup Snippet */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    <span className="text-xs font-black uppercase text-slate-900 tracking-wider">
                      {STEPS[activeStep].preview.headline}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Step {activeStep + 1} of 4</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700">
                  {STEPS[activeStep].preview.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200/80 text-xs text-teal-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Clinical Insight:</strong> {STEPS[activeStep].preview.tip}</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
