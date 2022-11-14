/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';

export type BlockProps = {
    appBridge: AppBridgeBlock;
};

export type Settings = {
    template?: number;
    previewType: PreviewType;
    customPreview?: Asset;
    title?: string;
    description?: string;
};

export enum PreviewType {
    None = 'None',
    Template = 'Template',
    Custom = 'Custom',
}
