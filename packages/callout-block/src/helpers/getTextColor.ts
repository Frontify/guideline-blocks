/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getReadableColor, isDark } from '@frontify/guideline-blocks-shared';
import { Appearance } from '../types';

export const getTextColor = (appearance: Appearance, color: string, backgroundColor: string): string => {
    const isDarkColor = isDark(color, 185);
    const defaultTextColor = isDarkColor ? 'white' : 'black';

    if (appearance === Appearance.Light) {
        return isDarkColor ? color : getReadableColor(color, backgroundColor);
    }

    return defaultTextColor;
};
