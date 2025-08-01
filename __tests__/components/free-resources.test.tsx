import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FreeResources from '../../components/free-resources';
import '@testing-library/jest-dom';

const resources = [
  "BlackPast.org",
  "Blackfacts.com",
  "Five Inspiring Black Trailblazers",
  "Best African American History Apps",
  "Africans in European History",
  "30 Unique African Religions",
  "African Religions | Britannica",
  "Black People in Chess History",
  "Chess.com Learn",
  "ChessBase Learn",
  "US Chess Federation",
  "FIDE - International Chess Federation",
];

describe('FreeResources Component', () => {
  it('should render the main heading', () => {
    render(<FreeResources />);
    expect(screen.getByRole('heading', { name: /free learning resources/i })).toBeInTheDocument();
  });

  it('should render all resource cards', () => {
    render(<FreeResources />);
    for (const resourceTitle of resources) {
      expect(screen.getByRole('heading', { name: resourceTitle })).toBeInTheDocument();
    }
  });
});
