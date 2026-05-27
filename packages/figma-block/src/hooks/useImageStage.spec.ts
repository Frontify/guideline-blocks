/* (c) Copyright Frontify Ltd., all rights reserved. */

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useImageStage } from './useImageStage';

describe('useImageStage', () => {
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockDisconnect = vi.fn();
        mockObserve = vi.fn();
        const MockResizeObserver = vi.fn(function () {
            return {
                observe: mockObserve,
                disconnect: mockDisconnect,
            };
        });

        vi.stubGlobal('ResizeObserver', MockResizeObserver);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it('should disconnect the ResizeObserver on unmount', () => {
        const div = document.createElement('div');

        const { unmount } = renderHook(() => {
            const result = useImageStage({ height: 'auto', hasLimitedOptions: false, isMobile: false });

            if (!result.stageRef.current) {
                (result.stageRef as React.MutableRefObject<HTMLDivElement>).current = div;
            }

            return result;
        });

        expect(mockObserve).toHaveBeenCalledWith(div);
        expect(mockDisconnect).not.toHaveBeenCalled();

        unmount();

        expect(mockDisconnect).toHaveBeenCalledOnce();
    });
});
