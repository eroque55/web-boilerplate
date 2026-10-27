'use client';

import '@/styles/global.css';

import { useEffect } from 'react';

import Button from '@/components/ui/Button';

type Props = {
  error: unknown;
  retry: () => void;
};

// Substitui o layout raiz quando ele próprio quebra: precisa do seu <html>/<body>.
const GlobalError = ({ error, retry }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center antialiased">
        <title>Algo deu errado</title>

        <p className="text-base font-semibold">Algo deu errado.</p>

        <Button withoutDelay text="Tentar novamente" onClick={retry} />
      </body>
    </html>
  );
};

export default GlobalError;
