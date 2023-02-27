/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock, Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';

export const useAttachments = (appBridge: AppBridgeBlock, blockSettingsKey: string, assetSettingsKey: string) => {
    const [blockSettings, setBlockSettings] = useBlockSettings(appBridge);
    const { blockAssets, updateAssetIdsFromKey, addAssetIdsToKey, deleteAssetIdsFromKey } = useBlockAssets(appBridge);
    const attachments = blockAssets?.[assetSettingsKey] || [];
    const attachmentsInBlockSettings = (blockSettings[blockSettingsKey] || []) as { id: number }[];

    const onAddAttachments = async (assets: Asset[]) => {
        const newAssetIds = [];
        for (const asset of assets) {
            newAssetIds.push(asset.id);
        }
        await setBlockSettings({
            [blockSettingsKey]: [...attachmentsInBlockSettings, ...newAssetIds.map((id) => ({ id }))],
        });
        await addAssetIdsToKey(assetSettingsKey, newAssetIds);
    };

    const onAttachmentDelete = async (assetToDelete: Asset) => {
        await setBlockSettings({
            [blockSettingsKey]: attachmentsInBlockSettings.filter(({ id }) => id !== assetToDelete.id),
        });
        await deleteAssetIdsFromKey(assetSettingsKey, [assetToDelete.id]);
    };

    const onAttachmentReplace = async (attachmentToReplace: Asset, newAsset: Asset) => {
        const indexOfReplacedAttachment = attachmentsInBlockSettings.findIndex(
            (attachment) => attachment.id === attachmentToReplace.id
        );
        const attachmentsAfterReplace = [...attachmentsInBlockSettings];
        attachmentsAfterReplace[indexOfReplacedAttachment] = { id: newAsset.id };
        await setBlockSettings({
            [blockSettingsKey]: attachmentsAfterReplace,
        });
        const newAssetIds = [];
        for (const attachment of attachments) {
            if (attachment.id !== attachmentToReplace.id) {
                newAssetIds.push(attachment.id);
            }
        }
        newAssetIds.push(newAsset.id);
        await updateAssetIdsFromKey(assetSettingsKey, newAssetIds);
    };

    const onAttachmentsSorted = async (assets: Asset[]) => {
        const newAssetIds = [];
        for (const asset of assets) {
            newAssetIds.push(asset.id);
        }
        await setBlockSettings({
            [blockSettingsKey]: newAssetIds.map((id) => ({ id })),
        });
    };

    const sortedAttachments = attachmentsInBlockSettings
        .map((asset) => attachments.find((attachment) => attachment.id === asset.id))
        .filter(Boolean) as Asset[];

    return {
        onAddAttachments,
        onAttachmentDelete,
        onAttachmentReplace,
        onAttachmentsSorted,
        sortedAttachments,
    };
};
