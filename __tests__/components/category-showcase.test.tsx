import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryShowcase from '../../components/category-showcase';
import '@testing-library/jest-dom';

describe('CategoryShowcase Component', () => {
  it('should render the main heading', () => {
    render(<CategoryShowcase />);
    expect(screen.getByRole('heading', { name: /our story collections/i })).toBeInTheDocument();
  });

  it('should render all category titles', () => {
    render(<CategoryShowcase />);
    expect(screen.getByRole('heading', { name: /historical chess pieces/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /gelato art collection/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /printify heritage collection/i })).toBeInTheDocument();
  });

  it('should render all category descriptions', () => {
    render(<CategoryShowcase />);
    expect(screen.getByText(/handcrafted pieces featuring historically significant black figures/i)).toBeInTheDocument();
    expect(screen.getByText(/high-quality art prints celebrating african heritage/i)).toBeInTheDocument();
    expect(screen.getByText(/wearable history that tells the stories of resilience and triumph/i)).toBeInTheDocument();
  });
});
