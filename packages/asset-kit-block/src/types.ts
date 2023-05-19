/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset, BulkDownloadState } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';

export type Settings = {
    hasBackgroundBlocks?: boolean;
    backgroundColorBlocks?: Color;
    hasBorder_blocks?: boolean;
    borderStyle_blocks?: BorderStyle;
    borderWidth_blocks?: string;
    borderColor_blocks?: Color;
    hasRadius_blocks?: boolean;
    radiusChoice_blocks: Radius;
    radiusValue_blocks?: number;
    hasBackgroundThumbnails?: boolean;
    backgroundColorThumbnails?: Color;
    hasBorder_thumbnails?: boolean;
    borderStyle_thumbnails?: BorderStyle;
    borderWidth_thumbnails?: string;
    borderColor_thumbnails?: Color;
    hasRadius_thumbnails?: boolean;
    radiusChoice_thumbnails: Radius;
    radiusValue_thumbnails?: number;
    description?: string;
    title?: string;
    downloadExpiration?: number;
    downloadUrlBlock: string;
};

export type AssetGridProps = {
    currentAssets: Asset[];
    appBridge: AppBridgeBlock;
    isEditing: boolean;
    deleteAssetIdsFromKey: (key: string, assetIds: number[]) => Promise<void>;
    updateAssetIdsFromKey: (key: string, assetIds: number[]) => Promise<void>;
    saveDownloadUrl: (downloadUrlBlock: string) => void;
};

export type AssetSelectionProps = {
    appBridge: AppBridgeBlock;
    isUploadingAssets: boolean;
    currentAssets: Asset[];
    addAssetIdsToKey: (key: string, assetIds: number[]) => Promise<void>;
    setIsUploadingAssets: (isUploadingAssets: boolean) => void;
    saveDownloadUrl: (downloadUrlBlock: string) => void;
};

export type DownloadMessageProps = {
    blockStyle: CSSProperties;
    status: BulkDownloadState;
};

export type InformationSectionProps = {
    description: string;
    isEditing: boolean;
    title: string;
    appBridge: AppBridgeBlock;
    setBlockSettings: (newSettings: Partial<Settings>) => void;
};

export type ThumbnailItemProps = {
    asset: Asset;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    onRemoveAsset: (assetId: number) => Promise<void>;
    onReplaceAsset: (toReplaceId: number, newId: number) => Promise<void>;
};

export type ThumbnailToolbarProps = {
    asset: Asset;
    isFocused: boolean;
    appBridge: AppBridgeBlock;
    onRemoveAsset: (assetId: number) => Promise<void>;
    onReplaceAsset: (toReplaceId: number, newId: number) => Promise<void>;
    setIsUploading: (isLoading: boolean) => void;
    isUploading: boolean;
};
