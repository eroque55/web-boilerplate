import { createEnv } from '@t3-oss/env-nextjs';

// Import relativo (e não `@/`): este arquivo também é carregado pelo next.config.ts.
import z from './validations/zod';

export const env = createEnv({
  server: {
    LOCAL_IP: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.url(),
  },
  runtimeEnv: {
    LOCAL_IP: process.env.LOCAL_IP,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
