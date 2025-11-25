/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash/debounce';
import { useEffect, useRef, useState } from 'react';

const roundToNextHundred = (value: number) => Math.ceil(value / 100) * 100;

export const useImageContainer = () => {
    const containerRef = useRef<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
    const [exactContainerWidth, setExactContainerWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const containerObserver = new ResizeObserver(
            debounce((entries) => {
                const container = entries[0] as ResizeObserverEntry;
                const borderWidth = container.borderBoxSize[0].inlineSize - container.contentBoxSize[0].inlineSize;
                const shouldRequestLargerImage = borderWidth > 0;
                const newImageWidth = container.contentRect.width + (shouldRequestLargerImage ? 100 : 0);

                const newContainerWidth = roundToNextHundred(newImageWidth);
                const oldContainerWidth = roundToNextHundred(containerWidth ?? 0);
                const containerWidthHasGrown = oldContainerWidth < newContainerWidth;
                if (containerWidthHasGrown) {
                    setContainerWidth(newContainerWidth);
                }
                setExactContainerWidth(newImageWidth);
            }, 100)
        );

        containerObserver.observe(containerRef.current);
        return () => containerObserver.disconnect();
    }, [containerWidth]);

    const setContainerRef = (container: HTMLElement | null) => {
        if (!containerRef.current) {
            containerRef.current = container;
            const clientWidth = container?.clientWidth || 0;
            const offsetWidth = container?.offsetWidth || 0;
            const borderWidth = offsetWidth - clientWidth;
            const shouldRequestLargerImage = borderWidth > 0;
            const imageWidthToRequest = offsetWidth + (shouldRequestLargerImage ? 100 : 0);

            setContainerWidth(roundToNextHundred(imageWidthToRequest));
        }
    };

    return { containerWidth, setContainerRef, exactContainerWidth };
};
