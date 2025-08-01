import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import HeroCarousel from '../../components/hero-carousel';
import '@testing-library/jest-dom';

const mockProducts = [
  { id: '1', title: 'Product 1', images: { nodes: [{ url: '/image1.jpg', altText: 'Alt 1' }] } },
  { id: '2', title: 'Product 2', images: { nodes: [{ url: '/image2.jpg', altText: 'Alt 2' }] } },
];

describe('HeroCarousel Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the first product image and title initially', () => {
    render(<HeroCarousel heroProducts={mockProducts} />);
    expect(screen.getByAltText('Alt 1')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });

  it('should render a skeleton loader if no products are provided', () => {
    const { container } = render(<HeroCarousel heroProducts={[]} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('should cycle to the next image after the interval', () => {
    render(<HeroCarousel heroProducts={mockProducts} />);
    
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByAltText('Alt 2')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should switch to the correct image when a dot is clicked', () => {
    render(<HeroCarousel heroProducts={mockProducts} />);
    const dots = screen.getAllByRole('button');
    
    // The component renders floating teasers which are also buttons, so we need to filter
    const dotButtons = dots.filter(button => !button.hasChildNodes());

    act(() => {
      fireEvent.click(dotButtons[1]);
    });

    expect(screen.getByAltText('Alt 2')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
