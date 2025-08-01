import { vi } from 'vitest';

export const ShopifyData = vi.fn(async (query: string, variables: object = {}) => {
  if (query.includes('CollectionWithProducts')) {
    return {
      collectionByHandle: {
        id: '1',
        title: 'Test Collection',
        products: {
          nodes: [
            {
              id: 'prod1',
              title: 'The Chess Player',
              handle: 'the-chess-player',
              description: 'A beautiful painting.',
              featuredImage: {
                url: '/placeholder.jpg',
                altText: 'A placeholder image',
              },
              priceRange: {
                minVariantPrice: {
                  amount: '100.00',
                  currencyCode: 'USD',
                },
              },
            },
          ],
        },
      },
    };
  }
  if (query.includes('searchProducts')) {
    return {
      products: {
        edges: [
          {
            node: {
              id: 'prod1',
              title: 'The Chess Player',
              handle: 'the-chess-player',
              featuredImage: {
                url: '/placeholder.jpg',
                altText: 'A placeholder image',
              },
            },
          },
        ],
      },
    };
  }
  return {};
});
