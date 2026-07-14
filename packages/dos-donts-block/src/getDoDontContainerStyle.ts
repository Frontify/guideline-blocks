/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DEFAULT_BACKGROUND_COLOR, DEFAULT_BORDER_COLOR } from './settings';
import { type Settings } from './types';

export const getDoDontContainerStyle = (blockSettings: Settings) => {
    const {
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

    return {
        borderWidth,
        borderStyle,
        hasBackground,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
        resolvedBackgroundColor: backgroundColor || DEFAULT_BACKGROUND_COLOR,
        resolvedBorderColor: borderColor || DEFAULT_BORDER_COLOR,
    };
};
