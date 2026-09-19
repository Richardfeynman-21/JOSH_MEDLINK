# 🏥 MedLink: Intelligent Real-Time Medicine Availability, Pharmacy Coordination, and Emergency Drug Access System

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Design System](https://img.shields.io/badge/Stitch_MCP-Clinical_Clarity-0D9488?style=for-the-badge&logo=material-design&logoColor=white)](https://stitch.withgoogle.com/)
[![HIPAA UI Standard](https://img.shields.io/badge/Security-HIPAA_256--Bit_Ready-10B981?style=for-the-badge&logo=shield&logoColor=white)](https://www.hhs.gov/hipaa)

> **MedLink** is a centralized healthcare platform that connects patients, pharmacies, and regulatory healthcare administrators in real time. It eliminates the frustration and delays of visiting multiple stores or making dozens of phone calls during medical emergencies by providing live stock visibility, digital 2-hour shelf-hold reservations, pharmacy inventory management, and supreme administrative oversight.

---

## 🌟 Table of Contents
- [Executive Overview](#-executive-overview)
- [Three Dedicated Portal Roles & Logins](#-three-dedicated-portal-roles--logins)
  - [1. Patient Portal](#1-patient-portal)
  - [2. Pharmacy Partner Portal](#2-pharmacy-partner-portal)
  - [3. Regulatory & Healthcare Admin Portal](#3-regulatory--healthcare-admin-portal)
- [Flagship Main Landing Page](#-flagship-main-landing-page)
- [Real-Time Medicine Search & Emergency Access ⭐](#-real-time-medicine-search--emergency-access-)
- [Real-Time Cross-Portal State Coordination](#-real-time-cross-portal-state-coordination)
- [Design System: Clinical Clarity](#-design-system-clinical-clarity)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
- [Interactive Evaluation Guide](#-interactive-evaluation-guide)

---

## 🚀 Executive Overview

Finding critical medications during acute illnesses or emergencies is often plagued by inventory fragmentation, lack of real-time visibility, and manual phone inquiries. **MedLink** resolves this crisis through a tripartite architecture:
1. **Patients** find verified medicines, place 2-hour shelf-holds, manage digital emergency passports, and dispatch 1-click refills.
2. **Pharmacies** digitally manage their live drug formularies, process incoming patient reservations, and allocate emergency/ICU supplies.
3. **Administrators** possess complete oversight: reviewing and approving pharmacy drug licenses, monitoring all patient health records, inspecting global stock telemetry, and governing master drug pricing.

---

## 🔐 Three Dedicated Portal Roles & Logins

### 1. Patient Portal
Located in `src/components/patient/`:
- **Clinical Intake (`PatientRegister.jsx`)**: 4-step onboarding with demographic data, 8-card Blood Group selector ($O^-$ Universal Donor, $AB^+$ Universal Recipient), severe allergy chips (Penicillin, Sulfa, NSAIDs, Latex), 24/7 ICE contacts, PIN code geo-linking, and HIPAA consent.
- **Patient Sign In (`PatientLogin.jsx`)**: MedLink ID (`#ML-XXXXXX`) or Email authentication + workstation persistence.
- **Identity Recovery (`ForgotPassword.jsx`)**: 6-slot interactive OTP cells with auto-advance, backspace handling, clipboard paste, 60s countdown timer, and live password strength meter.
- **Active Dashboard (`PatientDashboard.jsx`)**:
  - **Digital Emergency Medical ID Card (`DigitalMedicalIdCard.jsx`)**: Scannable encrypted triage QR code, blood group badge, critical allergy warning chips, and 24/7 ICE quick-dial.
  - **Editable Personal Details (`EditablePersonalDetails.jsx`)**: Live inline profile editor.
  - **Medical Summary (`MedicalSummary.jsx`)**: Primary physician details with direct call.
  - **Preferred Pharmacies (`PreferredPharmaciesList.jsx`)**: Matched pharmacies by PIN with 24/7 and drive-thru tags.
  - **Prescription & Refill History (`PrescriptionRefillHistory.jsx`)**: Active medications with **One-Click Refill Dispatch** that triggers real-time courier tracking.

### 2. Pharmacy Partner Portal
Located in `src/components/pharmacy/`:
- **Pharmacy Partner Registration (`PharmacyRegister.jsx`)**: Onboarding dossier intake including Store Name, State Drug License # (e.g. `DL-CA-99214`), Pharmacist in-Charge Name, Phone, Email, Address, PIN code, 24/7 operating toggle, drive-thru toggle, and cold-chain certification. Submissions are queued under `PENDING_APPROVAL` for admin review.
- **Pharmacy Sign In (`PharmacyLogin.jsx`)**: Drug License # or Email login with workstation persistence. Includes **One-Click Demo Pharmacy Login** (*Green Cross 24/7 Pharmacy*).
- **Pharmacy Dashboard (`PharmacyDashboard.jsx`)**:
  - **Live Inventory Manager**: Real-time stock counts, batch numbers, expiry dates, unit prices, Rx-only toggle, inline quantity adjustments (`+1`, `-1`, `+10`), and **"RESERVED FOR EMERGENCY / ICU ONLY"** designation. Includes modal to add new drugs.
  - **Live 2-Hour Shelf-Hold Queue**: Real-time queue displaying incoming patient reservations with token (e.g. `MED-RES-8849-2H`), patient name, medication, quantity, live countdown timer, and **"Mark Dispensed / Complete"** or **"Cancel & Restock"** actions.
  - **Courier Delivery Orders Queue**: Incoming 30-min express courier delivery orders with cold-chain packaging assurance and dispatch button.
  - **Store Profile Settings**: 24/7 toggle, drive-thru toggle, and emergency stock threshold alerts.

### 3. Regulatory & Healthcare Admin Portal
Located in `src/components/admin/`:
- **Admin Sign In (`AdminLogin.jsx`)**: Level-5 Security Key authentication. Includes **One-Click Demo Admin Login** (*Chief Regulatory Officer Dr. Christopher Cole*).
- **Supreme Admin Dashboard (`AdminDashboard.jsx`)**:
  - **Tab 1: Pharmacy Licensing & Approvals**: Inspect pending pharmacy partner dossiers, verify Drug License # and tax ID, and execute **"Approve Pharmacy"** (instantly activates the pharmacy platform-wide) or **"Reject"**.
  - **Tab 2: Complete Patient Management**: Search and inspect all registered patients, MedLink IDs, emergency blood types, severe allergies, and active prescriptions with account status toggles (*Active / Suspended / Flagged*).
  - **Tab 3: Complete Pharmacy Oversight**: Global telemetry across all approved pharmacies, stockout warnings, live inventory counts, and audit status toggles (*Active / Audit Hold*).
  - **Tab 4: Master Formulary Catalog**: Manage central drugs, assign generic bio-equivalent mappings, standard pricing ceilings, and emergency drug tags.
  - **Tab 5: Platform Telemetry & Audit Logs**: Real-time live event stream of logins, stock edits, approvals, and emergency drug requests.

---

## 🌟 Flagship Main Landing Page

Located in `src/components/landing/`:
- **Hero Section (`LandingHero.jsx`)**: Impactful headline, 24/7 Emergency Drug Access live ticker, and embedded quick search teaser with instant medicine pills (*Augmentin, Ventolin, Lipitor, Januvia, Lantus, EpiPen*).
- **Three Role Portal Gateways (`RolePortalCards.jsx`)**: Three high-end cards directing visitors to the Patient Portal, Pharmacy Partner Portal, and Regulatory Admin Portal with clear CTAs.
- **Live Metric Counters (`PlatformStats.jsx`)**: 480+ Partner Pharmacies, 14,250+ Indexed Medicines, 28,400+ 2h Shelf-Holds Fulfilled, 24-minute average emergency delivery.
- **Core Value Pillars (`FeatureShowcase.jsx`)**: Interactive showcases of real-time ERP inventory sync, 2-hour reservation token guarantee, emergency fast-track, and smart generic bio-equivalence switcher with interactive dosage savings slider.
- **4-Step How It Works (`HowItWorks.jsx`)**: Interactive visual journey: Search -> Locate -> Hold 2h / Deliver -> Receive.
- **Trust & Security Banner (`TrustSecurityBanner.jsx`)**: HIPAA 256-bit encryption, verified licensure, and 24/7 Hotline (`1-800-MED-LINK`).
- **Medical Footer (`LandingFooter.jsx`)**: Full directory, emergency disclaimers, and regulatory disclosures.

---

## 💊 Real-Time Medicine Search & Emergency Access ⭐

Located in `src/components/search/`:
- **Multi-Mode Search (`SearchModeSelector.jsx`)**: Search by Brand Name, Generic Composition, Medicine ID / NDC / Batch, or Category pills.
- **Predictive Autocomplete (`PredictiveSearchBar.jsx`)**: Real-time suggestions with stock indicators and recent search history chips.
- **Spatial Filters (`SearchFiltersBar.jsx`)**: Radius slider (2 km, 5 km, 10 km, 25 km) matching patient PIN code, 24/7 open toggle, in-stock toggle, and dosage form chips.
- **Clinical Medicine Detail Card (`MedicineDetailCard.jsx`)**: Cold-chain alert banner (2°C–8°C digital logger assurance) and generic switch callout.
- **Real-Time Pharmacy Stock Cards (`PharmacyStockCard.jsx`)**: Live stock status badges (`IN STOCK`, `LOW STOCK`, `RESERVED FOR EMERGENCY / ICU`, `OUT OF STOCK`), ERP sync timestamps, price comparisons, and 4 instant action buttons (Hold & Reserve, Request Delivery, Directions, Call Pharmacy).
- **Interactive Spatial Pharmacy Map (`InteractivePharmacyMap.jsx`)**: Color-coded stock pins, concentric distance rings, tooltip preview cards, and List / Split / Map view switcher.
- **Action Modals**: 2-Hour Reservation Modal with countdown timer (`ReservationModal.jsx`), 30-min Courier Delivery Modal (`DeliveryModal.jsx`), and Generic Bio-Equivalence Comparison Modal (`GenericComparisonModal.jsx`).

---

## ⚡ Real-Time Cross-Portal State Coordination

The application implements a centralized reactive state layer in `src/context/AuthContext.jsx`:
```
                                 [ AuthContext.jsx ]
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       ▼                                  ▼                                  ▼
[ Pharmacy Portal ]             [ Medicine Search ⭐ ]              [ Admin Portal ]
When a pharmacy updates         Stock counts update                Telemetry counts update
stock count or marks ICU        instantly in search results        immediately in global
reserve in inventory...         without page refresh!              pharmacy oversight!
       │                                  ▲                                  ▲
       ▼                                  │                                  │
[ Patient reserves drug ] ───► Deducts stock count ──────────────► Appears in Pharmacy
in Medicine Search...          & generates 2h token                Shelf-Hold Queue!
       │                                                                     │
       ▼                                                                     ▼
[ Admin approves pharmacy ] ─────────────────────────────────────► Pharmacy goes live
in Licensing tab...                                                across network!
```

---

## 🎨 Design System: Clinical Clarity

Generated via **Google Stitch MCP**, the **Clinical Clarity** design system balances institutional authority with compassionate, high-legibility healthcare UX.

| Design Token | Value | Clinical Purpose |
| :--- | :--- | :--- |
| **Primary Clinical Teal** | `#0D9488` / `#0F766E` | Institutional authority, security, verified status |
| **Secondary Vibrant Teal**| `#14B8A6` | Focus halos, active tabs, live inventory indicators |
| **Emergency Crimson** | `#E11D48` / `#FFF1F2` | Blood donor tags, severe allergies, ICU emergency reserves |
| **Canvas Background** | `#F8FAFC` | Calm, non-glare clinical backdrop |
| **Card Surfaces** | `#FFFFFF` | Sterile, clean information modules |
| **Borders & Dividers** | `#E2E8F0` / `#CBD5E1` | Feather-light micro-borders replacing heavy shadows |
| **Headings Font** | **Plus Jakarta Sans** | Modern geometric grotesk conveying institutional trust |
| **Tabular & Badge Font** | **Inter (tnum)** | High-precision tabular figures for doses, stock, and batch IDs |

---

## 📁 Project Directory Structure

```
JOSH_MEDLINK/
├── index.html                           # Google Fonts & viewport configuration
├── vite.config.js                       # Vite 8 + Tailwind CSS v4 setup
├── package.json                         # Dependencies and build scripts
├── README.md                            # Comprehensive documentation & architecture
├── src/
│   ├── main.jsx                         # Application entry point
│   ├── App.jsx                          # Master layout, 3-role routing & emergency banner
│   ├── index.css                        # Tailwind v4 imports & clinical root variables
│   ├── context/
│   │   └── AuthContext.jsx              # Unified 3-role auth, live inventory & reservation state
│   ├── data/
│   │   ├── mockMedicines.js             # Formularies, generic equivalents & pharmacy stock
│   │   ├── mockPatientData.js           # Blood catalogs, allergies & demo patient Sarah Jenkins
│   │   └── mockPharmacyAdminData.js     # Pending/approved pharmacies, reservations & audit logs
│   └── components/
│       ├── common/                      # Shared layout & feedback components
│       │   ├── Navbar.jsx               # Top navigation bar with portal switcher & user pill
│       │   ├── Footer.jsx               # Medical footer & regulatory links
│       │   ├── EmergencyBanner.jsx      # 24/7 Universal O-Negative Fast-Track banner
│       │   ├── ToastContainer.jsx       # Floating clinical alert notifications
│       │   └── index.js
│       ├── landing/                     # Flagship main landing page
│       │   ├── LandingPage.jsx          # Master landing container
│       │   ├── LandingHero.jsx          # Hero headline, emergency ticker & search teaser
│       │   ├── RolePortalCards.jsx      # 3 portal gateways (Patient, Pharmacy, Admin)
│       │   ├── PlatformStats.jsx        # Live metrics counter grid
│       │   ├── FeatureShowcase.jsx      # Value pillars & interactive savings calculator
│       │   ├── HowItWorks.jsx           # 4-step interactive patient journey
│       │   ├── TrustSecurityBanner.jsx  # HIPAA 256-bit encryption & hotline banner
│       │   ├── LandingFooter.jsx        # Dedicated landing footer
│       │   └── index.js
│       ├── patient/                     # Patient portal components
│       │   ├── PatientLogin.jsx         # Email/MedLink ID sign in + Demo Patient button
│       │   ├── PatientRegister.jsx      # 4-step clinical intake & HIPAA authorization
│       │   ├── ForgotPassword.jsx       # 6-slot OTP cells with 60s countdown & strength meter
│       │   ├── PatientDashboard.jsx     # Master patient profile dashboard
│       │   ├── DigitalMedicalIdCard.jsx # Encrypted emergency QR code, O- donor & ICE dial
│       │   ├── EditablePersonalDetails.jsx # In-line profile & address editor
│       │   ├── MedicalSummary.jsx       # Primary doctor & chronic condition chips
│       │   ├── PreferredPharmaciesList.jsx # Matched pharmacies by PIN with 24/7 badges
│       │   ├── PrescriptionRefillHistory.jsx # 1-Click Refill order dispatch with live status
│       │   └── index.js
│       ├── pharmacy/                    # Pharmacy partner portal components
│       │   ├── PharmacyLogin.jsx        # Drug License #/Email login + Demo Pharmacy button
│       │   ├── PharmacyRegister.jsx     # Partner onboarding intake (DL cert, 24/7, drive-thru)
│       │   ├── PharmacyDashboard.jsx    # Real-time stock manager, 2-hr shelf holds, deliveries
│       │   └── index.js
│       ├── admin/                       # Regulatory admin portal components
│       │   ├── AdminLogin.jsx           # Level-5 admin email + security key + Demo Admin button
│       │   ├── AdminDashboard.jsx       # 5 supreme control tabs (licensing, patients, stations, formulary, audit)
│       │   └── index.js
│       └── search/                      # Real-time medicine search components
│           ├── MedicineSearchMain.jsx   # Master search container orchestrating filters & views
│           ├── SearchModeSelector.jsx   # Brand, Generic, ID/NDC & Category selector
│           ├── PredictiveSearchBar.jsx  # Autocomplete search with recent query history
│           ├── SearchFiltersBar.jsx     # Radius slider (2-25km), 24/7 & stock toggles
│           ├── MedicineDetailCard.jsx   # Clinical drug specs, cold-chain alert & generic switch
│           ├── PharmacyStockCard.jsx    # Live stock badges, ERP sync time & 4 instant actions
│           ├── InteractivePharmacyMap.jsx # Interactive visual map with concentric distance rings
│           ├── ReservationModal.jsx     # 2-hour hold reservation & countdown timer
│           ├── DeliveryModal.jsx        # 30-min cold-chain express delivery dispatch
│           ├── GenericComparisonModal.jsx # Bioequivalence analysis & savings calculator
│           └── PharmacyActionModals.jsx # Direct phone dial & turn-by-turn route navigation
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `v20+` or `v22+` (Tested on `v26.1.0`)
- npm `v10+` or `v11+`

### Installation & Run
```bash
# Clone the repository
git clone https://github.com/Richardfeynman-21/JOSH_MEDLINK.git
cd JOSH_MEDLINK

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🧭 Interactive Evaluation Guide

Use the top navigation bar or the **Demo Switcher** to test all roles:

1. **Main Landing Page**: Explore the flagship landing page with live ticker, embedded search pills, 3 portal cards, interactive generic savings slider, and 4-step walkthrough.
2. **Role 1: Patient**: Click **"Demo Patient: Sarah Jenkins"**:
   - Inspect the **Digital Emergency Medical ID Card** ($O^-$ blood group, severe allergies, ICE quick-dial).
   - Test **1-Click Refill Dispatch** on active prescriptions.
   - Switch to **"Medicine Search ⭐"** to test Brand, Generic, ID search, and reserve medication with a 2-hour shelf hold.
3. **Role 2: Pharmacy**: Click **"Demo Pharmacy: Green Cross 24/7"**:
   - **Live Stock Update**: Edit any medicine's stock units (e.g. Lipitor from 142 to 143, or mark ICU Reserve).
   - **Check Search Reactivity**: Switch to "Medicine Search ⭐" and observe that the stock count updated in real time!
   - **2-Hour Shelf-Hold Queue**: View incoming patient reservations, inspect countdown timers, and click "Mark Dispensed / Complete".
4. **Role 3: Admin**: Click **"Demo Admin: Dr. Christopher Cole"**:
   - **Pharmacy Licensing Tab**: Review pending pharmacy registrations and click **"Approve Pharmacy"** to instantly activate them on the network.
   - **Patient Management Tab**: Inspect all registered patients, view medical IDs, and toggle account statuses.
   - **Pharmacy Oversight Tab**: Inspect live inventory telemetry across all stores and stockout alerts.
   - **Master Formulary Tab**: Manage central medicine pricing ceilings and emergency drug tags.
   - **Audit Logs Tab**: Inspect the live activity feed of logins, stock updates, and approvals.

---

## 📄 License
Developed for the **MedLink** Healthcare Platform initiative.  
All rights reserved.
