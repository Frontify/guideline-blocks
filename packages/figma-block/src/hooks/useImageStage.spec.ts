/* (c) Copyright Frontify Ltd., all rights reserved. */

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type UseImageStageProps } from '../types';

import { useImageStage } from './useImageStage';

describe('useImageStage', () => {
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();

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

    it('keeps the stage height in sync with the fixed-height toggle and the selected custom height', () => {
        const div = document.createElement('div');

        const { result, rerender } = renderHook(
            (props: UseImageStageProps) => {
                const hookResult = useImageStage(props);

                if (!hookResult.stageRef.current) {
                    (hookResult.stageRef as React.MutableRefObject<HTMLDivElement>).current = div;
                }

                return hookResult;
            },
            { initialProps: { height: '400px', hasLimitedOptions: true, isMobile: false } }
        );

        act(() => {
            result.current.setIsImageLoaded(true);
        });

        rerender({ height: '400px', hasLimitedOptions: false, isMobile: false });
        expect(div.style.height).toBe('400px');

        rerender({ height: '800px', hasLimitedOptions: false, isMobile: false });
        expect(div.style.height).toBe('800px');

        rerender({ height: '800px', hasLimitedOptions: true, isMobile: false });
        expect(div.style.height).toBe('auto');
    });
});
