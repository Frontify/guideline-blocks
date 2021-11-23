/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/arcade';
import { ApiBundle, ApiSettings } from '@frontify/guideline-blocks-settings';
import { numericalOrPixelRule } from '@frontify/guideline-blocks-shared';
import { DoDontLayout, DoDontSpacing, DoDontStyle, spacingValues } from './types';

export const DO_COLOR_DEFAULT_VALUE = { hex: '00c8a5', rgba: { r: 0, g: 200, b: 165, a: 1 }, name: 'Do Color' };
export const DONT_COLOR_DEFAULT_VALUE = { hex: 'ff375a', rgba: { r: 255, g: 55, b: 90, a: 1 }, name: "Don't Color" };

const SPACING_VALUE_ID = 'spacingValue';
const SPACING_CHOICE_ID = 'spacingChoice';

const settings: ApiSettings = {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: DoDontStyle.Icons,
            size: 'Large',
            choices: [
                {
                    value: DoDontStyle.Icons,
                    icon: IconEnum.DosText,
                    label: 'Icons',
                },
                {
                    value: DoDontStyle.Underline,
                    icon: IconEnum.DoDontsUnderline,
                    label: 'Underline',
                },
                {
                    value: DoDontStyle.Text,
                    icon: IconEnum.TextAlignLeft,
                    label: 'Text',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'layout',
            label: 'Arrange',
            type: 'slider',
            defaultValue: DoDontLayout.SideBySide,
            choices: [
                {
                    value: DoDontLayout.SideBySide,
                    label: 'Side by side',
                },
                {
                    value: DoDontLayout.Stacked,
                    label: 'Stacked',
                },
            ],
        },
        {
            id: 'columns',
            label: 'Columns',
            type: 'slider',
            show: (bundle: ApiBundle) => bundle.getBlock('layout')?.value === DoDontLayout.Stacked,
            defaultValue: 2,
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
            id: 'isCustomSpacing',
            label: 'Column gap',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            onChange: (bundle: ApiBundle): void => {
                const sliderValue = bundle.getBlock(SPACING_CHOICE_ID)?.value as DoDontSpacing;
                const customValue = bundle.getBlock(SPACING_VALUE_ID)?.value;
                const spacingKey = (Object.keys(spacingValues) as Array<DoDontSpacing>).find(
                    (key) => spacingValues[key] === customValue
                );
                if (sliderValue && spacingKey) {
                    bundle.setBlockValue(SPACING_VALUE_ID, spacingValues[sliderValue]);
                }
            },
            on: [
                {
                    id: SPACING_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: ApiBundle): void => {
                        const blockHeight = Number(bundle.getBlock(SPACING_VALUE_ID)?.value);
                        if (!Number.isNaN(blockHeight)) {
                            bundle.setBlockValue(SPACING_VALUE_ID, `${blockHeight}px`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: SPACING_CHOICE_ID,
                    type: 'slider',
                    defaultValue: DoDontSpacing.Medium,
                    choices: [
                        {
                            value: DoDontSpacing.Small,
                            label: 'S',
                        },
                        {
                            value: DoDontSpacing.Medium,
                            label: 'M',
                        },
                        {
                            value: DoDontSpacing.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'doColor',
            type: 'colorInput',
            label: 'Do color',
            defaultValue: DO_COLOR_DEFAULT_VALUE,
        },
        {
            id: 'dontColor',
            type: 'colorInput',
            label: "Don't color",
            defaultValue: DONT_COLOR_DEFAULT_VALUE,
        },
    ],
};

export default settings;
