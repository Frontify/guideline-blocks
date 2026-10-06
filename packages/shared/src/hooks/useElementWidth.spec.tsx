/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, render, screen } from '@testing-library/react';
// oxlint-disable-next-line no-restricted-syntax
import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useElementWidth } from './useElementWidth';

const TARGET_TEST_ID = 'target';
const INITIAL_WIDTH = 800;
const RESIZED_WIDTH = 400;

const TestComponent = () => {
    const { ref, width } = useElementWidth<HTMLDivElement>();

    return (
        <div ref={ref} data-test-id={TARGET_TEST_ID}>
            {width}
        </div>
    );
};

describe('useElementWidth', () => {
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;
    let notifyResize: () => void;

    const mockClientWidth = (width: number) => {
        vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(width);
    };

    beforeEach(() => {
        mockDisconnect = vi.fn();
        mockObserve = vi.fn();

        const MockResizeObserver = vi.fn(function (callback: ResizeObserverCallback) {
            notifyResize = () => callback([], {} as ResizeObserver);

            return {
                observe: mockObserve,
                disconnect: mockDisconnect,
            };
        });

        vi.stubGlobal('ResizeObserver', MockResizeObserver);
        mockClientWidth(INITIAL_WIDTH);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('should expose the measured width on the first render', () => {
        render(<TestComponent />);

        expect(screen.getByTestId(TARGET_TEST_ID)).toHaveTextContent(`${INITIAL_WIDTH}`);
    });

    it('should observe the element the ref is attached to', () => {
        render(<TestComponent />);

        expect(mockObserve).toHaveBeenCalledWith(screen.getByTestId(TARGET_TEST_ID));
    });

    it('should update the width when the element is resized', () => {
        render(<TestComponent />);

        mockClientWidth(RESIZED_WIDTH);
        act(() => notifyResize());

        expect(screen.getByTestId(TARGET_TEST_ID)).toHaveTextContent(`${RESIZED_WIDTH}`);
    });

    it('should disconnect the ResizeObserver on unmount', () => {
        const { unmount } = render(<TestComponent />);

        expect(mockDisconnect).not.toHaveBeenCalled();

        unmount();

        expect(mockDisconnect).toHaveBeenCalledOnce();
    });
});
