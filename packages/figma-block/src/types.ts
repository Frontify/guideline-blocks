import { AppBridgeNative } from '@frontify/app-bridge';

export type BlockProps = {
    appBridge: AppBridgeNative;
    onClickOpenAssetChooser?: () => void;
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
    asset?: number;
};
