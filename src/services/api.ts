import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { env } from '@/env';
import { TAuthTokens } from '@/types/auth';
import { session } from '@/utils/session';

type TRetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };

const REFRESH_URL = 'auth/refresh';
const PUBLIC_URLS = ['auth/login', REFRESH_URL];

const isPublicUrl = (url?: string) =>
  PUBLIC_URLS.some(publicUrl => url?.includes(publicUrl));

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

const requestNewAccessToken = async () => {
  const refreshToken = session.getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await api.post<TAuthTokens>(REFRESH_URL, {
      refreshToken,
    });
    session.start(data, true);
    return data.accessToken;
  } catch {
    return null;
  }
};

let refreshPromise: Promise<string | null> | null = null;

// Várias requisições podem tomar 401 ao mesmo tempo: todas aguardam o mesmo
// refresh em vez de disparar um por requisição.
const refreshAccessToken = () => {
  refreshPromise ??= requestNewAccessToken().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};

api.interceptors.request.use(config => {
  const accessToken = session.getAccessToken();

  if (accessToken && !isPublicUrl(config.url)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.code === AxiosError.ERR_NETWORK) {
      return Promise.reject(
        new Error('Erro de conexão! Verifique sua internet.'),
      );
    }

    const originalRequest = error.config as TRetriableRequest | undefined;

    if (
      !originalRequest ||
      originalRequest._retry ||
      error.response?.status !== 401 ||
      isPublicUrl(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const accessToken = await refreshAccessToken();

    if (!accessToken) {
      session.end();
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return api(originalRequest);
  },
);

export default api;
