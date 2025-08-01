import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductDetail from '../../components/product-detail';
import { Product } from '../../lib/types';
import '@testing-library/jest-dom';
import { CartProvider } from '../../components/cart-provider';
import { act } from 'react';

describe('ProductDetail Component', () => {
  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    handle: 'test-product',
    description: 'A test product',
    descriptionHtml: '<p>A test product</p>',
    tags: ['test'],
    featuredImage: {
      url: '/placeholder.jpg',
      altText: 'A placeholder image',
    },
    images: {
      nodes: [],
    },
    options: [
      {
        name: 'Size',
        values: ['Small', 'Medium', 'Large'],
      },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '19.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      nodes: [
        {
          id: '1',
          title: 'Default Title',
          quantityAvailable: 10,
          availableForSale: true,
          selectedOptions: [],
          price: {
            amount: '19.99',
            currencyCode: 'USD',
          },
          compareAtPrice: null,
        },
      ],
    },
  };

  it('should render the product title, description, and price', () => {
    act(() => {
      render(
        <CartProvider>
          <ProductDetail product={mockProduct} />
        </CartProvider>
      );
    });
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });
});
