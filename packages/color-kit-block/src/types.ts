import { AppBridgeBlock } from '@frontify/app-bridge';

export type Settings = {
    colorPalettes: string[];
};

export type Palette = { id: string; name: string; colors: any[] };

export type ColorKitBlockProps = {
    appBridge: AppBridgeBlock;
};

export type TooltipContentProps = {
    color: string;
};

export type PaletteProps = {
    palette: Palette;
};
