import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthPortal from '../components/auth/AuthPortal';
import PageHeader from '../components/common/PageHeader';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roleParam = searchParams.get('role') || 'patient';
  const modeParam = searchParams.get('mode') || 'login';

  const handleSuccess = (roleKey) => {
    if (roleKey === 'pharmacy') {
      navigate('/pharmacy');
    } else if (roleKey === 'admin') {
      navigate('/admin');
    } else {
      navigate('/patient');
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <PageHeader
        breadcrumbs={[
          { label: 'Clinical Authentication Gateway' }
        ]}
        badge="HIPAA Verified"
        badgeVariant="teal"
      />
      <AuthPortal
        initialRole={roleParam}
        initialMode={modeParam}
        onSuccess={handleSuccess}
        onNavigateHome={() => navigate('/')}
        onNavigateSearch={() => navigate('/search')}
      />
    </div>
  );
}
