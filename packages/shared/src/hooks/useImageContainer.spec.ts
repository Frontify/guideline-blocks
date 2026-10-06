/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useImageContainer } from './useImageContainer';

type ObserverInstance = {
    callback: ResizeObserverCallback;
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
};

let observers: ObserverInstance[] = [];

class MockResizeObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();

    constructor(public callback: ResizeObserverCallback) {
        observers.push(this);
    }
}

const createEntry = (contentWidth: number, borderWidth = 0) =>
    ({
        contentRect: { width: contentWidth },
        contentBoxSize: [{ inlineSize: contentWidth }],
        borderBoxSize: [{ inlineSize: contentWidth + borderWidth }],
    }) as unknown as ResizeObserverEntry;

const notify = (observer: ObserverInstance | undefined, entry: ResizeObserverEntry) => {
    act(() => observer?.callback([entry], observer as unknown as ResizeObserver));
};

describe('useImageContainer', () => {
    beforeEach(() => {
        observers = [];
        vi.useFakeTimers();
        vi.stubGlobal('ResizeObserver', MockResizeObserver);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('should not read the layout synchronously when the container is attached', () => {
        const element = document.createElement('div');
        const offsetWidthGetter = vi.spyOn(element, 'offsetWidth', 'get');
        const clientWidthGetter = vi.spyOn(element, 'clientWidth', 'get');
        const { result } = renderHook(() => useImageContainer());

        act(() => result.current.setContainerRef(element));

        expect(offsetWidthGetter).not.toHaveBeenCalled();
        expect(clientWidthGetter).not.toHaveBeenCalled();
        expect(result.current.containerWidth).toBeUndefined();
        expect(observers[0]?.observe).toHaveBeenCalledWith(element);
    });

    it('should take the initial width from the first observation without debouncing', () => {
        const { result } = renderHook(() => useImageContainer());
        act(() => result.current.setContainerRef(document.createElement('div')));

        notify(observers[0], createEntry(420));

        expect(result.current.containerWidth).toBe(500);
    });

    it('should request a larger image when the container has a border', () => {
        const { result } = renderHook(() => useImageContainer());
        act(() => result.current.setContainerRef(document.createElement('div')));

        notify(observers[0], createEntry(420, 4));

        expect(result.current.containerWidth).toBe(600);
    });

    it('should debounce subsequent resizes and only grow the width', () => {
        const { result } = renderHook(() => useImageContainer());
        act(() => result.current.setContainerRef(document.createElement('div')));
        notify(observers[0], createEntry(420));

        notify(observers[0], createEntry(820));
        expect(result.current.containerWidth).toBe(500);

        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(result.current.containerWidth).toBe(900);

        notify(observers[0], createEntry(200));
        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(result.current.containerWidth).toBe(900);
    });

    it('should observe the new element and keep the width when the container element changes', () => {
        const firstElement = document.createElement('div');
        const secondElement = document.createElement('a');
        const { result } = renderHook(() => useImageContainer());
        act(() => result.current.setContainerRef(firstElement));
        notify(observers[0], createEntry(420));

        act(() => result.current.setContainerRef(secondElement));

        expect(observers[0]?.disconnect).toHaveBeenCalled();
        expect(observers[1]?.observe).toHaveBeenCalledWith(secondElement);
        expect(result.current.containerWidth).toBe(500);
    });

    it('should disconnect the observer on unmount', () => {
        const { result, unmount } = renderHook(() => useImageContainer());
        act(() => result.current.setContainerRef(document.createElement('div')));

        unmount();

        expect(observers[0]?.disconnect).toHaveBeenCalled();
    });
});
