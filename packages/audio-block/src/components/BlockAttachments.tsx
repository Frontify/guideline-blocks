/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { Attachments, downloadAsset } from '@frontify/guideline-blocks-shared';
import { BlockAttachmentsProps, BlockSettings } from '../types';
import { ATTACHMENTS_SETTING_ID } from '../settings';

export const BlockAttachments = ({ assetToDownload, appBridge }: BlockAttachmentsProps) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    const { blockAssets, updateAssetIdsFromKey, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const attachments = blockAssets?.[ATTACHMENTS_SETTING_ID] || [];
    const attachmentsInBlockSettings = blockSettings.attachments || [];

    const onAddAttachments = (assets: Asset[]) => {
        const newAssetIds = [];
        for (const asset of assets) {
            newAssetIds.push(asset.id);
        }
        setBlockSettings({
            attachments: [...attachmentsInBlockSettings, ...newAssetIds.map((id) => ({ id }))],
        });
        addAssetIdsToKey(ATTACHMENTS_SETTING_ID, newAssetIds);
    };

    const onAttachmentDelete = (assetToDelete: Asset) => {
        setBlockSettings({
            attachments: attachmentsInBlockSettings.filter((asset) => asset.id !== assetToDelete.id),
        });
        deleteAssetIdsFromKey(ATTACHMENTS_SETTING_ID, [assetToDelete.id]);
    };

    const onAttachmentReplace = (attachmentToReplace: Asset, newAsset: Asset) => {
        const indexOfReplacedAttachment = attachmentsInBlockSettings.findIndex(
            (attachment) => attachment.id === attachmentToReplace.id
        );
        const attachmentsAfterReplace = [...attachmentsInBlockSettings];
        attachmentsAfterReplace[indexOfReplacedAttachment] = { id: newAsset.id };
        setBlockSettings({
            attachments: attachmentsAfterReplace,
        });
        const newAssetIds = [];
        for (const attachment of attachments) {
            if (attachment.id !== attachmentToReplace.id) {
                newAssetIds.push(attachment.id);
            }
        }
        newAssetIds.push(newAsset.id);
        updateAssetIdsFromKey(ATTACHMENTS_SETTING_ID, newAssetIds);
    };

    const onAttachmentsSorted = (assets: Asset[]) => {
        const newAssetIds = [];
        for (const asset of assets) {
            newAssetIds.push(asset.id);
        }
        setBlockSettings({
            attachments: newAssetIds.map((id) => ({ id })),
        });
    };

    const sortedAttachments = attachmentsInBlockSettings
        .map((asset) => attachments.find((attachment) => attachment.id === asset.id))
        .filter(Boolean) as Asset[];

    return (
        <div>
            <Attachments
                attachmentItems={sortedAttachments}
                onAttachmentDelete={onAttachmentDelete}
                onAttachmentReplaceWithBrowse={onAttachmentReplace}
                onAttachmentReplaceWithUpload={onAttachmentReplace}
                onBrowseAttachments={onAddAttachments}
                onUploadAttachments={onAddAttachments}
                onAttachmentsSorted={onAttachmentsSorted}
                onDownload={() => downloadAsset(assetToDownload)}
                appBridge={appBridge}
            />
        </div>
    );
};
