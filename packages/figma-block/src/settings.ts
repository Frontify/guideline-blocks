/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType } from '@frontify/app-bridge';
import { AssetInputMode, BlockSettings } from '@frontify/guideline-blocks-settings';
import { minimumNumericalOrPixelOrAutoRule } from '@frontify/guideline-blocks-shared';
import { BlockPreview, HeightChoices } from './types';

export const ASSET_ID = 'asset';
export const DEFAULT_HEIGHT = '500px';

const HAS_BORDER_ID = 'hasBorder';
const HEIGHT_VALUE_ID = 'heightValue';
const HEIGHT_CHOICE_ID = 'heightChoice';

export const heights: Record<HeightChoices, string> = {
    [HeightChoices.Small]: '400px',
    [HeightChoices.Medium]: '600px',
    [HeightChoices.Large]: '800px',
};

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
    style: [
        {
            id: HAS_BORDER_ID,
            type: 'switch',
            label: 'Show border',
            defaultValue: true,
        },
    ],
    layout: [
        {
            id: 'isCustomHeight',
            type: 'switch',
            label: 'Height',
            switchLabel: 'Custom',
            defaultValue: false,
            on: [
                {
                    id: HEIGHT_VALUE_ID,
                    type: 'input',
                    placeholder: '100px',
                    defaultValue: heights[HeightChoices.Small],
                    rules: [minimumNumericalOrPixelOrAutoRule(100)],
                },
            ],
            off: [
                {
                    id: HEIGHT_CHOICE_ID,
                    type: 'slider',
                    defaultValue: HeightChoices.Small,
                    choices: [
                        {
                            value: HeightChoices.Small,
                            label: 'S',
                        },
                        {
                            value: HeightChoices.Medium,
                            label: 'M',
                        },
                        {
                            value: HeightChoices.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
};

export default settings;
