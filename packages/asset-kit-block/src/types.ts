/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset, AssetBulkDownloadState } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';
import { BorderStyle, Radius } from '@frontify/guideline-blocks-settings';
import { CSSProperties } from 'react';

export type Settings = {
    hasBackgroundBlocks?: boolean;
    backgroundColorBlocks?: Color | null;
    hasBorder_blocks?: boolean;
    borderStyle_blocks?: BorderStyle;
    borderWidth_blocks?: string;
    borderColor_blocks?: Color | null;
    hasRadius_blocks?: boolean;
    radiusChoice_blocks: Radius;
    radiusValue_blocks?: number;
    hasBackgroundThumbnails?: boolean;
    backgroundColorThumbnails?: Color | null;
    hasBorder_thumbnails?: boolean;
    borderStyle_thumbnails?: BorderStyle;
    borderWidth_thumbnails?: string;
    borderColor_thumbnails?: Color | null;
    hasRadius_thumbnails?: boolean;
    radiusChoice_thumbnails: Radius;
    radiusValue_thumbnails?: number;
    description?: string;
    title?: string;
    downloadUrlBlock?: string;
    showThumbnails?: boolean;
    showCount?: boolean;
    assetCountColor?: 'inherit' | 'override';
    countCustomColor?: Color;
    buttonText?: string;
};

export type AssetGridProps = {
    currentAssets: Asset[];
    appBridge: AppBridgeBlock;
    isEditing: boolean;
    showThumbnails?: boolean;
    showCount?: boolean;
    countColor?: Color;
    deleteAssetIdsFromKey: (key: string, assetIds: number[]) => Promise<void>;
    updateAssetIdsFromKey: (key: string, assetIds: number[]) => Promise<void>;
};

export type AssetSelectionProps = {
    appBridge: AppBridgeBlock;
    isUploadingAssets: boolean;
    currentAssets: Asset[];
    addAssetIdsToKey: (key: string, assetIds: number[]) => Promise<void>;
    setIsUploadingAssets: (isUploadingAssets: boolean) => void;
};

export type DownloadMessageProps = {
    blockStyle: CSSProperties;
    status: AssetBulkDownloadState;
};

export type InformationSectionProps = {
    title?: string;
    description?: string;
    isEditing: boolean;
    appBridge: AppBridgeBlock;
    setBlockSettings: (newSettings: Partial<Settings>) => void;
};

export type ThumbnailItemProps = {
    asset: Asset;
    currentAssetsIds: number[];
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

export type AssetCountProps = {
    count: number;
    color?: Color;
};
