/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DividerStyle, DividerHeight } from '@frontify/arcade';

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
            id: 'isBlockHeightCustom',
            type: 'switch',
            label: 'Block Height',
            switchLabel: 'Custom',
            info: 'Lorem ipsum dolor sit amet',
            on: [
                {
                    id: 'blockHeightCustom',
                    type: 'input',
                    placeholder: '24px',
                },
            ],
            off: [
                {
                    id: 'blockHeightSimple',
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
