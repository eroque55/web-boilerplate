import { isServer, MutationCache, QueryClient } from '@tanstack/react-query';

import { useDefaultModal } from '@/store/defaultModalStore';
import { handleError } from '@/utils/handleError';

export const makeQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: error => {
          useDefaultModal.getState().openModal({
            type: 'error',
            title: 'Ops!',
            message: handleError(error),
            confirmText: 'Fechar',
            closeOnClickOutside: true,
          });
        },
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        if (mutation.meta?.invalidateQueries) {
          void queryClient.invalidateQueries({
            queryKey: mutation.meta.invalidateQueries,
          });
        }
      },
    }),
  });

  return queryClient;
};

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};
