import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as shopify from '../lib/shopify';
import * as shopifyClient from '../lib/shopify-client';

vi.mock('../lib/shopify-client');

const ShopifyDataMock = shopifyClient.ShopifyData as jest.Mock;

describe('Shopify Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCollection', () => {
    it('should return collection data when successful', async () => {
      const mockCollection = { id: '1', title: 'Test Collection', products: { nodes: [] } };
      ShopifyDataMock.mockResolvedValue({ collectionByHandle: mockCollection });
      const collection = await shopify.fetchCollection('test-handle');
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), { handle: 'test-handle' });
      expect(collection).toEqual(mockCollection);
    });
  });

  describe('getCollection', () => {
    it('should return collection data when successful', async () => {
      const mockCollection = { id: '2', title: 'Another Collection' };
      ShopifyDataMock.mockResolvedValue({ collection: mockCollection });
      const collection = await shopify.getCollection('another-handle');
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), { handle: 'another-handle' });
      expect(collection).toEqual(mockCollection);
    });
  });

  describe('getAllProducts', () => {
    it('should handle pagination and return all products', async () => {
      ShopifyDataMock
        .mockResolvedValueOnce({
          products: {
            pageInfo: { hasNextPage: true, endCursor: 'cursor1' },
            edges: [{ node: { id: 'prod1' } }],
          },
        })
        .mockResolvedValueOnce({
          products: {
            pageInfo: { hasNextPage: false, endCursor: null },
            edges: [{ node: { id: 'prod2' } }],
          },
        });

      const products = await shopify.getAllProducts();
      expect(shopifyClient.ShopifyData).toHaveBeenCalledTimes(2);
      expect(products).toHaveLength(2);
      expect(products[0].node.id).toBe('prod1');
      expect(products[1].node.id).toBe('prod2');
    });
  });

  describe('getProduct', () => {
    it('should return a single product when successful', async () => {
      const mockProduct = { id: 'prod1', title: 'Test Product' };
      ShopifyDataMock.mockResolvedValue({ product: mockProduct });
      const product = await shopify.getProduct('test-product');
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), { handle: 'test-product' });
      expect(product).toEqual(mockProduct);
    });
  });

  describe('createCart', () => {
    it('should create a new cart with line items', async () => {
      const mockCart = { id: 'cart1', checkoutUrl: 'http://test.com' };
      ShopifyDataMock.mockResolvedValue({ cartCreate: { cart: mockCart, userErrors: [] } });
      const lineItems = [{ merchandiseId: 'var1', quantity: 1 }];
      const cart = await shopify.createCart(lineItems);
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), {
        input: { lines: lineItems },
      });
      expect(cart).toEqual(mockCart);
    });
  });

  describe('addCartLines', () => {
    it('should add line items to an existing cart', async () => {
      const mockCart = { id: 'cart1', checkoutUrl: 'http://test.com' };
      ShopifyDataMock.mockResolvedValue({ cartLinesAdd: { cart: mockCart, userErrors: [] } });
      const lineItems = [{ merchandiseId: 'var2', quantity: 2 }];
      const cart = await shopify.addCartLines('cart1', lineItems);
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), {
        cartId: 'cart1',
        lines: lineItems,
      });
      expect(cart).toEqual(mockCart);
    });
  });

  describe('removeCartLines', () => {
    it('should remove line items from an existing cart', async () => {
      const mockCart = { id: 'cart1', checkoutUrl: 'http://test.com' };
      ShopifyDataMock.mockResolvedValue({ cartLinesRemove: { cart: mockCart, userErrors: [] } });
      const lineIds = ['line1'];
      const cart = await shopify.removeCartLines('cart1', lineIds);
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), {
        cartId: 'cart1',
        lineIds,
      });
      expect(cart).toEqual(mockCart);
    });
  });

  describe('updateCartLines', () => {
    it('should update line items in an existing cart', async () => {
      const mockCart = { id: 'cart1', checkoutUrl: 'http://test.com' };
      ShopifyDataMock.mockResolvedValue({ cartLinesUpdate: { cart: mockCart, userErrors: [] } });
      const lineItems = [{ id: 'line1', quantity: 5 }];
      const cart = await shopify.updateCartLines('cart1', lineItems);
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), {
        cartId: 'cart1',
        lines: lineItems,
      });
      expect(cart).toEqual(mockCart);
    });
  });

  describe('searchProducts', () => {
    it('should return products based on a search term', async () => {
      const mockProducts = [{ node: { id: 'prod-search' } }];
      ShopifyDataMock.mockResolvedValue({ products: { edges: mockProducts } });
      const products = await shopify.searchProducts('search-term');
      expect(shopifyClient.ShopifyData).toHaveBeenCalledWith(expect.any(String), {
        searchTerm: 'title:search-term* OR product_type:search-term* OR vendor:search-term* OR tag:search-term*',
      });
      expect(products).toEqual(mockProducts);
    });
  });
});
