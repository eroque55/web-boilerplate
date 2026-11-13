'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button, Icon } from '@/components/ui';

type Props = {
  error: unknown;
  retry: () => void;
};

const ErrorPage = ({ error, retry }: Props) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Icon className="text-neutral-400" name="WarningTriangleIcon" size={40} />

      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Algo deu errado.
        </p>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Não foi possível carregar esta página. Tente novamente.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          withoutDelay
          text="Voltar"
          variant="neutral"
          onClick={() => router.back()}
        />

        <Button withoutDelay text="Tentar novamente" onClick={retry} />
      </div>
    </div>
  );
};

export default ErrorPage;
