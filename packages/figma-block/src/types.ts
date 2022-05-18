/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';

export type BlockProps = {
    appBridge: AppBridgeNative;
};

export enum BlockPreview {
    Image = 'image',
    Live = 'live',
}

export type Settings = {
    figmaPreviewId: string;
    isHeightCustom: boolean;
    heightCustom: string;
    heightSimple: string;
    buttonText: string;
    showBorder: boolean;
    asset?: number;
};
