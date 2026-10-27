/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { TQueryKey } from '@/constants/queryKeys';

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: TQueryKey;
    mutationMeta: { invalidateQueries?: TQueryKey[] };
  }
}
