import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewsletterSignup from '../../components/newsletter-signup';
import '@testing-library/jest-dom';

describe('NewsletterSignup Component', () => {
  it('should render the signup form initially', () => {
    render(<NewsletterSignup />);
    expect(screen.getByRole('heading', { name: /join the quinkento legacy community/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('should show a success message after form submission', () => {
    render(<NewsletterSignup />);
    
    const emailInput = screen.getByPlaceholderText(/enter your email address/i);
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    expect(screen.getByText(/thank you for subscribing/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /subscribe/i })).not.toBeInTheDocument();
  });
});
