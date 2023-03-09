/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';

export enum TextPosition {
    Below = 'Below',
    Above = 'Above',
}

export type BlockSettings = {
    positioning: TextPosition;
    description?: string;
    title?: string;
};

export type BlockAttachmentsProps = {
    assetToDownload: Asset;
    appBridge: AppBridgeBlock;
};

export type UploadPlaceholderProps = {
    onUploadClick: () => void;
    onAssetChooseClick: () => void;
    onFilesDrop: (files: FileList) => void;
    loading: boolean;
};

export type ItemToolbarProps = {
    onRemoveAsset: () => void;
    onUploadClick: () => void;
    onAssetChooseClick: () => void;
};

export enum AudioSecurity {
    Global = 'Global',
    Custom = 'Custom',
}
