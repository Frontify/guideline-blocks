/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, toHex8String } from '@frontify/guideline-blocks-settings';

export const getBorderOfBlock = (hasBorder: boolean, borderStyle: string, borderWidth: string, borderColor: Color) => {
    return hasBorder ? `${borderWidth} ${borderStyle} ${toHex8String(borderColor)}` : '';
};

export const getHeightOfBlock = (heightInSettings: string, isMobile: boolean) => {
    const MOBILE_HEIGHT_MODIFIER = 0.5;

    if (!heightInSettings.endsWith('px')) {
        return heightInSettings;
    }

    const heightWithoutUnit = Number.parseFloat(heightInSettings);

    return `${heightWithoutUnit * (isMobile ? MOBILE_HEIGHT_MODIFIER : 1)}px`;
};
