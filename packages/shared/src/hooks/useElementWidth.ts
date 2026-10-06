/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useLayoutEffect, useRef, useState } from 'react';

/**
 * Tracks the client width of the element the returned ref is attached to.
 * The width is `0` until the element has been measured, which happens before the first paint.
 */
export const useElementWidth = <T extends HTMLElement>(): { ref: RefObject<T>; width: number } => {
    const ref = useRef<T>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const measure = () => setWidth(element.clientWidth);
        measure();

        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, width };
};
