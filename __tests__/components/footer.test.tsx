import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('should render the logo', () => {
    render(<Footer />);
    expect(screen.getByAltText('Mansa Gallery Logo')).toBeInTheDocument();
  });

  it('should render the main headings', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: /story collections/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /learn more/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();
  });

  it('should render the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Mansa Gallery. All rights reserved./i)).toBeInTheDocument();
  });

  it('should render the privacy and terms links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
  });
});
