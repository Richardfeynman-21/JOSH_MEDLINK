import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MedicineSearchMain from '../components/search/MedicineSearchMain';
import PageHeader from '../components/common/PageHeader';
import { Scan, Flame } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const headerActions = (
    <div className="flex items-center gap-1.5">
      <Link
        to="/ocr-scanner"
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-colors"
      >
        <Scan className="w-3.5 h-3.5 text-teal-600" />
        <span className="hidden sm:inline">Rx Scanner</span>
      </Link>
      <Link
        to="/emergency"
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-colors"
      >
        <Flame className="w-3.5 h-3.5 text-rose-600" />
        <span className="hidden sm:inline">108 SOS</span>
      </Link>
    </div>
  );

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Sleek Page Header with Brand Logo & Single Login Button */}
      <PageHeader
        breadcrumbs={[
          { label: 'Medicine Search', href: '/search' },
          ...(queryParam ? [{ label: `"${queryParam}"` }] : [])
        ]}
        badge="Live CDSCO Stock"
        badgeVariant="teal"
        actions={headerActions}
      />

      {/* Main Medicine Search Engine */}
      <MedicineSearchMain initialQuery={queryParam} />
    </div>
  );
}
