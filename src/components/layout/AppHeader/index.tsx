'use client';

import { Button } from '@/components/ui';
import { APP_NAME } from '@/constants/app';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/common';
import { useDefaultModal } from '@/store/defaultModalStore';

const AppHeader = () => {
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();
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
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {APP_NAME}
        </span>

        <div className="flex items-center gap-2.5">
          {user && (
            <span className="hidden text-sm text-neutral-500 sm:inline dark:text-neutral-400">
              {user.name}
            </span>
          )}

          <Button
            withoutDelay
            className="px-3 py-2"
            text="Tema"
            variant="neutral"
            onClick={toggleTheme}
          />

          <Button
            withoutDelay
            className="px-3 py-2"
            leftIcon={{ name: 'LogoutIcon' }}
            text="Sair"
            variant="neutral"
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
