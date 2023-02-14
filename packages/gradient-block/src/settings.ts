import {
    IconEnum,
    SwitchSize,
    defineSettings,
    maximumNumericalOrPixelOrAutoRule,
    maximumNumericalRule,
} from '@frontify/guideline-blocks-settings';
import { Height, Orientation } from './types';

export const settings = defineSettings({
    basics: [
        {
            id: 'gradientInspect',
            type: 'sectionHeading',
            label: 'Inspect',
            blocks: [
                {
                    id: 'gradientCss',
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
                    id: 'gradientHeight',
                    type: 'switch',
                    label: 'Height',
                    switchLabel: 'Custom',
                    info: 'Determines the block height.',
                    defaultValue: false,
                    on: [
                        {
                            id: 'gradientHeightCustom',
                            type: 'input',
                            placeholder: 'e.g. 50px',
                            clearable: true,
                            rules: [maximumNumericalOrPixelOrAutoRule(800)],
                        },
                    ],
                    off: [
                        {
                            id: 'gradientHeightSimple',
                            type: 'slider',
                            defaultValue: Height.Small,
                            choices: [
                                {
                                    label: 'S',
                                    value: Height.Small,
                                },
                                {
                                    label: 'M',
                                    value: Height.Medium,
                                },
                                {
                                    label: 'L',
                                    value: Height.Large,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'gradientOrientation',
                    type: 'switch',
                    label: 'Orientation',
                    switchLabel: 'Custom',
                    info: 'Determines the block orientation.',
                    defaultValue: false,
                    on: [
                        {
                            id: 'gradientOrientationCustom',
                            type: 'input',
                            placeholder: 'e.g. 90°',
                            clearable: true,
                            rules: [maximumNumericalRule(360)],
                        },
                    ],
                    off: [
                        {
                            id: 'gradientOrientationSimple',
                            type: 'slider',
                            defaultValue: Orientation.Horizontal,
                            choices: [
                                {
                                    icon: IconEnum.ArrowAlignVerticalCentre,
                                    value: Orientation.Horizontal,
                                },
                                {
                                    icon: IconEnum.ArrowBidirectional24,
                                    value: Orientation.Vertical,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});
