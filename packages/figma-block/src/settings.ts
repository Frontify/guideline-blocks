/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType } from '@frontify/app-bridge';
import { AssetInputMode, Bundle } from '@frontify/guideline-blocks-settings';
import type { BlockSettings } from '@frontify/guideline-blocks-settings';
import { minimumPixelRule } from '@frontify/guideline-blocks-shared';
import { BlockPreview, HeightChoices } from './types';

export const ASSET_ID = 'asset';
export const DEFAULT_HEIGHT = '500px';

const HAS_BORDER_ID = 'hasBorder';
const SHOW_FIGMA_LINK_ID = 'showFigmaLink';
const HAS_BACKGROUND_ID = 'hasBackground';
const HEIGHT_VALUE_ID = 'heightValue';
const HEIGHT_CHOICE_ID = 'heightChoice';
const HAS_LIMITED_OPTIONS = 'hasLimitedOptions';

export const heights: Record<HeightChoices, string> = {
    [HeightChoices.Small]: '400px',
    [HeightChoices.Medium]: '600px',
    [HeightChoices.Large]: '800px',
};

export const settings: BlockSettings = {
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
            defaultValue: false,
        },
        {
            id: SHOW_FIGMA_LINK_ID,
            type: 'switch',
            label: 'Show Figma Link',
            defaultValue: true,
        },
        {
            id: HAS_BACKGROUND_ID,
            type: 'switch',
            label: 'Show Background',
            defaultValue: false,
            show: (bundle: Bundle): boolean => bundle.getBlock(HAS_LIMITED_OPTIONS)?.value === false,
        },
    ],
    layout: [
        {
            id: HAS_LIMITED_OPTIONS,
            type: 'switch',
            label: 'Image fixed height',
            defaultValue: true,
            info: 'The image uploaded will have the same height as in your Figma file.',
        },
        {
            id: 'isCustomHeight',
            type: 'switch',
            label: 'Height',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle: Bundle): boolean => bundle.getBlock(HAS_LIMITED_OPTIONS)?.value === false,
            on: [
                {
                    id: HEIGHT_VALUE_ID,
                    type: 'input',
                    placeholder: '100px',
                    defaultValue: heights[HeightChoices.Small],
                    rules: [minimumPixelRule(100)],
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
