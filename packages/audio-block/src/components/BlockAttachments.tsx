/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, useBlockAssets } from '@frontify/app-bridge';
import { Attachments } from '@frontify/guideline-blocks-shared';
import { BlockAttachmentsProps } from '../types';

export const BlockAttachments = ({ downloadAsset, appBridge }: BlockAttachmentsProps) => {
    const { blockAssets, deleteAssetIdsFromKey, addAssetIdsToKey, updateAssetIdsFromKey } = useBlockAssets(appBridge);
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

    const onAttachmentsSorted = async (attachments: Asset[]) => {
        const attachmentIds = attachments.map((attachment) => attachment.id);
        deleteAssetIdsFromKey('attachments', attachmentIds).then(() =>
            updateAssetIdsFromKey('attachments', attachmentIds)
        );
    };

    const addToAttachmentsBrowse = (attachments: Asset[]) => {
        const attachnmentsIds = [];
        for (const attachment of attachments) {
            attachnmentsIds.push(attachment.id);
        }
        addAssetIdsToKey('attachments', attachnmentsIds);
    };

    const addToAttachmentsUpload = (attachments: Asset[]) => {
        const attachmentIds = attachments.map((attachment) => attachment.id);
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

    return (
        <div>
            <Attachments
                attachmentItems={attachmentItems}
                onAttachmentDelete={onAttachmentRemove}
                onAttachmentReplaceWithBrowse={onAttachmentReplaceWithBrowse}
                onAttachmentReplaceWithUpload={onAttachmentReplaceWithUpload}
                onBrowseAttachments={addToAttachmentsBrowse}
                onUploadAttachments={addToAttachmentsUpload}
                onAttachmentsSorted={onAttachmentsSorted}
                onDownload={onDownload}
                appBridge={appBridge}
            />
        </div>
    );
};
