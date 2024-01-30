/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash/debounce';
import { useRef } from 'react';

export const useDebounce = (duration = 400) => {
    const debouncedSave = useRef(
        debounce((callback) => {
            callback();
        }, duration)
    );

    return { debounce: debouncedSave.current };
};
