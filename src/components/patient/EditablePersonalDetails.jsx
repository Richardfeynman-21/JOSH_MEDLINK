import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Edit3, 
  Save, 
  X 
} from 'lucide-react';

export const EditablePersonalDetails = () => {
  const { user, updateProfile, showToast } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    dob: user?.dob || '',
    gender: user?.gender || '',
    street: user?.location?.street || '',
    city: user?.location?.city || '',
    state: user?.location?.state || '',
    pincode: user?.location?.pincode || '',
    emergencyName: user?.emergencyContact?.name || '',
    emergencyPhone: user?.emergencyContact?.phone || '',
    emergencyRel: user?.emergencyContact?.relationship || 'Spouse',
  });

  const [errors, setErrors] = useState({});

  if (!user) return null;

  const handleStartEdit = () => {
    setFormData({
      fullName: user.fullName || '',
      phone: user.phone || '',
      email: user.email || '',
      dob: user.dob || '',
      gender: user.gender || '',
      street: user.location?.street || '',
      city: user.location?.city || '',
      state: user.location?.state || '',
      pincode: user.location?.pincode || '',
      emergencyName: user.emergencyContact?.name || '',
      emergencyPhone: user.emergencyContact?.phone || '',
      emergencyRel: user.emergencyContact?.relationship || 'Spouse',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.pincode.trim()) errs.pincode = 'Pincode is required';
    if (!formData.street.trim()) errs.street = 'Street address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateProfile({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      location: {
        ...user.location,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      emergencyContact: {
        ...user.emergencyContact,
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relationship: formData.emergencyRel,
      }
    });

    setIsEditing(false);
    showToast('Personal contact details & residential address updated successfully.', 'success');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <User className="w-5 h-5 text-teal-600" />
            <span>Personal & Contact Demographics</span>
          </h3>
          <p className="text-xs text-slate-500">
            Address used to auto-locate nearest pharmacies and coordinate urgent refills
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleStartEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-teal-200 hover:bg-teal-50 text-teal-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Information</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              title="Cancel editing"
              aria-label="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        /* View Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Column 1: Personal Details */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Full Legal Name
              </span>
              <p className="font-semibold text-slate-800">{user.fullName}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Contact Phone & Email
              </span>
              <p className="font-medium text-slate-800">{user.phone}</p>
              <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Date of Birth / Sex
                </span>
                <p className="font-medium text-slate-800 mt-0.5">{user.dob} • {user.gender}</p>
              </div>
            </div>
          </div>

          {/* Column 2: Residential Address & Geo Pincode */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Residential Street Address
                </span>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Geo-Matching Active
                </span>
              </div>
              <p className="font-medium text-slate-800">{user.location?.street || 'Not specified'}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.location?.city}, {user.location?.state}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Pincode / Postal Zone
                </span>
                <p className="font-mono font-bold text-base text-slate-900 mt-0.5">
                  {user.location?.pincode}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-semibold text-slate-400 block">Nearby Pharmacies</span>
                <span className="text-xs font-bold text-emerald-600">3 within 2.5 mi</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Primary Emergency Contact
              </span>
              <p className="font-semibold text-slate-800">
                {user.emergencyContact?.name} <span className="text-xs text-slate-500">({user.emergencyContact?.relationship})</span>
              </p>
              <p className="text-xs font-mono text-teal-700 font-semibold mt-0.5">{user.emergencyContact?.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSave} className="space-y-4 text-sm animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
              />
              {errors.fullName && <p className="text-xs text-rose-500 mt-0.5">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
              />
              {errors.phone && <p className="text-xs text-rose-500 mt-0.5">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-teal-500"
              />
              {errors.pincode && <p className="text-xs text-rose-500 mt-0.5">{errors.pincode}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
              />
              {errors.street && <p className="text-xs text-rose-500 mt-0.5">{errors.street}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Emergency Contact Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  className="px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="text"
                  placeholder="Relationship (e.g. Spouse)"
                  value={formData.emergencyRel}
                  onChange={(e) => setFormData({ ...formData, emergencyRel: e.target.value })}
                  className="px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="tel"
                  placeholder="24/7 Phone"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Save Details
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
