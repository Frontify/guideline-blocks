/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    appendUnit,
    defineSettings,
    maximumNumericalOrPixelOrAutoRule,
    maximumNumericalRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';

import { DEFAULT_HEIGHT_VALUE, DEFAULT_ORIENTATION_VALUE } from './constants';
import { GradientHeight, GradientOrientation, gradientHeightValues } from './types';

export const IS_CUSTOM_HEIGHT_ID = 'isHeightCustom';
export const HEIGHT_CUSTOM_ID = 'heightCustom';
export const HEIGHT_SIMPLE_ID = 'heightSimple';

export const IS_CUSTOM_ORIENTATION_ID = 'isOrientationCustom';
export const ORIENTATION_CUSTOM_ID = 'orientationCustom';
export const ORIENTATION_SIMPLE_ID = 'orientationSimple';

export const settings = defineSettings({
    basics: [
        {
            id: 'gradientInspect',
            type: 'sectionHeading',
            label: 'Inspect',
            blocks: [
                {
                    id: 'displayCss',
                    label: 'Display CSS Code',
                    type: 'switch',
                    defaultValue: false,
                },
            ],
        },
    ],
    layout: [
        {
            id: 'gradientLayout',
            type: 'sectionHeading',
            label: '',
            blocks: [
                {
                    id: IS_CUSTOM_HEIGHT_ID,
                    type: 'switch',
                    label: 'Height',
                    switchLabel: 'Custom',
                    info: 'Determines the block height.',
                    defaultValue: false,
                    onChange: (bundle) =>
                        presetCustomValue(bundle, HEIGHT_SIMPLE_ID, HEIGHT_CUSTOM_ID, gradientHeightValues),
                    on: [
                        {
                            id: HEIGHT_CUSTOM_ID,
                            type: 'input',
                            placeholder: 'e.g. 50px',
                            clearable: true,
                            rules: [maximumNumericalOrPixelOrAutoRule(800)],
                            onChange: (bundle) => appendUnit(bundle, HEIGHT_CUSTOM_ID),
                        },
                    ],
                    off: [
                        {
                            id: HEIGHT_SIMPLE_ID,
                            type: 'segmentedControls',
                            defaultValue: DEFAULT_HEIGHT_VALUE,
                            choices: [
                                {
                                    label: 'S',
                                    value: GradientHeight.Small,
                                },
                                {
                                    label: 'M',
                                    value: GradientHeight.Medium,
                                },
                                {
                                    label: 'L',
                                    value: GradientHeight.Large,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: IS_CUSTOM_ORIENTATION_ID,
                    type: 'switch',
                    label: 'Orientation',
                    switchLabel: 'Custom',
                    info: 'Determines the block orientation.',
                    defaultValue: false,
                    on: [
                        {
                            id: ORIENTATION_CUSTOM_ID,
                            type: 'input',
                            placeholder: 'e.g. 90°',
                            clearable: true,
                            rules: [maximumNumericalRule(90)],
                        },
                    ],
                    off: [
                        {
                            id: ORIENTATION_SIMPLE_ID,
                            type: 'segmentedControls',
                            defaultValue: DEFAULT_ORIENTATION_VALUE,
                            choices: [
                                {
                                    icon: 'ArrowBidirectionalHorizontal16',
                                    value: GradientOrientation.Horizontal,
                                },
                                {
                                    icon: 'ArrowBidirectional16',
                                    value: GradientOrientation.Vertical,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});
