import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '../../components/product-card';
import { Product } from '../../lib/types';
import '@testing-library/jest-dom';

describe('ProductCard Component', () => {
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
    options: [],
    priceRange: {
      minVariantPrice: {
        amount: '19.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      nodes: [],
    },
  };

  it('should render the product title', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should render the product image with the correct alt text', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('placeholder.jpg'));
    expect(image).toHaveAttribute('alt', 'A placeholder image');
  });
});
