/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { Bundle } from '@frontify/guideline-blocks-settings';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    minimumNumericalOrPixelOrAutoRule,
    numericalOrPixelRule,
    presetCustomValue,
} from '@frontify/guideline-blocks-shared';
import { ChartHeight, ChartType, chartHeightValues } from './types';

const HEIGHT_CUSTOM_ID = 'heightCustom';
const HEIGHT_SIMPLE_ID = 'heightSimple';

export const DEFAULT_COLOR = {
    r: 136,
    g: 132,
    b: 216,
    a: 1,
    name: 'Purple',
};
export const HEIGHT_DEFAULT_VALUE = ChartHeight.Medium;

const settings: BlockSettings = {
    main: [
        {
            id: 'type',
            type: 'dropdown',
            defaultValue: ChartType.Line,
            size: DropdownSize.Large,
            choices: [
                {
                    value: ChartType.Line,
                    icon: IconEnum.Lines,
                    label: 'Line Chart',
                },
                {
                    value: ChartType.Bar,
                    icon: IconEnum.ChartBars,
                    label: 'Bar Chart',
                },
                {
                    value: ChartType.Pie,
                    icon: IconEnum.ChartPie,
                    label: 'Pie Chart',
                },
            ],
        },
        {
            id: 'chartData',
            label: 'Chart Data',
            type: 'assetInput',
        },
    ],
    layout: [
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            info: 'Determines the block height. This will not affect the dividing line in any way.',
            defaultValue: false,
            onChange: (bundle: Bundle): void =>
                presetCustomValue(bundle, HEIGHT_SIMPLE_ID, HEIGHT_CUSTOM_ID, chartHeightValues),
            on: [
                {
                    id: HEIGHT_CUSTOM_ID,
                    type: 'input',
                    placeholder: '100px',
                    clearable: false,
                    rules: [numericalOrPixelRule, minimumNumericalOrPixelOrAutoRule(10)],
                    onChange: (bundle: Bundle): void => appendUnit(bundle, HEIGHT_CUSTOM_ID),
                },
            ],
            off: [
                {
                    id: HEIGHT_SIMPLE_ID,
                    type: 'slider',
                    defaultValue: HEIGHT_DEFAULT_VALUE,
                    choices: [
                        {
                            value: ChartHeight.Small,
                            label: 'S',
                        },
                        {
                            value: ChartHeight.Medium,
                            label: 'M',
                        },
                        {
                            value: ChartHeight.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [{ id: 'color', type: 'colorInput', label: 'Color', defaultValue: DEFAULT_COLOR }],
};

export default settings;
