/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    numericalPixelValueRule,
    numericalPercentValueRule,
    minimumNumericalPixelValueOrAuto,
    minimumNumericalPercentValueOrAuto,
    maximumNumericalPercentValueOrAuto,
} from './rules';
import { DividerStyle, DividerWidth, DividerHeight, DividerAlignment, DividerThickness } from './types';

const isLine = 'isLine';

const solidStyleIsSelected = (bundle: any) => bundle.getBlock(isLine).value === DividerStyle.Solid;

export default {
    main: [
        {
            id: isLine,
            type: 'dropdown',
            size: 'large',
            defaultValue: DividerStyle.Solid,
            choices: [
                {
                    value: DividerStyle.NoLine,
                    icon: 'line-spacer',
                    label: 'Spacer (no line)',
                },
                {
                    value: DividerStyle.Solid,
                    icon: 'line-solid',
                    label: 'Line',
                },
            ],
        },
    ],
    layout: [
        {
            id: 'isWidthCustom',
            type: 'switch',
            label: 'Width',
            switchLabel: 'Custom',
            info: 'Lorem ipsum dolor sit amet',
            on: [
                {
                    id: 'widthCustom',
                    type: 'input',
                    placeholder: '73%',
                    rules: [
                        numericalPercentValueRule,
                        minimumNumericalPercentValueOrAuto(0),
                        maximumNumericalPercentValueOrAuto(100),
                    ],
                    onChange: (bundle: any): void => {
                        const blockWidth = Number(bundle.getBlock('widthCustom')?.value);
                        if (!Number.isNaN(blockWidth)) {
                            bundle.setBlockValue('widthCustom', `${blockWidth}%`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: 'widthSimple',
                    type: 'slider',
                    defaultValue: '100%',
                    choices: [
                        {
                            value: DividerWidth['10%'],
                            label: DividerWidth['10%'],
                        },
                        {
                            value: DividerWidth['25%'],
                            label: DividerWidth['25%'],
                        },
                        {
                            value: DividerWidth['50%'],
                            label: DividerWidth['50%'],
                        },
                        {
                            value: DividerWidth['100%'],
                            label: DividerWidth['100%'],
                        },
                    ],
                },
            ],
            show: solidStyleIsSelected,
        },
        {
            id: 'alignment',
            type: 'slider',
            label: 'Alignment',
            info: 'Lorem ipsum dolor sit amet',
            defaultValue: DividerAlignment.Left,
            choices: [
                {
                    value: DividerAlignment.Left,
                    icon: 'align-left',
                },
                {
                    value: DividerAlignment.Center,
                    icon: 'align-center',
                },
                {
                    value: DividerAlignment.Right,
                    icon: 'align-right',
                },
            ],
            show: solidStyleIsSelected,
        },
        {
            id: 'isHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            info: 'Lorem ipsum dolor sit amet',
            on: [
                {
                    id: 'heightCustom',
                    type: 'input',
                    placeholder: '100px',
                    rules: [numericalPixelValueRule],
                    onChange: (bundle: any): void => {
                        const blockHeight = Number(bundle.getBlock('heightCustom')?.value);
                        if (!Number.isNaN(blockHeight)) {
                            bundle.setBlockValue('heightCustom', `${blockHeight}px`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: 'heightSimple',
                    type: 'slider',
                    defaultValue: DividerHeight.Small,
                    choices: [
                        {
                            value: DividerHeight.Small,
                            label: 'S',
                        },
                        {
                            value: DividerHeight.Medium,
                            label: 'M',
                        },
                        {
                            value: DividerHeight.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'style',
            type: 'slider',
            label: 'Type',
            info: 'Lorem ipsum dolor sit amet',
            defaultValue: DividerStyle.Solid,
            choices: [
                {
                    value: DividerStyle.Solid,
                    label: 'Solid',
                },
                {
                    value: DividerStyle.Dashed,
                    label: 'Dashes',
                },
                {
                    value: DividerStyle.Dotted,
                    label: 'Dots',
                },
            ],
            show: solidStyleIsSelected,
        },
        {
            id: 'isThicknessCustom',
            type: 'switch',
            label: 'Thickness',
            switchLabel: 'Custom',
            info: 'Lorem ipsum dolor sit amet',
            on: [
                {
                    id: 'thicknessCustom',
                    type: 'input',
                    placeholder: '8px',
                    rules: [numericalPixelValueRule, minimumNumericalPixelValueOrAuto(1)],
                    onChange: (bundle: any): void => {
                        const borderThickness = Number(bundle.getBlock('thicknessCustom')?.value);
                        if (!Number.isNaN(borderThickness)) {
                            bundle.setBlockValue('thicknessCustom', `${borderThickness}px`);
                        }
                    },
                },
            ],
            off: [
                {
                    id: 'thicknessSimple',
                    type: 'slider',
                    defaultValue: DividerThickness.Small,
                    choices: [
                        {
                            value: DividerThickness.Small,
                            label: 'S',
                        },
                        {
                            value: DividerThickness.Medium,
                            label: 'M',
                        },
                        {
                            value: DividerThickness.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
            show: solidStyleIsSelected,
        },
        {
            id: 'color',
            type: 'input',
            label: 'Color',
            show: solidStyleIsSelected,
        },
    ],
};
