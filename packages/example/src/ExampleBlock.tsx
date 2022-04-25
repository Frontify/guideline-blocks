/* (c) Copyright Frontify Ltd., all rights reserved. */

import 'tailwindcss/tailwind.css';
import { FC } from 'react';
import { Asset, useBlockAssets } from '@frontify/app-bridge';

export const ExampleBlock: FC = ({ appBridge }: any) => {
    const { blockAssets } = useBlockAssets(appBridge);

    return (
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
    );
};
