import { LOGIN_ROUTE } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storageKeys';
import { TAuthTokens } from '@/types/auth';

import { getCookie, removeCookie, setCookie } from './cookies';

const REMEMBER_ME_MAX_AGE_IN_SECONDS = 60 * 60 * 24 * 30;

// Tokens ficam em cookies (e não no localStorage) para o src/proxy.ts conseguir
// redirecionar antes de renderizar. Os dados do usuário nunca são persistidos:
// vêm sempre da API (useMe).
export const session = {
  getAccessToken: () => getCookie(STORAGE_KEYS.accessToken),

  getRefreshToken: () => getCookie(STORAGE_KEYS.refreshToken),

  start: ({ accessToken, refreshToken }: TAuthTokens, rememberMe: boolean) => {
    const options = rememberMe
      ? { maxAge: REMEMBER_ME_MAX_AGE_IN_SECONDS }
      : {};

    setCookie(STORAGE_KEYS.accessToken, accessToken, options);

    if (rememberMe && refreshToken) {
      setCookie(STORAGE_KEYS.refreshToken, refreshToken, options);
    }
  },

  // Navegação completa (e não router.replace): zera de uma vez o cache do
  // React Query, as stores do Zustand e o Router Cache do Next.
  end: () => {
    removeCookie(STORAGE_KEYS.accessToken);
    removeCookie(STORAGE_KEYS.refreshToken);
    window.location.replace(LOGIN_ROUTE);
  },
};
