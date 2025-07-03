import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { getProductsInCollection, getProduct, getAllProducts, createCart } from '../lib/shopify';

describe('Shopify Service', () => {
  let fetchSpy: jest.SpiedFunction<typeof fetch>;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch products in a collection correctly', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        data: {
          collection: {
            products: {
              edges: [
                { node: { id: '1', title: 'Test Product 1' } },
                { node: { id: '2', title: 'Test Product 2' } },
              ],
            },
          },
        },
      }),
    } as Response);

    const products = await getProductsInCollection('test-collection');
    
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBe(2);
    expect(products[0].node.title).toBe('Test Product 1');
    
    // Verify that fetch was called with the correct Shopify URL
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('graphql.json'),
      expect.any(Object)
    );
  });

  it('should fetch a single product correctly', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        data: {
          product: { id: '1', title: 'Test Product 1' },
        },
      }),
    } as Response);

    const product = await getProduct('test-product');
    
    expect(product).not.toBeNull();
    expect(product.title).toBe('Test Product 1');
  });

  it('should fetch all product slugs correctly', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        data: {
          products: {
            edges: [
              { node: { handle: 'product-1' } },
              { node: { handle: 'product-2' } },
            ],
          },
        },
      }),
    } as Response);

    const slugs = await getAllProducts();
    
    expect(slugs).toBeInstanceOf(Array);
    expect(slugs.length).toBe(2);
    expect(slugs[0].node.handle).toBe('product-1');
  });

  it('should create a cart correctly', async () => {
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        data: {
          cartCreate: {
            cart: { id: 'cart-1', checkoutUrl: 'http://checkout.url' },
            userErrors: [],
          },
        },
      }),
    } as Response);

    const lineItems = [{ merchandiseId: '1', quantity: 1 }];
    const cart = await createCart(lineItems);
    
    expect(cart).not.toBeNull();
    expect(cart.id).toBe('cart-1');
    expect(cart.checkoutUrl).toBe('http://checkout.url');
  });
});
