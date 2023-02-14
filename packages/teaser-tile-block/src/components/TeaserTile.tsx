/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';

import { useTileAsset } from '../hooks';

import { ImageFlyout } from './ImageFlyout';

type TeaserTileProps = {
    appBridge: AppBridgeBlock;
    index: number;
};

export const TeaserTile = ({ appBridge, index }: TeaserTileProps) => {
    const { tileAsset, isAssetLoading, openFileDialog, onOpenAssetChooser } = useTileAsset(appBridge, index);

    return (
        <div>
            <ImageFlyout
                onReplaceAssetFromUpload={openFileDialog}
                onReplaceAssetFromWorkspace={onOpenAssetChooser}
                isAssetLoading={isAssetLoading}
                asset={tileAsset}
            />
        </div>
    );
};
