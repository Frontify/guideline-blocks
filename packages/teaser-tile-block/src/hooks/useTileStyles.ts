/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { heightMap, objectFitMap, paddingMap, radiusMap } from '../helpers';
import {
    getImageClassName,
    getImagePlaceholderClassName,
    getImageWrapperClassName,
    getLinkClassName,
    getTextWrapperClassName,
    getTileClassName,
} from '../helpers/classNames';
import { Settings, TileImagePositioning, TileSettings, TileType } from '../types';

export const useTileStyles = (
    blockSettings: Settings,
    tileSettings: TileSettings,
    isEditing: boolean,
    isToolbarFocused: boolean,
    isDragPreview: boolean,
    replaceWithPlaceholder: boolean
) => {
    const { type, positioning, verticalAlignment } = blockSettings;

    // Defining which settings to use (custom, choice or tile-specific)
    const height = blockSettings.height ? blockSettings.heightCustom : heightMap[blockSettings.heightChoice];
    const padding = blockSettings.padding ? blockSettings.paddingCustom : paddingMap[blockSettings.paddingChoice];

    // TODO: should be by default lowercase instead of uppercase
    const textAlign = blockSettings.horizontalAlignment.toLowerCase() as 'left' | 'right' | 'center';

    // TODO: should be by default lowercase instead of uppercase
    const border = blockSettings.hasBorder
        ? `${blockSettings.borderWidth} ${blockSettings.borderStyle.toLowerCase()} ${toRgbaString(
              blockSettings.borderColor
          )}`
        : undefined;
    const borderRadius = blockSettings.hasRadius ? blockSettings.radiusValue : radiusMap[blockSettings.radiusChoice];

    const globalObjectFit = objectFitMap[blockSettings.display];
    const tileObjectFit = tileSettings.display ? objectFitMap[tileSettings.display] : undefined;
    const objectFit = height === 'auto' ? 'cover' : tileObjectFit ?? globalObjectFit;

    const globalBackground = blockSettings.backgroundColor ? toRgbaString(blockSettings.backgroundColor) : undefined;
    const tileBackground = tileSettings.backgroundColor ? toRgbaString(tileSettings.backgroundColor) : undefined;
    const background =
        tileSettings.backgroundVisibility ?? blockSettings.background ? tileBackground ?? globalBackground : undefined;

    // Applying the defined settings to each component based on the tile type
    const textWrapperClassName = getTextWrapperClassName(type, verticalAlignment, positioning);
    const textWrapperStyle = {
        height: type === TileType.Text ? height : undefined,
        padding,
        textAlign,
        background: type === TileType.ImageText && positioning === TileImagePositioning.Behind ? background : undefined,
    };

    const tileClassName = getTileClassName(type, replaceWithPlaceholder, isToolbarFocused, isDragPreview, positioning);
    const tileStyles = { borderRadius, border, background };

    const imageWrapperClassName = getImageWrapperClassName(type, positioning);

    const imageClassName = getImageClassName(type, height, positioning);
    const imageStyle = { height, objectFit };

    const imagePlaceholderClassName = getImagePlaceholderClassName(type, height, positioning, isEditing);

    const linkClassName = getLinkClassName();
    const linkStyle = { borderRadius };

    const dragPreviewStyle = { borderRadius };

    return {
        height,
        dragPreview: {
            style: dragPreviewStyle,
        },
        link: {
            className: linkClassName,
            style: linkStyle,
        },
        imagePlaceholder: {
            className: imagePlaceholderClassName,
        },
        image: {
            className: imageClassName,
            style: imageStyle,
        },
        imageWrapper: { className: imageWrapperClassName },
        textWrapper: { className: textWrapperClassName, style: textWrapperStyle },
        tile: { className: tileClassName, style: tileStyles },
    };
};
