import { Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { Fragment, useLayoutEffect, useRef, useState } from 'react';

import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { CONTAINER_SIZE, LOGO_ID } from './constants';
import { LogoGrid } from './components/LogoGrid';
import { LogoSpacingSettings } from './types';

export const AnExampleBlock = ({ appBridge }: BlockProps) => {
    const blockContainer = useRef<HTMLDivElement>(null);
    const [blockSettings] = useBlockSettings<LogoSpacingSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const updateDimensions = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setHeight(e.currentTarget.offsetHeight + 2);
    };

    useLayoutEffect(() => {
        if (blockContainer.current) {
            setWidth((blockContainer.current.offsetWidth * CONTAINER_SIZE[blockSettings.containerSizeChoice]) / 100);
        }
    }, [blockContainer, blockSettings]);

    return (
        <div
            ref={blockContainer}
            className="tw-flex tw-relative tw-justify-center"
            data-test-id="example-asset-upload-block"
        >
            {blockAssets[LOGO_ID] ? (
                blockAssets[LOGO_ID].map((asset: Asset) => (
                    <Fragment key={asset.id}>
                        <LogoGrid
                            asset={asset}
                            containerHeight={height}
                            containerWidth={width}
                            settings={blockSettings}
                        />
                        <div className="tw-absolute tw-opacity-1 tw-w-full">
                            <div
                                className="tw-absolute tw-left-1/2 tw-top-0 tw--translate-x-1/2"
                                style={{ width: `${width}px` }}
                            >
                                <img className="tw-w-full" onLoad={updateDimensions} src={asset.previewUrl} />
                            </div>
                        </div>
                    </Fragment>
                ))
            ) : (
                <div className=" tw-bg-black-5 tw-w-full tw-flex tw-items-center">
                    <div className="tw-font-semibold">Add logo asset</div>
                    <div>or drop it here</div>
                </div>
            )}
        </div>
    );
};
