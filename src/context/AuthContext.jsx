import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMO_PATIENT, INITIAL_PHARMACIES, INITIAL_PRESCRIPTIONS } from '../data/mockPatientData';
import { MOCK_MEDICINES, MOCK_PHARMACIES } from '../data/mockMedicines';
import {
  DEFAULT_ADMIN,
  DEMO_PHARMACY_USER,
  INITIAL_PENDING_PHARMACIES,
  INITIAL_RESERVATIONS,
  INITIAL_DELIVERY_ORDERS,
  INITIAL_ADMIN_PATIENTS,
  INITIAL_AUDIT_LOGS
} from '../data/mockPharmacyAdminData';

const AuthContext = createContext(null);

const STORAGE_KEY_USER = 'medlink_auth_user';
const STORAGE_KEY_ROLE = 'medlink_auth_role';
const REMEMBER_KEY = 'medlink_remember_device';
const RX_STORAGE_KEY = 'medlink_prescriptions';
const PHARMA_STORAGE_KEY = 'medlink_patient_pharmacies';
const MEDS_STORAGE_KEY = 'medlink_live_medicines';
const RES_STORAGE_KEY = 'medlink_live_reservations';
const PENDING_PHARMA_KEY = 'medlink_pending_pharmacies';
const AUDIT_STORAGE_KEY = 'medlink_audit_logs';

