import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMO_PATIENT, INITIAL_PHARMACIES, INITIAL_PRESCRIPTIONS } from '../data/mockPatientData';

const AuthContext = createContext(null);

const STORAGE_KEY = 'medlink_auth_patient';
const REMEMBER_KEY = 'medlink_remember_device';
const RX_STORAGE_KEY = 'medlink_prescriptions';
const PHARMA_STORAGE_KEY = 'medlink_pharmacies';

export const AuthProvider = ({ children }) => {
  // Check if remember device is set
  const [rememberDevice, setRememberDevice] = useState(() => {
    return localStorage.getItem(REMEMBER_KEY) === 'true';
  });

  // Current authenticated user (default to Sarah Jenkins for initial instant preview or check storage)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_PATIENT;
      }
    }
    // Default logged in with Sarah Jenkins to make demo directly usable, or can start logged in
    return DEMO_PATIENT;
  });

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(REMEMBER_KEY, 'true');
    } else if (!user) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, rememberDevice]);

  useEffect(() => {
    localStorage.setItem(RX_STORAGE_KEY, JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem(PHARMA_STORAGE_KEY, JSON.stringify(pharmacies));
  }, [pharmacies]);

  // Login handler
  const login = (identifier, password, remember = false) => {
    const trimmedId = identifier.trim();
    setRememberDevice(remember);

    // Allow MedLink ID, Sarah's email, or custom matching
    if (
      trimmedId.toLowerCase() === DEMO_PATIENT.email.toLowerCase() ||
      trimmedId.toUpperCase() === DEMO_PATIENT.id ||
      trimmedId === '#ML-849201' ||
      trimmedId.toLowerCase() === 'sarah'
    ) {
      setUser(DEMO_PATIENT);
      showToast(
        `Welcome back, ${DEMO_PATIENT.fullName}. Clinical profile loaded.`,
        'success',
        'Authentication Verified'
      );
      return { success: true };
    }

    // Generic fallback patient if custom email entered with valid format
    if (trimmedId.includes('@') || trimmedId.startsWith('ML-') || trimmedId.startsWith('#ML-')) {
      const customPatient = {
        ...DEMO_PATIENT,
        id: trimmedId.startsWith('ML-') ? trimmedId : `#ML-${Math.floor(100000 + Math.random() * 900000)}`,
        email: trimmedId.includes('@') ? trimmedId : 'patient@medlink.org',
        fullName: trimmedId.includes('@') ? trimmedId.split('@')[0].replace('.', ' ') : 'Verified Patient'
      };
      setUser(customPatient);
      showToast('Authenticated successfully with MedLink ID credentials.', 'success', 'Session Active');
      return { success: true };
    }

    showToast('Invalid credentials. Please verify your Email or MedLink ID.', 'error', 'Login Failed');
    return { success: false, error: 'Invalid Email or MedLink ID format' };
  };

  // Demo Login with Sarah Jenkins
  const loginDemoPatient = () => {
    setUser(DEMO_PATIENT);
    setRememberDevice(true);
    showToast(
      'Logged in as Demo Patient: Sarah Jenkins (O-Negative • Universal Donor).',
      'clinical',
      'Demo Mode Active'
    );
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    showToast('You have been logged out securely. Medical session terminated.', 'info', 'Session Ended');
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
    showToast(
      `Welcome to MedLink, ${newPatient.fullName}! Your MedLink ID is #${newPatient.id}`,
      'success',
      'Clinical Intake Complete'
    );
    return newPatient;
  };

  // Update profile
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
    showToast('Your medical and personal profile has been updated.', 'success', 'Profile Updated');
  };

  // Set primary pharmacy
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
    showToast(
      `Refill authorized for ${target ? target.name : 'Prescription'}! Dispatch initiated from ${pharmacies.find(p => p.isPrimary)?.name || 'Primary Pharmacy'}.`,
      'clinical',
      'Refill Order Dispatched'
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        rememberDevice,
        setRememberDevice,
        login,
        loginDemoPatient,
        logout,
        register,
        updateProfile,
        pharmacies,
        setPrimaryPharmacy,
        prescriptions,
        requestRefill,
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
