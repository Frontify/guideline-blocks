/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, FrontifyColorPalette } from '@frontify/app-bridge';

export type Settings = {
    colorPalettes: number[];
};

export type ColorKitBlockProps = {
    appBridge: AppBridgeBlock;
};

export type TooltipContentProps = {
    color: string;
};

export type PaletteProps = {
    palette: FrontifyColorPalette;
};
