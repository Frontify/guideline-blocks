import { Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { FC, useEffect } from 'react';

import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { LOGO_ID } from './constants';

type Settings = {
    color: 'violet' | 'blue' | 'green' | 'red';
};

export const AnExampleBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);

    useEffect(() => {
        console.log('Block Settings', blockSettings);
    }, [blockSettings]);

    return (
        <div className="tw-flex tw-justify-center" data-test-id="example-asset-upload-block">
            {blockAssets[LOGO_ID] ? (
                blockAssets[LOGO_ID].map((asset: Asset) => (
                    <div key={asset.id}>
                        <img src={asset.previewUrl} data-test-id="example-asset-upload-image" />
                    </div>
                ))
            ) : (
                <p>No image set</p>
            )}
        </div>
    );
};
