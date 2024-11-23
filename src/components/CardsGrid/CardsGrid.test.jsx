import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useLocalStorage, useWindowSize } from '@uidotdev/usehooks';
import CardsGrid from './CardsGrid';

// Mock hooks
const mockSetScore = vi.fn();
const mockSetBestScore = vi.fn();
let mockScore = 0;
let mockBestScore = 0;

vi.mock('@uidotdev/usehooks', () => ({
  useWindowSize: () => ({ width: 1024, height: 768 }),
  useLocalStorage: vi.fn((key) => {
    if (key === 'score') return [mockScore, mockSetScore];
    if (key === 'bestScore') return [mockBestScore, mockSetBestScore];
    return [null, vi.fn()];
  })
}));

// Mock fetch hook
const mockFetchData = {
  data: null,
  loading: false,
  error: null,
  fetchData: vi.fn()
};

vi.mock('../../hooks/useFetch', () => ({
  __esModule: true,
  default: () => mockFetchData
}));

describe('CardsGrid Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockScore = 0;
    mockBestScore = 0;
    mockFetchData.loading = false;
    mockFetchData.error = null;
    mockFetchData.data = null;
  });

 
  it('renders cards when data is loaded', () => {
    const mockProps = {
      data: {
        images: [
          { id: '1', image: { original: { url: 'test1.jpg' } } },
          { id: '2', image: { original: { url: 'test2.jpg' } } }
        ]
      }
    };
    
    render(<CardsGrid {...mockProps} />);
    const cards = screen.getAllByRole('img', { hidden: true });
    expect(cards).toHaveLength(2);
  });

  it('handles card click and updates score for matching pairs', async () => {
    const mockProps = {
      data: {
        images: [
          { id: '1', image: { original: { url: 'test1.jpg' } } },
          { id: '1', image: { original: { url: 'test1.jpg' } } }
        ]
      }
    };

    render(<CardsGrid {...mockProps} />);
    const cards = screen.getAllByRole('img', { hidden: true });

    // Click first card
    fireEvent.click(cards[0]);
    

    // Click second matching card
    fireEvent.click(cards[1]);
    

    await waitFor(() => {
      expect(mockSetScore).toHaveBeenCalledWith(1);
    });
  });
});