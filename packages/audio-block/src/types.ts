/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import { Security } from '@frontify/guideline-blocks-shared';
import { DesignTokens } from '@frontify/fondue';

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
    designTokens: DesignTokens;
};

export type UploadPlaceholderProps = {
    onUploadClick: () => void;
    onAssetChooseClick: () => void;
    onFilesDrop: (files: FileList) => void;
    loading: boolean;
};
