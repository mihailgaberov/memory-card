import { renderHook, waitFor } from '@testing-library/react';
import useFetch from './useFetch';

describe('useFetch Hook', () => {
  const mockData = {
    images: [
      { image: { original: { url: 'image1.jpg' } }, id: '1' },
      { image: { original: { url: 'image2.jpg' } }, id: '2' }
    ]
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useFetch());
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('fetches data successfully', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const { result } = renderHook(() => useFetch());

    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Failed to fetch data'));

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch data');
  });

  it('handles invalid response format', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ images: null })
    });

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Invalid response format');
  });

  it('can manually fetch new data', async () => {
    const firstData = {
      images: [{ image: { original: { url: 'first.jpg' } }, id: '1' }]
    };
    const secondData = {
      images: [{ image: { original: { url: 'second.jpg' } }, id: '2' }]
    };

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(firstData)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(secondData)
      });

    const { result } = renderHook(() => useFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(firstData);

    // Trigger manual fetch
    result.current.fetchData();

    await waitFor(() => {
      expect(result.current.data).toEqual(secondData);
    });
  });
});
