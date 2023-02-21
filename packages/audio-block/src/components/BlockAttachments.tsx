/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, useBlockAssets } from '@frontify/app-bridge';
import { Attachments } from '@frontify/guideline-blocks-shared';
import { BlockAttachmentsProps } from '../types';
export const BlockAttachments = ({ downloadAsset, appBridge }: BlockAttachmentsProps) => {
    const { blockAssets, deleteAssetIdsFromKey, addAssetIdsToKey } = useBlockAssets(appBridge);
    const attachmentItems = blockAssets?.['attachments'];

    const onAttachmentRemove = (attachment: Asset) => {
        deleteAssetIdsFromKey('attachments', [attachment.id]);
    };

    const onAttachmentReplaceWithBrowse = (attachmentToReplace: Asset, newAttachment: Asset) => {
        deleteAssetIdsFromKey('attachments', [attachmentToReplace.id]);
        addAssetIdsToKey('attachments', [newAttachment.id]);
    };

    const onAttachmentReplaceWithUpload = (attachmentToReplace: Asset, newAttachment: Asset) => {
        deleteAssetIdsFromKey('attachments', [attachmentToReplace.id]);
        addAssetIdsToKey('attachments', [newAttachment.id]);
    };

    const onAttachmentsSorted = (attachments: Asset[]) => {
        const attachmentIds = attachments.map((asset) => asset.id);
        deleteAssetIdsFromKey('attachments', attachmentIds);
        addAssetIdsToKey('attachments', attachmentIds);
    };

    const onDownload = () => {
        fetch(downloadAsset.originUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = downloadAsset.fileName;
                a.click();
            });
    };

    const addToAttachments = (attachments: Asset[]) => {
        const attachmentIds = attachments.map((asset) => asset.id);
        addAssetIdsToKey('attachments', attachmentIds);
    };

    return (
        <div>
            <Attachments
                attachmentItems={attachmentItems}
                onAttachmentDelete={onAttachmentRemove}
                onAttachmentReplaceWithBrowse={onAttachmentReplaceWithBrowse}
                onAttachmentReplaceWithUpload={onAttachmentReplaceWithUpload}
                onBrowseAttachments={addToAttachments}
                onUploadAttachments={addToAttachments}
                onAttachmentsSorted={onAttachmentsSorted}
                onDownload={onDownload}
                appBridge={appBridge}
            />
        </div>
    );
};
