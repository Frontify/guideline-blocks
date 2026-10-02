/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useAutoGrowTextarea } from './useAutoGrowTextarea';

const createTextarea = (scrollHeight: number) => {
    const textarea = document.createElement('textarea');
    Object.defineProperty(textarea, 'scrollHeight', { value: scrollHeight });
    document.body.appendChild(textarea);
    return textarea;
};

describe('useAutoGrowTextarea', () => {
    let frames: FrameRequestCallback[];

    beforeEach(() => {
        frames = [];
        vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => frames.push(callback));
        vi.stubGlobal('cancelAnimationFrame', vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
        document.body.innerHTML = '';
    });

    it('should do nothing when field-sizing is supported', () => {
        vi.stubGlobal('CSS', { supports: () => true });
        const addEventListener = vi.spyOn(window, 'addEventListener');
        const ref = { current: createTextarea(40) };

        renderHook(() => useAutoGrowTextarea(ref, 'value', true));

        expect(frames).toHaveLength(0);
        expect(addEventListener).not.toHaveBeenCalledWith('resize', expect.any(Function));
        expect(ref.current.style.height).toBe('');
    });

    it('should measure all textareas in a single animation frame when field-sizing is not supported', () => {
        vi.stubGlobal('CSS', { supports: () => false });
        const first = { current: createTextarea(40) };
        const second = { current: createTextarea(80) };

        const { unmount: unmountFirst } = renderHook(() => useAutoGrowTextarea(first, 'a', true));
        const { unmount: unmountSecond } = renderHook(() => useAutoGrowTextarea(second, 'b', true));

        expect(frames).toHaveLength(1);
        frames[0](0);

        expect(first.current.style.height).toBe('40px');
        expect(second.current.style.height).toBe('80px');

        unmountFirst();
        unmountSecond();
    });

    it('should share one resize listener and remove it after the last unmount', () => {
        vi.stubGlobal('CSS', { supports: () => false });
        const addEventListener = vi.spyOn(window, 'addEventListener');
        const removeEventListener = vi.spyOn(window, 'removeEventListener');

        const { unmount: unmountFirst } = renderHook(() =>
            useAutoGrowTextarea({ current: createTextarea(1) }, '', true)
        );
        const { unmount: unmountSecond } = renderHook(() =>
            useAutoGrowTextarea({ current: createTextarea(1) }, '', true)
        );

        expect(addEventListener.mock.calls.filter(([type]) => type === 'resize')).toHaveLength(1);

        unmountFirst();
        expect(removeEventListener).not.toHaveBeenCalledWith('resize', expect.any(Function));

        unmountSecond();
        expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('should not register when disabled', () => {
        vi.stubGlobal('CSS', { supports: () => false });
        const addEventListener = vi.spyOn(window, 'addEventListener');

        renderHook(() => useAutoGrowTextarea({ current: createTextarea(1) }, '', false));

        expect(frames).toHaveLength(0);
        expect(addEventListener).not.toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
