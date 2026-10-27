'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import DefaultModal from '@/components/ui/DefaultModal';

import { getQueryClient } from './queryClient';

setDefaultOptions({ locale: ptBR });

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <DefaultModal />

      <ToastContainer />

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Providers;
