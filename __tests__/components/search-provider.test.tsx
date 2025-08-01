import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchProvider, useSearch } from '../../components/search-provider';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { Product } from '../../lib/types';

// Mock the global fetch function
global.fetch = vi.fn();

const TestComponent = () => {
  const { search } = useSearch();
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = async () => {
    const res = await search('test');
    setResults(res);
  };

  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((r: Product) => <li key={r.id}>{r.title}</li>)}
      </ul>
    </div>
  );
};

describe('SearchProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and return search results', async () => {
    const mockProducts = [{ node: { id: '1', title: 'Test Product' } }];
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ products: mockProducts }),
    });

    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    await act(async () => {
      screen.getByText('Search').click();
    });

    expect(fetch).toHaveBeenCalledWith('/api/products/search?query=test');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should return an empty array if the search fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    await act(async () => {
      screen.getByText('Search').click();
    });

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });
});
