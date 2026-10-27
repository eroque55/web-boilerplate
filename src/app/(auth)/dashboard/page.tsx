import type { Metadata } from 'next';

import ClientOnly from '@/components/layout/ClientOnly';
import Dashboard from '@/components/pages/Dashboard';

export const metadata: Metadata = {
  title: 'Início',
};

const DashboardPage = () => {
  return (
    <ClientOnly>
      <Dashboard />
    </ClientOnly>
  );
};

export default DashboardPage;
