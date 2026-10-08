export const BLOOD_GROUPS = [
  { group: 'O-', badge: 'Universal Donor', desc: 'Universal Red Cell Donor (can donate to all types)', emergencyPriority: 'High' },
  { group: 'O+', badge: 'Common Donor', desc: 'Compatible with O+, A+, B+, AB+ recipients', emergencyPriority: 'Standard' },
  { group: 'A-', badge: 'Target Donor', desc: 'Compatible with A-, A+, AB-, AB+', emergencyPriority: 'Standard' },
  { group: 'A+', badge: 'Standard', desc: 'Compatible with A+, AB+', emergencyPriority: 'Standard' },
  { group: 'B-', badge: 'Target Donor', desc: 'Compatible with B-, B+, AB-, AB+', emergencyPriority: 'Standard' },
  { group: 'B+', badge: 'Standard', desc: 'Compatible with B+, AB+', emergencyPriority: 'Standard' },
  { group: 'AB-', badge: 'Plasma Donor', desc: 'Universal Plasma Donor; compatible with AB-, AB+', emergencyPriority: 'Standard' },
  { group: 'AB+', badge: 'Universal Recipient', desc: 'Can receive red cells from all blood types', emergencyPriority: 'High' },
];

export const COMMON_ALLERGIES = [
  'Penicillin',
  'Sulfa Drugs',
  'NSAIDs (Ibuprofen/Aspirin)',
  'Peanuts',
  'Tree Nuts',
  'Shellfish',
  'Latex',
  'Radiographic Contrast Dye',
  'Morphine / Opioids',
  'Ceftriaxone / Cephalosporins',
  'Local Anesthetics (Novocaine)',
  'ACE Inhibitors'
];

export const COMMON_CONDITIONS = [
  'Asthma (Moderate Persistent)',
  'Hypertension (High Blood Pressure)',
  'Type 2 Diabetes',
  'Type 1 Diabetes',
  'Celiac Disease',
  'Epilepsy / Seizure Disorder',
  'Coronary Artery Disease',
  'Chronic Kidney Disease',
  'Hypothyroidism',
  'Rheumatoid Arthritis'
];

export const DEMO_PATIENT = {
  id: 'ML-849201',
  fullName: 'Kavitha Sundaram',
  email: 'kavitha.sundaram@medlink.in',
  phone: '+91 98401 24892',
  dob: '1992-04-14',
  gender: 'Female',
  bloodGroup: 'O-',
  bloodGroupBadge: 'Universal Donor',
  allergies: ['Penicillin', 'Sulfa Drugs', 'NSAIDs (Ibuprofen/Aspirin)'],
  chronicConditions: ['Asthma (Moderate Persistent)', 'Hypertension (High Blood Pressure)'],
  emergencyContact: {
    name: 'Suresh Sundaram',
    relationship: 'Spouse',
    phone: '+91 98402 81920',
    is24Hour: true,
  },
  location: {
    street: '42, Venkatnarayana Road, T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
    latitude: 13.0418,
    longitude: 80.2341
  },
  primaryPhysician: {
    name: 'Dr. Arvind Swaminathan, MD (Cardiology)',
    specialty: 'Cardiovascular & Internal Medicine',
    hospital: 'Apollo Hospitals Greams Road, Chennai',
    phone: '+91 44 2829 0200'
  },
  hipaaAgreed: true,
  registeredAt: '2025-01-10T08:30:00Z',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  qrData: 'MEDLINK:PATIENT:ML-849201|BLOOD:O-NEG|ALLERGIES:PENICILLIN,SULFA,NSAIDS|ICE:+919840281920|STATUS:ACTIVE_VERIFIED'
};

export const INITIAL_PHARMACIES = [
  {
    id: 'pharma-1',
    name: 'Apollo 24/7 Pharmacy - T. Nagar',
    address: '42, South Usman Road, T. Nagar, Chennai',
    pincode: '600017',
    distanceKm: 0.8,
    is24Hours: true,
    hasDriveThru: true,
    isPrimary: true,
    inStockScore: '99% Emergency Formulary',
    phone: '+91 44 2434 4991',
    status: 'Open Now • 24 Hours'
  },
  {
    id: 'pharma-2',
    name: 'Kauvery Hospital Trauma Pharmacy',
    address: '199, Luz Church Road, Alwarpet, Chennai',
    pincode: '600018',
    distanceKm: 1.4,
    is24Hours: true,
    hasDriveThru: false,
    isPrimary: false,
    inStockScore: '100% Critical Care Stock',
    phone: '+91 44 4000 6000',
    status: 'Open Now • Hospital Direct'
  },
  {
    id: 'pharma-3',
    name: 'MedPlus Health Care Hub - Anna Nagar',
    address: '2nd Avenue, Anna Nagar West, Chennai',
    pincode: '600040',
    distanceKm: 2.3,
    is24Hours: false,
    hasDriveThru: true,
    isPrimary: false,
    inStockScore: '96% In Stock',
    phone: '+91 44 2621 1234',
    status: 'Closes at 11:00 PM'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'rx-1',
    name: 'Asthalin Inhaler (Salbutamol HFA)',
    strength: '100 mcg/actuation (200 metered doses)',
    rxNumber: 'TN-RX-491028',
    doctor: 'Dr. Meenakshi Raman, MD (Pulmonology)',
    directions: 'Inhale 2 puffs every 4 to 6 hours as needed for wheezing / bronchospasm',
    refillsRemaining: 3,
    lastFilled: 'Sep 02, 2026',
    status: 'Active',
    pharmacy: 'Apollo 24/7 Pharmacy - T. Nagar',
    category: 'Respiratory / Asthma'
  },
  {
    id: 'rx-2',
    name: 'Telma 40 (Telmisartan Tablets IP)',
    strength: '40 mg oral tablet',
    rxNumber: 'TN-RX-339104',
    doctor: 'Dr. Arvind Swaminathan, MD',
    directions: 'Take 1 tablet daily in the morning after breakfast',
    refillsRemaining: 0,
    lastFilled: 'Aug 18, 2026',
    status: 'Refill Needed',
    pharmacy: 'Apollo 24/7 Pharmacy - T. Nagar',
    category: 'Hypertension'
  },
  {
    id: 'rx-3',
    name: 'Augmentin 625 Duo (Amoxicillin & Potassium Clavulanate)',
    strength: '625 mg oral tablet',
    rxNumber: 'TN-RX-882019',
    doctor: 'Dr. S. Balaji, MD (SIMS Hospital Vadapalani)',
    directions: 'Take 1 tablet twice daily for 5 days after food',
    refillsRemaining: 1,
    lastFilled: 'Sep 19, 2026',
    status: 'In Transit',
    courierEta: '22 mins away • Express Chennai dispatch',
    pharmacy: 'Kauvery Hospital Trauma Pharmacy',
    category: 'Antibiotic'
  },
  {
    id: 'rx-4',
    name: 'Atorva 20 (Atorvastatin Calcium IP)',
    strength: '20 mg oral tablet',
    rxNumber: 'TN-RX-102934',
    doctor: 'Dr. Arvind Swaminathan, MD',
    directions: 'Take 1 tablet at bedtime with water',
    refillsRemaining: 2,
    lastFilled: 'Aug 28, 2026',
    status: 'Active',
    pharmacy: 'Apollo 24/7 Pharmacy - T. Nagar',
    category: 'Cardiovascular'
  }
];
