import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Package,
  X,
} from 'lucide-react';
import { STOCK_STATUSES } from '../../data/mockMedicines';

export default function InteractivePharmacyMap({
  pharmacies,
  selectedMedicine,
  onSelectPharmacy,
  onReserve,
  viewMode, // 'split' | 'map' | 'list'
  onChangeViewMode,
}) {
  const [activePharmacyId, setActivePharmacyId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapFilter, setMapFilter] = useState('ALL'); // 'ALL' | 'IN_STOCK' | 'EMERGENCY'

  const activePharmacy = pharmacies.find((p) => p.id === activePharmacyId);
  const activeInventory = activePharmacy?.inventory;

  // Filter pharmacies based on map legend filter
  const displayedPharmacies = pharmacies.filter((p) => {
    if (mapFilter === 'IN_STOCK') return p.inventory?.status === 'IN_STOCK';
    if (mapFilter === 'EMERGENCY') return p.inventory?.status === 'EMERGENCY_RESERVE';
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Map Control Toolbar */}
      <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
          <span className="font-bold tracking-wider uppercase text-teal-400">
            Spatial Pharmacy Radar
          </span>
          <span className="text-slate-400 hidden sm:inline">
            • Centered at Koramangala 560034
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            type="button"
            onClick={() => onChangeViewMode('list')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            List View
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode('split')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer hidden md:inline-block ${
              viewMode === 'split'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Split View
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode('map')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Map View
          </button>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[460px] md:h-[540px] bg-slate-950 overflow-hidden select-none">
        {/* SVG Interactive Spatial Map */}
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Background Grid & Medical Corridor styling */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.75" strokeOpacity="0.6" />
            </pattern>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.12" />
              <stop offset="70%" stopColor="#0f766e" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="100%" height="100%" fill="#090d16" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Radar Background Glow */}
          <circle cx="400" cy="300" r="280" fill="url(#radarGlow)" />

          {/* Spatial Distance Rings centered at Patient Location (400, 300) */}
          <circle
            cx="400"
            cy="300"
            r="90"
            fill="none"
            stroke="#0d9488"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
          <text x="408" y="215" fill="#14b8a6" fontSize="10" fontFamily="monospace" opacity="0.8">
            2 km Zone
          </text>

          <circle
            cx="400"
            cy="300"
            r="180"
            fill="none"
            stroke="#0d9488"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            strokeOpacity="0.3"
          />
          <text x="408" y="125" fill="#14b8a6" fontSize="10" fontFamily="monospace" opacity="0.7">
            5 km Zone
          </text>

          <circle
            cx="400"
            cy="300"
            r="270"
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="6 6"
            strokeOpacity="0.4"
          />
          <text x="408" y="38" fill="#64748b" fontSize="10" fontFamily="monospace" opacity="0.6">
            10 km+ Zone
          </text>

          {/* Simulated Arterial Roads / Transit Corridors */}
          <path
            d="M 50 300 Q 250 290 400 300 T 750 310"
            fill="none"
            stroke="#1e293b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text x="620" y="325" fill="#475569" fontSize="9" fontWeight="600" opacity="0.7">
            Hosur Main Expressway
          </text>

          <path
            d="M 400 50 Q 390 180 400 300 T 420 550"
            fill="none"
            stroke="#1e293b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text x="425" y="470" fill="#475569" fontSize="9" fontWeight="600" opacity="0.7">
            Outer Ring Road
          </text>

          <path
            d="M 120 120 Q 300 220 400 300 T 680 480"
            fill="none"
            stroke="#1e293b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text x="140" y="140" fill="#475569" fontSize="8" fontWeight="500" opacity="0.6">
            Sony World 80ft Corridor
          </text>

          {/* Patient / User Live Location Pin at Center (400, 300) */}
          <g>
            <circle cx="400" cy="300" r="16" fill="#0d9488" fillOpacity="0.25" className="animate-ping" />
            <circle cx="400" cy="300" r="8" fill="#14b8a6" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="400" cy="300" r="3" fill="#ffffff" />
            <rect x="345" y="318" width="110" height="20" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#334155" strokeWidth="0.8" />
            <text x="400" y="332" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">
              Patient (PIN 560034)
            </text>
          </g>

          {/* Pharmacy Location Pins */}
          {displayedPharmacies.map((pharmacy) => {
            // Convert x, y percentages to 800x600 coordinates
            const px = (pharmacy.coords.x / 100) * 700 + 50;
            const py = (pharmacy.coords.y / 100) * 500 + 50;
            const isSelected = activePharmacyId === pharmacy.id;
            const statusKey = pharmacy.inventory?.status || 'OUT_OF_STOCK';
            const statusDef = STOCK_STATUSES[statusKey];

            return (
              <g
                key={pharmacy.id}
                onClick={() => {
                  setActivePharmacyId(pharmacy.id);
                  onSelectPharmacy(pharmacy);
                }}
                className="cursor-pointer group"
              >
                {/* Selection pulse halo */}
                {isSelected && (
                  <circle
                    cx={px}
                    cy={py}
                    r="24"
                    fill={statusDef.pinColor}
                    fillOpacity="0.3"
                    className="animate-pulse"
                  />
                )}

                {/* Radar Connection Line to patient center */}
                {isSelected && (
                  <line
                    x1="400"
                    y1="300"
                    x2={px}
                    y2={py}
                    stroke={statusDef.pinColor}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.8"
                  />
                )}

                {/* Pin Shadow */}
                <ellipse cx={px} cy={py + 10} rx="7" ry="3" fill="#000000" opacity="0.5" />

                {/* Main Marker Pin */}
                <circle
                  cx={px}
                  cy={py}
                  r={isSelected ? "14" : "11"}
                  fill={statusDef.pinColor}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? "3" : "2"}
                  className="transition-all duration-200 group-hover:scale-125"
                />

                {/* Inner Icon / Dot */}
                <circle cx={px} cy={py} r="4" fill="#ffffff" />

                {/* Pharmacy Name Tag floating next to pin */}
                <rect
                  x={px + 14}
                  y={py - 12}
                  width={pharmacy.name.length * 6.5 + 40}
                  height="22"
                  rx="6"
                  fill="#0f172a"
                  fillOpacity="0.9"
                  stroke={isSelected ? statusDef.pinColor : '#334155'}
                  strokeWidth={isSelected ? '1.5' : '0.8'}
                />
                <text
                  x={px + 20}
                  y={py + 3}
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  {pharmacy.name.split(' ')[0]} {pharmacy.name.split(' ')[1] || ''}
                </text>
                <text
                  x={px + pharmacy.name.length * 6.5 + 28}
                  y={py + 3}
                  fill={statusDef.pinColor}
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {pharmacy.distanceKm}k
                </text>
              </g>
            );
          })}
        </svg>

        {/* Map Control Buttons Overlay (Top-Right) */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center shadow-md cursor-pointer transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center shadow-md cursor-pointer transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center shadow-md cursor-pointer text-[10px] font-mono font-bold"
            title="Reset Zoom"
          >
            1x
          </button>
        </div>

        {/* Stock Legend Overlay (Top-Left) */}
        <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm p-2.5 rounded-xl border border-slate-700/80 text-white shadow-lg text-[11px] space-y-1.5 z-10 max-w-[210px]">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] flex items-center justify-between">
            <span>Availability Key</span>
            <span className="text-teal-400 font-mono">Live</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
            <span className="text-slate-300">Green = In Stock</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
            <span className="text-slate-300">Amber = Low Stock</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
            <span className="text-slate-300">Red = Emergency Reserve</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
            <span className="text-slate-400">Gray = Out of Stock</span>
          </div>

          <div className="pt-1 border-t border-slate-800 flex items-center gap-1 text-[10px]">
            <button
              onClick={() => setMapFilter('ALL')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                mapFilter === 'ALL' ? 'bg-teal-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMapFilter('IN_STOCK')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                mapFilter === 'IN_STOCK' ? 'bg-teal-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              In Stock
            </button>
            <button
              onClick={() => setMapFilter('EMERGENCY')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${
                mapFilter === 'EMERGENCY' ? 'bg-rose-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ICU Only
            </button>
          </div>
        </div>

        {/* Interactive Click-to-Preview Pharmacy Tooltip / Card (Bottom Overlay) */}
        {activePharmacy && (
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-white rounded-2xl p-4 shadow-2xl border-2 border-teal-500 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-extrabold text-slate-900 text-sm md:text-base">
                    {activePharmacy.name}
                  </h4>
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-mono">
                    {activePharmacy.distanceKm} km away
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{activePharmacy.address}</p>
              </div>

              <button
                type="button"
                onClick={() => setActivePharmacyId(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inventory Status & Price */}
            {activeInventory && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    {activeInventory.status === 'IN_STOCK' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        <span className="w-2 h-2 rounded-full bg-teal-600" />
                        {activeInventory.units} Units In Stock
                      </span>
                    )}
                    {activeInventory.status === 'LOW_STOCK' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        Only {activeInventory.units} Units Left
                      </span>
                    )}
                    {activeInventory.status === 'EMERGENCY_RESERVE' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-300">
                        ICU Reserve: {activeInventory.units} Units
                      </span>
                    )}
                    {activeInventory.status === 'OUT_OF_STOCK' && (
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Price: <strong className="text-slate-900 font-mono">₹{activeInventory.price.toFixed(2)}</strong> / pack
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onReserve(activePharmacy, selectedMedicine, activeInventory)}
                    disabled={activeInventory.status === 'OUT_OF_STOCK'}
                    className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Reserve</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
