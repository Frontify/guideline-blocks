/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC } from 'react';
import { Asset } from '@frontify/app-bridge';
import { ThumbnailItem } from './ThumbnailItem';
import { ASSET_SETTINGS_ID } from '../settings';

type AssetGridProps = {
    currentAssets: Asset[];
    deleteAssetIdsFromKey: (key: string, assetIds: number[]) => Promise<void>;
    isEditing: boolean;
    thumbnailStyle: React.CSSProperties;
};
export const AssetGrid: FC<AssetGridProps> = ({ currentAssets, deleteAssetIdsFromKey, isEditing, thumbnailStyle }) => {
    const onRemoveAsset = async (assetId: number) => {
        await deleteAssetIdsFromKey(ASSET_SETTINGS_ID, [assetId]);
    };

    return (
        <>
            {currentAssets?.length > 0 ? (
                <span>
                    {currentAssets.length} asset{currentAssets.length > 1 && <>s</>}
                </span>
            ) : (
                <span>Add assets to make them available</span>
            )}
            <div className="tw-mt-2.5 tw-grid tw-grid-cols-3 xs:tw-grid-cols-4 md:tw-grid-cols-6 tw-gap-4">
                {currentAssets
                    ? currentAssets.map((asset: Asset) => (
                          <ThumbnailItem
                              key={asset.id}
                              asset={asset}
                              isEditing={isEditing}
                              onRemoveAsset={onRemoveAsset}
                              thumbnailStyle={thumbnailStyle}
                          />
                      ))
                    : undefined}
            </div>
        </>
    );
};
