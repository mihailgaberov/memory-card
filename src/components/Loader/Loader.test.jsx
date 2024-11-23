import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import styles from './Loader.module.scss';

describe('Loader Component', () => {
  it('renders without crashing', () => {
    render(<Loader message = 'Loading...' />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays default message when no message prop is provided', () => {
    render(<Loader message = 'Loading...' />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays custom message when provided', () => {
    const customMessage = 'Custom loading message';
    render(<Loader message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('applies loading animation class', () => {
    render(<Loader message = 'Loading...' />);
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(styles.loading);
  });
});
