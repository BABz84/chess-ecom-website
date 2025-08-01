import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Cart from '../../components/cart';
import '@testing-library/jest-dom';

// Mock the useCart hook
vi.mock('../../components/cart-provider', () => ({
  useCart: () => ({
    items: [
      {
        id: '1',
        quantity: 2,
        title: 'Test Product 1',
        price: 10.00,
        image: '/placeholder.svg',
        merchandise: {
          product: {
            title: 'Test Product 1',
          },
          price: {
            amount: '10.00',
          },
        },
      },
    ],
    totalItems: 2,
    totalPrice: 20.00,
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
  }),
}));

describe('Cart Component', () => {
  it('should render cart items and total after opening', async () => {
    render(<Cart />);

    // The cart is initially closed, so we need to open it
    const cartButton = screen.getByRole('button', { name: /open cart/i });
    fireEvent.click(cartButton);

    // Now that the sheet is open, we can find the elements
    const cartItem = await screen.findByTestId('cart-item-1');
    expect(cartItem).toBeInTheDocument();

    // Check for the quantity within the specific cart item
    const quantity = within(cartItem).getByText('2');
    expect(quantity).toBeInTheDocument();

    expect(screen.getByText('$20.00')).toBeInTheDocument(); // Subtotal
  });
});
