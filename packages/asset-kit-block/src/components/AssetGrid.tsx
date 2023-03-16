/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThumbnailItem } from '.';
import { ASSET_SETTINGS_ID } from '../settings';
import { AssetGridProps } from '../types';

export const AssetGrid = ({
    currentAssets,
    deleteAssetIdsFromKey,
    updateAssetIdsFromKey,
    isEditing,
    appBridge,
}: AssetGridProps) => {
    const onRemoveAsset = async (assetId: number) => {
        await deleteAssetIdsFromKey(ASSET_SETTINGS_ID, [assetId]);
    };

    const onReplaceAsset = async (toReplaceAssetId: number, newAssetId: number) => {
        const assetIds = currentAssets.map((asset) => asset.id);
        assetIds.splice(assetIds.indexOf(toReplaceAssetId), 1, newAssetId);
        await updateAssetIdsFromKey(ASSET_SETTINGS_ID, assetIds);
    };

    return (
        <>
            {currentAssets.length > 0 ? (
                <span>{`${currentAssets.length} asset${currentAssets.length > 1 ? 's' : ''}`}</span>
            ) : (
                <span className="tw-text-black-50">Add assets to make them available</span>
            )}
            <div className="tw-mt-2.5 tw-grid tw-grid-cols-3 sm:tw-grid-cols-4 md:tw-grid-cols-6 tw-gap-4">
                {currentAssets
                    ? currentAssets.map((asset) => (
                          <ThumbnailItem
                              key={asset.id}
                              asset={asset}
                              isEditing={isEditing}
                              onRemoveAsset={onRemoveAsset}
                              onReplaceAsset={onReplaceAsset}
                              appBridge={appBridge}
                          />
                      ))
                    : null}
            </div>
        </>
    );
};
