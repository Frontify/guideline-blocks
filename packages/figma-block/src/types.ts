/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '@frontify/app-bridge';

export enum BlockPreview {
    Image = 'image',
    Live = 'live',
}

export enum HeightChoices {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export enum Zoom {
    IN = -1,
    OUT = 1,
}

export enum Cursor {
    GRAB = 'grab',
    GRABBING = 'grabbing',
    DEFAULT = 'default',
}

export type BlockProps = {
    appBridge: AppBridgeNative;
};

export type UseMediaStageProps = {
    height: string;
};

export type Point = {
    x: number;
    y: number;
};

export type Settings = {
    figmaPreviewId: string;
    isHeightCustom: boolean;
    heightCustom: string;
    heightSimple: string;
    buttonText: string;
    asset?: number;
    hasBorder?: boolean;
    isCustomHeight?: boolean;
    heightValue?: string;
    heightChoice?: HeightChoices;
};

export type BoundingClientRectProperties = {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
};

export type MediaStageProps = {
    title: string | undefined;
    url: string;
    height?: string;
    hasBorder?: boolean;
    hasBackground?: boolean;
};

export type DrawFullScreenActionButtonProps = {
    isFullScreen: boolean;
    onClick: () => void;
};

export type DrawZoomInOutButtonsProps = {
    onClickZoomIn: () => void;
    onClickZoomOut: () => void;
};
