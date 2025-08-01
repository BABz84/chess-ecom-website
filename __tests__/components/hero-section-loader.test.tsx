import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroSectionLoader from '../../components/hero-section-loader';
import * as shopify from '../../lib/shopify';
import '@testing-library/jest-dom';

// Mock the shopify fetch function
vi.mock('../../lib/shopify');
const fetchCollectionMock = shopify.fetchCollection as jest.Mock;

// Mock the child component to inspect its props
vi.mock('../../components/hero-section', () => ({
  default: (props: { heroProducts: any[] }) => (
    <div data-testid="hero-section">
      {props.heroProducts.map(p => <div key={p.id}>{p.title}</div>)}
    </div>
  ),
}));

describe('HeroSectionLoader Component', () => {
  it('should fetch data and pass it to HeroSection', async () => {
    const mockProducts = [
      { id: '1', title: 'Loaded Product 1' },
      { id: '2', title: 'Loaded Product 2' },
    ];
    fetchCollectionMock.mockResolvedValue({
      products: {
        nodes: mockProducts,
      },
    });

    await render(await HeroSectionLoader());

    expect(fetchCollectionMock).toHaveBeenCalledWith('hero-carousel');
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByText('Loaded Product 1')).toBeInTheDocument();
    expect(screen.getByText('Loaded Product 2')).toBeInTheDocument();
  });

  it('should pass an empty array to HeroSection if fetching fails', async () => {
    fetchCollectionMock.mockResolvedValue(null);

    await render(await HeroSectionLoader());

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.queryByText(/loaded product/i)).not.toBeInTheDocument();
  });
});
