/* (c) Copyright Frontify Ltd., all rights reserved. */

import { postGenerateBulkDownloadToken } from './repository/BulkDownloadRepository';

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
