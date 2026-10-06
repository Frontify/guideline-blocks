/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash-es/debounce';
import { useEffect, useState } from 'react';

const RESIZE_DEBOUNCE_MS = 100;

const roundToNextHundred = (value: number) => Math.ceil(value / 100) * 100;

const getWidthToRequest = (entry: ResizeObserverEntry) => {
    const borderBoxWidth = entry.borderBoxSize?.[0]?.inlineSize;
    const contentBoxWidth = entry.contentBoxSize?.[0]?.inlineSize;
    const hasBorder = borderBoxWidth !== undefined && contentBoxWidth !== undefined && borderBoxWidth > contentBoxWidth;

    return roundToNextHundred(entry.contentRect.width + (hasBorder ? 100 : 0));
};

export const useImageContainer = () => {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!container) {
            return;
        }

        const updateContainerWidth = debounce(
            (entry: ResizeObserverEntry) => {
                const newContainerWidth = getWidthToRequest(entry);
                setContainerWidth((currentWidth) => Math.max(currentWidth ?? 0, newContainerWidth));
            },
            RESIZE_DEBOUNCE_MS,
            { leading: true }
        );

        const containerObserver = new ResizeObserver(([entry]) => {
            if (entry) {
                updateContainerWidth(entry);
            }
        });

        containerObserver.observe(container);
        return () => {
            containerObserver.disconnect();
            updateContainerWidth.cancel();
        };
    }, [container]);

    return { containerWidth, setContainerRef: setContainer };
};
