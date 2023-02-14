/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';

import { useTileAsset } from '../hooks';

import { ImageFlyout } from './ImageFlyout';

type TeaserTileProps = {
    appBridge: AppBridgeBlock;
    id: string;
};

export const TeaserTile = ({ appBridge, id }: TeaserTileProps) => {
    const { tileAsset, isAssetLoading, openFileDialog, onOpenAssetChooser } = useTileAsset(appBridge, id);

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
