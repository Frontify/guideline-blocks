/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { DesignTokenName, TokenValues } from '../../hooks';
import { DesignTokens } from '@frontify/fondue';

export type AttachmentsProps = {
    items: Asset[] | undefined;
    appBridge: AppBridgeBlock;
    designTokens: DesignTokens;
    onReplaceWithUpload: (attachmentToReplace: Asset, newAsset: Asset) => Promise<void>;
    onReplaceWithBrowse: (attachmentToReplace: Asset, newAsset: Asset) => Promise<void>;
    onDelete: (attachmentToDelete: Asset) => void;
    onUpload: (uploadedAttachments: Asset[]) => Promise<void>;
    onBrowse: (browserAttachments: Asset[]) => void;
    onSorted: (sortedAttachments: Asset[]) => void;
};

export type AttachmentItemProps = SortableAttachmentItemProps & {
    isDragging?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
    isOverlay?: boolean;
};

export type SortableAttachmentItemProps = {
    item: Asset;
    isEditing: boolean;
    designTokens: Partial<Record<DesignTokenName, TokenValues>> | null;
    onDelete: () => void;
    isLoading?: boolean;
    onReplaceWithBrowse: () => void;
    onReplaceWithUpload: (uploadedAsset: Asset) => void;
};
