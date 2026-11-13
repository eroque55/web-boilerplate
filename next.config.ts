import type { NextConfig } from 'next';

import { env } from './src/env';

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: env.LOCAL_IP ? [env.LOCAL_IP] : undefined,
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  reactCompiler: true,
  typedRoutes: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  logging: {
    browserToTerminal: 'warn',
    fetches: {
      fullUrl: true,
    },
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  headers: () =>
    Promise.resolve([{ source: '/:path*', headers: SECURITY_HEADERS }]),
};

export default nextConfig;
