import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    react(),
    // Mesmo comportamento do @svgr/webpack no Next: `import Icon from './x.svg'` vira componente.
    svgr({ include: '**/*.svg', svgrOptions: { exportType: 'default' } }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    env: {
      NEXT_PUBLIC_API_URL: 'http://localhost/api',
    },
  },
});
