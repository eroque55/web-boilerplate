import type { Metadata } from 'next';

import Dashboard from '@/components/pages/Dashboard';

export const metadata: Metadata = {
  title: 'Início',
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
