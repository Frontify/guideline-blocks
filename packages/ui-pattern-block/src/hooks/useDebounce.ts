/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash-es/debounce';
import { useRef } from 'react';

export const useDebounce = (duration = 400) => {
    const debouncedSaveRef = useRef(
        debounce((callback) => {
            // oxlint-disable-next-line typescript/no-unsafe-call
            callback();
        }, duration)
    );

    return { debounce: debouncedSaveRef.current };
};
