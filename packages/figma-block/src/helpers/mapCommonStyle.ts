/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, toHex8String } from '@frontify/guideline-blocks-settings';

const DEFAULT_BORDER_COLOR: Color = { red: 0, green: 0, blue: 0 };

export const getBorderOfBlock = (hasBorder: boolean, borderStyle: string, borderWidth: string, borderColor: Color) => {
    return hasBorder ? `${borderWidth} ${borderStyle} ${toHex8String(borderColor || DEFAULT_BORDER_COLOR)}` : '';
};

export const getHeightOfBlock = (heightInSettings: string, isMobile: boolean) => {
    const MOBILE_HEIGHT_MODIFIER = 0.5;

    if (!heightInSettings.endsWith('px') && Number.isNaN(Number(heightInSettings))) {
        return heightInSettings;
    }
    const heightWithoutUnit = Number.parseFloat(heightInSettings);
    return `${heightWithoutUnit * (isMobile ? MOBILE_HEIGHT_MODIFIER : 1)}px`;
};
