import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutSection from '../../components/about-section';
import '@testing-library/jest-dom';

describe('AboutSection Component', () => {
  it('should render the main heading', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { name: /about mansa gallery/i })).toBeInTheDocument();
  });

  it('should render the feature headings', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { name: /legacy preservation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /educational impact/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /cultural celebration/i })).toBeInTheDocument();
  });

  it('should render the founder message heading', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { name: /a message from our founder/i })).toBeInTheDocument();
  });

  it('should render the founder\'s name', () => {
    render(<AboutSection />);
    expect(screen.getByText(/- Duane Stewart/i)).toBeInTheDocument();
  });
});
