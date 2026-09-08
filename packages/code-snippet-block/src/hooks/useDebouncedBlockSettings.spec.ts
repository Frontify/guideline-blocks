/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { type Settings } from '../types';

import { useDebouncedBlockSettings } from './useDebouncedBlockSettings';

const DEFAULT_DEBOUNCE_DELAY = 500;

const advanceTimersBy = async (ms: number) => {
    await act(async () => {
        await vi.advanceTimersByTimeAsync(ms);
    });
};

describe('useDebouncedBlockSettings', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('should not call setBlockSettings before the delay has elapsed', async () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);

        const { result } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));

        result.current({ content: 'const a = 1;' });
        await advanceTimersBy(DEFAULT_DEBOUNCE_DELAY - 1);

        expect(setBlockSettings).not.toHaveBeenCalled();
    });

    it('should call setBlockSettings once the delay has elapsed', async () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);

        const { result } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));

        result.current({ content: 'const a = 1;' });
        await advanceTimersBy(DEFAULT_DEBOUNCE_DELAY);

        expect(setBlockSettings).toHaveBeenCalledTimes(1);
        expect(setBlockSettings).toHaveBeenCalledWith({ content: 'const a = 1;' });
    });

    it('should only call setBlockSettings with the last value of a burst of changes', async () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);

        const { result } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));

        result.current({ content: 'a' });
        await advanceTimersBy(100);
        result.current({ content: 'ab' });
        await advanceTimersBy(100);
        result.current({ content: 'abc' });
        await advanceTimersBy(DEFAULT_DEBOUNCE_DELAY);

        expect(setBlockSettings).toHaveBeenCalledTimes(1);
        expect(setBlockSettings).toHaveBeenCalledWith({ content: 'abc' });
    });

    it('should respect a custom delay', async () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);
        const customDelay = 1000;

        const { result } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings, customDelay));

        result.current({ content: 'const a = 1;' });
        await advanceTimersBy(DEFAULT_DEBOUNCE_DELAY);
        expect(setBlockSettings).not.toHaveBeenCalled();

        await advanceTimersBy(customDelay - DEFAULT_DEBOUNCE_DELAY);
        expect(setBlockSettings).toHaveBeenCalledTimes(1);
    });

    it('should keep the same debounced function across re-renders', () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);

        const { result, rerender } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));
        const initialDebouncedSetBlockSettings = result.current;

        rerender();

        expect(result.current).toBe(initialDebouncedSetBlockSettings);
    });

    it('should not drop a pending change when the debounced function is called before a re-render', async () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);

        const { result, rerender } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));

        result.current({ content: 'const a = 1;' });
        rerender();
        await advanceTimersBy(DEFAULT_DEBOUNCE_DELAY);

        expect(setBlockSettings).toHaveBeenCalledTimes(1);
        expect(setBlockSettings).toHaveBeenCalledWith({ content: 'const a = 1;' });
    });

    it('should call the latest setBlockSettings when it changes identity', async () => {
        const initialSetBlockSettings = vi.fn().mockResolvedValue(undefined);
        const updatedSetBlockSettings = vi.fn().mockResolvedValue(undefined);
        let currentSetBlockSettings = initialSetBlockSettings;

        const { result, rerender } = renderHook(() => useDebouncedBlockSettings<Settings>(currentSetBlockSettings));

        currentSetBlockSettings = updatedSetBlockSettings;
        rerender();

        result.current({ content: 'const a = 1;' });
        await advanceTimersBy(DEFAULT_DEBOUNCE_DELAY);

        expect(initialSetBlockSettings).not.toHaveBeenCalled();
        expect(updatedSetBlockSettings).toHaveBeenCalledWith({ content: 'const a = 1;' });
    });

    it('should flush a pending change on unmount', () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);

        const { result, unmount } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));

        result.current({ content: 'const a = 1;' });
        unmount();

        expect(setBlockSettings).toHaveBeenCalledTimes(1);
        expect(setBlockSettings).toHaveBeenCalledWith({ content: 'const a = 1;' });
    });

    it('should log an error when setBlockSettings rejects', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const error = new Error('Update failed');
        const setBlockSettings = vi.fn().mockRejectedValue(error);

        const { result } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));

        result.current({ content: 'const a = 1;' });
        await advanceTimersBy(DEFAULT_DEBOUNCE_DELAY);

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '[useDebouncedBlockSettings] Failed to update block settings:',
            error
        );
    });

    it('should not call setBlockSettings on unmount when there is no pending change', () => {
        const setBlockSettings = vi.fn().mockResolvedValue(undefined);

        const { unmount } = renderHook(() => useDebouncedBlockSettings<Settings>(setBlockSettings));

        unmount();

        expect(setBlockSettings).not.toHaveBeenCalled();
    });
});
