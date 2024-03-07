/* (c) Copyright Frontify Ltd., all rights reserved. */

import { debounce } from '@frontify/fondue';
import { useEffect, useRef, useState } from 'react';
import { roundToNextHundred } from '../../../image-block/src/helpers';

export const useImageContainer = () => {
    const containerRef = useRef<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const containerObserver = new ResizeObserver(
            debounce((entries) => {
                const container = entries[0];
                const newContainerWidth = roundToNextHundred(container.contentRect.width);
                const oldContainerWidth = roundToNextHundred(containerWidth ?? 0);
                const containerWidthHasGrown = oldContainerWidth < newContainerWidth;
                if (containerWidthHasGrown) {
                    setContainerWidth(newContainerWidth);
                }
            }, 100)
        );

        containerObserver.observe(containerRef.current);
        return () => containerObserver.disconnect();
    }, [containerWidth]);

    const setContainerRef = (container: HTMLElement | null) => {
        if (!containerRef.current) {
            containerRef.current = container;
            setContainerWidth(roundToNextHundred(container?.offsetWidth ?? 0));
        }
    };

    return { containerWidth, setContainerRef };
};
