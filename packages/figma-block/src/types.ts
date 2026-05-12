/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Color, type Radius } from '@frontify/guideline-blocks-settings';

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
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: Color;
    backgroundColor?: Color;
    hasRadius: boolean;
    radiusChoice: Radius;
    radiusValue: string;
    allowFullScreen: boolean;
    allowZooming: boolean;
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
    isMobile: boolean;
};

export type ImageStageProps = {
    title: string | undefined;
    url: string;
    hasLimitedOptions?: boolean;
    height?: string;
    hasBorder?: boolean;
    hasBackground?: boolean;
    isMobile: boolean;
    borderStyle: string;
    borderColor: Color;
    backgroundColor?: Color;
    borderWidth: string;
    hasRadius: boolean;
    radiusValue: string;
    radiusChoice: Radius;
    allowFullScreen: boolean;
    allowZooming: boolean;
};

export type DrawFullScreenActionButtonProps = {
    isFullScreen?: boolean;
    onClick: () => void;
};

export type DrawZoomInOutButtonsProps = {
    onClickZoomIn: () => void;
    onClickZoomOut: () => void;
    isFullScreen?: boolean;
};
