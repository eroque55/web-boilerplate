import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDisableDelay } from './useDisableDelay';

describe('useDisableDelay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs the function and flags loading', async () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDisableDelay());

    await act(async () => {
      await result.current.executeWithDelay(fn);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(true);
  });

  it('ignores calls while the previous delay has not elapsed', async () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDisableDelay());

    await act(async () => {
      await result.current.executeWithDelay(fn);
      await result.current.executeWithDelay(fn);
      await result.current.executeWithDelay(fn);
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('allows new calls after the delay', async () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDisableDelay(1000));

    await act(async () => {
      await result.current.executeWithDelay(fn);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.executeWithDelay(fn);
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('clears the pending timer on unmount', async () => {
    const fn = vi.fn();
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { result, unmount } = renderHook(() => useDisableDelay(1000));

    await act(async () => {
      await result.current.executeWithDelay(fn);
    });

    clearSpy.mockClear();
    unmount();

    expect(clearSpy).toHaveBeenCalled();

    clearSpy.mockRestore();
  });
});
