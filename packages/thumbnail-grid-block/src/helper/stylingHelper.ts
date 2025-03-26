/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CaptionPosition, HorizontalAlignment, Settings, ThumbnailStylesProps, VerticalAlignment } from '../types';
import { merge } from '@frontify/fondue';
import { getBorderStyles, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-settings';
import { CSSProperties } from 'react';
import { DEFAULT_BORDER_COLOR } from '../settings';

const mapCaptionPositionClasses: Record<CaptionPosition, string> = {
    [CaptionPosition.Below]: 'tw-flex-col tw-justify-start',
    [CaptionPosition.Above]: 'tw-flex-col-reverse tw-justify-end',
    [CaptionPosition.Right]: 'tw-flex-row',
    [CaptionPosition.Left]: 'tw-flex-row-reverse',
};
const mapHorizontalAlignment: Record<HorizontalAlignment, string> = {
    [HorizontalAlignment.Left]: 'tw-grid tw-justify-items-start tw-w-full',
    [HorizontalAlignment.Center]: 'tw-grid tw-justify-items-center tw-w-full',
    [HorizontalAlignment.Right]: 'tw-grid tw-justify-items-end tw-w-full',
};
const mapVerticalAlignment: Record<VerticalAlignment, string> = {
    [VerticalAlignment.Start]: 'tw-place-self-start',
    [VerticalAlignment.Center]: 'tw-place-self-center',
    [VerticalAlignment.End]: 'tw-place-self-end',
};

export const getThumbnailStyles = (blockSettings: Settings): ThumbnailStylesProps => {
    const {
        imagePosition,
        horizontalImageAlignment,
        verticalImageAlignment,
        hasCustomImageWidth,
        customImageWidth,
        imageWidthPreset,
    } = blockSettings;

    const imageIsAboveOrBelow = imagePosition === CaptionPosition.Above || imagePosition === CaptionPosition.Below;
    const alignmentClassNames = imageIsAboveOrBelow
        ? mapHorizontalAlignment[horizontalImageAlignment]
        : mapVerticalAlignment[verticalImageAlignment];
    const width = hasCustomImageWidth ? customImageWidth : imageWidthPreset;
    const imageStyles = getImageStyle(blockSettings);
    const captionPositionClassNames = merge([
        'tw-flex tw-gap-3 tw-h-full tw-w-full',
        mapCaptionPositionClasses[imagePosition],
    ]);

    return {
        captionPositionClassNames,
        imageIsAboveOrBelow,
        alignmentClassNames,
        width,
        imageStyles,
    };
};

const getImageStyle = (blockSettings: Settings): CSSProperties => {
    const {
        borderColor,
        borderStyle,
        backgroundColor,
        borderWidth,
        hasBackground,
        hasBorder,
        hasRadius,
        radiusChoice,
        radiusValue,
    } = blockSettings;

    const color = hasBackground && backgroundColor ? toRgbaString(backgroundColor) : undefined;
    const border = hasBorder ? getBorderStyles(borderStyle, borderWidth, borderColor || DEFAULT_BORDER_COLOR) : {};
    const borderRadius = hasRadius ? radiusValue : radiusStyleMap[radiusChoice ?? 'none'];

    return {
        backgroundColor: color,
        borderRadius,
        ...border,
    };
};
