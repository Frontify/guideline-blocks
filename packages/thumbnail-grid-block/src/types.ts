/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { BorderStyle, Color, GutterSpacing, Radius, Security } from '@frontify/guideline-blocks-settings';
import type { CSSProperties } from 'react';
import type { AppBridgeBlock, Asset } from '@frontify/app-bridge';

export type Thumbnail = {
    id: string;
    title?: string;
    description?: string;
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
    security: Security;
    assetViewerEnabled: boolean;
};

export type SortableThumbnailItemProps = {
    isEditing: boolean;
    onRemoveItem: (id: string) => void;
    showGrabHandle: boolean;
    showDeleteButton: boolean;
    image: Asset | undefined;
    updateItem: (updatedItem: Thumbnail) => void;
    thumbnailStyles: ThumbnailStylesProps;
    item: Thumbnail;
    onAssetsSelected: (assets: Asset[], id: string) => void;
    onFilesSelected: (files: FileList, id: string) => void;
    onFilesUploaded: (assets: Asset[], id: string) => void;
    isLoading: boolean;
    appBridge: AppBridgeBlock;
    isAssetViewerEnabled?: boolean;
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
