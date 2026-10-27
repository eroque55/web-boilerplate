import { isServer, MutationCache, QueryClient } from '@tanstack/react-query';

import handleError from '@/utils/handleToast';

const makeQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: handleError,
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        mutation.meta?.invalidateQueries?.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      },
    }),
  });

  return queryClient;
};

let browserQueryClient: QueryClient | undefined;

// No servidor cada request ganha um client novo (cache nunca vaza entre
// usuários); no browser o client é único e sobrevive aos re-renders.
export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};
