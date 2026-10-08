import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PatientDashboard } from '../components/patient/PatientDashboard';
import PageHeader from '../components/common/PageHeader';

export default function PatientPortalPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useAuth();

  const handleOpenAuthModal = () => {
    navigate('/auth?role=patient&mode=login');
  };

  const isVerifiedPatient = isAuthenticated && role === 'patient';

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Sleek Page Header with Brand Logo & Single Login Button */}
      <PageHeader
        breadcrumbs={[
          { label: 'Patient Emergency Portal' }
        ]}
        badge={isVerifiedPatient ? 'O-Negative Verified' : 'Patient Access'}
        badgeVariant="teal"
      />

      {/* Main Clinical Patient Dashboard */}
      <PatientDashboard onOpenAuthModal={handleOpenAuthModal} />
    </div>
  );
}
