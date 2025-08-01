import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../../components/header';
import { CartProvider } from '../../components/cart-provider';
import '@testing-library/jest-dom';

// Mock the useCart hook as it's a dependency
vi.mock('../../components/cart-provider', async () => {
  const mod = await vi.importActual('../../components/cart-provider');
  return {
    ...(mod as object),
    useCart: () => ({
      items: [],
      totalItems: 3,
      totalPrice: 0,
      addItem: vi.fn(),
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      checkoutUrl: '',
    }),
  };
});

import { SearchProvider } from '../../components/search-provider';

describe('Header Component', () => {
  it('should render the logo and desktop navigation links', () => {
    render(
      <CartProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
      </CartProvider>
    );

    expect(screen.getByAltText('Mansa Gallery Logo')).toBeInTheDocument();
    // Use getAllByText for links that might appear in both desktop and mobile nav
    expect(screen.getAllByText(/chess pieces/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/print on demand/i)).toBeInTheDocument();
    expect(screen.getAllByText(/about/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/contact/i)[0]).toBeInTheDocument();
  });

  it('should open the mobile menu and show mobile links', async () => {
    render(
      <CartProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
      </CartProvider>
    );

    const menuButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(menuButton);

    // Wait for the sheet to open and find the links within it
    expect(await screen.findByText('Pan Afro Prints')).toBeInTheDocument();
    expect(await screen.findByText('Pan Afro Collectables')).toBeInTheDocument();
  });

  it('should toggle the mobile search bar on click', () => {
    render(
      <CartProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
      </CartProvider>
    );

    const searchButton = screen.getByLabelText(/search/i);
    
    // Initially, the mobile search bar is not visible
    expect(screen.queryByTestId('mobile-search')).not.toBeInTheDocument();

    fireEvent.click(searchButton);

    // After clicking, the mobile search bar should be visible
    const mobileSearch = screen.getByTestId('mobile-search');
    expect(mobileSearch).toBeInTheDocument();
    expect(within(mobileSearch).getByPlaceholderText(/search products/i)).toBeInTheDocument();

    // Click again to close it
    fireEvent.click(searchButton);
    expect(screen.queryByTestId('mobile-search')).not.toBeInTheDocument();
  });

  it('should render the cart with the correct number of items', () => {
    render(
      <CartProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
      </CartProvider>
    );

    expect(screen.getByText('3')).toBeInTheDocument(); // From the mocked useCart
  });
});
