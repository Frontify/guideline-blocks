/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getReadableColor, toShortRgba } from '@frontify/guideline-blocks-shared';
import tinycolor from 'tinycolor2';
import { Appearance } from '../types';

export const getTextColor = (appearance: Appearance, color: string, backgroundColor: string): string => {
    const parsedColor = tinycolor(toShortRgba(color));
    const brightness = parsedColor.getBrightness();
    const isDarkColor = brightness < 150;

    const defaultTextColor = isDarkColor ? 'white' : 'black';

    if (appearance === Appearance.Light) {
        return isDarkColor ? color : getReadableColor(color, backgroundColor);
    }

    return defaultTextColor;
};
