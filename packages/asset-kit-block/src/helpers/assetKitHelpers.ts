/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, borderStyleMap, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from '../settings';
import { CSSProperties } from 'react';
import { Color } from '@frontify/fondue';
import { Settings } from '../types';

export const getBorderStyles = (
    style = BorderStyle.Solid,
    width = '1px',
    color = BORDER_COLOR_DEFAULT_VALUE
): CSSProperties => ({
    borderStyle: borderStyleMap[style],
    borderWidth: width,
    borderColor: toRgbaString(color),
});

export const getBackgroundStyles = (backgroundColor: Color): CSSProperties =>
    backgroundColor ? { backgroundColor: toRgbaString(backgroundColor) } : {};

export const thumbnailStyle = (blockSetting: Settings): CSSProperties => {
    const {
        hasBackgroundThumbnails,
        backgroundColorThumbnails = BACKGROUND_COLOR_DEFAULT_VALUE,
        hasBorder_thumbnails,
        borderStyle_thumbnails,
        borderWidth_thumbnails,
        borderColor_thumbnails = BORDER_COLOR_DEFAULT_VALUE,
        hasRadius_thumbnails,
        radiusChoice_thumbnails,
        radiusValue_thumbnails,
    } = blockSetting;

    return {
        ...(hasBackgroundThumbnails && getBackgroundStyles(backgroundColorThumbnails)),
        ...(hasBorder_thumbnails &&
            getBorderStyles(borderStyle_thumbnails, borderWidth_thumbnails, borderColor_thumbnails)),
        borderRadius: hasRadius_thumbnails ? radiusValue_thumbnails : radiusStyleMap[radiusChoice_thumbnails],
    };
};

export const blockStyle = (blockSetting: Settings): CSSProperties => {
    const {
        hasBackgroundBlocks,
        backgroundColorBlocks = BACKGROUND_COLOR_DEFAULT_VALUE,
        hasBorder_blocks,
        borderStyle_blocks,
        borderWidth_blocks,
        borderColor_blocks = BORDER_COLOR_DEFAULT_VALUE,
        hasRadius_blocks,
        radiusChoice_blocks,
        radiusValue_blocks,
    } = blockSetting;
    return {
        ...(hasBackgroundBlocks && getBackgroundStyles(backgroundColorBlocks)),
        ...(hasBorder_blocks && getBorderStyles(borderStyle_blocks, borderWidth_blocks, borderColor_blocks)),
        borderRadius: hasRadius_blocks ? radiusValue_blocks : radiusStyleMap[radiusChoice_blocks],
    };
};
