import { LOGIN_ROUTE } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storageKeys';

import { getCookie, removeCookie, setCookie } from './cookies';

const PERSISTENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

type SessionTokens = {
  jwt: string;
  refreshToken?: string;
};

export const session = {
  getAccessToken: () => getCookie(STORAGE_KEYS.accessToken),

  getRefreshToken: () => getCookie(STORAGE_KEYS.refreshToken),

  hasSession: () =>
    Boolean(
      getCookie(STORAGE_KEYS.accessToken) ||
      getCookie(STORAGE_KEYS.refreshToken),
    ),

  start: ({ jwt, refreshToken }: SessionTokens, persist: boolean) => {
    const options = persist ? { maxAge: PERSISTENT_MAX_AGE_SECONDS } : {};

    setCookie(STORAGE_KEYS.accessToken, jwt, options);

    if (persist && refreshToken) {
      setCookie(STORAGE_KEYS.refreshToken, refreshToken, options);
    }
  },

  clear: () => {
    removeCookie(STORAGE_KEYS.accessToken);
    removeCookie(STORAGE_KEYS.refreshToken);
  },

  end: () => {
    removeCookie(STORAGE_KEYS.accessToken);
    removeCookie(STORAGE_KEYS.refreshToken);
    window.location.replace(LOGIN_ROUTE);
  },
};
