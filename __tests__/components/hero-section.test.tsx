import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroSection from '../../components/hero-section';
import '@testing-library/jest-dom';

// Mock the HeroCarousel child component
vi.mock('../../components/hero-carousel', () => ({
  default: (props: { heroProducts: any[] }) => (
    <div data-testid="hero-carousel">
      {props.heroProducts.map(p => <div key={p.id}>{p.title}</div>)}
    </div>
  ),
}));

const mockProducts = [
  { id: '1', title: 'Product 1' },
  { id: '2', title: 'Product 2' },
  { id: '3', title: 'Product 3' },
  { id: '4', title: 'Product 4' },
];

describe('HeroSection Component', () => {
  it('should render the main headings and button', () => {
    render(<HeroSection heroProducts={mockProducts} />);
    expect(screen.getByRole('heading', { name: /where legacy/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /lives in art/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /browse all collections/i })).toBeInTheDocument();
  });

  it('should render the feature cards', () => {
    render(<HeroSection heroProducts={mockProducts} />);
    expect(screen.getByRole('heading', { name: /legacy chess sets/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /art prints/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /heritage collection/i })).toBeInTheDocument();
  });

  it('should pass the first 3 products to the HeroCarousel', () => {
    render(<HeroSection heroProducts={mockProducts} />);
    expect(screen.getByTestId('hero-carousel')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
    expect(screen.queryByText('Product 4')).not.toBeInTheDocument();
  });
});
