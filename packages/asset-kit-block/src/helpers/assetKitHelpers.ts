/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getBackgroundColorStyles, getBorderStyles, getRadiusStyles } from '@frontify/guideline-blocks-settings';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from '../settings';
import { CSSProperties } from 'react';
import { Settings } from '../types';

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
        ...(hasBackgroundThumbnails && getBackgroundColorStyles(backgroundColorThumbnails)),
        ...(hasBorder_thumbnails &&
            getBorderStyles(borderStyle_thumbnails, borderWidth_thumbnails, borderColor_thumbnails)),
        ...getRadiusStyles(radiusChoice_thumbnails, hasRadius_thumbnails, radiusValue_thumbnails),
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
        ...(hasBackgroundBlocks && getBackgroundColorStyles(backgroundColorBlocks)),
        ...(hasBorder_blocks && getBorderStyles(borderStyle_blocks, borderWidth_blocks, borderColor_blocks)),
        ...getRadiusStyles(radiusChoice_blocks, hasRadius_blocks, radiusValue_blocks),
    };
};

export const getSmallPreviewUrl = (url: string) => {
    return url.replace('{width}', '218');
};
