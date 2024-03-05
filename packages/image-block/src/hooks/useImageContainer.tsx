/* (c) Copyright Frontify Ltd., all rights reserved. */

import { debounce } from '@frontify/fondue';
import { useEffect, useRef, useState } from 'react';

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
                const newContainerWidth = container.contentRect.width;
                const oldContainerWidth = containerWidth ?? 0;
                const containerWidthHasGrown = oldContainerWidth < newContainerWidth;
                if (containerWidthHasGrown) {
                    setContainerWidth(container.contentRect.width);
                }
            }, 100)
        );

        containerObserver.observe(containerRef.current);
        return () => containerObserver.disconnect();
    }, [containerWidth]);

    const setContainerRef = (container: HTMLElement | null) => {
        if (!containerRef.current) {
            containerRef.current = container;
            setContainerWidth(container?.offsetWidth);
        }
    };

    return { containerWidth, setContainerRef };
};
