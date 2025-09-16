import { useEffect, useRef, useState, useCallback } from 'react';
import { TimerState, TimerActions, Multiplier } from '@/types/question';

export function useTimer(totalMs = 60000, running = true, resetTrigger = 0): TimerState & TimerActions {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(running);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Calculate multiplier based on elapsed time
  const getMultiplier = useCallback((elapsedMs: number): Multiplier => {
    const progress = elapsedMs / totalMs;
    if (progress <= 0.25) return 8; // 0-15s: 8x (fastest answers)
    if (progress <= 0.5) return 4;  // 15-30s: 4x
    if (progress <= 0.75) return 2; // 30-45s: 2x
    return 1; // 45-60s: 1x (slowest answers)
  }, [totalMs]);

  // Reset function
  const reset = useCallback(() => {
    setElapsed(0);
    setIsRunning(false);
    startRef.current = null;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    startRef.current = null;
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Handle reset trigger
  useEffect(() => {
    reset();
    const timer = setTimeout(() => {
      setIsRunning(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [resetTrigger, reset]);

  // Timer using setInterval for reliability
  useEffect(() => {
    if (!isRunning) return;

    let intervalId: NodeJS.Timeout;
    
    // Start timer
    if (!startRef.current) {
      startRef.current = performance.now();
    }

    intervalId = setInterval(() => {
      if (startRef.current) {
        const now = performance.now();
        const elapsed = now - startRef.current;
        const clampedElapsed = Math.min(elapsed, totalMs);
        setElapsed(clampedElapsed);
        
        // Stop when time is up
        if (elapsed >= totalMs) {
          setIsRunning(false);
        }
      }
    }, 50); // Update every 50ms for smooth animation

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, totalMs]);

  // Sync with running prop
  useEffect(() => {
    if (running && !isRunning) {
      setIsRunning(true);
    } else if (!running && isRunning) {
      setIsRunning(false);
    }
  }, [running, isRunning]);

  const progress = elapsed / totalMs;
  const multiplier = getMultiplier(elapsed);

  return {
    elapsedMs: elapsed,
    remainingMs: Math.max(0, totalMs - elapsed),
    progress,
    multiplier,
    start,
    pause,
    reset,
  };
}
