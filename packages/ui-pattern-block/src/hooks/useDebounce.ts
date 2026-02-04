/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash-es/debounce';
import { useRef } from 'react';

export const useDebounce = (duration = 400) => {
    const debouncedSaveRef = useRef(
        debounce((callback) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            callback();
        }, duration)
    );

    // eslint-disable-next-line react-hooks/refs
    return { debounce: debouncedSaveRef.current };
};
