import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { env } from '@/env';
import { TLoginResponse } from '@/types/user';
import { session } from '@/utils/session';

type RetriableRequest = InternalAxiosRequestConfig & { retry?: boolean };

const REFRESH_URL = 'auth/refresh-token';
const PUBLIC_URLS = ['auth/local', REFRESH_URL];

const isPublicUrl = (url?: string) =>
  PUBLIC_URLS.some(publicUrl => url?.includes(publicUrl));

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

const requestNewAccessToken = async () => {
  const refreshToken = session.getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await api.post<TLoginResponse>(REFRESH_URL, {
      refreshToken,
    });
    session.start(data, true);
    return data.jwt;
  } catch {
    return null;
  }
};

let refreshPromise: Promise<string | null> | null = null;

// Concurrent 401s share a single in-flight refresh promise so rotating refresh
// tokens are never invalidated by parallel requests.
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
      return Promise.reject(new Error('Sem conexão com a internet!'));
    }

    const originalRequest = error.config as RetriableRequest | undefined;

    if (
      !originalRequest ||
      originalRequest.retry ||
      error.response?.status !== 401 ||
      isPublicUrl(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest.retry = true;
    const accessToken = await refreshAccessToken();

    if (!accessToken) {
      session.end();
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    return api(originalRequest);
  },
);
