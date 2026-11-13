'use client';

import '@/theme/global.css';

import { useEffect } from 'react';

import { Button } from '@/components/ui';

type Props = {
  error: unknown;
  retry: () => void;
};

// Replaces the root layout when the root layout itself fails; must render its own <html>/<body>.
const GlobalError = ({ error, retry }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-light-background px-4 text-center
          text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100"
      >
        <title>Algo deu errado</title>

        <p className="text-base font-semibold">Algo deu errado.</p>

        <Button withoutDelay text="Tentar novamente" onClick={retry} />
      </body>
    </html>
  );
};

export default GlobalError;
