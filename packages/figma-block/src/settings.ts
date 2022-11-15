/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserObjectType, AssetChooserProjectType } from '@frontify/app-bridge';
import { AssetInputMode, Bundle } from '@frontify/guideline-blocks-settings';
import type { BlockSettings } from '@frontify/guideline-blocks-settings';
import { appendUnit, minimumNumericRule, numericalOrPixelRule } from '@frontify/guideline-blocks-shared';
import { BlockPreview, HeightChoices } from './types';
import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';

export const ASSET_ID = 'asset';
export const DEFAULT_HEIGHT = '500px';

const PREVIEW_MODE = 'figmaPreviewId';
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
            id: PREVIEW_MODE,
            type: 'dropdown',
            size: DropdownSize.Large,
            defaultValue: BlockPreview.Image,
            choices: [
                {
                    value: BlockPreview.Image,
                    icon: IconEnum.Image,
                    label: 'Image',
                },
                {
                    value: BlockPreview.Live,
                    icon: IconEnum.CursorClick,
                    label: 'Live',
                },
            ],
        },
    ],
    basics: [
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
            id: HAS_BACKGROUND_ID,
            type: 'switch',
            label: 'Show Background',
            defaultValue: false,
            show: (bundle: Bundle): boolean => bundle.getBlock(PREVIEW_MODE)?.value === BlockPreview.Image,
        },
        {
            id: HAS_BORDER_ID,
            type: 'switch',
            defaultValue: false,
            label: 'Show border',
            on: [
                {
                    id: 'border',
                    type: 'multiInput',
                    lastItemFullWidth: true,
                    onChange: (bundle) => {
                        appendUnit(bundle, 'borderWidth');
                    },
                    blocks: [
                        {
                            id: 'borderStyle',
                            type: 'dropdown',
                            defaultValue: 'solid',
                            size: DropdownSize.Small,
                            choices: [
                                {
                                    value: 'dotted',
                                    label: 'Dotted',
                                },
                                {
                                    value: 'dashed',
                                    label: 'Dashed',
                                },
                                {
                                    value: 'solid',
                                    label: 'Solid',
                                },
                            ],
                        },
                        {
                            id: 'borderWidth',
                            type: 'input',
                            defaultValue: '1px',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                            clearable: false,
                        },
                        {
                            id: 'borderColor',
                            type: 'colorInput',
                            defaultValue: { r: 0, g: 0, b: 0 },
                        },
                    ],
                    layout: MultiInputLayout.Columns,
                },
            ],
        },
    ],
    layout: [
        {
            id: SHOW_FIGMA_LINK_ID,
            type: 'switch',
            label: 'Show Figma Link',
            defaultValue: true,
            show: (bundle: Bundle): boolean => bundle.getBlock(PREVIEW_MODE)?.value === BlockPreview.Image,
        },
        {
            id: HAS_LIMITED_OPTIONS,
            type: 'switch',
            label: 'Image fixed height',
            defaultValue: true,
            info: 'The image uploaded will have the same height as in your Figma file.',
            show: (bundle: Bundle): boolean => bundle.getBlock(PREVIEW_MODE)?.value === BlockPreview.Image,
        },
        {
            id: 'isCustomHeight',
            type: 'switch',
            label: 'Height',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle: Bundle): boolean =>
                bundle.getBlock(HAS_LIMITED_OPTIONS)?.value === false ||
                bundle.getBlock(PREVIEW_MODE)?.value === BlockPreview.Live,
            on: [
                {
                    id: HEIGHT_VALUE_ID,
                    type: 'input',
                    placeholder: '50px',
                    defaultValue: heights[HeightChoices.Small],
                    rules: [minimumNumericRule(50)],
                },
            ],
            off: [
                {
                    id: HEIGHT_CHOICE_ID,
                    type: 'slider',
                    defaultValue: HeightChoices.Medium,
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
