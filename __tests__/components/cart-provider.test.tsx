import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../../components/cart-provider';
import * as shopify from '../../lib/shopify';
import '@testing-library/jest-dom';

// Mock the Shopify client functions
vi.mock('../../lib/shopify');

const createCartMock = shopify.createCart as jest.Mock;
const addCartLinesMock = shopify.addCartLines as jest.Mock;
const removeCartLinesMock = shopify.removeCartLines as jest.Mock;
const updateCartLinesMock = shopify.updateCartLines as jest.Mock;

// A simple test component to consume the cart context
const TestComponent = () => {
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  return (
    <div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="total-price">{totalPrice}</div>
      <button onClick={() => addItem({ id: '1', title: 'Test Item', price: 10, image: '', merchandiseId: 'm-1', lineId: 'l-1' })}>Add</button>
      <button onClick={() => removeItem('1')}>Remove</button>
      <button onClick={() => updateQuantity('1', 5)}>Update</button>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.title} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

describe('CartProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it('should add an item to a new cart', async () => {
    createCartMock.mockResolvedValue({
      id: 'cart-1',
      checkoutUrl: 'http://checkout.url',
      lines: { nodes: [{ id: 'line-1', merchandise: { id: 'm-1' } }] },
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add');
    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(createCartMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Test Item - 1')).toBeInTheDocument();
    expect(screen.getByTestId('total-items').textContent).toBe('1');
    expect(screen.getByTestId('total-price').textContent).toBe('10');
  });

  it('should remove an item from the cart', async () => {
    // First, add an item
    createCartMock.mockResolvedValue({
      id: 'cart-1',
      checkoutUrl: 'http://checkout.url',
      lines: { nodes: [{ id: 'line-1', merchandise: { id: 'm-1' } }] },
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add');
    await act(async () => {
      fireEvent.click(addButton);
    });

    // Now, remove it
    const removeButton = screen.getByText('Remove');
    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(removeCartLinesMock).toHaveBeenCalledWith('cart-1', ['line-1']);
    expect(screen.queryByText('Test Item - 1')).not.toBeInTheDocument();
    expect(screen.getByTestId('total-items').textContent).toBe('0');
    expect(screen.getByTestId('total-price').textContent).toBe('0');
  });

  it('should update an item quantity', async () => {
    // First, add an item
    createCartMock.mockResolvedValue({
      id: 'cart-1',
      checkoutUrl: 'http://checkout.url',
      lines: { nodes: [{ id: 'line-1', merchandise: { id: 'm-1' } }] },
    });

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add');
    await act(async () => {
      fireEvent.click(addButton);
    });

    // Now, update it
    const updateButton = screen.getByText('Update');
    await act(async () => {
      fireEvent.click(updateButton);
    });

    expect(updateCartLinesMock).toHaveBeenCalledWith('cart-1', [{ id: 'line-1', quantity: 5 }]);
    expect(screen.getByText('Test Item - 5')).toBeInTheDocument();
    expect(screen.getByTestId('total-items').textContent).toBe('5');
    expect(screen.getByTestId('total-price').textContent).toBe('50');
  });

  it('should load cart from localStorage on initial render', () => {
    const mockCart = {
      items: [{ id: '1', title: 'Stored Item', price: 20, quantity: 2, image: '', merchandiseId: 'm-1', lineId: 'line-1' }],
      cartId: 'cart-stored',
      checkoutUrl: 'http://stored.url',
    };
    window.localStorage.setItem('cart', JSON.stringify(mockCart));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByText('Stored Item - 2')).toBeInTheDocument();
    expect(screen.getByTestId('total-items').textContent).toBe('2');
    expect(screen.getByTestId('total-price').textContent).toBe('40');
  });
});
