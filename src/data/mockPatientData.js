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
  fullName: 'Sarah Jenkins',
  email: 'sarah.jenkins@medlink-patient.org',
  phone: '+1 (555) 382-9104',
  dob: '1992-04-14',
  gender: 'Female',
  bloodGroup: 'O-',
  bloodGroupBadge: 'Universal Donor',
  allergies: ['Penicillin', 'Sulfa Drugs', 'NSAIDs (Ibuprofen/Aspirin)'],
  chronicConditions: ['Asthma (Moderate Persistent)', 'Hypertension (High Blood Pressure)'],
  emergencyContact: {
    name: 'Michael Jenkins',
    relationship: 'Spouse',
    phone: '+1 (555) 382-9188',
    is24Hour: true,
  },
  location: {
    street: '742 Evergreen Medical Parkway, Suite 3B',
    city: 'Metro City',
    state: 'CA',
    pincode: '94107',
    latitude: 37.7749,
    longitude: -122.4194
  },
  primaryPhysician: {
    name: 'Dr. Rachel Vance, MD',
    specialty: 'Bay Area Pulmonology & Internal Care',
    hospital: 'St. Jude Medical Center, West Wing',
    phone: '+1 (555) 902-1100'
  },
  hipaaAgreed: true,
  registeredAt: '2025-01-10T08:30:00Z',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  qrData: 'MEDLINK:PATIENT:ML-849201|BLOOD:O-NEG|ALLERGIES:PENICILLIN,SULFA,NSAIDS|ICE:+15553829188|STATUS:ACTIVE_VERIFIED'
};

export const INITIAL_PHARMACIES = [
  {
    id: 'pharma-1',
    name: 'Walgreens 24/7 Clinical Pharmacy',
    address: '890 Health Blvd, Metro City',
    pincode: '94107',
    distanceMiles: 0.6,
    is24Hours: true,
    hasDriveThru: true,
    isPrimary: true,
    inStockScore: '99% Emergency Formulary',
    phone: '+1 (555) 234-8890',
    status: 'Open Now • 24 Hours'
  },
  {
    id: 'pharma-2',
    name: 'St. Jude Hospital Outpatient Dispensary',
    address: '100 Medical Center Drive, Metro City',
    pincode: '94107',
    distanceMiles: 1.2,
    is24Hours: true,
    hasDriveThru: false,
    isPrimary: false,
    inStockScore: '100% Critical Care Stock',
    phone: '+1 (555) 902-1400',
    status: 'Open Now • Hospital Direct'
  },
  {
    id: 'pharma-3',
    name: 'CVS CarePlus Pharmacy & Express Refill',
    address: '1420 Market Street, Metro City',
    pincode: '94103',
    distanceMiles: 2.1,
    is24Hours: false,
    hasDriveThru: true,
    isPrimary: false,
    inStockScore: '96% In Stock',
    phone: '+1 (555) 456-7812',
    status: 'Closes at 10:00 PM'
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: 'rx-1',
    name: 'Albuterol Sulfate HFA Inhalation Aerosol',
    strength: '90 mcg/actuation (200 inhalations)',
    rxNumber: 'RX-491028',
    doctor: 'Dr. Rachel Vance, MD',
    directions: 'Inhale 2 puffs every 4 to 6 hours as needed for bronchospasm / wheezing',
    refillsRemaining: 3,
    lastFilled: 'Sep 02, 2026',
    status: 'Active',
    pharmacy: 'Walgreens 24/7 Clinical Pharmacy',
    category: 'Respiratory / Asthma'
  },
  {
    id: 'rx-2',
    name: 'Fluticasone Propionate Nasal Spray',
    strength: '50 mcg/spray, 16g container',
    rxNumber: 'RX-339104',
    doctor: 'Dr. Rachel Vance, MD',
    directions: 'Spray 1 puff into each nostril once daily in the morning',
    refillsRemaining: 0,
    lastFilled: 'Aug 18, 2026',
    status: 'Refill Needed',
    pharmacy: 'Walgreens 24/7 Clinical Pharmacy',
    category: 'Allergic Rhinitis'
  },
  {
    id: 'rx-3',
    name: 'Cefdinir Oral Capsule (Penicillin Alternative)',
    strength: '300 mg capsule',
    rxNumber: 'RX-882019',
    doctor: 'Dr. Leonard McCoy, MD (Urgent Care)',
    directions: 'Take 1 capsule every 12 hours for 7 days with water',
    refillsRemaining: 1,
    lastFilled: 'Sep 19, 2026',
    status: 'In Transit',
    courierEta: '32 mins away • Drone/Courier dispatch',
    pharmacy: 'St. Jude Hospital Outpatient Dispensary',
    category: 'Antibiotic'
  },
  {
    id: 'rx-4',
    name: 'Lisinopril Oral Tablet',
    strength: '10 mg oral tablet',
    rxNumber: 'RX-102934',
    doctor: 'Dr. Rachel Vance, MD',
    directions: 'Take 1 tablet by mouth daily in the morning with water',
    refillsRemaining: 2,
    lastFilled: 'Aug 28, 2026',
    status: 'Active',
    pharmacy: 'Walgreens 24/7 Clinical Pharmacy',
    category: 'Cardiovascular'
  }
];
