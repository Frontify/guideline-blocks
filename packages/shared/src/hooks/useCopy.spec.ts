/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCopy } from './useCopy';

const DEFAULT_RESET_AFTER_MS = 2000;

const mockClipboard = (writeText: () => Promise<void>) => {
    Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn(writeText) },
        writable: true,
        configurable: true,
    });
};

describe('useCopy', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        mockClipboard(() => Promise.resolve());
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should copy the text and set the status to success', async () => {
        const { result } = renderHook(() => useCopy());

        await act(() => result.current.copy('hello'));

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
        expect(result.current.status).toBe('success');
    });

    it('should set the status to error when copying fails', async () => {
        mockClipboard(() => Promise.reject(new Error('Not allowed')));
        const { result } = renderHook(() => useCopy());

        await act(() => result.current.copy('hello'));

        expect(result.current.status).toBe('error');
    });

    it('should reset the status to idle after the default duration', async () => {
        const { result } = renderHook(() => useCopy());

        await act(() => result.current.copy('hello'));

        act(() => {
            vi.advanceTimersByTime(DEFAULT_RESET_AFTER_MS);
        });

        expect(result.current.status).toBe('idle');
    });

    it('should reset the status to idle after a custom duration', async () => {
        const customResetAfterMS = 500;
        const { result } = renderHook(() => useCopy(customResetAfterMS));

        await act(() => result.current.copy('hello'));

        act(() => {
            vi.advanceTimersByTime(customResetAfterMS - 1);
        });

        expect(result.current.status).toBe('success');

        act(() => {
            vi.advanceTimersByTime(1);
        });

        expect(result.current.status).toBe('idle');
    });
});