export const AuthProvider = ({ children }) => {
  // Remember workstation / device
  const [rememberDevice, setRememberDevice] = useState(() => {
    return localStorage.getItem(REMEMBER_KEY) === 'true';
  });

  // Current Role: 'patient' | 'pharmacy' | 'admin' | null
  const [role, setRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_ROLE) || 'patient';
  });

  // Current authenticated user (Patient, Pharmacy User, or Admin)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY_USER);
    const savedRole = localStorage.getItem(STORAGE_KEY_ROLE);
    if (savedUser && savedRole) {
      try {
        return JSON.parse(savedUser);
      } catch {}
    }
    // Default to Sarah Jenkins (Patient) for instant preview usability
    return DEMO_PATIENT;
  });

  // Master Synchronized Medicines State (changes here instantly reflect in Search and Admin)
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem(MEDS_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return MOCK_MEDICINES;
  });

  // Master Synchronized Pharmacies List
  const [allPharmacies, setAllPharmacies] = useState(() => {
    return MOCK_PHARMACIES;
  });

  // Pending Pharmacies Queue (for Admin licensing approvals)
  const [pendingPharmacies, setPendingPharmacies] = useState(() => {
    const saved = localStorage.getItem(PENDING_PHARMA_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PENDING_PHARMACIES;
  });

  // Live 2-Hour Shelf Reservations Queue
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem(RES_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_RESERVATIONS;
  });

  // Courier Delivery Orders
  const [deliveryOrders, setDeliveryOrders] = useState(INITIAL_DELIVERY_ORDERS);

  // Admin Patients Master Oversight
  const [adminPatients, setAdminPatients] = useState(INITIAL_ADMIN_PATIENTS);

  // Audit Logs Telemetry
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_AUDIT_LOGS;
  });

  // Patient Profile state (pharmacies and prescriptions for patient dashboard)
  const [pharmacies, setPharmacies] = useState(() => {
    const saved = localStorage.getItem(PHARMA_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PHARMACIES;
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem(RX_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PRESCRIPTIONS;
  });

  // Toast notification system
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', title = '') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type, title };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (user && rememberDevice) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_ROLE, role);
      localStorage.setItem(REMEMBER_KEY, 'true');
    } else if (!user) {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_ROLE);
    }
  }, [user, role, rememberDevice]);

  useEffect(() => {
    localStorage.setItem(MEDS_STORAGE_KEY, JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem(RES_STORAGE_KEY, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(PENDING_PHARMA_KEY, JSON.stringify(pendingPharmacies));
  }, [pendingPharmacies]);

  useEffect(() => {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(RX_STORAGE_KEY, JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem(PHARMA_STORAGE_KEY, JSON.stringify(pharmacies));
  }, [pharmacies]);

  // Append Audit Log Helper
  const logAuditEvent = useCallback((action, details, category = 'COMPLIANCE', customRole = null, customActor = null) => {
    const now = new Date();
    const timestamp = `${now.toISOString().replace('T', ' ').substring(0, 19)}`;
    const actorName = customActor || (user?.fullName || user?.name || 'System Operator');
    const actorRole = customRole || (role ? role.toUpperCase() : 'SYSTEM');
    
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp,
      actor: `${actorName} (${user?.id || user?.licenseNumber || 'SYS'})`,
      role: actorRole,
      category,
      action,
      details,
      status: 'SUCCESS'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [user, role]);

  // ==========================================
  // AUTHENTICATION HANDLERS
  // ==========================================

  // Demo Logins
  const loginDemoPatient = () => {
    setUser(DEMO_PATIENT);
    setRole('patient');
    setRememberDevice(true);
    logAuditEvent('Demo Patient Session Activated', 'Logged in as Sarah Jenkins (O-Negative)', 'AUTH', 'PATIENT', 'Sarah Jenkins');
    showToast('Logged in as Demo Patient: Sarah Jenkins (O-Negative • Universal Donor).', 'clinical', 'Demo Mode Active');
  };

  const loginDemoPharmacy = () => {
    setUser(DEMO_PHARMACY_USER);
    setRole('pharmacy');
    setRememberDevice(true);
    logAuditEvent('Demo Pharmacy Workstation Login', 'Logged in as Green Cross 24/7 Pharmacy (DL-CA-84920)', 'AUTH', 'PHARMACY', 'Green Cross Pharmacy');
    showToast('Logged in as Pharmacy Partner: Green Cross 24/7 Pharmacy (License: DL-CA-84920)', 'success', 'Pharmacy Portal Verified');
  };

  const loginDemoAdmin = () => {
    setUser(DEFAULT_ADMIN);
    setRole('admin');
    setRememberDevice(true);
    logAuditEvent('Supreme Admin Privilege Session Initialized', 'Chief Regulatory Officer Dr. Christopher Cole authenticated', 'AUTH', 'ADMIN', 'Dr. Christopher Cole');
    showToast('Authenticated with Supreme Admin Privileges: Chief Regulatory Officer Dr. Christopher Cole.', 'clinical', 'Level-5 Admin Active');
  };

  // Generic Patient Login
  const login = (identifier, password, remember = false) => {
    const trimmedId = identifier.trim();
    setRememberDevice(remember);

    if (
      trimmedId.toLowerCase() === DEMO_PATIENT.email.toLowerCase() ||
      trimmedId.toUpperCase() === DEMO_PATIENT.id ||
      trimmedId === '#ML-849201' ||
      trimmedId.toLowerCase() === 'sarah'
    ) {
      setUser(DEMO_PATIENT);
      setRole('patient');
      logAuditEvent('Patient Sign In Verified', `Patient authenticated: ${DEMO_PATIENT.fullName}`, 'AUTH', 'PATIENT');
      showToast(`Welcome back, ${DEMO_PATIENT.fullName}. Clinical profile loaded.`, 'success', 'Authentication Verified');
      return { success: true };
    }

    if (trimmedId.includes('@') || trimmedId.startsWith('ML-') || trimmedId.startsWith('#ML-')) {
      const customPatient = {
        ...DEMO_PATIENT,
        id: trimmedId.startsWith('ML-') ? trimmedId : `#ML-${Math.floor(100000 + Math.random() * 900000)}`,
        email: trimmedId.includes('@') ? trimmedId : 'patient@medlink.org',
        fullName: trimmedId.includes('@') ? trimmedId.split('@')[0].replace('.', ' ') : 'Verified Patient'
      };
      setUser(customPatient);
      setRole('patient');
      logAuditEvent('Patient Sign In Verified', `Custom patient authenticated: ${customPatient.fullName}`, 'AUTH', 'PATIENT');
      showToast('Authenticated successfully with MedLink ID credentials.', 'success', 'Session Active');
      return { success: true };
    }

    showToast('Invalid credentials. Please verify your Email or MedLink ID.', 'error', 'Login Failed');
    return { success: false, error: 'Invalid Email or MedLink ID format' };
  };

  // Pharmacy Login
  const loginPharmacy = (identifier, password, remember = false) => {
    const trimmed = identifier.trim();
    setRememberDevice(remember);

    // Check Green Cross Demo
    if (
      trimmed.toLowerCase() === DEMO_PHARMACY_USER.email.toLowerCase() ||
      trimmed.toUpperCase() === DEMO_PHARMACY_USER.licenseNumber ||
      trimmed.toLowerCase().includes('greencross') ||
      trimmed === 'DL-CA-84920'
    ) {
      setUser(DEMO_PHARMACY_USER);
      setRole('pharmacy');
      logAuditEvent('Pharmacy Operator Signed In', `License: ${DEMO_PHARMACY_USER.licenseNumber}`, 'AUTH', 'PHARMACY');
      showToast(`Workstation loaded: ${DEMO_PHARMACY_USER.name}`, 'success', 'Pharmacy Authorized');
      return { success: true };
    }

    // Check newly approved pharmacies
    const foundApproved = allPharmacies.find(
      (p) => p.verifiedLicense === trimmed || p.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (foundApproved) {
      const pharmaUser = {
        ...DEMO_PHARMACY_USER,
        id: foundApproved.id,
        name: foundApproved.name,
        licenseNumber: foundApproved.verifiedLicense || trimmed,
        address: foundApproved.address,
        pincode: foundApproved.pincode,
        open24x7: foundApproved.open24x7,
        driveThru: foundApproved.driveThru
      };
      setUser(pharmaUser);
      setRole('pharmacy');
      logAuditEvent('Pharmacy Workstation Connected', `License: ${pharmaUser.licenseNumber}`, 'AUTH', 'PHARMACY');
      showToast(`Workstation connected: ${pharmaUser.name}`, 'success', 'Pharmacy Active');
      return { success: true };
    }

    // Generic fallback for any valid looking license format
    if (trimmed.includes('DL-') || trimmed.includes('@')) {
      const genericPharma = {
        ...DEMO_PHARMACY_USER,
        id: `pharma-${Math.floor(100 + Math.random() * 900)}`,
        name: trimmed.includes('@') ? `${trimmed.split('@')[0].toUpperCase()} Pharmacy` : 'Authorized Pharmacy Station',
        licenseNumber: trimmed.toUpperCase().startsWith('DL-') ? trimmed.toUpperCase() : `DL-GEN-${Math.floor(10000 + Math.random() * 90000)}`,
        email: trimmed.includes('@') ? trimmed : 'dispensary@medlink.org'
      };
      setUser(genericPharma);
      setRole('pharmacy');
      logAuditEvent('Pharmacy Station Authenticated', `Station license: ${genericPharma.licenseNumber}`, 'AUTH', 'PHARMACY');
      showToast(`Welcome, ${genericPharma.name}`, 'success', 'Station Verified');
      return { success: true };
    }

    showToast('Invalid Pharmacy License Number or Workstation Email.', 'error', 'Auth Error');
    return { success: false, error: 'Unrecognized Drug License or Email' };
  };

  // Supreme Admin Login
  const loginAdmin = (email, accessKey) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedKey = accessKey.trim();

    if (
      (trimmedEmail === DEFAULT_ADMIN.email.toLowerCase() || trimmedEmail === 'admin' || trimmedEmail === 'cole') &&
      (trimmedKey === DEFAULT_ADMIN.accessKey || trimmedKey.length >= 4)
    ) {
      setUser(DEFAULT_ADMIN);
      setRole('admin');
      logAuditEvent('Supreme Admin Key Validation Passed', 'Level-5 regulatory session opened', 'AUTH', 'ADMIN');
      showToast('Admin Credentials Verified. Platform oversight controls granted.', 'clinical', 'Supreme Admin Access');
      return { success: true };
    }

    // Any medlink.org admin email
    if (trimmedEmail.endsWith('@medlink.org') && trimmedKey.length >= 6) {
      const customAdmin = {
        ...DEFAULT_ADMIN,
        email: trimmedEmail,
        fullName: trimmedEmail.split('@')[0].replace('.', ' ').toUpperCase()
      };
      setUser(customAdmin);
      setRole('admin');
      logAuditEvent('Admin Key Validated', `Admin: ${customAdmin.fullName}`, 'AUTH', 'ADMIN');
      showToast('Admin Credentials Verified.', 'clinical', 'Admin Access');
      return { success: true };
    }

    showToast('Invalid Administrative Email or Security Key.', 'error', 'Admin Access Denied');
    return { success: false, error: 'Unauthorized Administrative Access Key' };
  };

  // Logout handler
  const logout = () => {
    logAuditEvent('User Session Terminated', `Role ${role} logged out`, 'AUTH');
    setUser(null);
    setRole(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_ROLE);
    showToast('You have logged out securely.', 'info', 'Session Ended');
  };

  // Register new patient
  const register = (registrationData) => {
    const generatedId = `ML-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPatient = {
      id: generatedId,
      fullName: registrationData.fullName || 'New Patient',
      email: registrationData.email,
      phone: registrationData.phone,
      dob: registrationData.dob,
      gender: registrationData.gender,
      bloodGroup: registrationData.bloodGroup || 'O+',
      bloodGroupBadge: registrationData.bloodGroup === 'O-' ? 'Universal Donor' : 'Standard',
      allergies: registrationData.allergies || [],
      chronicConditions: registrationData.chronicConditions || [],
      emergencyContact: {
        name: registrationData.emergencyContactName,
        relationship: registrationData.emergencyContactRelation,
        phone: registrationData.emergencyContactPhone,
        is24Hour: true,
      },
      location: {
        street: registrationData.street || 'Primary Residence',
        city: registrationData.city || 'Metro Area',
        state: registrationData.state || 'CA',
        pincode: registrationData.pincode || '94107',
        latitude: 37.7749,
        longitude: -122.4194
      },
      primaryPhysician: {
        name: 'Assigned MedLink Primary Care',
        specialty: 'Family & Internal Medicine',
        hospital: 'Metro Health Alliance',
        phone: '+1 (555) 000-2470'
      },
      hipaaAgreed: true,
      registeredAt: new Date().toISOString(),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      qrData: `MEDLINK:PATIENT:${generatedId}|BLOOD:${registrationData.bloodGroup}|ALLERGIES:${(registrationData.allergies || []).join(',')}|ICE:${registrationData.emergencyContactPhone}|STATUS:VERIFIED`
    };

    setUser(newPatient);
    setRole('patient');

    // Add to Admin Patient Directory as well
    const adminRecord = {
      id: `#${generatedId}`,
      fullName: newPatient.fullName,
      email: newPatient.email,
      phone: newPatient.phone,
      bloodGroup: newPatient.bloodGroup,
      bloodBadge: newPatient.bloodGroupBadge,
      severeAllergies: newPatient.allergies,
      chronicConditions: newPatient.chronicConditions,
      activePrescriptions: 1,
      accountStatus: 'ACTIVE',
      registeredDate: new Date().toISOString().substring(0, 10),
      primaryPharmacy: 'Green Cross 24/7 Pharmacy',
      riskFlag: 'NONE'
    };
    setAdminPatients((prev) => [adminRecord, ...prev]);

    logAuditEvent('New Clinical Patient Intake Registered', `Patient #${generatedId} (${newPatient.fullName}) enrolled`, 'COMPLIANCE', 'PATIENT');
    showToast(
      `Welcome to MedLink, ${newPatient.fullName}! Your MedLink ID is #${newPatient.id}`,
      'success',
      'Clinical Intake Complete'
    );
    return newPatient;
  };

  // Register new pharmacy (enters PENDING_APPROVAL queue)
  const registerPharmacy = (pharmacyData) => {
    const newPendingId = `pending-${Date.now()}`;
    const newPendingEntry = {
      id: newPendingId,
      name: pharmacyData.name,
      licenseNumber: pharmacyData.licenseNumber,
      taxId: pharmacyData.taxId || `TAX-REG-${Math.floor(100000 + Math.random() * 900000)}`,
      pharmacistInCharge: pharmacyData.pharmacistInCharge,
      pharmacistRegId: pharmacyData.pharmacistRegId || `RPH-${Math.floor(1000 + Math.random() * 9000)}`,
      phone: pharmacyData.phone,
      email: pharmacyData.email,
      address: pharmacyData.address,
      pincode: pharmacyData.pincode,
      open24x7: !!pharmacyData.open24x7,
      driveThru: !!pharmacyData.driveThru,
      emergencyReserveDesk: !!pharmacyData.emergencyReserveDesk,
      coldChainCertified: !!pharmacyData.coldChainCertified,
      licenseDocUrl: pharmacyData.licenseDocName || 'DRUG_LICENSE_SUBMITTED.pdf',
      submittedAt: 'Just Now',
      status: 'PENDING_APPROVAL',
      notes: pharmacyData.notes || 'Newly submitted onboarding dossier awaiting Board verification.'
    };

    setPendingPharmacies((prev) => [newPendingEntry, ...prev]);
    logAuditEvent(
      'Pharmacy Registration Intake Submitted',
      `Store: ${newPendingEntry.name} (License: ${newPendingEntry.licenseNumber}) queued for Admin approval`,
      'REGISTRATION',
      'PHARMACY'
    );
    showToast(
      `Registration submitted for ${pharmacyData.name}. It is now in the Regulatory Board queue for Drug License verification.`,
      'clinical',
      'Verification Pending'
    );
    return newPendingEntry;
  };

  // Update Patient Profile
  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        ...updatedFields,
        location: {
          ...prev.location,
          ...(updatedFields.location || {})
        },
        primaryPhysician: {
          ...prev.primaryPhysician,
          ...(updatedFields.primaryPhysician || {})
        },
        emergencyContact: {
          ...prev.emergencyContact,
          ...(updatedFields.emergencyContact || {})
        }
      };
      return updated;
    });
    logAuditEvent('Patient Profile Updated', 'Demographic or emergency details modified', 'COMPLIANCE', 'PATIENT');
    showToast('Your medical and personal profile has been updated.', 'success', 'Profile Updated');
  };

  // Set primary pharmacy for patient
  const setPrimaryPharmacy = (pharmacyId) => {
    setPharmacies((prev) =>
      prev.map((p) => ({
        ...p,
        isPrimary: p.id === pharmacyId
      }))
    );
    showToast('Primary pharmacy updated. Future emergency prescriptions will route here.', 'info', 'Pharmacy Routing');
  };

  // One-click Refill Request
  const requestRefill = (rxId) => {
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id === rxId) {
          return {
            ...rx,
            status: 'In Transit',
            courierEta: 'Dispatching: 45 min ETA to your address',
            lastFilled: 'Today (Just Now)'
          };
        }
        return rx;
      })
    );
    const target = prescriptions.find((r) => r.id === rxId);
    logAuditEvent('Prescription Refill Dispatched', `Refill order generated for ${target?.name || 'Prescription'}`, 'DISPENSE', 'PATIENT');
    showToast(
      `Refill authorized for ${target ? target.name : 'Prescription'}! Dispatch initiated from ${pharmacies.find(p => p.isPrimary)?.name || 'Primary Pharmacy'}.`,
      'clinical',
      'Refill Order Dispatched'
    );
  };

  // ==========================================
  // REAL-TIME SYNCHRONIZED INVENTORY OPERATIONS
  // ==========================================

  // Live Inventory Update by Pharmacy or Admin
  // (Changes to units, status, price, batch, expiry immediately update search results!)
  const updateMedicineInventory = (pharmacyId, medicineId, updates) => {
    setMedicines((prevMedicines) => {
      return prevMedicines.map((med) => {
        if (med.id !== medicineId) return med;

        // Find or create the pharmacy's inventory entry inside this drug
        let inventoryExists = false;
        const updatedInventory = med.pharmacyInventory.map((inv) => {
          if (inv.pharmacyId === pharmacyId) {
            inventoryExists = true;
            const newUnits = updates.units !== undefined ? Number(updates.units) : inv.units;
            
            // Auto calculate stock status if not explicitly overridden
            let newStatus = updates.status || inv.status;
            if (!updates.status && updates.units !== undefined) {
              if (newUnits === 0) newStatus = 'OUT_OF_STOCK';
              else if (newUnits < 10) newStatus = 'LOW_STOCK';
              else newStatus = 'IN_STOCK';
            }

            return {
              ...inv,
              ...updates,
              units: newUnits,
              status: newStatus,
              price: updates.price !== undefined ? Number(updates.price) : inv.price,
              batchNo: updates.batchNo || inv.batchNo || med.batchNo,
              expiryDate: updates.expiryDate || inv.expiryDate || '2027-08',
              lastSync: 'Live Verified Just Now via Web ERP',
              syncMinutesAgo: 0
            };
          }
          return inv;
        });

        if (!inventoryExists) {
          const newUnits = Number(updates.units || 10);
          let newStatus = updates.status || (newUnits > 10 ? 'IN_STOCK' : 'LOW_STOCK');
          updatedInventory.push({
            pharmacyId,
            status: newStatus,
            units: newUnits,
            price: Number(updates.price || med.basePrice),
            batchNo: updates.batchNo || med.batchNo,
            expiryDate: updates.expiryDate || '2027-08',
            lastSync: 'Live Verified Just Now via Web ERP',
            syncMinutesAgo: 0,
            canReserve: true,
            canDeliver: true,
            ...updates
          });
        }

        return {
          ...med,
          pharmacyInventory: updatedInventory
        };
      });
    });

    const medName = medicines.find(m => m.id === medicineId)?.brandName || 'Drug';
    logAuditEvent(
      'Live Inventory Stock Updated',
      `${medName}: Stock set to ${updates.units ?? 'custom'} units at ${pharmacyId}`,
      'INVENTORY',
      role ? role.toUpperCase() : 'PHARMACY'
    );
    showToast(`Inventory updated for ${medName}. Stock synced in real-time to Live Search!`, 'success', 'Inventory Synced');
  };

  // Add new medicine to pharmacy inventory
  const addMedicineToInventory = (pharmacyId, drugData) => {
    // Check if drug already exists in formulary
    const existingMed = medicines.find(
      (m) => m.brandName.toLowerCase() === drugData.brandName.toLowerCase()
    );

    if (existingMed) {
      updateMedicineInventory(pharmacyId, existingMed.id, {
        units: drugData.units || 25,
        price: drugData.price || existingMed.basePrice,
        batchNo: drugData.batchNo || 'NEW-BATCH-2026',
        expiryDate: drugData.expiryDate || '2027-12',
        status: drugData.isEmergencyReserve ? 'EMERGENCY_RESERVE' : (drugData.units > 10 ? 'IN_STOCK' : 'LOW_STOCK')
      });
      return existingMed;
    }

    // Create a new medicine record in formulary
    const newId = `med-custom-${Date.now()}`;
    const newMedicineRecord = {
      id: newId,
      brandName: drugData.brandName,
      genericName: drugData.genericName || drugData.brandName,
      medId: `MED-${Math.floor(1000 + Math.random() * 9000)}`,
      ndc: drugData.ndc || `0000-${Math.floor(1000 + Math.random() * 9000)}-01`,
      batchNo: drugData.batchNo || 'BT-2026-X1',
      category: drugData.category || 'emergency_icu',
      categoryLabel: drugData.categoryLabel || 'Emergency / Critical Care',
      dosageForm: drugData.dosageForm || 'Tablets',
      strength: drugData.strength || '500 mg',
      packSize: drugData.packSize || 'Standard Pack',
      manufacturer: drugData.manufacturer || 'Approved MedLink Pharma Partner',
      prescriptionRequired: drugData.prescriptionRequired ?? true,
      isColdChain: drugData.isColdChain ?? false,
      storageAlert: drugData.storageAlert || 'Store at controlled temperature 20°C - 25°C.',
      basePrice: Number(drugData.price || 150),
      mrp: Number(drugData.price ? drugData.price * 1.2 : 180),
      therapeuticClass: drugData.therapeuticClass || 'Therapeutic Agent',
      indications: drugData.indications || 'Clinical medical treatment',
      genericEquivalent: {
        brandName: `${drugData.genericName || drugData.brandName} (Generic)`,
        genericName: drugData.genericName || drugData.brandName,
        manufacturer: 'Generic BioSciences Corp.',
        price: Number(drugData.price ? drugData.price * 0.45 : 75),
        savingsPercent: 55,
        bioequivalenceStatus: '100% Bioequivalent CDSCO/FDA Approved',
        activeIngredientsMatch: 'Full Salt Potency Equivalence Verified',
        description: 'Clinically equivalent generic alternative.',
        safetyCert: 'GMP Certified'
      },
      pharmacyInventory: [
        {
          pharmacyId,
          status: drugData.isEmergencyReserve ? 'EMERGENCY_RESERVE' : 'IN_STOCK',
          units: Number(drugData.units || 30),
          price: Number(drugData.price || 150),
          batchNo: drugData.batchNo || 'BT-2026-X1',
          expiryDate: drugData.expiryDate || '2027-12',
          lastSync: 'Verified Just Now',
          syncMinutesAgo: 0,
          canReserve: true,
          canDeliver: true
        }
      ]
    };

    setMedicines((prev) => [newMedicineRecord, ...prev]);
    logAuditEvent(
      'New Formulary Drug Added to Inventory',
      `${drugData.brandName} (${drugData.strength}) registered by ${pharmacyId}`,
      'INVENTORY',
      'PHARMACY'
    );
    showToast(`Added ${drugData.brandName} to live inventory and formulary!`, 'success', 'Drug Registered');
    return newMedicineRecord;
  };

  // Toggle Emergency / ICU Only Reserve flag on a drug
  const toggleEmergencyReserve = (pharmacyId, medicineId, currentStatus) => {
    const newStatus = currentStatus === 'EMERGENCY_RESERVE' ? 'IN_STOCK' : 'EMERGENCY_RESERVE';
    updateMedicineInventory(pharmacyId, medicineId, { status: newStatus });
    logAuditEvent(
      'Emergency Drug Reserve Toggle',
      `Toggled status of drug ${medicineId} to ${newStatus} at ${pharmacyId}`,
      'EMERGENCY',
      'PHARMACY'
    );
  };

  // ==========================================
  // 2-HOUR SHELF-HOLD RESERVATION OPERATIONS
  // ==========================================

  // Mark reservation complete / dispensed
  const completeReservation = (reservationId) => {
    setReservations((prev) =>
      prev.map((res) => {
        if (res.id === reservationId) {
          return {
            ...res,
            status: 'DISPENSED',
            dispensedAt: new Date().toISOString()
          };
        }
        return res;
      })
    );
    const target = reservations.find((r) => r.id === reservationId);
    logAuditEvent(
      'Patient Shelf-Hold Dispensed',
      `Token ${target?.token}: Dispensed ${target?.quantity}x ${target?.medicineName} to ${target?.patientName}`,
      'DISPENSE',
      'PHARMACY'
    );
    showToast(`Reservation #${target?.token || reservationId} marked Dispensed & Complete.`, 'success', 'Dispensed');
  };

  // Cancel reservation and restock
  const cancelReservation = (reservationId, reason = 'Patient Request / No Show') => {
    const target = reservations.find((r) => r.id === reservationId);
    setReservations((prev) =>
      prev.map((res) => {
        if (res.id === reservationId) {
          return {
            ...res,
            status: 'CANCELLED',
            cancelReason: reason,
            cancelledAt: new Date().toISOString()
          };
        }
        return res;
      })
    );

    // Restock drug back to pharmacy inventory
    if (target && target.medicineId && target.pharmacyId) {
      const med = medicines.find((m) => m.id === target.medicineId);
      const inv = med?.pharmacyInventory.find((i) => i.pharmacyId === target.pharmacyId);
      if (inv) {
        updateMedicineInventory(target.pharmacyId, target.medicineId, {
          units: inv.units + (target.quantity || 1)
        });
      }
    }

    logAuditEvent(
      'Shelf-Hold Reservation Cancelled',
      `Token ${target?.token} cancelled: ${reason}. Units returned to stock.`,
      'RESERVATION',
      'PHARMACY'
    );
    showToast(`Reservation #${target?.token || reservationId} cancelled. Units returned to live shelf.`, 'info', 'Reservation Released');
  };

  // Create new reservation (from Medicine Search)
  const createReservation = (pharmacyId, medicineId, quantity = 1, patientDetails = {}) => {
    const token = `MED-RES-${Math.floor(1000 + Math.random() * 9000)}-2H`;
    const med = medicines.find((m) => m.id === medicineId);
    const pharma = allPharmacies.find((p) => p.id === pharmacyId);

    const newRes = {
      id: `res-${Date.now()}`,
      token,
      patientName: patientDetails.patientName || user?.fullName || 'Sarah Jenkins',
      patientMedId: patientDetails.patientMedId || user?.id || '#ML-849201',
      patientPhone: patientDetails.phone || user?.phone || '+1 (555) 019-2834',
      bloodGroup: user?.bloodGroup || 'O-',
      pharmacyId,
      medicineId,
      medicineName: med ? `${med.brandName} (${med.strength || ''})` : 'Prescription Medicine',
      quantity,
      unitPrice: med?.basePrice || 150,
      totalPrice: (med?.basePrice || 150) * quantity,
      shelfNumber: `Hold Bay ${Math.floor(1 + Math.random() * 8)}`,
      rxRequired: med?.prescriptionRequired ?? true,
      rxVerified: true,
      reservedAt: Date.now(),
      expiresAt: Date.now() + 120 * 60 * 1000, // exactly 2 hours
      status: 'HOLDING',
      priority: med?.category === 'emergency_icu' ? 'EMERGENCY' : 'STANDARD'
    };

    setReservations((prev) => [newRes, ...prev]);

    // Deduct stock from live inventory
    const inv = med?.pharmacyInventory.find((i) => i.pharmacyId === pharmacyId);
    if (inv && inv.units > 0) {
      updateMedicineInventory(pharmacyId, medicineId, {
        units: Math.max(0, inv.units - quantity)
      });
    }

    logAuditEvent(
      '2-Hour Shelf-Hold Created',
      `Token ${token} locked for ${newRes.patientName} at ${pharma?.name || pharmacyId}`,
      'RESERVATION',
      'PATIENT'
    );

    return newRes;
  };

  // ==========================================
  // DELIVERY QUEUE OPERATIONS
  // ==========================================

  const dispatchDeliveryOrder = (orderId) => {
    setDeliveryOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'IN_TRANSIT',
            courierName: order.courierName || 'MedExpress Priority Courier #28',
            etaMins: 20
          };
        }
        return order;
      })
    );
    const target = deliveryOrders.find((o) => o.id === orderId);
    logAuditEvent(
      'Courier Delivery Dispatched',
      `Order ${target?.orderRef} handed to courier. Cold-chain security verified.`,
      'DELIVERY',
      'PHARMACY'
    );
    showToast(`Order ${target?.orderRef || orderId} dispatched to courier!`, 'success', 'In Transit');
  };

  // ==========================================
  // ADMIN PLATFORM OVERSIGHT OPERATIONS
  // ==========================================

  // Approve pending pharmacy registration
  const approvePharmacy = (pendingId) => {
    const target = pendingPharmacies.find((p) => p.id === pendingId);
    if (!target) return;

    // Create approved pharmacy object
    const newPharmaId = `pharma-${Date.now().toString().slice(-4)}`;
    const approvedPharma = {
      id: newPharmaId,
      name: target.name,
      type: 'Verified MedLink Partner',
      address: target.address,
      pincode: target.pincode,
      distanceKm: 3.5,
      open24x7: target.open24x7,
      driveThru: target.driveThru,
      emergencyReserveDesk: target.emergencyReserveDesk,
      phone: target.phone,
      rating: 5.0,
      reviewsCount: 1,
      coords: { lat: 12.9350, lng: 77.6250, x: 50, y: 50 },
      verifiedLicense: target.licenseNumber,
      centralErpConnected: true,
      deliveryEtaMins: 30,
      status: 'ACTIVE'
    };

    setAllPharmacies((prev) => [...prev, approvedPharma]);
    setPendingPharmacies((prev) => prev.filter((p) => p.id !== pendingId));

    logAuditEvent(
      'Pharmacy License Approved by Regulatory Admin',
      `License ${target.licenseNumber} for ${target.name} approved. Activated on public network.`,
      'APPROVAL',
      'ADMIN'
    );
    showToast(
      `Pharmacy "${target.name}" approved! It is now live and visible to all patients in Medicine Search.`,
      'success',
      'License Approved'
    );
  };

  // Reject pending pharmacy registration
  const rejectPharmacy = (pendingId, reason = 'License verification could not be corroborated with state registry') => {
    const target = pendingPharmacies.find((p) => p.id === pendingId);
    setPendingPharmacies((prev) => prev.filter((p) => p.id !== pendingId));

    logAuditEvent(
      'Pharmacy License Registration Rejected',
      `Application for ${target?.name} (License: ${target?.licenseNumber}) rejected. Reason: ${reason}`,
      'COMPLIANCE',
      'ADMIN'
    );
    showToast(`Registration for "${target?.name}" rejected. Reason logged in audit telemetry.`, 'error', 'Application Rejected');
  };

  // Toggle patient account status (Active / Suspended / Flagged)
  const togglePatientStatus = (patientId, newStatus) => {
    setAdminPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return { ...p, accountStatus: newStatus };
        }
        return p;
      })
    );
    logAuditEvent(
      'Patient Account Status Overridden',
      `Patient ${patientId} account status set to ${newStatus}`,
      'COMPLIANCE',
      'ADMIN'
    );
    showToast(`Patient ${patientId} status changed to ${newStatus}`, 'info', 'Account Modified');
  };

  // Toggle pharmacy platform status (Active / Audit Hold)
  const togglePharmacyAuditStatus = (pharmacyId, newStatus) => {
    setAllPharmacies((prev) =>
      prev.map((p) => {
        if (p.id === pharmacyId) {
          return { ...p, auditStatus: newStatus };
        }
        return p;
      })
    );
    logAuditEvent(
      'Pharmacy Audit Status Toggled',
      `Pharmacy ${pharmacyId} status updated to ${newStatus}`,
      'COMPLIANCE',
      'ADMIN'
    );
    showToast(`Pharmacy status updated to ${newStatus}`, 'info', 'Status Updated');
  };

  // Update Pharmacy Store Profile Settings (24/7, driveThru, thresholds)
  const updatePharmacySettings = (pharmacyId, settings) => {
    if (user && user.id === pharmacyId) {
      setUser((prev) => ({ ...prev, ...settings }));
    }
    setAllPharmacies((prev) =>
      prev.map((p) => {
        if (p.id === pharmacyId) {
          return { ...p, ...settings };
        }
        return p;
      })
    );
    logAuditEvent(
      'Pharmacy Store Settings Configured',
      `Updated facility telemetry & threshold parameters for ${pharmacyId}`,
      'COMPLIANCE',
      'PHARMACY'
    );
    showToast('Store settings and operational parameters saved.', 'success', 'Settings Updated');
  };

  return (
    <AuthContext.Provider
      value={{
        // Authentication & Role
        user,
        role,
        isAuthenticated: !!user,
        rememberDevice,
        setRememberDevice,
        
        // Demo Logins for Evaluators
        loginDemoPatient,
        loginDemoPharmacy,
        loginDemoAdmin,

        // Specific Login Handlers
        login,
        loginPharmacy,
        loginAdmin,
        logout,

        // Registration Handlers
        register,
        registerPharmacy,
        updateProfile,

        // Real-Time Synchronized State across portals
        medicines,
        allPharmacies,
        pendingPharmacies,
        reservations,
        deliveryOrders,
        adminPatients,
        auditLogs,

        // Real-time Inventory Coordination Handlers
        updateMedicineInventory,
        addMedicineToInventory,
        toggleEmergencyReserve,

        // Shelf-Hold Reservation Handlers
        completeReservation,
        cancelReservation,
        createReservation,

        // Delivery Handlers
        dispatchDeliveryOrder,

        // Admin Oversight Handlers
        approvePharmacy,
        rejectPharmacy,
        togglePatientStatus,
        togglePharmacyAuditStatus,
        updatePharmacySettings,
        logAuditEvent,

        // Patient-specific state
        pharmacies,
        setPrimaryPharmacy,
        prescriptions,
        requestRefill,

        // Toast notifications
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
