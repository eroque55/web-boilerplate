'use client';

import Shimmer from '@/components/ui/Shimmer';
import { useMe } from '@/hooks/api/user';

const Dashboard = () => {
  const { data: user, isLoading } = useMe();

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <Shimmer className="h-8 w-64 rounded-lg" />
      ) : (
        <h1 className="text-2xl font-semibold">
          {user ? `Olá, ${user.name}!` : 'Olá!'}
        </h1>
      )}

      <p className="text-sm text-gray-500">
        Comece a construir a partir daqui.
      </p>
    </div>
  );
};

export default Dashboard;
