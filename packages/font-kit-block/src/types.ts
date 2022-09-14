/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';

export interface Settings {
    exampleText: string;
    withFontStyles: boolean;
    withExampleText: boolean;
    withFontFileFormat: boolean;
}

export interface FontType {
    id: number;
    name: string;
    fontFamily: string;
    numberOfStyles: number;
}

export interface FontKitBlockProps {
    appBridge: AppBridgeBlock;
}

export interface FontProps {
    font: FontType;
    placeholder?: string;
    withStyles?: boolean;
    withExampleText?: boolean;
}
