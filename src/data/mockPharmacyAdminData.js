// MedLink Pharmacy & Supreme Platform Admin Mock Dataset
// Compliant with CDSCO, US-FDA Drug Supply Chain Security Act (DSCSA) & HIPAA

export const DEFAULT_ADMIN = {
  id: 'ADM-001',
  fullName: 'Dr. Christopher Cole',
  title: 'Chief Regulatory Officer & Platform Administrator',
  email: 'admin@medlink.org',
  accessKey: 'ML-SUPREME-2026',
  role: 'admin',
  department: 'Central Drug Standard Control & Emergency Logistics',
  institution: 'MedLink National Tele-Pharmacy Oversight Directorate',
  clearances: [
    'LEVEL-5-SUPER-ADMIN',
    'FORMULARY_CATALOG_OVERRIDE',
    'EMERGENCY_ICU_ALLOCATION',
    'PHARMACY_LICENSING_AUTHORITY',
    'AUDIT_ENFORCEMENT_PROTOCOL'
  ],
  phone: '+1 (800) 633-5465 ext. 901',
  avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&q=80',
  lastSecurityAudit: '2026-09-18 08:30 UTC'
};

export const DEMO_PHARMACY_USER = {
  id: 'pharma-1',
  name: 'Green Cross 24/7 Pharmacy',
  type: 'Community Supercare Hub',
  licenseNumber: 'DL-CA-84920',
  pharmacistInCharge: 'Dr. Rajiv Menon, PharmD',
  pharmacistRegId: 'RPH-2024-9912',
  email: 'greencross@pharmacy.medlink.org',
  phone: '+1 (555) 234-8849',
  address: '12th Main Road, 4th Block, Koramangala, Metro City',
  pincode: '560034',
  role: 'pharmacy',
  status: 'APPROVED',
  open24x7: true,
  driveThru: true,
  emergencyReserveDesk: true,
  lowStockThreshold: 15,
  criticalICUReserveRatio: 20, // 20% reserved for trauma/ICU
  rating: 4.85,
  joinedDate: '2024-01-15',
  erpConnected: true,
  coldChainCertified: true
};

