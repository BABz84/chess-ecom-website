import { Page } from '@playwright/test';

export const mockShopifyAPI = async (page: Page) => {
  await page.route('**/api/2025-07/graphql.json', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          products: {
            edges: [
              {
                node: {
                  id: 'gid://shopify/Product/1',
                  title: 'The Chess Player',
                  handle: 'the-chess-player',
                  description: 'A beautiful painting.',
                  priceRange: {
                    minVariantPrice: {
                      amount: '100.00',
                      currencyCode: 'USD',
                    },
                  },
                  images: {
                    edges: [
                      {
                        node: {
                          url: '/placeholder.svg',
                          altText: 'The Chess Player',
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      }),
    });
  });
};
