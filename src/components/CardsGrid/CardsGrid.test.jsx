import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import CardsGrid from './CardsGrid';

// Mock hooks
const mockSetScore = vi.fn();
const mockSetBestScore = vi.fn();
let mockScore = 0;
let mockBestScore = 0;

vi.mock('@uidotdev/usehooks', () => ({
  useLocalStorage: (key, initialValue) => {
    if (key === 'score') return [mockScore, mockSetScore];
    if (key === 'bestScore') return [mockBestScore, mockSetBestScore];
    return [initialValue, vi.fn()];
  }
}));

const mockFetchData = {
  data: null,
  loading: false,
  error: null,
  fetchData: vi.fn()
};

// Mock useFetch hook
vi.mock('../../hooks/useFetch', () => ({
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

  afterEach(() => {
    vi.resetAllMocks();
  });

  // Initial Rendering Tests
  describe('Initial Rendering', () => {
    it('renders without crashing', () => {
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } }, category: 'Test Category' }
          ]
        }
      };
      render(<CardsGrid {...mockProps} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders correct number of cards', () => {
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } }, category: 'Test Category' },
            { id: '2', image: { original: { url: 'test2.jpg' } }, category: 'Test Category' }
          ]
        }
      };
      render(<CardsGrid {...mockProps} />);
      expect(screen.getAllByRole('img')).toHaveLength(2);
    });
  });

  // Loading States Tests
  describe('Loading States', () => {
    it('shows loader when no images are present', () => {
      const mockProps = {
        data: {
          images: []
        }
      };

      render(<CardsGrid {...mockProps} />);
      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.getByText('Loading new images...')).toBeInTheDocument();
    });

    it('hides grid loader and shows individual card loaders initially', () => {
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } }, category: 'Test Category' },
            { id: '2', image: { original: { url: 'test2.jpg' } }, category: 'Test Category' }
          ]
        }
      };

      render(<CardsGrid {...mockProps} />);
      
      // Grid loader should be hidden
      expect(screen.queryByText('Loading new images...')).not.toBeInTheDocument();
      
      // Each card should show its loader initially
      const cardLoaders = screen.getAllByTestId('loader');
      expect(cardLoaders).toHaveLength(2);
    });

    it('hides all loaders after images are loaded', async () => {
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } }, category: 'Test Category' },
            { id: '2', image: { original: { url: 'test2.jpg' } }, category: 'Test Category' }
          ]
        }
      };

      render(<CardsGrid {...mockProps} />);
      
      // Simulate all images loading
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        fireEvent.load(img);
      });

      // No loaders should be visible after images load
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  // Error Handling Tests
  describe('Error Handling', () => {
    it('displays error message when fetch fails', () => {
      const mockProps = {
        data: { images: [] }
      };
      mockFetchData.error = 'Failed to fetch data';
      render(<CardsGrid {...mockProps} />);
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });

    it('handles missing image data gracefully', () => {
      const mockProps = {
        data: {
          images: [{ id: '1' }] // Missing image URL
        }
      };
      render(<CardsGrid {...mockProps} />);
      expect(screen.getByRole('img')).toHaveAttribute('src', '');
    });
  });

  // User Interactions Tests
  describe('User Interactions', () => {
    it('shuffles cards after a non-matching click', async () => {
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } } },
            { id: '2', image: { original: { url: 'test2.jpg' } } },
            { id: '3', image: { original: { url: 'test3.jpg' } } },
            { id: '4', image: { original: { url: 'test4.jpg' } } },
            { id: '5', image: { original: { url: 'test5.jpg' } } },
            { id: '6', image: { original: { url: 'test6.jpg' } } },
            { id: '7', image: { original: { url: 'test7.jpg' } } }
          ]
        }
      };
      render(<CardsGrid {...mockProps} />);
      const cards = screen.getAllByRole('img');
      const initialOrder = cards.map(card => card.src);
      
      fireEvent.click(cards[0]);
      
      await waitFor(() => {
        const newCards = screen.getAllByRole('img');
        const newOrder = newCards.map(card => card.src);
        expect(newOrder).not.toEqual(initialOrder);
      });
    });
  });

  // Score Tracking Tests
  describe('Score Tracking', () => {
    it('increments score on successful card match', async () => {
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } } },
            { id: '2', image: { original: { url: 'test2.jpg' } } }
          ]
        }
      };
      render(<CardsGrid {...mockProps} />);
      const cards = screen.getAllByRole('img');
      
      fireEvent.click(cards[0]);
      fireEvent.click(cards[1]);
      
      await waitFor(() => {
        expect(mockSetScore).toHaveBeenCalledWith(1);
      });
    });

    it('updates best score when current score exceeds it', async () => {
      mockScore = 5;
      mockBestScore = 3;
      
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } } },
            { id: '2', image: { original: { url: 'test2.jpg' } } }
          ]
        }
      };
      render(<CardsGrid {...mockProps} />);
      const cards = screen.getAllByRole('img');
      
      // First click to select a card
      fireEvent.click(cards[0]);
      
      // Click a different card to increment score
      fireEvent.click(cards[1]);
      
      await waitFor(() => {
        // Score should be incremented to 6, triggering best score update
        expect(mockSetBestScore).toHaveBeenCalledWith(6);
      });
    });

    it('resets score when clicking same card twice', async () => {
      mockScore = 3;
      const mockProps = {
        data: {
          images: [
            { id: '1', image: { original: { url: 'test1.jpg' } } },
            { id: '2', image: { original: { url: 'test2.jpg' } } },
            { id: '3', image: { original: { url: 'test3.jpg' } } },
            { id: '4', image: { original: { url: 'test4.jpg' } } },
            { id: '5', image: { original: { url: 'test5.jpg' } } },
          ]
        }
      };
      render(<CardsGrid {...mockProps} />);
      const card = screen.getAllByRole('img');
      
      fireEvent.click(card[0]);
      fireEvent.click(card[0]);
      
      await waitFor(() => {
        expect(mockSetScore).toHaveBeenCalledWith(0);
      });
    });

    // it('fetches new images on perfect score', async () => {
    //   const mockProps = {
    //     data: {
    //       images: [
    //         { id: '1', image: { original: { url: 'test1.jpg' } } },
    //         { id: '2', image: { original: { url: 'test2.jpg' } } }
    //       ]
    //     }
    //   };
    //   render(<CardsGrid {...mockProps} />);
    //   const cards = screen.getAllByRole('img');
      
    //   // Click all cards once
    //   cards.forEach(card => fireEvent.click(card));
      
    //   await waitFor(() => {
    //     expect(mockFetchData.fetchData).toHaveBeenCalled();
    //   });
    // });
  });
});