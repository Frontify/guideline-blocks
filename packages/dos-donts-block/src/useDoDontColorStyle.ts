/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import {
    DO_COLOR_DEFAULT_VALUE,
    DONT_COLOR_DEFAULT_VALUE,
    getDefaultDoColor,
    getDefaultDontColor,
} from './helpers/Color';
import { type Settings } from './types';

export const useDoDontColorStyle = (blockSettings: Settings) => {
    const { doColor: customDoColor, dontColor: customDontColor, hasCustomDoColor, hasCustomDontColor } = blockSettings;

    const themeStyle = useMemo(() => getComputedStyle(document.body), []);
    const defaultDoColor = useMemo(() => getDefaultDoColor(themeStyle), [themeStyle]);
    const defaultDontColor = useMemo(() => getDefaultDontColor(themeStyle), [themeStyle]);

    const doColor = useMemo(
        () => (hasCustomDoColor ? customDoColor : defaultDoColor),
        [customDoColor, hasCustomDoColor, defaultDoColor]
    );

    const dontColor = useMemo(
        () => (hasCustomDontColor ? customDontColor : defaultDontColor),
        [customDontColor, hasCustomDontColor, defaultDontColor]
    );

    return {
        doColor,
        dontColor,
        resolvedDoColor: doColor || DO_COLOR_DEFAULT_VALUE,
        resolvedDontColor: dontColor || DONT_COLOR_DEFAULT_VALUE,
    };
};
