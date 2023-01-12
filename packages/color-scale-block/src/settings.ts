/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    appendUnit,
    defineSettings,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { BlockHeight, spacingValues } from './types';

const SIMPLE_HEIGHT_ID = 'heightSlider';
const CUSTOM_HEIGHT_ID = 'heightInput';

export const settings = defineSettings({
    layout: [
        {
            id: 'customHeight',
            label: 'Height',
            type: 'switch',
            switchLabel: 'Custom',
            onChange: (bundle) => presetCustomValue(bundle, SIMPLE_HEIGHT_ID, CUSTOM_HEIGHT_ID, spacingValues),
            defaultValue: false,
            off: [
                {
                    id: SIMPLE_HEIGHT_ID,
                    type: 'slider',
                    defaultValue: BlockHeight.L,
                    choices: [
                        {
                            value: BlockHeight.S,
                            label: BlockHeight.S,
                        },
                        {
                            value: BlockHeight.M,
                            label: BlockHeight.M,
                        },
                        {
                            value: BlockHeight.L,
                            label: BlockHeight.L,
                        },
                    ],
                },
            ],
            on: [
                {
                    id: CUSTOM_HEIGHT_ID,
                    type: 'input',
                    defaultValue: '100px',
                    clearable: false,
                    rules: [numericalOrPixelRule],
                    onChange: (bundle) => appendUnit(bundle, CUSTOM_HEIGHT_ID),
                },
            ],
        },
    ],
});
