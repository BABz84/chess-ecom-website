import { fetchCollection, getProduct, getAllProducts, getCollection } from '../lib/shopify';
import { vi, describe, it, expect } from 'vitest';

// Mock the entire shopify module
vi.mock('../lib/shopify', async () => {
  const actual = await vi.importActual('../lib/shopify');
  return {
    ...actual,
    ShopifyData: vi.fn(),
  };
});

const { ShopifyData } = await import('../lib/shopify');

describe('Shopify Service', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCollection', () => {
    it('should return collection data when successful', async () => {
      const mockCollection = {
        id: '1',
        title: 'Test Collection',
        products: { nodes: [] },
      };
      (ShopifyData as any).mockResolvedValue({ collectionByHandle: mockCollection });

      const collection = await fetchCollection('test-handle');

      expect(ShopifyData).toHaveBeenCalledWith(expect.any(String), { handle: 'test-handle' }, 'no-store');
      expect(collection).toEqual(mockCollection);
    });

    it('should throw an error if the API call fails', async () => {
      (ShopifyData as any).mockRejectedValue(new Error('API Error'));
      await expect(fetchCollection('test-handle')).rejects.toThrow('Products not fetched');
    });

    it('should be called with no-store cache policy', async () => {
      const mockCollection = { id: '1', title: 'Test Collection', products: { nodes: [] } };
      (ShopifyData as any).mockResolvedValue({ collectionByHandle: mockCollection });

      await fetchCollection('test-handle');

      // Get the last call to ShopifyData and inspect its arguments
      const lastCallArgs = (ShopifyData as any).mock.calls[0];
      const cachePolicy = lastCallArgs[2];

      // Assert that the cache policy is 'no-store'
      expect(cachePolicy).toBe('no-store');
    });
  });

  describe('getCollection', () => {
    it('should return collection data when successful', async () => {
      const mockCollection = { id: '2', title: 'Another Collection' };
      (ShopifyData as any).mockResolvedValue({ collection: mockCollection });

      const collection = await getCollection('another-handle');
      expect(ShopifyData).toHaveBeenCalledWith(expect.any(String), { handle: 'another-handle' });
      expect(collection).toEqual(mockCollection);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products when successful', async () => {
      const mockProducts = { products: { edges: [{ node: { id: 'prod1' } }] } };
      (ShopifyData as any).mockResolvedValue(mockProducts);

      const products = await getAllProducts();
      expect(ShopifyData).toHaveBeenCalledWith(expect.any(String));
      expect(products).toEqual(mockProducts.products.edges);
    });
  });

  describe('getProduct', () => {
    it('should return a single product when successful', async () => {
      const mockProduct = { id: 'prod1', title: 'Test Product' };
      (ShopifyData as any).mockResolvedValue({ product: mockProduct });

      const product = await getProduct('test-product');
      expect(ShopifyData).toHaveBeenCalledWith(expect.any(String), { handle: 'test-product' });
      expect(product).toEqual(mockProduct);
    });
  });
});
