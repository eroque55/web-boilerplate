'use client';

import Button from '@/components/ui/Button';
import { APP_NAME } from '@/constants/app';
import { useMe } from '@/hooks/api/user';
import { useAuth } from '@/hooks/useAuth';

const AppHeader = () => {
  const { data: user } = useMe();
  const { logout } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="text-lg font-semibold">{APP_NAME}</span>

        <div className="flex items-center gap-3">
          {user && <span className="text-sm text-gray-500">{user.name}</span>}

          <Button
            withoutDelay
            className="border border-gray-200 px-3 py-2"
            color="white"
            leftIcon={{ name: 'LogoutIcon' }}
            text="Sair"
            onClick={logout}
          />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
