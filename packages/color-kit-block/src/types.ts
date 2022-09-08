import { AppBridgeBlock } from '@frontify/app-bridge';
import { Color } from '@frontify/fondue';

export type Settings = {
    colorPalettes: string[];
};

export type ColorKitBlockProps = {
    appBridge: AppBridgeBlock;
};

export type TooltipContentProps = {
    color: string;
    status: string;
};
