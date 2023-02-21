/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';

export enum TextPosition {
    Below = 'Below',
    Above = 'Above',
}

export type BlockSettings = {
    positioning: TextPosition;
    audio: Asset[] | undefined;
    description?: string;
    title?: string;
};

export type BlockAttachmentsProps = {
    downloadAsset: Asset;
    appBridge: AppBridgeBlock;
};

export type UploadPlaceholderProps = {
    onUploadClick: (() => void) | undefined;
    onAssetChooseClick: (() => void) | undefined;
    setDroppedFiles: (files: FileList) => void;
    loading: boolean;
};

export type ItemToolbarProps = {
    onRemoveAsset: () => void;
    onUploadClick: (() => void) | undefined;
    onAssetChooseClick: (() => void) | undefined;
};
