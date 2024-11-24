import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const defaultProps = {
    imgUrl: 'test.jpg',
    imageId: '1',
    categoryName: 'Test Category',
    processTurn: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows loader initially', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('hides loader after image loads', () => {
    render(<Card {...defaultProps} />);
    
    // First verify loader is shown
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    
    // Simulate image load
    const image = screen.getByRole('img');
    fireEvent.load(image);
    
    // Verify loader is hidden
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('calls processTurn when clicked', () => {
    render(<Card {...defaultProps} />);
    const card = screen.getByRole('img').parentElement;
    fireEvent.click(card);
    expect(defaultProps.processTurn).toHaveBeenCalledWith(defaultProps.imageId);
  });

  it('applies correct CSS classes based on loading state', () => {
    render(<Card {...defaultProps} />);
    const image = screen.getByRole('img');
    
    // Initially image should have hidden class
    expect(image).toHaveClass('hidden');
    
    // After load, hidden class should be removed
    fireEvent.load(image);
    expect(image).not.toHaveClass('hidden');
  });
});
