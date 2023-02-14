import { Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { CONTAINER_SIZE, LOGO_ID } from './constants';

import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { Size } from './types';
import { useEffect } from 'react';

type Settings = {
    color: 'violet' | 'blue' | 'green' | 'red';
    containerSizeChoice: Size;
};

export const AnExampleBlock = ({ appBridge }: BlockProps) => {
    const [blockSettings] = useBlockSettings<Settings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);

    useEffect(() => {
        console.log('Block Settings', blockSettings);
    }, [blockSettings]);

    return (
        <div className="tw-flex tw-justify-center" data-test-id="example-asset-upload-block">
            {blockAssets[LOGO_ID] ? (
                blockAssets[LOGO_ID].map((asset: Asset) => (
                    <div key={asset.id} className="tw-w-full tw-flex tw-justify-center">
                        <div style={{ width: CONTAINER_SIZE[blockSettings.containerSizeChoice] }}>
                            <div>
                                <img
                                    className="tw-w-full"
                                    src={asset.previewUrl}
                                    data-test-id="example-asset-upload-image"
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className=" tw-bg-black-5 tw-w-full tw-flex tw-items-center">
                    <div className=" tw-font-semibold">Add logo asset</div>
                    <div>or drop it here</div>
                </div>
            )}
        </div>
    );
};
