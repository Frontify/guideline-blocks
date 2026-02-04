/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type AppBridgeBlock } from '@frontify/app-bridge';
import { type Security } from '@frontify/guideline-blocks-settings';

export enum TextPosition {
    Below = 'Below',
    Above = 'Above',
}

export type BlockSettings = {
    security: Security;
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
