/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { AppBridgeBlock } from '@frontify/app-bridge';

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
    appBridge: AppBridgeBlock;
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
    showFigmaLink?: boolean;
    hasBackground?: boolean;
    hasLimitedOptions?: boolean;
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

export type UseImageStageProps = {
    height: string;
    hasLimitedOptions: boolean;
};

export type ImageStageProps = {
    title: string | undefined;
    url: string;
    hasLimitedOptions?: boolean;
    height?: string;
    hasBorder?: boolean;
    hasBackground?: boolean;
};

export type DrawFullScreenActionButtonProps = {
    isFullScreen?: boolean;
    onClick: () => void;
};

export type DrawZoomInOutButtonsProps = {
    onClickZoomIn: () => void;
    onClickZoomOut: () => void;
};
