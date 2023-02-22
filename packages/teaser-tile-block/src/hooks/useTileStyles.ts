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
    const { type, positioning, verticalAlignment, horizontalAlignment } = blockSettings;

    // Defining which settings to use (custom, choice or tile-specific)
    const height = blockSettings.isHeightCustom ? blockSettings.heightCustom : heightMap[blockSettings.heightChoice];
    const padding = blockSettings.isPaddingCustom
        ? blockSettings.paddingCustom
        : paddingMap[blockSettings.paddingChoice];

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
        tileSettings.isBackgroundVisible ?? blockSettings.isBackgroundVisible
            ? tileBackground ?? globalBackground
            : undefined;

    // Applying the defined settings to each component based on the tile type
    const textWrapperClassName = getTextWrapperClassName(type, verticalAlignment, horizontalAlignment, positioning);
    const tileClassName = getTileClassName(type, replaceWithPlaceholder, isToolbarFocused, isDragPreview, positioning);
    const imageWrapperClassName = getImageWrapperClassName(type, positioning);
    const imageClassName = getImageClassName(type, height, positioning);
    const imagePlaceholderClassName = getImagePlaceholderClassName(type, height, positioning, isEditing);
    const linkClassName = getLinkClassName();

    return {
        height,
        dragPreview: {
            style: { borderRadius },
        },
        link: {
            className: linkClassName,
            style: { borderRadius },
        },
        imagePlaceholder: {
            className: imagePlaceholderClassName,
        },
        image: {
            className: imageClassName,
            style: { height, objectFit },
        },
        imageWrapper: { className: imageWrapperClassName },
        textWrapper: {
            className: textWrapperClassName,
            style: {
                height: type === TileType.Text ? height : undefined,
                padding,
                background:
                    type === TileType.ImageText && positioning === TileImagePositioning.Behind ? background : undefined,
            },
        },
        tile: { className: tileClassName, style: { borderRadius, border, background } },
    };
};
