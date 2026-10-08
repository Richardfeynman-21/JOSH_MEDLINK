import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import LoadingFallback from '../components/common/LoadingFallback';

// Core multipage routes with code-splitting
const HomePage = lazy(() => import('../pages/HomePage'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const MedicineDetailPage = lazy(() => import('../pages/MedicineDetailPage'));
const PrescriptionScanPage = lazy(() => import('../pages/PrescriptionScanPage'));
const EmergencyProtocolPage = lazy(() => import('../pages/EmergencyProtocolPage'));
const PatientPortalPage = lazy(() => import('../pages/PatientPortalPage'));
const PharmacyPortalPage = lazy(() => import('../pages/PharmacyPortalPage'));
const AdminPortalPage = lazy(() => import('../pages/AdminPortalPage'));
const AuthPage = lazy(() => import('../pages/AuthPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Multipage Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="medicine/:id" element={<MedicineDetailPage />} />
        <Route path="ocr-scanner" element={<PrescriptionScanPage />} />
        <Route path="emergency" element={<EmergencyProtocolPage />} />

        {/* Dedicated Operating Portals */}
        <Route path="patient" element={<PatientPortalPage />} />
        <Route path="pharmacy" element={<PharmacyPortalPage />} />
        <Route path="admin" element={<AdminPortalPage />} />

        {/* Dedicated Authentication Portal (Separate Page) */}
        <Route path="auth" element={<AuthPage />} />

        {/* Legacy redirect aliases */}
        <Route path="login" element={<Navigate to="/auth" replace />} />
        <Route path="register" element={<Navigate to="/auth?mode=register" replace />} />

        {/* 404 Unmatched Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
