# 🏥 MedLink Chennai: Intelligent Real-Time Medicine Availability & Spatial Pharmacy Coordination System

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![React Router 7](https://img.shields.io/badge/React_Router-7.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CDSCO Compliance](https://img.shields.io/badge/Compliance-CDSCO_%26_TN_DCA-0D9488?style=for-the-badge&logo=shield&logoColor=white)](https://cdsco.gov.in/)
[![ABDM Ready](https://img.shields.io/badge/Standard-ABDM_Digital_Health-10B981?style=for-the-badge&logo=heart&logoColor=white)](https://abdm.gov.in/)

> **MedLink Chennai** is an enterprise-grade multipage healthcare platform connecting patients, licensed pharmacies, and CDSCO regulatory authorities across Chennai in real time. It eliminates acute shortages and fragmented phone inquiries during medical emergencies by providing live dispensary stock visibility, optical prescription OCR scanning, digital 2-hour shelf-hold reservations, and bio-equivalent generic cost-saving switches.

---

## 🌟 Table of Contents
- [Executive Overview](#-executive-overview)
- [Key Features & Innovations](#-key-features--innovations)
- [Multipage Application Architecture](#-multipage-application-architecture)
- [Three Dedicated Portals & Role Access](#-three-dedicated-portals--role-access)
  - [1. Patient Portal (`/patient`)](#1-patient-portal-patient)
  - [2. Pharmacy Partner Portal (`/pharmacy`)](#2-pharmacy-partner-portal-pharmacy)
  - [3. CDSCO & State Regulatory Admin Portal (`/admin`)](#3-cdsco--state-regulatory-admin-portal-admin)
- [Centralized Authentication & Registration (`/auth`)](#-centralized-authentication--registration-auth)
- [Optical AI Rx Scanner (`/ocr-scanner`)](#-optical-ai-rx-scanner-ocr-scanner)
- [24/7 Trauma SOS Protocol (`/emergency`)](#-247-trauma-sos-protocol-emergency)
- [Design System: Clinical Clarity](#-design-system-clinical-clarity)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
- [Interactive Evaluation Guide](#-interactive-evaluation-guide)

---

## 🚀 Executive Overview

Finding critical medications during acute illnesses or trauma emergencies in metropolitan areas like Chennai is frequently hindered by inventory fragmentation and manual phone calls. **MedLink Chennai** addresses this crisis through a multipage, real-time architecture:
1. **Patients** search real-time medicine availability within a customizable kilometer radius, upload physical prescriptions for automatic OCR parsing, reserve drugs on a guaranteed 2-hour shelf-hold, and carry encrypted digital medical IDs.
2. **Pharmacies** digitize their live inventory ERP, process shelf-hold reservations before stockouts occur, manage 30-minute courier dispatches, and allocate trauma/ICU reserves.
3. **CDSCO & State Drug Controllers** exercise Level-5 oversight: inspecting pharmacy licensing dossiers, monitoring patient health safety, governing formulary pricing ceilings, and auditing cryptographic compliance logs.

---

## ⚡ Key Features & Innovations

- **Multipage Navigation with Code Splitting**: Built with `react-router-dom` and React Suspense lazy-loaded routes for sub-second page transitions.
- **Dedicated Home-Only Top Navbar**: The full floating Antigravity navbar appears strictly on the home page (`/`) with a single, elegant "Login" button and demo switcher. All secondary pages feature a lightweight, breadcrumbed `PageHeader` with direct home navigation.
- **Optical AI Prescription Scanner**: Live canvas drag-and-drop / upload of physical prescriptions, synthetic OCR text extraction, confidence scoring, dosage recommendations, and 1-click cart insertion.
- **Bi-Directional Generic Switcher**: Visual molecular equivalency analysis comparing expensive branded drugs with affordable generic equivalents, showing verified rupee savings (₹).
- **2-Hour Shelf-Hold Guarantee**: Instant tokenized reservation (`MED-RES-XXXX-2H`) with live countdown timers synchronized across patient and pharmacy screens.
- **Chennai Localization & Metric System**: Real landmarks (T. Nagar, Greams Road, Alwarpet, Anna Nagar, Kilpauk, Adyar), metric distances in kilometers (`km`), Indian phone numbers (+91), Apollo & Kauvery hospitals, and Tamil Nadu 108 Emergency Medical Services.
- **Persistent & Secure Authentication**: Clean unauthenticated default state on fresh launches, role-gated portals, demo accounts, and optional workstation persistence.

---

## 🗺️ Multipage Application Architecture

| Route | Page Component | Description |
| :--- | :--- | :--- |
| `/` | `HomePage.jsx` | Flagship landing page, value pillars, savings calculator, and quick search pills |
| `/search` | `SearchPage.jsx` | Real-time multi-mode drug search, stock status badges, and interactive map |
| `/medicine/:id` | `MedicineDetailPage.jsx` | Clinical drug monograph, cold-chain assurance, and generic bio-equivalent switch |
| `/ocr-scanner` | `PrescriptionScanPage.jsx` | Optical AI Rx document scanner and automated medicine mapper |
| `/emergency` | `EmergencyProtocolPage.jsx` | 24/7 Tamil Nadu 108 trauma protocol, antivenom & ICU antidote availability |
| `/patient` | `PatientPortalPage.jsx` | Digital Medical ID card, O- donor verification, active prescriptions & refills |
| `/pharmacy` | `PharmacyPortalPage.jsx` | Licensed dispensary ERP, stock management, and live 2-hour hold queue |
| `/admin` | `AdminPortalPage.jsx` | Level-5 CDSCO drug regulatory console, licensing reviews, and audit telemetry |
| `/auth` | `AuthPage.jsx` | Unified authentication, registration, password setup, and OTP recovery |
| `*` | `NotFoundPage.jsx` | 404 clinical recovery page with direct home routing |

---

## 🔐 Three Dedicated Portals & Role Access

### 1. Patient Portal (`/patient`)
- **Digital Emergency Medical ID Card**: Scannable encrypted triage QR code, blood group badge ($O^-$ Universal Donor), documented severe drug allergies (Penicillin, Sulfa, NSAIDs), and 24/7 ICE emergency contacts.
- **Verified Prescriptions & Refills**: Real-time prescription history with **1-Click Refill Dispatch** triggering live courier tracking.
- **Matched Local Dispensaries**: Nearest Chennai pharmacies filtered by distance (`km`), 24/7 operation, and drive-thru facilities.
- **Emergency Simulation**: One-click first-responder triage mode testing offline medical badge accessibility.

### 2. Pharmacy Partner Portal (`/pharmacy`)
- **Live Inventory ERP**: Batch numbers, expiry dates, unit retail prices (₹), cold-chain toggles, and inline stock adjustments (`+1`, `-1`, `+10`).
- **2-Hour Shelf-Hold Queue**: Real-time queue displaying patient reservation tokens, medication names, quantities, and live countdown timers with "Mark Dispensed" or "Cancel & Restock" actions.
- **Emergency / ICU Allocation**: Dedicated toggle to reserve critical drug quotas for hospital trauma centers.
- **Express Courier Dispatches**: 30-minute delivery dispatch queue with temperature-controlled packaging verification.

### 3. CDSCO & State Regulatory Admin Portal (`/admin`)
- **Pharmacy Licensing & Approvals**: Review pending pharmacy accreditation dossiers, inspect GST/license numbers, and execute one-click regulatory approval or rejection.
- **Statewide Patient Safety Oversight**: Search registered patients, verify emergency blood types, and monitor severe allergy warnings.
- **Dispensary Network Telemetry**: Live inventory counts across all Chennai hubs, stockout warnings, and compliance audit locks.
- **Master Formulary Catalog**: Price ceiling controls, generic composition links, and schedule H1 narcotics tracking.
- **Cryptographic Audit Logs**: Exportable JSON telemetry recording every sign-in, stock modification, and regulatory action.

---

## 🔑 Centralized Authentication & Registration (`/auth`)

- **Role Selection**: Toggle between Patient, Licensed Pharmacy, and CDSCO Regulatory Administrator.
- **Password Security**: Explicit password configuration during registration, live strength meters, and show/hide toggles.
- **Forgot Password Flow**: Interactive 6-slot OTP cells with auto-focus, paste support, 60-second cooldown timer, and password reset.
- **Device Persistence**: "Remember this workstation / device" checkbox governing session persistence.

---

## 📸 Optical AI Rx Scanner (`/ocr-scanner`)

- **Multimodal Document Upload**: Drag and drop prescription files (PNG, JPG, PDF) or select sample test prescriptions.
- **AI Text Extraction**: Optical simulation scanning physician handwriting, extracting active ingredients, strengths, and dosage instructions.
- **Instant Formulary Match**: Maps extracted entities directly to networked Chennai pharmacies with live stock counts and 1-click cart addition.

---

## 🚨 24/7 Trauma SOS Protocol (`/emergency`)

- **Tamil Nadu 108 Emergency Integration**: Direct dispatch links for ambulance paramedics and emergency room physicians.
- **Critical Antidote Ticker**: Real-time availability for Snake Antivenom, Atropine, Naloxone, Tenecteplase, and Prothrombin Complex.
- **Hospital Trauma Direct**: Quick-dial hotlines for Apollo Hospitals Greams Road, Kauvery Hospital Alwarpet, and MIOT Hospitals.

---

## 🎨 Design System: Clinical Clarity

Crafted with high-legibility healthcare UX principles, spatial depth, and glassmorphism:

| Design Token | Value | Clinical Purpose |
| :--- | :--- | :--- |
| **Primary Clinical Teal** | `#0D9488` / `#0F766E` | Institutional authority, verified dispensary status |
| **Emergency Crimson / Rose**| `#E11D48` / `#BE123C` | Universal blood donor badges, critical allergies, ICU reserves |
| **Canvas Backdrop** | `#F8FAFC` | Non-glare clinical surface minimizing ocular fatigue |
| **Glassmorphism Panels** | `bg-white/85 backdrop-blur-xl` | Floating Antigravity spatial cards with subtle borders |
| **Typography** | **Plus Jakarta Sans** (Headings) + **Inter** (Tabular figures `tnum`) | Maximum numerical clarity for dosages, batch codes, and prices |
| **Favicon** | **MedLink Medical Heart** (`favicon.svg`, `favicon.ico`) | High-contrast heart with ECG pulse wave in browser tabs |

---

## 📁 Project Directory Structure

```
JOSH_WEB_PROTOTYPE/
├── index.html                           # Entry HTML with MedLink heart favicon & fonts
├── vite.config.js                       # Vite 8 + Tailwind CSS v4 + chunking configuration
├── package.json                         # Dependencies & npm scripts
├── README.md                            # Comprehensive platform documentation
├── public/
│   ├── favicon.svg                      # Custom vector medical heart tab icon
│   └── favicon.ico                      # Multi-resolution (16/32/48/64) tab icon
├── src/
│   ├── main.jsx                         # Application root mount
│   ├── index.css                        # Tailwind v4 directives & root variables
│   ├── context/
│   │   └── AuthContext.jsx              # Centralized reactive auth & live inventory state
│   ├── layouts/
│   │   └── RootLayout.jsx               # Multipage layout (Home-only navbar, emergency banner, outlet)
│   ├── routes/
│   │   └── AppRoutes.jsx                # Code-split routing table with React Suspense
│   ├── pages/
│   │   ├── HomePage.jsx                 # Landing page
│   │   ├── SearchPage.jsx               # Medicine search & interactive map
│   │   ├── MedicineDetailPage.jsx       # Drug monograph & generic switch
│   │   ├── PrescriptionScanPage.jsx     # Optical AI Rx scanner
│   │   ├── EmergencyProtocolPage.jsx    # 24/7 Trauma SOS & 108 protocol
│   │   ├── PatientPortalPage.jsx        # Patient health dashboard
│   │   ├── PharmacyPortalPage.jsx       # Pharmacy dispensary ERP
│   │   ├── AdminPortalPage.jsx          # CDSCO regulatory authority
│   │   ├── AuthPage.jsx                 # Login, register & password recovery
│   │   └── NotFoundPage.jsx             # 404 clinical error recovery
│   ├── components/
│   │   ├── common/                      # Navbar (home-only), PageHeader, Footer, Toast
│   │   ├── landing/                     # Hero, features, stats, workflow
│   │   ├── search/                      # Real-time search bars, maps, modals
│   │   ├── patient/                     # Medical ID card, demographics, refill history
│   │   ├── pharmacy/                    # Inventory table, reservation queue, settings
│   │   ├── admin/                       # Licensing queue, patient records, audit logs
│   │   └── auth/                        # Role forms, password meters, OTP cells
│   └── data/
│       ├── mockMedicines.js             # Formularies, generic bio-equivalents & live stock
│       ├── mockPatientData.js           # Demo patient (Kavitha Sundaram • O-) & clinics
│       └── mockPharmacyAdminData.js     # Demo pharmacy (Apollo 24/7) & Admin (Dr. Sundararajan)
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### Installation & Run
```bash
# 1. Clone repository
git clone https://github.com/Richardfeynman-21/JOSH_MEDLINK.git
cd JOSH_MEDLINK

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Create production build
npm run build
```

Open `http://localhost:5173` in your browser.

---

## 🧭 Interactive Evaluation Guide

Use the **Demo Switcher** on the top navbar or page headers to test all roles immediately:

1. **Home Page (`/`)**: Inspect the redesigned top navbar with a single "Login" button and quick links to search, scanner, and trauma SOS.
2. **Demo Patient**: Click **"Demo Patient (Kavitha)"**:
   - Navigate to `/patient` to inspect the **Digital Medical ID Card** ($O^-$ Universal Donor, allergies, ICE contacts).
   - Test **1-Click Refill Dispatch** on active prescriptions.
   - Go to `/ocr-scanner` and test scanning a prescription to auto-populate medicines.
3. **Demo Pharmacy**: Click **"Demo Pharmacy (Apollo)"**:
   - Navigate to `/pharmacy` to adjust stock counts (e.g. Paracetamol or Augmentin).
   - Switch to `/search` and observe that the stock count updated in real time across the network without a page refresh!
   - Process incoming 2-hour hold reservations with the countdown timer.
4. **Demo Admin**: Click **"Demo Admin (Dr. R. Sundararajan)"**:
   - Navigate to `/admin` to review pending pharmacy licenses and click **"Approve Pharmacy"**.
   - Inspect statewide patient safety records, formulary price ceilings, and cryptographic audit logs.

---

## 📄 License
Developed for the **MedLink Healthcare Platform** initiative.  
All rights reserved.
