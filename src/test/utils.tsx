import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { PropsWithChildren, ReactElement } from 'react';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

export const createWrapper = (queryClient = createTestQueryClient()) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
) => render(ui, { wrapper: createWrapper(), ...options });

export * from '@testing-library/react';
export { renderWithProviders as render, userEvent };
