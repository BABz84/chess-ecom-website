import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HistoricalPiecesShowcase from '../../components/historical-pieces-showcase';
import '@testing-library/jest-dom';

describe('HistoricalPiecesShowcase Component', () => {
  it('should render the main heading', () => {
    render(<HistoricalPiecesShowcase />);
    expect(screen.getByRole('heading', { name: /stories that shape history/i })).toBeInTheDocument();
  });

  it('should render all historical piece cards', () => {
    render(<HistoricalPiecesShowcase />);
    // Since the names are placeholders, we can check for the count
    const pieces = screen.getAllByText(/placeholder historical figure/i);
    expect(pieces).toHaveLength(3);
  });

  it('should render the explore button', () => {
    render(<HistoricalPiecesShowcase />);
    expect(screen.getByRole('button', { name: /explore all historical figures/i })).toBeInTheDocument();
  });
});
