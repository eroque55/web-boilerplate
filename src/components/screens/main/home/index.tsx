'use client';

import { Button, Shimmer } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { useDefaultModal } from '@/store/defaultModalStore';

const Home = () => {
  const { user, isLoading, logout } = useAuth();
  const { openModal } = useDefaultModal();

  const handleLogout = () => {
    openModal({
      type: 'error',
      title: 'Sair?',
      message: 'Tem certeza que deseja sair?',
      cancelText: 'Cancelar',
      confirmText: 'Sair',
      closeOnClickOutside: true,
      onConfirm: logout,
    });
  };

  return (
    <div
      className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800
        dark:bg-neutral-900"
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Bem-vindo
        </span>

        {isLoading ? (
          <Shimmer className="h-8 w-56 rounded-lg" />
        ) : (
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {user?.name ?? 'Usuário'}
          </h1>
        )}
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Comece a construir a partir daqui.
      </p>

      <div>
        <Button text="Sair" variant="danger" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Home;
