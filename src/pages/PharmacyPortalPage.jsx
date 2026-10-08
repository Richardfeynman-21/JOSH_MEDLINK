import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PharmacyDashboard } from '../components/pharmacy/PharmacyDashboard';
import PageHeader from '../components/common/PageHeader';

export default function PharmacyPortalPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useAuth();

  const handleOpenAuthModal = () => {
    navigate('/auth?role=pharmacy&mode=login');
  };

  const isVerifiedPharmacy = isAuthenticated && role === 'pharmacy';

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Sleek Page Header with Brand Logo & Single Login Button */}
      <PageHeader
        breadcrumbs={[
          { label: 'Pharmacy Dispensary Workstation' }
        ]}
        badge={isVerifiedPharmacy ? 'Dispensary ERP Online' : 'Station Access'}
        badgeVariant="emerald"
      />

      {/* Main Dispensary ERP & Stock Management Dashboard */}
      <PharmacyDashboard onOpenAuthModal={handleOpenAuthModal} />
    </div>
  );
}
