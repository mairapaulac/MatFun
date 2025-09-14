import { renderHook, act } from '@testing-library/react';
import { useTimer } from '@/hooks/useTimer';

// Mock requestAnimationFrame
const mockRAF = (callback: FrameRequestCallback) => {
  return setTimeout(callback, 16);
};

const mockCancelRAF = (id: number) => {
  clearTimeout(id);
};

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockRAF,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: mockCancelRAF,
});

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useTimer(60000, false));
    
    expect(result.current.elapsedMs).toBe(0);
    expect(result.current.remainingMs).toBe(60000);
    expect(result.current.progress).toBe(0);
    expect(result.current.multiplier).toBe(8);
  });

  it('should calculate multiplier correctly', () => {
    const { result } = renderHook(() => useTimer(60000, true));
    
    // Test multiplier at different time intervals
    act(() => {
      jest.advanceTimersByTime(10000); // 10s - should be 8x
    });
    expect(result.current.multiplier).toBe(8);
    
    act(() => {
      jest.advanceTimersByTime(10000); // 20s - should be 4x
    });
    expect(result.current.multiplier).toBe(4);
    
    act(() => {
      jest.advanceTimersByTime(10000); // 30s - should be 2x
    });
    expect(result.current.multiplier).toBe(2);
    
    act(() => {
      jest.advanceTimersByTime(10000); // 40s - should be 1x
    });
    expect(result.current.multiplier).toBe(1);
  });

  it('should update progress correctly', () => {
    const { result } = renderHook(() => useTimer(60000, true));
    
    act(() => {
      jest.advanceTimersByTime(30000); // 30s
    });
    
    expect(result.current.progress).toBeCloseTo(0.5, 1);
    expect(result.current.elapsedMs).toBe(30000);
    expect(result.current.remainingMs).toBe(30000);
  });

  it('should not exceed total time', () => {
    const { result } = renderHook(() => useTimer(60000, true));
    
    act(() => {
      jest.advanceTimersByTime(70000); // 70s - exceeds total
    });
    
    expect(result.current.elapsedMs).toBe(60000);
    expect(result.current.remainingMs).toBe(0);
    expect(result.current.progress).toBe(1);
  });

  it('should reset correctly', () => {
    const { result } = renderHook(() => useTimer(60000, true));
    
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    
    expect(result.current.elapsedMs).toBe(30000);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.elapsedMs).toBe(0);
    expect(result.current.remainingMs).toBe(60000);
    expect(result.current.progress).toBe(0);
  });

  it('should pause and resume correctly', () => {
    const { result } = renderHook(() => useTimer(60000, true));
    
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    expect(result.current.elapsedMs).toBe(10000);
    
    act(() => {
      result.current.pause();
      jest.advanceTimersByTime(10000);
    });
    
    // Should not advance while paused
    expect(result.current.elapsedMs).toBe(10000);
    
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(10000);
    });
    
    expect(result.current.elapsedMs).toBe(20000);
  });
});
