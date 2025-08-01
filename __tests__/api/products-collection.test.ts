import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GET } from '../../app/api/products/[collection]/route';
import * as shopify from '../../lib/shopify';
import { NextResponse } from 'next/server';

vi.mock('../../lib/shopify');

describe('API Route: /api/products/[collection]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return products for a collection', async () => {
    const mockProducts = { products: [{ id: '1', title: 'Test Product' }] };
    vi.spyOn(shopify, 'fetchCollection').mockResolvedValue(mockProducts);

    const request = new Request('http://localhost/api/products/test-collection');
    const response = await GET(request, { params: Promise.resolve({ collection: 'test-collection' }) });

    expect(shopify.fetchCollection).toHaveBeenCalledWith('test-collection');
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual(mockProducts);
  });

  it('should return a 500 error if fetching fails', async () => {
    vi.spyOn(shopify, 'fetchCollection').mockRejectedValue(new Error('API Error'));

    const request = new Request('http://localhost/api/products/test-collection');
    const response = await GET(request, { params: Promise.resolve({ collection: 'test-collection' }) });

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body).toEqual({ error: 'Failed to fetch products' });
  });
});