export const INITIAL_PENDING_PHARMACIES = [
  {
    id: 'pending-1',
    name: 'Apex Care Specialty & Oncology Drugs',
    licenseNumber: 'DL-CA-99214',
    taxId: 'TAX-US-991204',
    pharmacistInCharge: 'Dr. Elena Rostova, PharmD',
    pharmacistRegId: 'RPH-2025-4109',
    phone: '+1 (555) 883-9102',
    email: 'elena@apexcare.org',
    address: '742 Evergreen Blvd, Suite 100, Medical District',
    pincode: '560048',
    open24x7: true,
    driveThru: false,
    emergencyReserveDesk: true,
    coldChainCertified: true,
    licenseDocUrl: 'DL_CERT_APEX_2026.pdf',
    submittedAt: '2 hours ago',
    status: 'PENDING_APPROVAL',
    notes: 'Specializes in high-potency monoclonal antibodies and cytotoxic therapies. Verified clean DEA record.'
  },
  {
    id: 'pending-2',
    name: 'Mercy Trauma Center Emergency Pharmacy',
    licenseNumber: 'DL-NY-44810',
    taxId: 'TAX-US-338190',
    pharmacistInCharge: 'Marcus Vance, PharmD',
    pharmacistRegId: 'RPH-2023-8874',
    phone: '+1 (555) 441-2099',
    email: 'mvance@mercyhealth.net',
    address: '109 Memorial Highway, Trauma Wing A',
    pincode: '560076',
    open24x7: true,
    driveThru: true,
    emergencyReserveDesk: true,
    coldChainCertified: true,
    licenseDocUrl: 'DL_CERT_MERCY_VERIF.pdf',
    submittedAt: '5 hours ago',
    status: 'PENDING_APPROVAL',
    notes: 'Level 1 Trauma center affiliated 24/7 high-throughput satellite unit.'
  },
  {
    id: 'pending-3',
    name: 'Sunrise Community Chemist & Druggists',
    licenseNumber: 'DL-WA-12093',
    taxId: 'TAX-US-771822',
    pharmacistInCharge: 'Ananya Sharma, BPharm',
    pharmacistRegId: 'RPH-2022-3341',
    phone: '+1 (555) 321-7788',
    email: 'orders@sunriserx.com',
    address: '45 Lake View Road, Suburb Sector 5',
    pincode: '560068',
    open24x7: false,
    driveThru: false,
    emergencyReserveDesk: false,
    coldChainCertified: false,
    licenseDocUrl: 'DL_CERT_SUNRISE.pdf',
    submittedAt: '1 day ago',
    status: 'PENDING_APPROVAL',
    notes: 'Independent neighborhood chemist with extensive geriatric patient roster.'
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'res-8849',
    token: 'MED-RES-8849-2H',
    patientName: 'Sarah Jenkins',
    patientMedId: '#ML-849201',
    patientPhone: '+1 (555) 019-2834',
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
    patientName: 'David K. Vance',
    patientMedId: '#ML-441920',
    patientPhone: '+1 (555) 882-1920',
    bloodGroup: 'A+',
    pharmacyId: 'pharma-1',
    medicineId: 'med-ventolin',
    medicineName: 'Ventolin HFA Inhaler 100mcg',
    quantity: 1,
    unitPrice: 68.00,
    totalPrice: 68.00,
    shelfNumber: 'Bay 2 - Fast Inhale',
    rxRequired: true,
    rxVerified: true,
    reservedAt: Date.now() - 40 * 60 * 1000, // 40 mins ago
    expiresAt: Date.now() + 80 * 60 * 1000,  // 80 mins left
    status: 'HOLDING',
    priority: 'URGENT'
  },
  {
    id: 'res-1104',
    token: 'MED-RES-1104-EMERGENCY',
    patientName: 'Robert Langdon',
    patientMedId: '#ML-110294',
    patientPhone: '+1 (555) 441-9920',
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
    reservedAt: Date.now() - 10 * 60 * 1000, // 10 mins ago
    expiresAt: Date.now() + 110 * 60 * 1000,
    status: 'HOLDING',
    priority: 'EMERGENCY'
  },
  {
    id: 'res-7721',
    token: 'MED-RES-7721-2H',
    patientName: 'Maria Rodriguez',
    patientMedId: '#ML-772109',
    patientPhone: '+1 (555) 332-9011',
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
    patientName: 'Sarah Jenkins',
    patientMedId: '#ML-849201',
    phone: '+1 (555) 019-2834',
    deliveryAddress: '442 Elm Street, Apt 4B, Koramangala (0.8 km)',
    items: [
      { name: 'Lipitor (Atorvastatin 20mg)', qty: 1, price: 198.50 },
      { name: 'Augmentin 625 Duo', qty: 1, price: 224.00 }
    ],
    totalAmount: 422.50,
    coldChainRequired: false,
    coldChainStatus: 'NOT_REQUIRED',
    courierType: 'MedExpress Priority Moto-Courier',
    courierName: 'Carlos D. (ID: ME-902)',
    etaMins: 25,
    status: 'DISPATCH_READY', // 'DISPATCH_READY' | 'DISPATCHED' | 'DELIVERED'
    placedAt: '12 mins ago'
  },
  {
    id: 'del-8821',
    orderRef: 'ORD-DLV-8821',
    pharmacyId: 'pharma-1',
    patientName: 'Marcus Miller',
    patientMedId: '#ML-552109',
    phone: '+1 (555) 771-4490',
    deliveryAddress: '12 Palm Grove, HSR Layout Sector 2 (2.4 km)',
    items: [
      { name: 'Lantus SoloStar Insulin 100 IU/mL', qty: 3, price: 485.00 }
    ],
    totalAmount: 1455.00,
    coldChainRequired: true,
    coldChainStatus: 'SECURED_4_POINT_2_CELSIUS',
    courierType: 'MedLink ThermoVault Cold-Chain Van #04',
    courierName: 'Dave Peterson (Cold-Chain Certified)',
    etaMins: 18,
    status: 'IN_TRANSIT',
    placedAt: '35 mins ago'
  },
  {
    id: 'del-9943',
    orderRef: 'ORD-DLV-9943',
    pharmacyId: 'pharma-1',
    patientName: 'Priya Narayanan',
    patientMedId: '#ML-339182',
    phone: '+1 (555) 993-2194',
    deliveryAddress: '88 Sony World Junction, 5th Cross (1.1 km)',
    items: [
      { name: 'Januvia 100mg Sitagliptin', qty: 2, price: 385.00 }
    ],
    totalAmount: 770.00,
    coldChainRequired: false,
    coldChainStatus: 'NOT_REQUIRED',
    courierType: 'MedExpress Standard Courier',
    courierName: 'Pending Courier Pickup',
    etaMins: 40,
    status: 'DISPATCH_READY',
    placedAt: '8 mins ago'
  }
];

