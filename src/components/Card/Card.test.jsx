import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const defaultProps = {
    imageId: '123',
    categoryName: 'Test Category',
    processTurn: vi.fn(),
  };

  it('renders without crashing', () => {
    render(<Card {...defaultProps} imgUrl="test-image.jpg" />);
    expect(screen.getByAltText('Test Category')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<Card {...defaultProps} imgUrl="test-image.jpg" />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls processTurn with imageId when clicked', () => {
    render(<Card {...defaultProps} imgUrl="test-image.jpg" />);
    fireEvent.click(screen.getByRole('img', { hidden: true }));
    expect(defaultProps.processTurn).toHaveBeenCalledWith('123');
  });

  it('handles image load event', () => {
    render(<Card {...defaultProps} imgUrl="test-image.jpg" />);
    const img = screen.getByRole('img', { hidden: true });
    fireEvent.load(img);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
