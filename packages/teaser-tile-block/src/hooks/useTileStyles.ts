/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toRgbaString } from '@frontify/guideline-blocks-shared';
import { heightMap, objectFitMap, paddingMap, radiusMap } from '../helpers';
import { Settings, TileSettings } from '../types';

export const useTileStyles = (blockSettings: Settings, tileSettings: TileSettings) => {
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

    const globalObjectFit = objectFitMap[blockSettings.display];
    const tileObjectFit = tileSettings.display ? objectFitMap[tileSettings.display] : undefined;
    const objectFit = height === 'auto' ? 'cover' : tileObjectFit ?? globalObjectFit;

    const globalBackground = blockSettings.background ? toRgbaString(blockSettings.backgroundColor) : undefined;
    const tileBackground = tileSettings.backgroundColor ? toRgbaString(tileSettings.backgroundColor) : undefined;
    const background = tileSettings.backgroundVisibility !== false ? tileBackground ?? globalBackground : undefined;
    const borderRadius = blockSettings.hasRadius ? blockSettings.radiusValue : radiusMap[blockSettings.radiusChoice];

    return { height, background, objectFit, padding, textAlign, border, borderRadius };
};
