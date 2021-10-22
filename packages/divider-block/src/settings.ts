/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DividerStyle, DividerWidth, DividerHeight, DividerAlignment } from './types';

const mainDropdownId = 'main-dropdown';

const solidStyleIsSelected = (bundle: any) => bundle.getBlock(mainDropdownId).value === DividerStyle.Solid;

export default {
    main: [
        {
            id: mainDropdownId,
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
                    placeholder: '50%',
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
                    placeholder: '24px',
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
            id: 'color',
            type: 'dropdown',
            label: 'Color',
            choices: [],
            show: solidStyleIsSelected,
        },
    ],
};
