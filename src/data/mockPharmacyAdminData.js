// MedLink Pharmacy & Supreme Platform Admin Mock Dataset
// Compliant with CDSCO, Tamil Nadu State Drug Control Administration & Digital Health Mission (ABDM)

export const DEFAULT_ADMIN = {
  id: 'ADM-001',
  fullName: 'Dr. R. Sundararajan, MD, PhD',
  title: 'Chief Drug Regulatory Officer & Platform Administrator',
  email: 'admin@medlink.in',
  accessKey: 'ML-SUPREME-2026',
  role: 'admin',
  department: 'Central Drugs Standard Control Organisation (CDSCO) & State Drug Control',
  institution: 'MedLink South India Tele-Pharmacy Oversight Directorate, Chennai',
  clearances: [
    'LEVEL-5-SUPER-ADMIN',
    'FORMULARY_CATALOG_OVERRIDE',
    'EMERGENCY_ICU_ALLOCATION',
    'PHARMACY_LICENSING_AUTHORITY',
    'AUDIT_ENFORCEMENT_PROTOCOL'
  ],
  phone: '+91 44 2432 0180',
  avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&q=80',
  lastSecurityAudit: '2026-10-06 08:30 IST'
};

export const DEMO_PHARMACY_USER = {
  id: 'pharma-1',
  name: 'Apollo 24/7 Pharmacy - T. Nagar',
  type: 'Community Supercare Hub',
  licenseNumber: 'TN-CHN-2024-8849',
  pharmacistInCharge: 'Dr. Rajiv Menon, M.Pharm, Reg. Pharmacist',
  pharmacistRegId: 'TN-RPH-2024-9912',
  email: 'tnagar@apollo247.medlink.in',
  phone: '+91 44 2434 4991',
  address: '42, South Usman Road, T. Nagar, Chennai',
  pincode: '600017',
  role: 'pharmacy',
  status: 'APPROVED',
  open24x7: true,
  driveThru: true,
  emergencyReserveDesk: true,
  lowStockThreshold: 15,
  criticalICUReserveRatio: 20, // 20% reserved for trauma/ICU
  rating: 4.88,
  joinedDate: '2024-01-15',
  erpConnected: true,
  coldChainCertified: true
};

