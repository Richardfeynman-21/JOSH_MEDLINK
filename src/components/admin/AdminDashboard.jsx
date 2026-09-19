import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldAlert, 
  Building2, 
  Users, 
  Package, 
  FileText, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Filter, 
  Check, 
  X, 
  LogOut, 
  Download, 
  Clock, 
  Snowflake, 
  Car, 
  Sparkles, 
  FileCheck2, 
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { MEDICINE_CATEGORIES } from '../../data/mockMedicines';

export const AdminDashboard = () => {
  const {
    user,
    logout,
    pendingPharmacies,
    approvePharmacy,
    rejectPharmacy,
    adminPatients,
    togglePatientStatus,
    allPharmacies,
    togglePharmacyAuditStatus,
    medicines,
    auditLogs,
    showToast
  } = useAuth();

  // 5 Control Tabs: 'licensing' | 'patients' | 'pharmacies' | 'formulary' | 'audit'
  const [activeTab, setActiveTab] = useState('licensing');

  // Search & Filter states
  const [patientSearch, setPatientSearch] = useState('');
  const [patientStatusFilter, setPatientStatusFilter] = useState('all');

  const [pharmacySearch, setPharmacySearch] = useState('');
  const [formularySearch, setFormularySearch] = useState('');
  const [auditCategoryFilter, setAuditCategoryFilter] = useState('all');

  // Inspect Modal for pending pharmacy
  const [inspectedPharmacy, setInspectedPharmacy] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Filtered Patients
  const filteredPatients = useMemo(() => {
    return adminPatients.filter((p) => {
      if (patientSearch.trim()) {
        const q = patientSearch.toLowerCase();
        const matchName = p.fullName.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        const matchEmail = p.email.toLowerCase().includes(q);
        const matchPhone = p.phone.includes(q);
        if (!matchName && !matchId && !matchEmail && !matchPhone) return false;
      }
      if (patientStatusFilter !== 'all' && p.accountStatus !== patientStatusFilter) {
        return false;
      }
      return true;
    });
  }, [adminPatients, patientSearch, patientStatusFilter]);

  // Filtered Pharmacies Oversight
  const filteredApprovedPharmacies = useMemo(() => {
    return allPharmacies.filter((p) => {
      if (pharmacySearch.trim()) {
        const q = pharmacySearch.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchLicense = p.verifiedLicense?.toLowerCase().includes(q);
        const matchAddress = p.address?.toLowerCase().includes(q);
        if (!matchName && !matchLicense && !matchAddress) return false;
      }
      return true;
    });
  }, [allPharmacies, pharmacySearch]);

  // Filtered Formulary
  const filteredFormulary = useMemo(() => {
    return medicines.filter((m) => {
      if (formularySearch.trim()) {
        const q = formularySearch.toLowerCase();
        const matchBrand = m.brandName.toLowerCase().includes(q);
        const matchGen = m.genericName.toLowerCase().includes(q);
        const matchId = m.medId?.toLowerCase().includes(q);
        if (!matchBrand && !matchGen && !matchId) return false;
      }
      return true;
    });
  }, [medicines, formularySearch]);

  // Filtered Audit Logs
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      if (auditCategoryFilter !== 'all' && log.category !== auditCategoryFilter) {
        return false;
      }
      return true;
    });
  }, [auditLogs, auditCategoryFilter]);

  // Handle Reject Confirmation
  const confirmRejection = () => {
    if (!inspectedPharmacy) return;
    rejectPharmacy(inspectedPharmacy.id, rejectionReason || 'Dossier failed regulatory licensing standards');
    setIsRejectModalOpen(false);
    setInspectedPharmacy(null);
    setRejectionReason('');
  };

  const handleExportAuditLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medlink_audit_telemetry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Cryptographic audit log exported successfully.', 'success', 'Audit Export');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      {/* Supreme Admin Top Command Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-teal-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Supreme Platform Oversight • Level-5</span>
              </span>
              <span className="font-mono text-xs bg-white/10 px-2.5 py-1 rounded-full text-teal-300 border border-teal-500/20 font-bold">
                Admin ID: {user?.id || 'ADM-001'}
              </span>
              <span className="text-xs text-slate-400">
                Regulatory Clearance: US-FDA / CDSCO Directorate
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {user?.fullName || 'Dr. Christopher Cole'}
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/80 max-w-xl">
              {user?.title || 'Chief Regulatory Officer & Platform Administrator'} • {user?.institution || 'MedLink National Tele-Pharmacy Oversight'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportAuditLogs}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-teal-300" />
              <span>Export Telemetry (JSON)</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Admin</span>
            </button>
          </div>
        </div>

        {/* Global Network Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-amber-300 block">Pending Licensure</span>
            <p className="text-xl font-black text-amber-400 mt-0.5">{pendingPharmacies.length} Facilities</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Approved Pharmacies</span>
            <p className="text-xl font-black text-teal-300 mt-0.5">{allPharmacies.length} Stations</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Registered Patients</span>
            <p className="text-xl font-black text-white mt-0.5">{adminPatients.length} Active</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">Formulary SKUs</span>
            <p className="text-xl font-black text-white mt-0.5">{medicines.length} Drugs</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] uppercase font-bold text-teal-300 block">System Events</span>
            <p className="text-xl font-black text-emerald-300 mt-0.5">{auditLogs.length} Logged</p>
          </div>
        </div>
      </div>

      {/* 5 Supreme Navigation Control Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'licensing', label: '1. Pharmacy Licensing & Approvals', count: pendingPharmacies.length, icon: Building2 },
          { id: 'patients', label: '2. Complete Patient Management', count: adminPatients.length, icon: Users },
          { id: 'pharmacies', label: '3. Complete Pharmacy Oversight', count: allPharmacies.length, icon: Activity },
          { id: 'formulary', label: '4. Master Formulary Catalog', count: medicines.length, icon: Package },
          { id: 'audit', label: '5. Platform Telemetry & Audit Logs', count: auditLogs.length, icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 text-teal-600" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: PHARMACY LICENSING & APPROVALS */}
      {activeTab === 'licensing' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>State Board Drug Licensing & Compliance Review Queue</span>
              </h3>
              <p className="text-xs text-slate-500">
                Approving a pharmacy instantly grants live platform access, makes their inventory discoverable in Medicine Search, and activates shelf-hold reservations.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              {pendingPharmacies.length} Pending Approval
            </span>
          </div>

          {pendingPharmacies.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">All Applications Processed</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                There are no pending pharmacy onboarding applications in the regulatory review queue.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingPharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className="bg-white rounded-3xl border border-amber-300 p-5 shadow-sm hover:shadow-md transition-all space-y-4 relative"
                >
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        Awaiting Board Approval
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1">
                        {pharmacy.name}
                      </h4>
                      <p className="text-xs font-mono text-teal-700 font-bold">
                        License: {pharmacy.licenseNumber}
                      </p>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium">
                      {pharmacy.submittedAt}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Pharmacist in-Charge</span>
                      <strong className="text-slate-800">{pharmacy.pharmacistInCharge}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Registration ID</span>
                      <span className="font-mono text-slate-800">{pharmacy.pharmacistRegId}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">Physical Address</span>
                      <span className="text-slate-800 line-clamp-1">{pharmacy.address}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase">PIN Code / Zone</span>
                      <span className="font-mono font-bold text-slate-800">{pharmacy.pincode}</span>
                    </div>
                  </div>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold">
                    {pharmacy.open24x7 && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                        24/7 Service
                      </span>
                    )}
                    {pharmacy.driveThru && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        Drive-Thru
                      </span>
                    )}
                    {pharmacy.coldChainCertified && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        Cold-Chain 2-8°C
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                      Cert: {pharmacy.licenseDocUrl}
                    </span>
                  </div>

                  {/* Notes */}
                  {pharmacy.notes && (
                    <p className="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-xl border border-amber-100">
                      "{pharmacy.notes}"
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setInspectedPharmacy(pharmacy);
                        setIsRejectModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Reject with Reason
                    </button>

                    <button
                      type="button"
                      onClick={() => approvePharmacy(pharmacy.id)}
                      className="px-4 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-700/20 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Pharmacy</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: COMPLETE PATIENT MANAGEMENT */}
      {activeTab === 'patients' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="Search registered patients by Name, MedLink ID (#ML-XXXXXX), email, or phone..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <select
              value={patientStatusFilter}
              onChange={(e) => setPatientStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Account Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="FLAGGED">Flagged</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3.5">Patient Details</th>
                    <th className="p-3.5">MedLink ID</th>
                    <th className="p-3.5">Blood Group</th>
                    <th className="p-3.5">Documented Allergies</th>
                    <th className="p-3.5">Active Prescriptions</th>
                    <th className="p-3.5">Account Status</th>
                    <th className="p-3.5 text-right">Regulatory Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPatients.map((patient) => {
                    const isActive = patient.accountStatus === 'ACTIVE';
                    const isFlagged = patient.accountStatus === 'FLAGGED';
                    const isSuspended = patient.accountStatus === 'SUSPENDED';

                    return (
                      <tr key={patient.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 text-sm">{patient.fullName}</div>
                          <div className="text-[11px] text-slate-500">{patient.email} • {patient.phone}</div>
                        </td>

                        <td className="p-3.5 font-mono font-bold text-teal-700">
                          {patient.id}
                        </td>

                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black font-mono text-sm text-slate-900">{patient.bloodGroup}</span>
                            {patient.bloodGroup === 'O-' && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                                Universal Donor
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-3.5 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {patient.severeAllergies?.map((allergy, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-800 font-semibold text-[10px]">
                                {allergy}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-3.5 font-semibold text-slate-800">
                          {patient.activePrescriptions} Prescriptions
                        </td>

                        <td className="p-3.5">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>ACTIVE</span>
                            </span>
                          ) : isFlagged ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              <span>FLAGGED FOR AUDIT</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                              <X className="w-3 h-3 text-rose-600" />
                              <span>SUSPENDED</span>
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 text-right">
                          <div className="inline-flex items-center gap-1">
                            {isActive ? (
                              <>
                                <button
                                  onClick={() => togglePatientStatus(patient.id, 'FLAGGED')}
                                  className="px-2.5 py-1 rounded-lg border border-amber-200 text-amber-800 hover:bg-amber-50 text-[11px] font-semibold cursor-pointer"
                                >
                                  Flag
                                </button>
                                <button
                                  onClick={() => togglePatientStatus(patient.id, 'SUSPENDED')}
                                  className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-[11px] font-semibold cursor-pointer"
                                >
                                  Suspend
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => togglePatientStatus(patient.id, 'ACTIVE')}
                                className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold shadow-xs cursor-pointer"
                              >
                                Restore to Active
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPLETE PHARMACY OVERSIGHT */}
      {activeTab === 'pharmacies' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>Platform-Wide Pharmacy Stations Telemetry</span>
              </h3>
              <p className="text-xs text-slate-500">
                Monitors active pharmacy stations, ERP health, operating hours compliance & emergency drug allocation.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
              {allPharmacies.length} Approved Network Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApprovedPharmacies.map((pharmacy) => {
              const isAuditHold = pharmacy.auditStatus === 'AUDIT_HOLD';

              return (
                <div
                  key={pharmacy.id}
                  className={`p-5 rounded-3xl border transition-all bg-white shadow-sm hover:shadow-md space-y-3 ${
                    isAuditHold ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{pharmacy.name}</h4>
                      <p className="text-xs text-slate-500">{pharmacy.type || 'Verified Partner'}</p>
                    </div>
                    <span className="font-mono text-[10px] font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                      {pharmacy.verifiedLicense || 'DL-CERTIFIED'}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="line-clamp-1">{pharmacy.address}</p>
                    <p className="text-[11px] text-slate-400">Phone: {pharmacy.phone} • Rating: ★ {pharmacy.rating || 4.8}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold pt-1">
                    {pharmacy.open24x7 ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        24/7 Station
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        Standard Hours
                      </span>
                    )}
                    {pharmacy.driveThru && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Drive-Thru
                      </span>
                    )}
                    {pharmacy.emergencyReserveDesk && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        ICU Reserve Desk
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-[11px] font-bold ${isAuditHold ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {isAuditHold ? 'Station On Audit Hold' : 'Live & Verified'}
                    </span>

                    <button
                      onClick={() => togglePharmacyAuditStatus(pharmacy.id, isAuditHold ? 'ACTIVE' : 'AUDIT_HOLD')}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        isAuditHold
                          ? 'bg-teal-600 hover:bg-teal-700 text-white'
                          : 'border border-rose-200 hover:bg-rose-50 text-rose-700'
                      }`}
                    >
                      {isAuditHold ? 'Release Hold' : 'Place on Audit Hold'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: MASTER FORMULARY CATALOG */}
      {activeTab === 'formulary' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={formularySearch}
                onChange={(e) => setFormularySearch(e.target.value)}
                placeholder="Search central formulary by Brand, Generic Molecule, or Therapeutic Class..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-2 rounded-xl border border-teal-200 self-center">
              {filteredFormulary.length} Formulary Entities
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3.5">Brand & Formulation</th>
                    <th className="p-3.5">Active Generic Molecule</th>
                    <th className="p-3.5">Therapeutic Class</th>
                    <th className="p-3.5">Base Price / MRP Ceiling</th>
                    <th className="p-3.5">Approved Generic Bio-Equivalent</th>
                    <th className="p-3.5">Savings Potential</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredFormulary.map((med) => (
                    <tr key={med.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 text-sm">{med.brandName}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 font-bold">
                            {med.medId}
                          </span>
                          <span className="text-slate-500 text-[11px]">{med.strength} • {med.dosageForm}</span>
                        </div>
                      </td>

                      <td className="p-3.5 text-slate-800 font-medium max-w-xs">
                        {med.genericName}
                        <div className="text-[11px] text-slate-400">{med.manufacturer}</div>
                      </td>

                      <td className="p-3.5 text-slate-600">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {med.categoryLabel || med.category}
                        </span>
                        <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {med.therapeuticClass}
                        </div>
                      </td>

                      <td className="p-3.5 font-mono text-slate-900">
                        <strong className="text-teal-800 font-bold text-sm">${med.basePrice?.toFixed(2)}</strong>
                        <div className="text-[10px] text-slate-400">Ceiling: ${med.mrp?.toFixed(2)}</div>
                      </td>

                      <td className="p-3.5">
                        {med.genericEquivalent ? (
                          <div>
                            <span className="font-semibold text-slate-800">{med.genericEquivalent.brandName}</span>
                            <div className="text-[11px] text-slate-400">${med.genericEquivalent.price?.toFixed(2)}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">No generic alternative mapped</span>
                        )}
                      </td>

                      <td className="p-3.5">
                        {med.genericEquivalent ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                            {med.genericEquivalent.savingsPercent}% Savings
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PLATFORM TELEMETRY & AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Real-Time Cryptographic Event Log & Audit Stream</span>
              </h3>
              <p className="text-xs text-slate-500">
                Immutable compliance log tracking logins, inventory modifications, emergency shelf holds, and regulatory approvals.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={auditCategoryFilter}
                onChange={(e) => setAuditCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Event Categories</option>
                <option value="AUTH">Authentication</option>
                <option value="INVENTORY">Inventory Updates</option>
                <option value="RESERVATION">Shelf-Hold Reservations</option>
                <option value="APPROVAL">Licensing Approvals</option>
                <option value="EMERGENCY">Emergency Fast-Track</option>
                <option value="COMPLIANCE">Regulatory Compliance</option>
              </select>

              <button
                onClick={handleExportAuditLogs}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Log</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3.5">Timestamp (UTC)</th>
                    <th className="p-3.5">Role</th>
                    <th className="p-3.5">Actor Identity</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Operational Action</th>
                    <th className="p-3.5">Audit Detail</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {log.timestamp}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          log.role === 'ADMIN' ? 'bg-rose-100 text-rose-800' :
                          log.role === 'PHARMACY' ? 'bg-teal-100 text-teal-800' :
                          log.role === 'PATIENT' ? 'bg-blue-100 text-blue-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {log.role}
                        </span>
                      </td>

                      <td className="p-3.5 font-semibold text-slate-800 max-w-xs truncate">
                        {log.actor}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">
                          {log.category}
                        </span>
                      </td>

                      <td className="p-3.5 font-bold text-slate-900">
                        {log.action}
                      </td>

                      <td className="p-3.5 text-slate-600 max-w-sm">
                        {log.details}
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{log.status || 'VERIFIED'}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {isRejectModalOpen && inspectedPharmacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl relative border-2 border-rose-200">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2 text-rose-700">
                <XCircle className="w-6 h-6" />
                <h4 className="text-base font-bold text-slate-900">Reject Pharmacy Application</h4>
              </div>
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Please enter the regulatory reason for rejecting <strong>{inspectedPharmacy.name}</strong> (License: {inspectedPharmacy.licenseNumber}). This will be logged in the public audit telemetry.
            </p>

            <textarea
              rows="3"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Drug license number could not be corroborated with state registry; facility inspection pending."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-rose-500 focus:bg-white"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRejection}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
