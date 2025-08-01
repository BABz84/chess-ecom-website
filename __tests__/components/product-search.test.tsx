import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ProductSearch from '../../components/product-search';
import { useSearch } from '../../components/search-provider';
import '@testing-library/jest-dom';

// Mock the useSearch hook
vi.mock('../../components/search-provider');

// Mock lodash itself to control the debounce function
vi.mock('lodash', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lodash')>();
  return {
    ...actual,
    // Replace debounce with a function that immediately calls the passed function
    debounce: (fn: (...args: any[]) => any) => fn,
  };
});

const mockSearch = vi.fn();

describe('ProductSearch Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSearch.mockClear();
    (useSearch as jest.Mock).mockReturnValue({ search: mockSearch });
  });

  it('should render the search input', () => {
    render(<ProductSearch />);
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
  });

  it('should call the search function immediately on type (due to mocked debounce)', async () => {
    const user = userEvent.setup();
    mockSearch.mockResolvedValue([]); // Ensure search resolves to an array
    render(<ProductSearch />);
    const searchInput = screen.getByPlaceholderText(/search products/i);

    await user.type(searchInput, 'test');
    
    // With the mocked debounce, this should be called directly
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('test');
    });
  });

  it('should display search results', async () => {
    const user = userEvent.setup();
    const mockResults = [
      { id: '1', title: 'Result 1', handle: 'r1', featuredImage: { url: '', altText: '' } },
    ];
    mockSearch.mockResolvedValue(mockResults);

    render(<ProductSearch />);
    const searchInput = screen.getByPlaceholderText(/search products/i);

    await user.type(searchInput, 'result');

    // Wait for the results to appear
    expect(await screen.findByText('Result 1')).toBeInTheDocument();
  });

  it('should not call search if query is too short', async () => {
    const user = userEvent.setup();
    render(<ProductSearch />);
    const searchInput = screen.getByPlaceholderText(/search products/i);

    await user.type(searchInput, 'a');

    // Search should not have been called because of the length check in the component
    expect(mockSearch).not.toHaveBeenCalled();
    
    // No results should be visible
    expect(screen.queryByText(/result/i)).not.toBeInTheDocument();
  });
});
