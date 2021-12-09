/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MultiInputLayout } from '@frontify/arcade';
import { ApiBundle } from '@frontify/guideline-blocks-settings';
import { appendUnit, numericalOrPixelRule } from '../';

export const BORDER_COLOR_DEFAULT_VALUE = { rgba: { r: 234, g: 235, b: 235, a: 1 }, name: 'Light Grey' };

const HAS_BORDER_ID = 'hasBorder';
const BORDER_WIDTH_ID = 'borderWidth';

export const BorderStyleSettings = [
    {
        id: HAS_BORDER_ID,
        label: 'Border',
        type: 'switch',
        defaultValue: true,
    },
    {
        id: 'borderSelection',
        type: 'multiInput',
        layout: MultiInputLayout.Columns,
        lastItemFullWidth: true,
        show: (bundle: ApiBundle) => bundle.getBlock(HAS_BORDER_ID)?.value,
        blocks: [
            {
                id: 'borderStyle',
                type: 'dropdown',
                defaultValue: 'Solid',
                choices: [
                    {
                        value: 'Solid',
                        label: 'Solid',
                    },
                    {
                        value: 'Dotted',
                        label: 'Dotted',
                    },
                    {
                        value: 'Dashed',
                        label: 'Dashed',
                    },
                ],
            },
            {
                id: BORDER_WIDTH_ID,
                type: 'input',
                defaultValue: '1px',
                rules: [numericalOrPixelRule],
                onChange: (bundle: ApiBundle): void => appendUnit(bundle, BORDER_WIDTH_ID),
            },
            {
                id: 'borderColor',
                type: 'colorInput',
                defaultValue: BORDER_COLOR_DEFAULT_VALUE,
            },
        ],
    },
];
