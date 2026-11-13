import type { Metadata } from 'next';

import { ClientOnly } from '@/components/layout';
import Home from '@/components/screens/main/home';

export const metadata: Metadata = {
  title: 'Início',
};

const HomePage = () => {
  return (
    <ClientOnly>
      <Home />
    </ClientOnly>
  );
};

export default HomePage;
