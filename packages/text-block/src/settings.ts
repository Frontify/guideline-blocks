/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    appendUnit,
    betweenPixelRule,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { TextGutter, spacingValues } from './types';

const presetSpacingValues: Record<TextGutter, string> = {
    ...spacingValues,
    [TextGutter.Auto]: '',
};

export const PLACEHOLDER = 'Your text here';
const CUSTOM_GUTTER_ID = 'columnGutterCustom';
const SIMPLE_GUTTER_ID = 'columnGutterSimple';
const COLUMN_NR_ID = 'columnNumber';

export const settings = defineSettings({
    layout: [
        {
            id: COLUMN_NR_ID,
            type: 'segmentedControls',
            label: 'Columns',
            defaultValue: 1,
            choices: [
                {
                    value: 1,
                    label: '1',
                },
                {
                    value: 2,
                    label: '2',
                },
                {
                    value: 3,
                    label: '3',
                },
                {
                    value: 4,
                    label: '4',
                },
            ],
        },
        {
            id: 'isColumnGutterCustom',
            label: 'Gutter',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            info: "An official nerd's term for 'column gap'",
            onChange: (bundle) => presetCustomValue(bundle, SIMPLE_GUTTER_ID, CUSTOM_GUTTER_ID, presetSpacingValues),
            show: (bundle) => Number(bundle.getBlock(COLUMN_NR_ID)?.value) > 1,
            on: [
                {
                    id: CUSTOM_GUTTER_ID,
                    type: 'input',
                    defaultValue: presetSpacingValues[TextGutter.Auto],
                    rules: [numericalOrPixelRule, betweenPixelRule(0, 200)],
                    onChange: (bundle) => appendUnit(bundle, CUSTOM_GUTTER_ID),
                },
            ],
            off: [
                {
                    id: SIMPLE_GUTTER_ID,
                    type: 'segmentedControls',
                    defaultValue: TextGutter.Auto,
                    choices: [
                        {
                            value: TextGutter.Auto,
                            label: TextGutter.Auto,
                        },
                        {
                            value: TextGutter.S,
                            label: TextGutter.S,
                        },
                        {
                            value: TextGutter.M,
                            label: TextGutter.M,
                        },
                        {
                            value: TextGutter.L,
                            label: TextGutter.L,
                        },
                    ],
                },
            ],
        },
    ],
});
