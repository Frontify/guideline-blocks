/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BorderStyle, borderStyleMap, radiusStyleMap, toRgbaString } from '@frontify/guideline-blocks-shared';
import { BACKGROUND_COLOR_DEFAULT_VALUE, BORDER_COLOR_DEFAULT_VALUE } from '../settings';
import { CSSProperties } from 'react';
import { Color } from '@frontify/fondue';
import { GenerateBulkDownloadTokenRequest, Settings } from '../types';
import { Asset } from '@frontify/app-bridge';
import { generateBulkDownloadRequest } from '../repository';

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
        hasBackground_thumbnails,
        backgroundColor_thumbnails = BACKGROUND_COLOR_DEFAULT_VALUE,
        hasBorder_thumbnails,
        borderStyle_thumbnails,
        borderWidth_thumbnails,
        borderColor_thumbnails = BORDER_COLOR_DEFAULT_VALUE,
        hasRadius_thumbnails,
        radiusChoice_thumbnails,
        radiusValue_thumbnails,
    } = blockSetting;

    return {
        ...(hasBackground_thumbnails && getBackgroundStyles(backgroundColor_thumbnails)),
        ...(hasBorder_thumbnails &&
            getBorderStyles(borderStyle_thumbnails, borderWidth_thumbnails, borderColor_thumbnails)),
        borderRadius: hasRadius_thumbnails ? radiusValue_thumbnails : radiusStyleMap[radiusChoice_thumbnails],
    };
};

export const blockStyle = (blockSetting: Settings): CSSProperties => {
    const {
        hasBackground_blocks,
        backgroundColor_blocks = BACKGROUND_COLOR_DEFAULT_VALUE,
        hasBorder_blocks,
        borderStyle_blocks,
        borderWidth_blocks,
        borderColor_blocks = BORDER_COLOR_DEFAULT_VALUE,
        hasRadius_blocks,
        radiusChoice_blocks,
        radiusValue_blocks,
    } = blockSetting;
    return {
        ...(hasBackground_blocks && getBackgroundStyles(backgroundColor_blocks)),
        ...(hasBorder_blocks && getBorderStyles(borderStyle_blocks, borderWidth_blocks, borderColor_blocks)),
        borderRadius: hasRadius_blocks ? radiusValue_blocks : radiusStyleMap[radiusChoice_blocks],
    };
};

const data: GenerateBulkDownloadTokenRequest = {
    asset_ids: [],
    set_ids: [],
    language: 'en',
};

export const generateBulkDownload = (
    projectId: number,
    downloadAssets: Asset[],
    setIsDownloadingAssets: (isDownloadAssets: boolean) => void
): void => {
    if (downloadAssets.length === undefined || downloadAssets.length <= 0) {
        return;
    }
    setIsDownloadingAssets(true);
    data.asset_ids = downloadAssets.map((asset) => asset.id);
    generateBulkDownloadRequest(projectId, data).then(() => setIsDownloadingAssets(false));
};
