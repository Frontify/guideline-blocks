/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';

export enum TextPosition {
    Below = 'Below',
    Above = 'Above',
}

export type BlockSettings = {
    downloadable: boolean;
    positioning: TextPosition;
    description?: string;
    title?: string;
};

export type BlockAttachmentsProps = {
    appBridge: AppBridgeBlock;
};

export type UploadPlaceholderProps = {
    onUploadClick: () => void;
    onAssetChooseClick: () => void;
    onFilesDrop: (files: FileList) => void;
    loading: boolean;
};

export enum AudioSecurity {
    Global = 'Global',
    Custom = 'Custom',
}
