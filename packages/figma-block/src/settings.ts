/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType } from '@frontify/app-bridge';
import { AssetInputMode, BlockSettings } from '@frontify/guideline-blocks-settings';
import { BlockPreview } from './types';

export const ASSET_ID = 'asset';

const settings: BlockSettings = {
    main: [
        {
            id: 'figmaPreviewId',
            type: 'slider',
            label: 'Figma Asset Preview',
            defaultValue: BlockPreview.Image,
            helperText: 'Switch between preview image or Live Figma preview',
            choices: [
                {
                    value: BlockPreview.Image,
                    label: 'Image',
                },
                {
                    value: BlockPreview.Live,
                    label: 'Live',
                },
            ],
        },
    ],
    content: [
        {
            id: ASSET_ID,
            type: 'assetInput',
            projectTypes: [AssetChooserProjectType.Workspace],
            objectTypes: [AssetChooserObjectType.Url],
            mode: AssetInputMode.BrowseOnly,
        },
    ],
};

export default settings;
