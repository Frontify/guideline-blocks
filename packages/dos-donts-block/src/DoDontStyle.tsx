/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemo } from 'react';

import {
    DO_COLOR_DEFAULT_VALUE,
    DONT_COLOR_DEFAULT_VALUE,
    getDefaultDoColor,
    getDefaultDontColor,
} from './helpers/Color';
import { getGridClassName } from './helpers/Grid';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from './settings';
import { GUTTER_VALUES, type Settings } from './types';

export const useDoDontStyle = (blockSettings: Settings) => {
    const {
        style,
        hasCustomDoIcon,
        doIconChoice,
        hasCustomDontIcon,
        dontIconChoice,
        hasStrikethrough,
        columns,
        keepSideBySide,
        isCustomColumnGutter,
        customColumnGutterValue,
        columnGutterChoice,
        isCustomRowGutter,
        customRowGutterValue,
        rowGutterChoice,
        isCustomImageHeight,
        customImageHeightValue,
        imageDisplay,
        imageHeightChoice,
        doColor: customDoColor,
        dontColor: customDontColor,
        hasCustomDoColor,
        hasCustomDontColor,
        mode,
        borderWidth,
        backgroundColor,
        borderColor,
        borderStyle,
        hasBackground,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
    } = blockSettings;

    const columnGap = isCustomColumnGutter ? customColumnGutterValue : GUTTER_VALUES[columnGutterChoice];
    const rowGap = isCustomRowGutter ? customRowGutterValue : GUTTER_VALUES[rowGutterChoice];

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
        style,
        hasCustomDoIcon,
        doIconChoice,
        hasCustomDontIcon,
        dontIconChoice,
        hasStrikethrough,
        columns,
        isCustomImageHeight,
        customImageHeightValue,
        imageDisplay,
        imageHeightChoice,
        mode,
        borderWidth,
        borderStyle,
        hasBackground,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
        columnGap,
        rowGap,
        gridClassName: getGridClassName(keepSideBySide, columns),
        doColor,
        dontColor,
        resolvedDoColor: doColor || DO_COLOR_DEFAULT_VALUE,
        resolvedDontColor: dontColor || DONT_COLOR_DEFAULT_VALUE,
        resolvedBackgroundColor: backgroundColor || DEFAULT_BACKGROUND_COLOR,
        resolvedBorderColor: borderColor || DEFAULT_BORDER_COLOR,
    };
};