export const INITIAL_ADMIN_PATIENTS = [
  {
    id: '#ML-849201',
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@medlink-patient.org',
    phone: '+1 (555) 019-2834',
    bloodGroup: 'O-',
    bloodBadge: 'Universal Donor',
    severeAllergies: ['Penicillin G', 'Sulfa Antibiotics', 'NSAIDs (Aspirin)'],
    chronicConditions: ['Asthma (Moderate Persistent)', 'Hypercholesterolemia'],
    activePrescriptions: 3,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-03-11',
    primaryPharmacy: 'Green Cross 24/7 Pharmacy',
    riskFlag: 'NONE'
  },
  {
    id: '#ML-441920',
    fullName: 'David K. Vance',
    email: 'david.vance@techcorp.io',
    phone: '+1 (555) 882-1920',
    bloodGroup: 'A+',
    bloodBadge: 'Standard',
    severeAllergies: ['Latex'],
    chronicConditions: ['COPD / Bronchospasm', 'Hypertension'],
    activePrescriptions: 2,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-05-19',
    primaryPharmacy: 'Apollo Central SuperSpecialty',
    riskFlag: 'NONE'
  },
  {
    id: '#ML-110294',
    fullName: 'Robert Langdon',
    email: 'robert.langdon@univ.edu',
    phone: '+1 (555) 441-9920',
    bloodGroup: 'B-',
    bloodBadge: 'Rare Rh-Negative',
    severeAllergies: ['Peanuts (Anaphylaxis)', 'Bee Venom'],
    chronicConditions: ['Severe Food Allergy History'],
    activePrescriptions: 1,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-06-02',
    primaryPharmacy: 'Green Cross 24/7 Pharmacy',
    riskFlag: 'EMERGENCY_FAST_TRACK'
  },
  {
    id: '#ML-552109',
    fullName: 'Marcus Miller',
    email: 'm.miller@metrotrans.org',
    phone: '+1 (555) 771-4490',
    bloodGroup: 'O+',
    bloodBadge: 'Standard',
    severeAllergies: ['Ciprofloxacin'],
    chronicConditions: ['Type 1 Diabetes Mellitus'],
    activePrescriptions: 4,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-02-28',
    primaryPharmacy: 'Green Cross 24/7 Pharmacy',
    riskFlag: 'NONE'
  },
  {
    id: '#ML-992014',
    fullName: 'Helena Vance-Smith',
    email: 'helena.v@unknownmail.io',
    phone: '+1 (555) 902-1144',
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
    phone: '+1 (555) 993-2194',
    bloodGroup: 'B+',
    bloodBadge: 'Standard',
    severeAllergies: ['Cephalosporins'],
    chronicConditions: ['Type 2 Diabetes', 'Hypothyroidism'],
    activePrescriptions: 2,
    accountStatus: 'ACTIVE',
    registeredDate: '2024-04-14',
    primaryPharmacy: 'Apollo Central SuperSpecialty',
    riskFlag: 'NONE'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-101',
    timestamp: '2026-09-20 02:24:18',
    actor: 'Dr. Christopher Cole (ADM-001)',
    role: 'ADMIN',
    category: 'COMPLIANCE',
    action: 'Routine Central Formulary DSCSA Verification',
    details: 'Verified batch cryptographic signatures across 7 approved regional facilities.',
    status: 'SUCCESS'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-20 02:15:02',
    actor: 'Green Cross 24/7 Pharmacy (pharma-1)',
    role: 'PHARMACY',
    category: 'INVENTORY',
    action: 'Stock replenishment recorded: Lipitor 20mg',
    details: 'Updated inventory count (+50 units). Batch #LT-2026-X8 expiration 2027-08.',
    status: 'SUCCESS'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-20 01:58:44',
    actor: 'Sarah Jenkins (#ML-849201)',
    role: 'PATIENT',
    category: 'RESERVATION',
    action: '2-Hour Shelf Hold Token Created: MED-RES-8849-2H',
    details: 'Locked 2 units of Lipitor 20mg at Green Cross 24/7 Pharmacy. Expire window: 120 mins.',
    status: 'ACTIVE'
  },
  {
    id: 'log-104',
    timestamp: '2026-09-20 01:42:19',
    actor: 'Dr. Rajiv Menon (pharma-1)',
    role: 'PHARMACY',
    category: 'EMERGENCY',
    action: 'Marked Emergency ICU Stock Reserve for EpiPen Auto-Injector',
    details: '12 units tagged strictly for anaphylaxis / emergency room triage.',
    status: 'RESTRICTED'
  },
  {
    id: 'log-105',
    timestamp: '2026-09-20 00:30:11',
    actor: 'Central Security Gateway',
    role: 'SYSTEM',
    category: 'AUTH',
    action: 'Demo Admin Authentication Handshake Completed',
    details: 'Chief Regulatory Officer session authorized with Level-5 overrides.',
    status: 'SUCCESS'
  },
  {
    id: 'log-106',
    timestamp: '2026-09-19 23:14:55',
    actor: 'Apex Care Specialty Drugs',
    role: 'PHARMACY',
    category: 'REGISTRATION',
    action: 'New Pharmacy License Intake Submitted: DL-CA-99214',
    details: 'Pharmacist in-charge Dr. Elena Rostova submitted verification dossier. Queued for Admin audit.',
    status: 'PENDING'
  }
];