export const INITIAL_PENDING_PHARMACIES = [
  {
    id: 'pending-1',
    name: 'Apex Oncology & Specialty Drugs - Kilpauk',
    licenseNumber: 'TN-CHN-2025-99214',
    taxId: 'GST-33AAACA9912K1Z8',
    pharmacistInCharge: 'Dr. Elena Sundaram, M.Pharm',
    pharmacistRegId: 'TN-RPH-2025-4109',
    phone: '+91 44 2644 9102',
    email: 'elena@apexcare.in',
    address: '74, EVR Periyar Salai, Kilpauk, Chennai',
    pincode: '600010',
    open24x7: true,
    driveThru: false,
    emergencyReserveDesk: true,
    coldChainCertified: true,
    licenseDocUrl: 'DL_CERT_APEX_CHENNAI_2026.pdf',
    submittedAt: '2 hours ago',
    status: 'PENDING_APPROVAL',
    notes: 'Specializes in high-potency monoclonal antibodies and cytotoxic therapies. Verified clean CDSCO inspection record.'
  },
  {
    id: 'pending-2',
    name: 'SIMS Hospital Trauma Emergency Pharmacy',
    licenseNumber: 'TN-CHN-2024-44810',
    taxId: 'GST-33AABCS3381L2Z4',
    pharmacistInCharge: 'R. Vigneshwaran, PharmD',
    pharmacistRegId: 'TN-RPH-2023-8874',
    phone: '+91 44 4567 2099',
    email: 'vignesh@simshospitals.com',
    address: '1, Jawaharlal Nehru Salai, Vadapalani, Chennai',
    pincode: '600026',
    open24x7: true,
    driveThru: true,
    emergencyReserveDesk: true,
    coldChainCertified: true,
    licenseDocUrl: 'DL_CERT_SIMS_VERIF.pdf',
    submittedAt: '5 hours ago',
    status: 'PENDING_APPROVAL',
    notes: 'Level 1 Trauma center affiliated 24/7 high-throughput satellite unit.'
  },
  {
    id: 'pending-3',
    name: 'Tambaram Sanatorium Chemist & Druggists',
    licenseNumber: 'TN-KPM-2025-12093',
    taxId: 'GST-33AADCS7718M3Z1',
    pharmacistInCharge: 'Ananya Sharma, B.Pharm',
    pharmacistRegId: 'TN-RPH-2022-3341',
    phone: '+91 44 2241 7788',
    email: 'orders@tambarampharma.in',
    address: '45, GST Road, Tambaram Sanatorium, Chennai',
    pincode: '600047',
    open24x7: false,
    driveThru: false,
    emergencyReserveDesk: false,
    coldChainCertified: false,
    licenseDocUrl: 'DL_CERT_TAMBARAM.pdf',
    submittedAt: '1 day ago',
    status: 'PENDING_APPROVAL',
    notes: 'Independent neighborhood chemist with extensive geriatric patient roster in South Chennai.'
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'res-8849',
    token: 'MED-RES-8849-2H',
    patientName: 'Kavitha Sundaram',
    patientMedId: '#ML-849201',
    patientPhone: '+91 98401 24892',
    bloodGroup: 'O-',
    pharmacyId: 'pharma-1',
    medicineId: 'med-lipitor-20',
    medicineName: 'Lipitor (Atorvastatin Calcium 20mg)',
    quantity: 2,
    unitPrice: 198.50,
    totalPrice: 397.00,
    shelfNumber: 'Bay 4 - Shelf C',
    rxRequired: true,
    rxVerified: true,
    reservedAt: Date.now() - 25 * 60 * 1000, // 25 mins ago
    expiresAt: Date.now() + 95 * 60 * 1000,  // 95 mins left (total 120 mins)
    status: 'HOLDING', // 'HOLDING' | 'DISPENSED' | 'CANCELLED' | 'EXPIRED'
    priority: 'STANDARD'
  },
  {
    id: 'res-9932',
    token: 'MED-RES-9932-2H',
    patientName: 'Karthik Subramanian',
    patientMedId: '#ML-441920',
    patientPhone: '+91 98403 81920',
    bloodGroup: 'A+',
    pharmacyId: 'pharma-1',
    medicineId: 'med-ventolin',
    medicineName: 'Ventolin / Asthalin HFA Inhaler 100mcg',
    quantity: 1,
    unitPrice: 68.00,
    totalPrice: 68.00,
    shelfNumber: 'Bay 2 - Fast Inhale',
    rxRequired: true,
    rxVerified: true,
    reservedAt: Date.now() - 40 * 60 * 1000,
    expiresAt: Date.now() + 80 * 60 * 1000,
    status: 'HOLDING',
    priority: 'URGENT'
  },
  {
    id: 'res-1104',
    token: 'MED-RES-1104-EMERGENCY',
    patientName: 'Ramesh Kannan',
    patientMedId: '#ML-110294',
    patientPhone: '+91 98404 41920',
    bloodGroup: 'B-',
    pharmacyId: 'pharma-1',
    medicineId: 'med-epipen',
    medicineName: 'EpiPen Auto-Injector 0.3mg',
    quantity: 2,
    unitPrice: 675.00,
    totalPrice: 1350.00,
    shelfNumber: 'Red Safe #01 - Anaphylaxis Unit',
    rxRequired: true,
    rxVerified: true,
    reservedAt: Date.now() - 10 * 60 * 1000,
    expiresAt: Date.now() + 110 * 60 * 1000,
    status: 'HOLDING',
    priority: 'EMERGENCY'
  },
  {
    id: 'res-7721',
    token: 'MED-RES-7721-2H',
    patientName: 'Meena Srinivasan',
    patientMedId: '#ML-772109',
    patientPhone: '+91 98405 32911',
    bloodGroup: 'AB+',
    pharmacyId: 'pharma-1',
    medicineId: 'med-augmentin-625',
    medicineName: 'Augmentin 625 Duo Tablets',
    quantity: 1,
    unitPrice: 224.00,
    totalPrice: 224.00,
    shelfNumber: 'Bay 5 - Antibiotic Cooler',
    rxRequired: true,
    rxVerified: true,
    reservedAt: Date.now() - 115 * 60 * 1000,
    expiresAt: Date.now() + 5 * 60 * 1000,
    status: 'HOLDING',
    priority: 'STANDARD'
  }
];

