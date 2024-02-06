/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

export const useThrottle = <T extends unknown[]>(func: (...args: T) => void, timeout = 10) => {
    const throttled = useRef(false);

    const throttledFunc = (...args: T) => {
        if (!throttled.current) {
            func(...args);
            throttled.current = true;
            setTimeout(() => (throttled.current = false), timeout);
        }
    };

    return throttledFunc;
};
