import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.tsx',
    include: ['__tests__/**/*.test.ts', '__tests__/**/*.test.tsx'],
    exclude: ['node_modules', 'e2e/**'],
    env: {
      NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: 'mock.myshopify.com',
      NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: 'mock_token',
      PIRATE_SHIP_API_KEY: 'mock_pirate_ship_key',
    },
  },
});