export const INITIAL_DELIVERY_ORDERS = [
  {
    id: 'del-7718',
    orderRef: 'ORD-DLV-7718',
    pharmacyId: 'pharma-1',
    patientName: 'Kavitha Sundaram',
    patientMedId: '#ML-849201',
    phone: '+91 98401 24892',
    deliveryAddress: 'Flat 4B, Ceebros Heights, Venkatnarayana Road, T. Nagar (0.8 km)',
    items: [
      { name: 'Lipitor (Atorvastatin 20mg)', qty: 1, price: 198.50 },
      { name: 'Augmentin 625 Duo', qty: 1, price: 224.00 }
    ],
    totalAmount: 422.50,
    coldChainRequired: false,
    coldChainStatus: 'NOT_REQUIRED',
    courierType: 'MedExpress Priority Moto-Courier',
    courierName: 'K. Saravanan (ID: CHN-ME-902)',
    etaMins: 20,
    status: 'DISPATCH_READY', // 'DISPATCH_READY' | 'DISPATCHED' | 'DELIVERED'
    placedAt: '12 mins ago'
  },
  {
    id: 'del-8821',
    orderRef: 'ORD-DLV-8821',
    pharmacyId: 'pharma-1',
    patientName: 'Anand Ramanathan',
    patientMedId: '#ML-552109',
    phone: '+91 98402 77144',
    deliveryAddress: '12, 4th Main Road, Gandhi Nagar, Adyar (3.2 km)',
    items: [
      { name: 'Lantus SoloStar Insulin 100 IU/mL', qty: 3, price: 485.00 }
    ],
    totalAmount: 1455.00,
    coldChainRequired: true,
    coldChainStatus: 'SECURED_4_POINT_2_CELSIUS',
    courierType: 'MedLink ThermoVault Cold-Chain Van #04',
    courierName: 'S. Murugan (Cold-Chain Certified)',
    etaMins: 25,
    status: 'IN_TRANSIT',
    placedAt: '35 mins ago'
  },
  {
    id: 'del-9943',
    orderRef: 'ORD-DLV-9943',
    pharmacyId: 'pharma-1',
    patientName: 'Priya Narayanan',
    patientMedId: '#ML-339182',
    phone: '+91 98406 99321',
    deliveryAddress: '24, Luz Church Road, Mylapore (1.8 km)',
    items: [
      { name: 'Januvia 100mg Sitagliptin', qty: 2, price: 385.00 }
    ],
    totalAmount: 770.00,
    coldChainRequired: false,
    coldChainStatus: 'NOT_REQUIRED',
    courierType: 'MedExpress Standard Courier',
    courierName: 'Pending Courier Pickup',
    etaMins: 35,
    status: 'DISPATCH_READY',
    placedAt: '8 mins ago'
  }
];

