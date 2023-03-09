/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ThumbnailItem } from './';
import { ASSET_SETTINGS_ID } from '../settings';
import { AssetGridProps } from '../types';

export const AssetGrid = ({ currentAssets, deleteAssetIdsFromKey, isEditing, thumbnailStyle }: AssetGridProps) => {
    const onRemoveAsset = async (assetId: number) => {
        await deleteAssetIdsFromKey(ASSET_SETTINGS_ID, [assetId]);
    };

    return (
        <>
            {currentAssets.length > 0 ? (
                <span>
                    {currentAssets.length} asset{currentAssets.length > 1 ? <>s</> : null}
                </span>
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
                              thumbnailStyle={thumbnailStyle}
                          />
                      ))
                    : null}
            </div>
        </>
    );
};
