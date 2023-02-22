/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset } from '@frontify/app-bridge';
import { DesignTokenName, TokenValues } from '../../hooks';

export interface AttachmentsProps {
    attachmentItems: Asset[] | undefined;
    appBridge: AppBridgeBlock;
    onAttachmentReplaceWithUpload: (attachmentToReplace: Asset, newAsset: Asset) => void;
    onAttachmentReplaceWithBrowse: (attachmentToReplace: Asset, newAsset: Asset) => void;
    onAttachmentDelete: (attachmentToDelete: Asset) => void;
    onUploadAttachments: (uploadedAttachments: Asset[]) => void;
    onBrowseAttachments: (browserAttachments: Asset[]) => void;
    onAttachmentsSorted: (sortedAttachments: Asset[]) => void;
    onDownload: () => void;
}

export type AttachmentItemProps = SortableAttachmentItemProps & {
    isDragging?: boolean;
    transformStyle?: Record<string, unknown>;
    draggableProps?: Record<string, unknown>;
};

export type SortableAttachmentItemProps = {
    item: Asset;
    isEditing: boolean;
    designTokens: Partial<Record<DesignTokenName, TokenValues>> | null;
    onAttachmentDelete: () => void;
    onAttachmentReplaceWithBrowse: () => void;
    onAttachmentReplaceWithUpload: (uploadedAsset: Asset) => void;
};