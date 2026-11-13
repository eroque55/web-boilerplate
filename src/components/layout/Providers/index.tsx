'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PropsWithChildren } from 'react';

import { DefaultModal } from '@/components/ui';
import { AuthProvider } from '@/contexts/AuthContext';
import { getQueryClient } from '@/services/queryClient';

setDefaultOptions({ locale: ptBR });

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}

        <DefaultModal />
      </AuthProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
