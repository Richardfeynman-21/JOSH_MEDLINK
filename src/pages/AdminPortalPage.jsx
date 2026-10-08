import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import PageHeader from '../components/common/PageHeader';

export default function AdminPortalPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useAuth();

  const handleOpenAuthModal = () => {
    navigate('/auth?role=admin&mode=login');
  };

  const isVerifiedAdmin = isAuthenticated && role === 'admin';

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Sleek Page Header with Brand Logo & Single Login Button */}
      <PageHeader
        breadcrumbs={[
          { label: 'CDSCO & State Regulatory Console' }
        ]}
        badge={isVerifiedAdmin ? 'CDSCO Central Inspector' : 'Admin Authority'}
        badgeVariant="rose"
      />

      {/* Main Administrative Governance & Telemetry Console */}
      <AdminDashboard onOpenAuthModal={handleOpenAuthModal} />
    </div>
  );
}
