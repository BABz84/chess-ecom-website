import { vi } from 'vitest';
import { webcrypto } from 'node:crypto';

// Polyfill WebCrypto API for Edge runtime tests
Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto,
  configurable: true,
});

// Set up environment variables for tests
process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = 'mock.myshopify.com';
process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'mock_token';
process.env.PIRATE_SHIP_API_KEY = 'mock_pirate_ship_key';

import '@testing-library/jest-dom';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} />;
  },
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '/',
}));
