# 🏥 MedLink: Intelligent Real-Time Medicine Availability, Pharmacy Coordination, and Emergency Drug Access System

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Design System](https://img.shields.io/badge/Stitch_MCP-Clinical_Clarity-0D9488?style=for-the-badge&logo=material-design&logoColor=white)](https://stitch.withgoogle.com/)
[![HIPAA UI Standard](https://img.shields.io/badge/Security-HIPAA_256--Bit_Ready-10B981?style=for-the-badge&logo=shield&logoColor=white)](https://www.hhs.gov/hipaa)

> **MedLink** is a centralized healthcare platform that connects patients with nearby pharmacies in real time. It eliminates the frustration and delays of visiting multiple pharmacies or making dozens of phone calls during medical emergencies by providing live stock visibility, digital shelf-hold reservations, and intelligent pharmacy coordination.

---

## 🌟 Table of Contents
- [Executive Overview](#-executive-overview)
- [Key Features](#-key-features)
  - [A. Patient Authentication, Clinical Intake & Digital Passport](#a-patient-authentication-clinical-intake--digital-passport)
  - [B. Real-Time Medicine Search & Emergency Access ⭐](#b-real-time-medicine-search--emergency-access-)
- [Design System: Clinical Clarity](#-design-system-clinical-clarity)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
- [Interactive Evaluation Guide](#-interactive-evaluation-guide)

---

## 🚀 Executive Overview

Finding critical medications during acute illnesses or emergencies is often plagued by stock fragmentation, lack of real-time visibility, and manual phone inquiries. **MedLink** resolves this crisis with:
1. **Real-Time ERP Stock Sync**: Displays live inventory counts and last-verified timestamps directly from hospital and retail pharmacy inventories.
2. **2-Hour Shelf-Hold Reservations**: Allows patients to instantly place a hold on critical medications with an encrypted reservation token (`MED-RES-XXXX-2H`).
3. **Emergency Drug Fast-Track**: Dedicated protocols for universal blood types ($O^-$), anaphylaxis epinephrine, and critical ICU supplies.
4. **Digital Emergency Medical ID**: Equips first responders and pharmacists with immediate access to blood group, severe allergies, and ICE contacts via an offline-capable scannable QR code.
5. **Smart Generic Switcher**: Scientifically cross-references bio-equivalence (AUC and $C_{\max}$) to help patients save up to 60% with verified generic substitutes.

---

## 💎 Key Features

### A. Patient Authentication, Clinical Intake & Digital Passport

#### 1. 4-Step Clinical Intake (`Register.jsx`)
- **Step 1: Patient Demographics**: Name, verified mobile, email, date of birth, and biological sex.
- **Step 2: Emergency Health Profile**:
  - 8-Card interactive Blood Group catalog with ABO/Rh badges ($O^-$ Universal Donor, $AB^+$ Universal Recipient, $O^+$ Common Donor, etc.).
  - Severe Allergy tag selector (Penicillin, Sulfa, NSAIDs, Peanuts, Latex) with custom allergen entry.
  - Chronic Health Conditions picker (Asthma, Hypertension, Type 2 Diabetes, etc.).
- **Step 3: Emergency Contacts & Geo-Matching**:
  - In Case of Emergency (ICE) contact name, relationship, and 24/7 verified phone.
  - Residential Street, City, State, and PIN code.
  - Live Geo-radius feedback showing verified pharmacies within proximity of the entered PIN code.
- **Step 4: HIPAA Consent & Clinical Review**:
  - AES-256 HIPAA Privacy & Emergency Health Data Disclosure authorization.
  - Emergency formulary reservation consent checkbox.
  - Sample intake quick-fill helper for rapid demonstration.

#### 2. Clinical Authentication (`Login.jsx`)
- MedLink ID (`#ML-XXXXXX`) or Email authentication.
- Show/hide password visibility toggle.
- Workstation persistence (*"Remember this workstation"*).
- **One-Click Instant Evaluator Access**: Prefills and logs in as verified demo patient **Sarah Jenkins** ($O^-$ Universal Donor, `#ML-849201`).

#### 3. Identity Recovery & OTP Verification (`ForgotPassword.jsx`)
- Step 1: Registered email or mobile phone submission.
- Step 2: **6-slot interactive OTP digit cells** with auto-focus advance, backspace navigation, clipboard paste support, and a live 60-second resend countdown timer.
- Step 3: Dynamic password strength meter evaluating minimum 8 characters, uppercase letters, numbers, and special symbols with real-time feedback.

#### 4. Active Patient Profile & Emergency Dashboard (`PatientDashboard.jsx`)
- **Digital Emergency Medical ID Card**:
  - Scannable QR code encoding emergency triage payload.
  - High-visibility Blood Group indicator with Universal Donor tag.
  - Clinical Crimson alert chips for severe allergies.
  - Instant ICE contact quick-dial button (`tel:` protocol).
  - One-click copy for MedLink ID and printable wallet ID card.
- **Editable Personal Details**: Inline toggle between view and edit modes with live validation.
- **Medical Summary**: Primary care physician card with direct call action and active condition tags.
- **Preferred Pharmacies**: In-network pharmacy list auto-matched to the patient's PIN code with live distance, 24/7 tags, and primary routing selection.
- **Prescription & Refill History**: Active medication list with directions, remaining refills, status tags (`Active Rx`, `Refill Needed`, `In Transit • Courier En Route`), and **One-Click Refill Dispatch** that triggers real-time courier tracking.

---

### B. Real-Time Medicine Search & Emergency Access ⭐

#### 1. Multi-Mode Search Interface (`SearchModeSelector.jsx` & `PredictiveSearchBar.jsx`)
- **Multi-Mode Selector Tabs**:
  - **Brand Name**: Search trade names (e.g., *Augmentin, Lipitor, Ventolin, Januvia, Dolonet*).
  - **Generic Name**: Query chemical compositions (e.g., *Amoxicillin-Clavulanate, Atorvastatin, Salbutamol, Metformin*).
  - **Medicine ID / NDC / Batch**: Look up standardized national drug codes (e.g., *MED-8849, NDC-0071-0155-23*).
  - **Category Browsing**: Filter by therapeutic classes (Antibiotics, Cardiac Care, Diabetes, Respiratory, Pain Relief, Emergency ICU, Gastrointestinal).
- **Predictive Search Bar**: Autocomplete suggestions with stock badges, clear input action, and persistent recent search history chips with re-search and clear functionality.

#### 2. Spatial Geo-Radius & Clinical Filters (`SearchFiltersBar.jsx`)
- **PIN Code Radius Slider**: Filter pharmacy results within **2 km, 5 km, 10 km, or 25 km** based on patient location.
- **Quick-Toggles**:
  - *In Stock Only*
  - *Open 24/7 Now*
  - *Drive-Thru Available*
  - *Emergency Reserve Available*
- **Prescription Status**: All, Prescription Required (Rx), or Over-the-Counter (OTC).
- **Dosage Form Chips**: Tablets, Capsules, Liquid/Syrup, Inhalers, Injections.

#### 3. Clinical Medicine Detail Card (`MedicineDetailCard.jsx`)
- Brand name, generic formulation, manufacturer, dosage, and packaging.
- Prescription badge (Rx Required vs. OTC).
- **Cold-Chain Alert Banner**: Storage requirement indicators (e.g., *"❄️ Cold Chain Required: Store at 2°C – 8°C with digital logger compliance"*).
- **Smart Generic Switch Callout**: Direct comparison showing therapeutic bio-equivalence with cost savings of up to 60%.

#### 4. Real-Time Pharmacy Stock Cards (`PharmacyStockCard.jsx`)
- Live pharmacy distance and address.
- High-contrast stock status badges:
  - `IN STOCK` (Green / Clinical Teal `#0D9488`)
  - `LOW STOCK` (Amber / Yellow)
  - `RESERVED FOR EMERGENCY / ICU ONLY` (Clinical Crimson `#E11D48`)
  - `OUT OF STOCK` (Slate Muted)
- Real-time ERP sync timestamp (*"Verified 3 mins ago via Central ERP"*).
- Unit and pack price comparison.
- **Four Instant Actions**:
  1. `Hold & Reserve (2h Guarantee)`
  2. `Request Delivery (30 mins)`
  3. `Get Directions`
  4. `Call Pharmacy`

#### 5. Interactive Spatial Pharmacy Map (`InteractivePharmacyMap.jsx`)
- Interactive visual map featuring:
  - Patient location marker with concentric distance rings (2 km, 5 km, 10 km).
  - Color-coded stock pins (Teal = In Stock, Amber = Low Stock, Crimson = Emergency Reserve, Gray = Out of Stock).
  - Click-to-preview pharmacy tooltip cards.
  - Zoom controls, distance legend, and view toggles (**List View**, **Split View**, and **Full Map View**).

#### 6. Action Modals & Workflows
- **2-Hour Reservation Modal (`ReservationModal.jsx`)**: Quantity selection, patient verification, digital Rx confirmation, instant reservation token generator (`MED-RES-XXXX-2H`), and live 2-hour countdown timer.
- **30-Minute Courier Delivery Modal (`DeliveryModal.jsx`)**: Express courier dispatch with insulated cold-chain box assurance, address confirmation, and live delivery pipeline.
- **Generic Bio-equivalence Comparison Modal (`GenericComparisonModal.jsx`)**: Side-by-side dissolution profile comparison (AUC, $C_{\max}$ bio-equivalence parameters), active ingredient confirmation, and annual patient savings calculator.
- **Pharmacy Contact & Route Modals (`PharmacyActionModals.jsx`)**: Direct-dial phone modal and step-by-step turn-by-turn route navigation.

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

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) with `@tailwindcss/vite`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Design Intelligence**: [Stitch MCP](https://stitch.withgoogle.com/)
- **State Management**: React Context API (`AuthContext`) with persistent workstation state
- **Linting & Code Quality**: [Oxlint](https://oxc.rs/)

---

## 📁 Project Directory Structure

```
JOSH_WEB_PROTOTYPE/
├── index.html                           # Google Fonts & viewport configuration
├── vite.config.js                       # Vite 8 + Tailwind CSS v4 setup
├── package.json                         # Dependencies and build scripts
├── src/
│   ├── main.jsx                         # Application entry point
│   ├── App.jsx                          # Master layout, navigation & emergency banner
│   ├── index.css                        # Tailwind v4 imports & clinical root variables
│   ├── context/
│   │   └── AuthContext.jsx              # Session, intake, refills & toast notification state
│   ├── data/
│   │   ├── mockPatientData.js           # Blood catalogs, allergies & demo patient Sarah Jenkins
│   │   └── mockMedicines.js             # Formularies, generic equivalents & 7 regional pharmacies
│   ├── components/
│   │   ├── common/
│   │   │   └── ToastContainer.jsx       # Floating clinical alert notifications
│   │   ├── auth/
│   │   │   ├── Login.jsx                # ID/Email login with demo quick-fill
│   │   │   ├── Register.jsx             # 4-Step clinical intake & HIPAA authorization
│   │   │   ├── ForgotPassword.jsx       # 6-slot OTP cells with 60s countdown & strength meter
│   │   │   └── AuthModal.jsx            # Modal wrapper for authentication
│   │   ├── profile/
│   │   │   ├── PatientDashboard.jsx     # Master patient profile dashboard
│   │   │   ├── DigitalMedicalIdCard.jsx # Encrypted emergency QR code, O- donor & ICE dial
│   │   │   ├── EditablePersonalDetails.jsx # In-line profile & address editor
│   │   │   ├── MedicalSummary.jsx       # Primary doctor & chronic condition chips
│   │   │   ├── PreferredPharmaciesList.jsx # Matched pharmacies by PIN with 24/7 badges
│   │   │   └── PrescriptionRefillHistory.jsx # 1-Click Refill order dispatch with live status
│   │   └── search/
│   │       ├── MedicineSearchMain.jsx   # Master search container orchestrating filters & views
│   │       ├── SearchModeSelector.jsx   # Brand, Generic, ID/NDC & Category selector
│   │       ├── PredictiveSearchBar.jsx  # Autocomplete search with recent query history
│   │       ├── SearchFiltersBar.jsx     # Radius slider (2-25km), 24/7 & stock toggles
│   │       ├── MedicineDetailCard.jsx   # Clinical drug specs, cold-chain alert & generic switch
│   │       ├── PharmacyStockCard.jsx    # Live stock badges, ERP sync time & 4 instant actions
│   │       ├── InteractivePharmacyMap.jsx # Interactive visual map with concentric distance rings
│   │       ├── ReservationModal.jsx     # 2-hour hold reservation & countdown timer
│   │       ├── DeliveryModal.jsx        # 30-min cold-chain express delivery dispatch
│   │       ├── GenericComparisonModal.jsx # Bioequivalence analysis & savings calculator
│   │       └── PharmacyActionModals.jsx # Direct phone dial & turn-by-turn route navigation
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `v20+` or `v22+` (Tested on `v26.1.0`)
- npm `v10+` or `v11+`

### Installation
```bash
# Clone the repository
git clone https://github.com/Richardfeynman-21/JOSH_MEDLINK.git
cd JOSH_MEDLINK

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🧭 Interactive Evaluation Guide

For evaluators reviewing the prototype:
1. **Instant Demo Access**: Click the **"Demo Patient: Sarah Jenkins"** button in the top navbar to instantly sign in and explore the **Digital Medical ID Card**, active prescriptions, and linked pharmacies.
2. **One-Click Refill**: On the Patient Dashboard, locate the prescription card for *Ventolin HFA* and click **"One-Click Refill"** to observe real-time courier dispatch status updates.
3. **Medicine Search**: Navigate to the **"Medicine Search ⭐"** tab:
   - Try searching by **Brand Name**: Type `Augmentin` or `Lipitor`.
   - Try searching by **Generic Name**: Type `Amoxicillin` or `Atorvastatin`.
   - Try searching by **Medicine ID**: Type `MED-8849`.
   - Filter by **Category**: Click on `Antibiotics` or `Emergency / Critical Care`.
4. **Reserve Medication**: Click **"Hold & Reserve (2h Guarantee)"** on any pharmacy stock card to view the 2-hour reservation modal, instant token generator, and countdown timer.
5. **Generic Alternatives**: Click **"Compare Bio-Equivalence & Pricing"** to evaluate the side-by-side active ingredients, dissolution curve matching, and cost savings.
6. **Spatial Map**: Switch between **List**, **Split**, and **Map** views in the search results to inspect nearby pharmacy pins and distance rings.
7. **Clinical Intake**: Switch to the **"Clinical Intake (Register)"** tab to test the 4-step onboarding flow with blood group badges and live PIN code geo-feedback.

---

## 📄 License
This project is developed for the **MedLink** Healthcare Platform initiative.
All rights reserved.
