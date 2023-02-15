/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ItemStyleSettings, StyleSettings, brandItemBrandItemSizeMap } from '../types';
import { CSSProperties } from 'react';
import { BorderStyle, borderStyleMap, radiusStyleMap, toHex8String } from '@frontify/guideline-blocks-shared';
import { Color } from '@frontify/guideline-blocks-settings';

export const borderSettingsToCss = (width: string, style: BorderStyle, color: Color): CSSProperties['border'] =>
    `${width} ${borderStyleMap[style]} ${toHex8String(color)}`;

export const styleSettingsToCSS = (styleSettings: StyleSettings): CSSProperties => {
    const {
        backgroundColor,
        borderColor,
        borderWidth,
        borderStyle,
        borderRadius,
        hasBorder,
        hasCustomRadius,
        customBorderRadius,
    } = styleSettings;

    return {
        backgroundColor: toHex8String(backgroundColor),
        border: hasBorder ? borderSettingsToCss(borderWidth, borderStyle, borderColor) : 'none',
        borderRadius: hasCustomRadius ? customBorderRadius : radiusStyleMap[borderRadius],
    };
};

export const itemStyleSettingssToCss = (styleSettings: ItemStyleSettings): CSSProperties => {
    const { itemSizeSimple, itemSizeCustom, isBrandItemSizeCustom, ...base } = styleSettings;
    const baseCss = styleSettingsToCSS(base);
    const size = isBrandItemSizeCustom ? itemSizeCustom : brandItemBrandItemSizeMap[itemSizeSimple];

    return {
        width: size,
        height: size,
        ...baseCss,
    };
};
