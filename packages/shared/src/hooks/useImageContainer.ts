/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash-es/debounce';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const RESIZE_DEBOUNCE_MS = 100;

const roundToNextHundred = (value: number) => Math.ceil(value / 100) * 100;

const getWidthToRequest = (entry: ResizeObserverEntry) => {
    const borderBoxWidth = entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    const contentBoxWidth = entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
    const shouldRequestLargerImage = borderBoxWidth - contentBoxWidth > 0;

    return roundToNextHundred(entry.contentRect.width + (shouldRequestLargerImage ? 100 : 0));
};

/**
 * Measures the container through a ResizeObserver only, so mounting never forces a synchronous layout.
 * The first observation is committed with `flushSync`: ResizeObserver callbacks run after layout but
 * before paint, so the image is painted at the right width without an intermediate frame.
 * The width only ever grows, to avoid re-requesting smaller images when the container shrinks.
 */
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
                // Commit before paint so the first frame already has the right width (see above).
                // oxlint-disable-next-line @eslint-react/dom-no-flush-sync
                flushSync(() => updateContainerWidth(entry));
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
