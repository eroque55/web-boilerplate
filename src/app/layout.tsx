import '@/theme/global.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';

import { Providers } from '@/components/layout';
import { APP_DESCRIPTION, APP_NAME } from '@/constants/app';
import { STORAGE_KEYS } from '@/constants/storageKeys';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(STORAGE_KEYS.theme)};var t=localStorage.getItem(k);var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html suppressHydrationWarning className={inter.variable} lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>

      <body className="bg-light-background text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
