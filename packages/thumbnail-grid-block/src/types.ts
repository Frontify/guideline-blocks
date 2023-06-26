/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color } from '@frontify/guideline-blocks-settings';
import { BorderStyle, GutterSpacing, Radius } from '@frontify/guideline-blocks-shared';
import { CSSProperties } from 'react';
import { AppBridgeBlock, Asset } from '@frontify/app-bridge';

export type Thumbnail = {
    id: string;
    title?: string;
    description?: string;
    image?: string;
    altText?: string;
};

export enum HorizontalAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum VerticalAlignment {
    Start = 'start',
    Center = 'center',
    End = 'end',
}

export type Settings = {
    columnCount: '1' | '2' | '3' | '4' | '5';
    hasCustomSpacing: boolean;
    spacingCustom: string;
    spacingChoice: GutterSpacing;
    imagePosition: CaptionPosition;
    hasCustomImageWidth: boolean;
    customImageWidth: string;
    imageWidthPreset: '25%' | '33%' | '50%' | '75%';
    verticalImageAlignment: VerticalAlignment;
    horizontalImageAlignment: HorizontalAlignment;
    hasBackground: boolean;
    backgroundColor: Color;
    hasBorder: boolean;
    borderStyle: BorderStyle;
    borderWidth: string;
    borderColor: Color;
    radiusChoice: Radius;
    radiusValue: string;
    hasRadius: boolean;
    items: Thumbnail[];
};

export type SortableThumbnailItemProps = {
    isEditing: boolean;
    onRemoveAsset: (id: string, imageId?: number) => void;
    image: Asset | undefined;
    updateItemWith: (type: keyof Thumbnail, value: string | Asset[], id?: string) => void;
    thumbnailStyles: ThumbnailStylesProps;
    item: Thumbnail;
    onFilesDrop: (files: FileList, id?: string) => void;
    openFileDialog: () => void;
    openAssetChooser: (id?: string) => void;
    setUploadedId: (id: string) => void;
    isLoading: boolean;
    appBridge: AppBridgeBlock;
};

export type ThumbnailItemProps = SortableThumbnailItemProps & {
    isDragging?: boolean;
    setActivatorNodeRef?: (node: HTMLElement | null) => void;
    replaceWithPlaceholder?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
};

export enum CaptionPosition {
    Below = 'Below',
    Above = 'Above',
    Right = 'Right',
    Left = 'Left',
}

export type ThumbnailStylesProps = {
    captionPositionClassNames: string;
    imageIsAboveOrBelow: boolean;
    alignmentClassNames: string;
    width: string;
    imageStyles?: CSSProperties;
};
