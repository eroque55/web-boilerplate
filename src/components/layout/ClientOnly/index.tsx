'use client';

import { PropsWithChildren, ReactNode, useSyncExternalStore } from 'react';

type Props = {
  fallback?: ReactNode;
};

const subscribe = () => () => {};

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
