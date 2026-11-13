import { PropsWithChildren } from 'react';

import { AppHeader } from '@/components/layout';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
