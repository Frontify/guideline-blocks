/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconEnum,
    SwitchSize,
    appendUnit,
    defineSettings,
    maximumNumericalOrPixelOrAutoRule,
    maximumNumericalRule,
} from '@frontify/guideline-blocks-settings';
import { GradientHeight, GradientOrientation } from './types';

const IS_CUSTOM_HEIGHT_ID = 'isHeightCustom';
const HEIGHT_CUSTOM_ID = 'heightCustom';
const HEIGHT_SIMPLE_ID = 'heightSimple';

const IS_CUSTOM_ORIENTATION_ID = 'isOrientationCustom';
const ORIENTATION_CUSTOM_ID = 'orientationCustom';
const ORIENTATION_SIMPLE_ID = 'orientationSimple';

export const HEIGHT_DEFAULT_VALUE = GradientHeight.Small;
export const ORIENTATION_DEFAULT_VALUE = GradientOrientation.Horizontal;

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
                    size: SwitchSize.Small,
                    defaultValue: true,
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
                            type: 'slider',
                            defaultValue: HEIGHT_DEFAULT_VALUE,
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
                            rules: [maximumNumericalRule(360)],
                        },
                    ],
                    off: [
                        {
                            id: ORIENTATION_SIMPLE_ID,
                            type: 'slider',
                            defaultValue: ORIENTATION_DEFAULT_VALUE,
                            choices: [
                                {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    //@ts-ignore
                                    icon: IconEnum.ArrowBidirectionalHorizontal24,
                                    value: GradientOrientation.Horizontal,
                                },
                                {
                                    icon: IconEnum.ArrowBidirectional24,
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
