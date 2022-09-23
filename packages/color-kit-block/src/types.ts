/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock, FrontifyColorPalette } from '@frontify/app-bridge';

export type Settings = {
    colorPaletteIds: number[];
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
