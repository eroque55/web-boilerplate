import '@/styles/global.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import Providers from '@/components/layout/Providers';
import { APP_DESCRIPTION, APP_NAME } from '@/constants/app';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body className="bg-bg antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
