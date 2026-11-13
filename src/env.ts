import { createEnv } from '@t3-oss/env-nextjs';

import z from './validation/zod';

export const env = createEnv({
  server: {
    LOCAL_IP: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.url().default('http://localhost:3333'),
  },
  runtimeEnv: {
    LOCAL_IP: process.env.LOCAL_IP,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
