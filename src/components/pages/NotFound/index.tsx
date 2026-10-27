'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { HOME_ROUTE } from '@/constants/routes';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon name="MagnifyingGlassIcon" size={28} />
      </div>

      <p className="text-7xl font-bold text-primary">404</p>

      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold">Página não encontrada</p>

        <p className="text-sm text-gray-500">
          O conteúdo que você procura não existe ou foi movido.
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

        <Button
          withoutDelay
          text="Ir para o início"
          onClick={() => router.push(HOME_ROUTE)}
        />
      </div>
    </div>
  );
};

export default NotFound;
