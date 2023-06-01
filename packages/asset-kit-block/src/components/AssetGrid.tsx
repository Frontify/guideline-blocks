/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { ThumbnailItem } from '.';
import { ASSET_SETTINGS_ID } from '../settings';
import { AssetGridProps } from '../types';
import { Color } from '@frontify/fondue';
import { toRgbaString } from '@frontify/guideline-blocks-shared';

const AssetCount = ({ count, color }: { count: number; color?: Color }): ReactElement => {
    if (count > 0) {
        return (
            <div style={{ color: color ? toRgbaString(color) : undefined }}>{`${count} asset${
                count > 1 ? 's' : ''
            }`}</div>
        );
    } else {
        return <div className="tw-text-black-50">Add assets to make them available</div>;
    }
};

export const AssetGrid = ({
    currentAssets,
    deleteAssetIdsFromKey,
    updateAssetIdsFromKey,
    saveDownloadUrl,
    isEditing,
    showCount,
    showThumbnails,
    countColor,
    appBridge,
}: AssetGridProps) => {
    const onRemoveAsset = async (assetId: number) => {
        saveDownloadUrl('');
        await deleteAssetIdsFromKey(ASSET_SETTINGS_ID, [assetId]);
    };

    const onReplaceAsset = async (toReplaceAssetId: number, newAssetId: number) => {
        const assetIds = currentAssets.map((asset) => (asset.id === toReplaceAssetId ? newAssetId : asset.id));
        saveDownloadUrl('');
        await updateAssetIdsFromKey(ASSET_SETTINGS_ID, assetIds);
    };

    const shouldShowThumbnails = isEditing || showThumbnails;

    return (
        <>
            {showCount && <AssetCount count={currentAssets.length} color={countColor} />}
            {shouldShowThumbnails && currentAssets.length > 0 && (
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
            )}
        </>
    );
};
