import { Asset, useBlockAssets, useBlockSettings } from '@frontify/app-bridge';
import { Fragment, useRef } from 'react';

import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { LOGO_ID } from './constants';
import { LogoGrid } from './components/LogoGrid';
import { LogoSpacingSettings } from './types';

export const AnExampleBlock = ({ appBridge }: BlockProps) => {
    const blockContainer = useRef<HTMLDivElement>(null);
    const [blockSettings] = useBlockSettings<LogoSpacingSettings>(appBridge);
    const { blockAssets } = useBlockAssets(appBridge);

    return (
        <div ref={blockContainer} className="tw-flex tw-justify-center" data-test-id="example-asset-upload-block">
            {blockAssets[LOGO_ID] ? (
                blockAssets[LOGO_ID].map((asset: Asset) => (
                    <Fragment key={asset.id}>
                        <LogoGrid
                            asset={asset}
                            containerWidth={blockContainer.current?.offsetWidth || 0}
                            settings={blockSettings}
                            showLogo
                        />
                        <LogoGrid
                            asset={asset}
                            containerWidth={blockContainer.current?.offsetWidth || 0}
                            settings={blockSettings}
                            showLogo={false}
                        />
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
