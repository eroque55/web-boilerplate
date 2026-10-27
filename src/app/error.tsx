'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

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
      <Icon className="text-gray-500" name="WarningTriangleIcon" size={40} />

      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold">Algo deu errado.</p>

        <p className="text-sm text-gray-500">
          Não foi possível carregar esta página. Tente novamente.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          withoutDelay
          className="border border-gray-200"
          color="white"
          text="Voltar"
          onClick={() => router.back()}
        />

        <Button withoutDelay text="Tentar novamente" onClick={retry} />
      </div>
    </div>
  );
};

export default ErrorPage;