export const INITIAL_ADMIN_PATIENTS = [
  {
    id: '#ML-849201',
    fullName: 'Kavitha Sundaram',
    email: 'kavitha.sundaram@medlink.in',
    phone: '+91 98401 24892',
    bloodGroup: 'O-',
    bloodBadge: 'Universal Donor',
    severeAllergies: ['Penicillin G', 'Sulfa Antibiotics', 'NSAIDs (Aspirin)'],
    chronicConditions: ['Asthma (Moderate Persistent)', 'Hypercholesterolemia'],
    activePrescriptions: 3,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-03-11',
    primaryPharmacy: 'Apollo 24/7 Pharmacy - T. Nagar',
    riskFlag: 'NONE'
  },
  {
    id: '#ML-441920',
    fullName: 'Karthik Subramanian',
    email: 'karthik.subramanian@chennaitech.in',
    phone: '+91 98403 81920',
    bloodGroup: 'A+',
    bloodBadge: 'Standard',
    severeAllergies: ['Latex'],
    chronicConditions: ['COPD / Bronchospasm', 'Hypertension'],
    activePrescriptions: 2,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-05-19',
    primaryPharmacy: 'Kauvery Hospital Trauma Pharmacy',
    riskFlag: 'NONE'
  },
  {
    id: '#ML-110294',
    fullName: 'Ramesh Kannan',
    email: 'ramesh.kannan@iitm.ac.in',
    phone: '+91 98404 41920',
    bloodGroup: 'B-',
    bloodBadge: 'Rare Rh-Negative',
    severeAllergies: ['Peanuts (Anaphylaxis)', 'Bee Venom'],
    chronicConditions: ['Severe Food Allergy History'],
    activePrescriptions: 1,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-06-02',
    primaryPharmacy: 'Apollo 24/7 Pharmacy - T. Nagar',
    riskFlag: 'EMERGENCY_FAST_TRACK'
  },
  {
    id: '#ML-552109',
    fullName: 'Anand Ramanathan',
    email: 'anand.r@chennaiport.gov.in',
    phone: '+91 98402 77144',
    bloodGroup: 'O+',
    bloodBadge: 'Standard',
    severeAllergies: ['Ciprofloxacin'],
    chronicConditions: ['Type 1 Diabetes Mellitus'],
    activePrescriptions: 4,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-02-28',
    primaryPharmacy: 'Fortis Malar Emergency Pharmacy',
    riskFlag: 'NONE'
  },
  {
    id: '#ML-992014',
    fullName: 'Meera Balasubramanian',
    email: 'meera.b@securecare.in',
    phone: '+91 98407 90211',
    bloodGroup: 'AB-',
    bloodBadge: 'Extremely Rare',
    severeAllergies: ['None Reported'],
    chronicConditions: ['Unverified Clinic Order'],
    activePrescriptions: 0,
    accountStatus: 'FLAGGED',
    registeredDate: '2024-09-01',
    primaryPharmacy: 'Unassigned',
    riskFlag: 'SUSPICIOUS_RX_UPLOAD'
  },
  {
    id: '#ML-339182',
    fullName: 'Priya Narayanan',
    email: 'priya.n@bioresearch.ac.in',
    phone: '+91 98406 99321',
    bloodGroup: 'B+',
    bloodBadge: 'Standard',
    severeAllergies: ['Cephalosporins'],
    chronicConditions: ['Type 2 Diabetes', 'Hypothyroidism'],
    activePrescriptions: 2,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-04-14',
    primaryPharmacy: 'MedPlus Health Care Hub - Anna Nagar',
    riskFlag: 'NONE'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-101',
    timestamp: '2026-10-07 02:24:18',
    actor: 'Dr. R. Sundararajan (ADM-001)',
    role: 'ADMIN',
    category: 'COMPLIANCE',
    action: 'Routine Central Formulary CDSCO Verification',
    details: 'Verified batch cryptographic signatures across 7 approved Chennai regional facilities.',
    status: 'SUCCESS'
  },
  {
    id: 'log-102',
    timestamp: '2026-10-07 02:15:02',
    actor: 'Apollo 24/7 Pharmacy (pharma-1)',
    role: 'PHARMACY',
    category: 'INVENTORY',
    action: 'Stock replenishment recorded: Lipitor 20mg',
    details: 'Updated inventory count (+50 units). Batch #TN-2026-X8 expiration 2027-08.',
    status: 'SUCCESS'
  },
  {
    id: 'log-103',
    timestamp: '2026-10-07 01:58:44',
    actor: 'Kavitha Sundaram (#ML-849201)',
    role: 'PATIENT',
    category: 'RESERVATION',
    action: '2-Hour Shelf Hold Token Created: MED-RES-8849-2H',
    details: 'Locked 2 units of Lipitor 20mg at Apollo 24/7 Pharmacy - T. Nagar. Expire window: 120 mins.',
    status: 'ACTIVE'
  },
  {
    id: 'log-104',
    timestamp: '2026-10-07 01:42:19',
    actor: 'Dr. Rajiv Menon (pharma-1)',
    role: 'PHARMACY',
    category: 'EMERGENCY',
    action: 'Marked Emergency ICU Stock Reserve for EpiPen Auto-Injector',
    details: '12 units tagged strictly for anaphylaxis / emergency trauma triage.',
    status: 'RESTRICTED'
  },
  {
    id: 'log-105',
    timestamp: '2026-10-07 00:30:11',
    actor: 'Central Security Gateway',
    role: 'SYSTEM',
    category: 'AUTH',
    action: 'Demo Admin Authentication Handshake Completed',
    details: 'Chief Regulatory Officer session authorized with Level-5 overrides.',
    status: 'SUCCESS'
  },
  {
    id: 'log-106',
    timestamp: '2026-10-06 23:14:55',
    actor: 'Apex Oncology & Specialty Drugs',
    role: 'PHARMACY',
    category: 'REGISTRATION',
    action: 'New Pharmacy License Intake Submitted: TN-CHN-2025-99214',
    details: 'Pharmacist in-charge Dr. Elena Sundaram submitted verification dossier. Queued for State Board audit.',
    status: 'PENDING'
  }
];
