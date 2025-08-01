import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrintifyShowcase from '../../components/printify-showcase';
import * as shopify from '../../lib/shopify';
import '@testing-library/jest-dom';

vi.mock('../../lib/shopify');

const fetchCollectionMock = shopify.fetchCollection as jest.Mock;

describe('PrintifyShowcase Component', () => {
  it('should render the main heading and button', async () => {
    fetchCollectionMock.mockResolvedValue({
      products: {
        nodes: [],
      },
    });

    await render(await PrintifyShowcase({ collectionHandle: 'test' }));

    expect(screen.getByRole('heading', { name: /print on demand apparel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shop print on demand apparel/i })).toBeInTheDocument();
  });

  it('should render product cards for each product in the collection', async () => {
    const mockProducts = [
      { id: '1', title: 'Product 1', handle: 'p1', description: '', tags: [], featuredImage: { url: '', altText: '' }, images: { nodes: [] }, options: [], priceRange: { minVariantPrice: { amount: '', currencyCode: '' } }, variants: { nodes: [] } },
      { id: '2', title: 'Product 2', handle: 'p2', description: '', tags: [], featuredImage: { url: '', altText: '' }, images: { nodes: [] }, options: [], priceRange: { minVariantPrice: { amount: '', currencyCode: '' } }, variants: { nodes: [] } },
    ];
    fetchCollectionMock.mockResolvedValue({
      products: {
        nodes: mockProducts,
      },
    });

    await render(await PrintifyShowcase({ collectionHandle: 'test' }));

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should return null if the collection fails to fetch', async () => {
    fetchCollectionMock.mockResolvedValue(null);

    const { container } = await render(await PrintifyShowcase({ collectionHandle: 'test' }));
    expect(container.firstChild).toBeNull();
  });
});
