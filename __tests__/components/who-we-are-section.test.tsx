import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WhoWeAreSection from '../../components/who-we-are-section';
import * as shopify from '../../lib/shopify';
import '@testing-library/jest-dom';

vi.mock('../../lib/shopify');

const fetchCollectionMock = shopify.fetchCollection as jest.Mock;

describe('WhoWeAreSection Component', () => {
  it('should render the main heading and link', async () => {
    fetchCollectionMock.mockResolvedValue({
      products: {
        nodes: [],
      },
    });

    await render(await WhoWeAreSection());

    expect(screen.getByRole('heading', { name: /the legacy chess set/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /discover the legacy chess set/i })).toBeInTheDocument();
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

    await render(await WhoWeAreSection());

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should return null if the collection fails to fetch', async () => {
    fetchCollectionMock.mockResolvedValue(null);

    const { container } = await render(await WhoWeAreSection());
    expect(container.firstChild).toBeNull();
  });
});
