import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GET } from '../../app/api/products/search/route';
import { searchProducts } from '../../lib/shopify';

vi.mock('../../lib/shopify');

const searchProductsMock = searchProducts as jest.Mock;

describe('API Route: /api/products/search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return search results for a given term', async () => {
    const mockProducts = [{ id: '1', title: 'Searched Product' }];
    searchProductsMock.mockResolvedValue(mockProducts);

    const request = new Request('http://localhost/api/products/search?query=test');
    const response = await GET(request);

    expect(searchProducts).toHaveBeenCalledWith('test');
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ products: mockProducts });
  });

  it('should return a 500 error if fetching fails', async () => {
    searchProductsMock.mockRejectedValue(new Error('API Error'));

    const request = new Request('http://localhost/api/products/search?query=test');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body).toEqual({ error: 'Failed to search products' });
  });

  it('should return a 400 error if the search term is missing', async () => {
    const request = new Request('http://localhost/api/products/search');
    const response = await GET(request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toEqual({ error: 'Query parameter is required' });
  });
});
