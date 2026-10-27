'use client';

import { PropsWithChildren, ReactNode, useSyncExternalStore } from 'react';

type Props = {
  fallback?: ReactNode;
};

const subscribe = () => () => {};

// Renderiza os filhos só depois da hidratação. Os dados vêm do React Query no
// cliente: um componente que hidratasse depois de outro já ter buscado a mesma
// query renderizaria dados que o HTML do servidor não tinha (hydration mismatch).
const ClientOnly = ({
  fallback = null,
  children,
}: PropsWithChildren<Props>) => {
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return isHydrated ? children : fallback;
};

export default ClientOnly;
