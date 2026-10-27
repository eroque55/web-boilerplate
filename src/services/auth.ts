import { TAuthTokens, TLoginPayload } from '@/types/auth';

import api from './api';

// Ajuste rotas e formato da resposta ao contrato do backend do projeto.
export const authService = {
  login: async (payload: TLoginPayload): Promise<TAuthTokens> => {
    const { data } = await api.post<TAuthTokens>('auth/login', payload);
    return data;
  },
};
