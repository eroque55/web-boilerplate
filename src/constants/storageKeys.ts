import { APP_NAME } from './app';

export const STORAGE_KEYS = {
  accessToken: `${APP_NAME}.accessToken`,
  refreshToken: `${APP_NAME}.refreshToken`,
  theme: `${APP_NAME}.theme`,
} as const;
