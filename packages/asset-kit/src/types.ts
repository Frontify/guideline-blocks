/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';

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

export type AssetGridProps = {
    currentAssets: Asset[];
    deleteAssetIdsFromKey: (key: string, assetIds: number[]) => Promise<void>;
    isEditing: boolean;
    thumbnailStyle: CSSProperties;
};

export type AssetSelectionProps = {
    appBridge: AppBridgeBlock;
    isUploadingAssets: boolean;
    setIsUploadingAssets: (isUploadingAssets: boolean) => void;
    addAssetIdsToKey: (key: string, assetIds: number[]) => Promise<void>;
    currentAssets: Asset[];
};

export type DownloadMessageProps = {
    blockStyle: CSSProperties;
};

export type InformationSectionProps = {
    description: string;
    isEditing: boolean;
    setBlockSettings: (newSettings: Partial<Settings>) => void;
    title: string;
};

export type ThumbnailItemProps = {
    asset: Asset;
    isEditing: boolean;
    onRemoveAsset: (assetId: number) => void;
    thumbnailStyle: CSSProperties;
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
