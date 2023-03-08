/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/fondue';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';

export type Settings = {
    hasBackground_blocks?: boolean;
    backgroundColor_blocks?: Color;
    hasBorder_blocks?: boolean;
    borderStyle_blocks?: BorderStyle;
    borderWidth_blocks?: string;
    borderColor_blocks?: Color;
    hasRadius_blocks?: boolean;
    radiusChoice_blocks: Radius;
    radiusValue_blocks?: number;
    hasBackground_thumbnails?: boolean;
    backgroundColor_thumbnails?: Color;
    hasBorder_thumbnails?: boolean;
    borderStyle_thumbnails?: BorderStyle;
    borderWidth_thumbnails?: string;
    borderColor_thumbnails?: Color;
    hasRadius_thumbnails?: boolean;
    radiusChoice_thumbnails: Radius;
    radiusValue_thumbnails?: number;
    description?: string;
    title?: string;
};

export enum BlockPreview {
    Image = 'image',
    Live = 'live',
}

export type DrawZoomInOutButtonsProps = {
    onClickZoomIn: () => void;
    onClickZoomOut: () => void;
    isFullScreen?: boolean;
};

export type GenerateBulkDownloadTokenRequest = {
    asset_ids: number[];
    set_ids: number[];
    language: string;
};

export type GenerateBulkDownloadTokenData = {
    token: string;
};

export type GenerateBulkDownloadRequest = {
    token: string;
};

export type GenerateBulkDownloadData = {
    signature: string;
    download_url: string;
};
