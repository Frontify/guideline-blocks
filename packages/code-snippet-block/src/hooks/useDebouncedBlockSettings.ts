/* (c) Copyright Frontify Ltd., all rights reserved. */

import debounce from 'lodash-es/debounce';
import { useEffect, useMemo, useRef } from 'react';

const DEFAULT_DEBOUNCE_DELAY = 500;
type SetBlockSettings<T> = (newSettings: Partial<T>) => Promise<void>;

export const useDebouncedBlockSettings = <T>(setBlockSettings: SetBlockSettings<T>, delay = DEFAULT_DEBOUNCE_DELAY) => {
    const setBlockSettingsRef = useRef(setBlockSettings);

    useEffect(() => {
        setBlockSettingsRef.current = setBlockSettings;
    }, [setBlockSettings]);

    const debouncedSetBlockSettings = useMemo(
        () =>
            debounce((newSettings: Partial<T>) => {
                setBlockSettingsRef.current(newSettings).catch((error: unknown) => {
                    console.error('[useDebouncedBlockSettings] Failed to update block settings:', error);
                });
            }, delay),
        [delay]
    );

    useEffect(
        () => () => debouncedSetBlockSettings.flush(),
        [debouncedSetBlockSettings]
    );

    return debouncedSetBlockSettings;
};
