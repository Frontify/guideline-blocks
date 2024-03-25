/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconEnum,
    Security,
    appendUnit,
    defineSettings,
    getBackgroundSettings,
    getBorderRadiusSettings,
    getBorderSettings,
    getGutterSettings,
    getSecurityGlobalControlSetting,
    maximumNumericalOrPercentOrAutoRule,
    minimumNumericalOrPercentRule,
    numericalOrPercentRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-settings';
import { CaptionPosition, HorizontalAlignment, VerticalAlignment } from './types';

const IMAGE_POSITION_CHOICE_ID = 'imagePosition';

const widthMap: Record<string, string> = {
    '25%': '25%',
    '33%': '33%',
    '50%': '50%',
    '75%': '75%',
};

export const settings = defineSettings({
    layout: [
        {
            id: 'styleSection',
            type: 'sectionHeading',
            label: 'Block',
            blocks: [
                {
                    id: 'columnCount',
                    label: 'Columns',
                    type: 'slider',
                    defaultValue: '3',
                    info: 'Sets the number of columns on large screens. Columns will break automatically on smaller screens.',
                    choices: [
                        {
                            value: '1',
                            label: '1',
                        },
                        {
                            value: '2',
                            label: '2',
                        },
                        {
                            value: '3',
                            label: '3',
                        },
                        {
                            value: '4',
                            label: '4',
                        },
                        {
                            value: '5',
                            label: '5',
                        },
                    ],
                },
                getGutterSettings(),
            ],
        },
        {
            id: 'imageSection',
            type: 'sectionHeading',
            label: 'Image',
            blocks: [
                {
                    id: IMAGE_POSITION_CHOICE_ID,
                    label: 'Position',
                    type: 'slider',
                    defaultValue: CaptionPosition.Right,
                    choices: [
                        {
                            value: CaptionPosition.Below,
                            icon: IconEnum.MediaObjectTextBottom,
                        },
                        {
                            value: CaptionPosition.Above,
                            icon: IconEnum.MediaObjectTextTop,
                        },
                        {
                            value: CaptionPosition.Right,
                            icon: IconEnum.MediaObjectTextRight,
                        },
                        {
                            value: CaptionPosition.Left,
                            icon: IconEnum.MediaObjectTextLeft,
                        },
                    ],
                },
                {
                    id: 'hasCustomImageWidth',
                    label: 'Width',
                    type: 'switch',
                    switchLabel: 'Custom',
                    defaultValue: false,
                    onChange: (bundle) => presetCustomValue(bundle, 'imageWidthPreset', 'customImageWidth', widthMap),
                    on: [
                        {
                            id: 'customImageWidth',
                            type: 'input',
                            placeholder: 'e.g. 50%',
                            clearable: false,
                            onChange: (bundle) => appendUnit(bundle, 'customImageWidth', '%'),
                            rules: [
                                numericalOrPercentRule,
                                minimumNumericalOrPercentRule(10),
                                maximumNumericalOrPercentOrAutoRule(100),
                            ],
                        },
                    ],
                    off: [
                        {
                            id: 'imageWidthPreset',
                            type: 'slider',
                            defaultValue: '25%',
                            choices: [
                                {
                                    value: '25%',
                                    label: '25%',
                                },
                                {
                                    value: '33%',
                                    label: '33%',
                                },
                                {
                                    value: '50%',
                                    label: '50%',
                                },
                                {
                                    value: '75%',
                                    label: '75%',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'verticalImageAlignment',
                    label: 'Alignment',
                    type: 'slider',
                    defaultValue: VerticalAlignment.Start,
                    show: (bundle) =>
                        bundle.getBlock(IMAGE_POSITION_CHOICE_ID)?.value === CaptionPosition.Right ||
                        bundle.getBlock(IMAGE_POSITION_CHOICE_ID)?.value === CaptionPosition.Left,
                    choices: [
                        {
                            value: VerticalAlignment.Start,
                            icon: IconEnum.ArrowAlignUp,
                        },
                        {
                            value: VerticalAlignment.Center,
                            icon: IconEnum.ArrowAlignHorizontalCentre,
                        },
                        {
                            value: VerticalAlignment.End,
                            icon: IconEnum.ArrowAlignDown,
                        },
                    ],
                },
                {
                    id: 'horizontalImageAlignment',
                    label: 'Alignment',
                    type: 'slider',
                    defaultValue: HorizontalAlignment.Left,
                    show: (bundle) =>
                        bundle.getBlock(IMAGE_POSITION_CHOICE_ID)?.value === CaptionPosition.Above ||
                        bundle.getBlock(IMAGE_POSITION_CHOICE_ID)?.value === CaptionPosition.Below,
                    choices: [
                        {
                            value: HorizontalAlignment.Left,
                            icon: IconEnum.ArrowAlignLeft,
                        },
                        {
                            value: HorizontalAlignment.Center,
                            icon: IconEnum.ArrowAlignVerticalCentre,
                        },
                        {
                            value: HorizontalAlignment.Right,
                            icon: IconEnum.ArrowAlignRight,
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'styleSection',
            type: 'sectionHeading',
            label: 'Image',
            blocks: [
                getBackgroundSettings({ preventDefaultColor: true }),
                getBorderSettings(),
                getBorderRadiusSettings(),
            ],
        },
    ],
    security: [
        ...getSecurityGlobalControlSetting(),
        {
            id: 'assetViewerEnabled',
            label: 'Asset viewer',
            info: "When disabled, viewers won't be able to open the item image in the asset detail view.",
            type: 'switch',
            defaultValue: true,
            show: (bundle) => bundle.getBlock('security')?.value?.toString() === Security.Custom,
        },
    ],
});
