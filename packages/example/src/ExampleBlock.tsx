/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC } from 'react';
import { Asset, AssetChooserResult, IAppBridgeNative, useBlockAssets } from '@frontify/app-bridge';
import { Button } from '@frontify/arcade';

export const ExampleBlock: FC<{ appBridge: IAppBridgeNative }> = ({ appBridge }) => {
    const { blockAssets, updateAssetIdsFromKey } = useBlockAssets(appBridge);

    const onOpenAssetChooser = () => {
        appBridge.openAssetChooser(
            (result: AssetChooserResult) => {
                const resultId = result.screenData[0].id;
                updateAssetIdsFromKey('images', [resultId]);
                appBridge.closeAssetChooser();
            },
            {
                selectedValueId: blockAssets['images']?.[0]?.id,
            }
        );
    };

    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <div>
                <Button onClick={onOpenAssetChooser}>Open asset chooser</Button>
            </div>

            <div data-test-id="example-block">
                {blockAssets['images'] ? (
                    blockAssets['images'].map((asset: Asset) => (
                        <div key={asset.id}>
                            <img src={asset.preview_url} />
                            <p>{asset.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No image set</p>
                )}
            </div>
        </div>
    );
};
