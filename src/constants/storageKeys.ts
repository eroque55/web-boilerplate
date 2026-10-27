import { APP_NAME } from './app';

// Prefixo com o nome do app: cookies de localhost são compartilhados entre
// portas, então dois projetos rodando local não sobrescrevem a sessão um do outro.
export const STORAGE_KEYS = {
  accessToken: `${APP_NAME}.accessToken`,
  refreshToken: `${APP_NAME}.refreshToken`,
} as const;
