import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

// Mock package.json
vi.mock('../../../../package.json', () => ({
  version: '1.1.1'
}));

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders version number', () => {
    render(<Footer />);
    expect(screen.getByText(/1\.1\.1/)).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it('displays the author name with link', () => {
    render(<Footer />);
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Mihail Gaberov');
    expect(link).toHaveAttribute('href', 'https://github.com/mihailgaberov');
  });

  it('has correct link attributes for security', () => {
    render(<Footer />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
