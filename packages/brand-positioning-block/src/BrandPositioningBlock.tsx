/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useBlockSettings } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import { FC } from 'react';
import 'tailwindcss/tailwind.css';
import { BlockSettings } from './types';
import type { BlockProps } from '@frontify/guideline-blocks-settings';
import { Board } from './components/Board';
import BlockInjectButton from './components/BlockInjectButton';
import { IconPlus20 } from '@frontify/fondue';

export const BrandPositioningBlock: FC<BlockProps> = ({ appBridge }) => {
    const [blockSettings, setBlockSettings] = useBlockSettings<BlockSettings>(appBridge);
    console.log(blockSettings, setBlockSettings);

    const openAssetChooser = () => {
        appBridge.openAssetChooser(
            (result) => {
                console.log(result);
                appBridge.closeAssetChooser();
            },
            {
                multiSelection: true,
            }
        );
    };
    return (
        <div className="tw-flex tw-flex-col tw-gap-2" data-test-id="brand-positioning-block">
            <Board />
            <BlockInjectButton
                label="Add images"
                secondaryLabel="Or drop them here"
                icon={<IconPlus20 />}
                onUploadClick={() => console.log('Upload clicked')}
                onAssetChooseClick={openAssetChooser}
                onDrop={() => console.log('Files dropped')}
                isLoading={false}
            />
        </div>
    );
};
