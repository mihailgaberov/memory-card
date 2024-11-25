import { renderHook } from '@testing-library/react';
import useFetch from './useFetch';

describe('useFetch Hook', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useFetch());
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });
});
