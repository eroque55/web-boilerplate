import { PropsWithChildren } from 'react';

import AppHeader from '@/components/layout/AppHeader';

const AuthLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
