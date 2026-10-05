/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash-es/debounce';
import { useEffect, useState } from 'react';

const RESIZE_DEBOUNCE_MS = 100;

const roundToNextHundred = (value: number) => Math.ceil(value / 100) * 100;

const getWidthToRequest = (entry: ResizeObserverEntry) => {
    const borderBoxWidth = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    const contentBoxWidth = entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    const shouldRequestLargerImage = borderBoxWidth - contentBoxWidth > 0;

    return roundToNextHundred(entry.contentRect.width + (shouldRequestLargerImage ? 100 : 0));
};

export const useImageContainer = () => {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!container) {
            return;
        }

        const updateContainerWidth = (entry: ResizeObserverEntry) => {
            const newContainerWidth = getWidthToRequest(entry);
            setContainerWidth((currentWidth) =>
                currentWidth === undefined || currentWidth < newContainerWidth ? newContainerWidth : currentWidth
            );
        };
        const debouncedUpdateContainerWidth = debounce(updateContainerWidth, RESIZE_DEBOUNCE_MS);

        let isFirstObservation = true;
        const containerObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) {
                return;
            }

            if (isFirstObservation) {
                isFirstObservation = false;
                updateContainerWidth(entry);
                return;
            }

            debouncedUpdateContainerWidth(entry);
        });

        containerObserver.observe(container);
        return () => {
            containerObserver.disconnect();
            debouncedUpdateContainerWidth.cancel();
        };
    }, [container]);

    return { containerWidth, setContainerRef: setContainer };
};
