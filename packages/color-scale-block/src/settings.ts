/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { DropdownSize, IconEnum } from '@frontify/fondue';
import type { BlockSettings } from '@frontify/guideline-blocks-settings';

export const settings: BlockSettings = {
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'custom_block',
            size: 'Large' as DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'custom_block',
                    icon: 'Snippet' as IconEnum.Snippet,
                    label: 'Custom Block',
                },
            ],
        },
    ],
};


// import { IconEnum, /*DropdownSize,*/ MultiInputLayout } from '@frontify/fondue';
// import { BlockSettings } from '@frontify/guideline-blocks-settings';

// const settings: BlockSettings = {
//     main: [
//         {
//             id: 'main-dropdown',
//             type: 'dropdown',
//             defaultValue: 'custom_block',
//             size: DropdownSize.Large,
//             disabled: true,
//             choices: [
//                 {
//                     value: 'custom_block',
//                     icon: IconEnum.Snippet,
//                     label: 'Horizontal Linear',
//                 },
//             ],
//         },
//     ],
//     content: [
//         {
//             id: 'colorInputMinimumSwitch',
//             label: 'Number of colors',
//             type: 'switch',
//             switchLabel: 'Custom',
//             defaultValue: false,
//             off: [
//                 {
//                     id: 'colorInputMinimumSlider',
//                     type: 'slider',
//                     defaultValue: '6',
//                     choices: [
//                         {
//                             value: '3',
//                             label: '3',
//                         },
//                         {
//                             value: '6',
//                             label: '6',
//                         },
//                         {
//                             value: '9',
//                             label: '9',
//                         },
//                         {
//                             value: '12',
//                             label: '12',
//                         },
//                     ],
//                 },
//             ],
//             on: [
//                 {
//                     id: 'colorInputMinimum',
//                     type: 'input',
//                     clearable: false,
//                     // label: 'Number of colors',
//                     defaultValue: '6',
//                 },
//             ],
//         },
//         {
//             id: 'color-input',
//             type: 'colorInput',
//             dynamic: {
//                 addButtonLabel: 'Add new',
//             },
//             label: 'Color Input',
//         },
//     ],
//     layout: [
//         {
//             id: 'proportions',
//             label: 'Proportions',
//             type: 'slider',
//             defaultValue: 'equal',
//             choices: [
//                 {
//                     value: 'equal',
//                     label: 'Equal',
//                 },
//                 {
//                     value: 'dragToResize',
//                     label: 'Drag-to-resize',
//                 },
//             ],
//         },
//         {
//             id: 'heightSwitchId',
//             label: 'Height',
//             type: 'switch',
//             switchLabel: 'Custom',
//             defaultValue: false,
//             off: [
//                 {
//                     id: 'heightSliderId',
//                     type: 'slider',
//                     defaultValue: '96px',
//                     choices: [
//                         {
//                             value: '48px',
//                             label: 'S',
//                         },
//                         {
//                             value: '72px',
//                             label: 'M',
//                         },
//                         {
//                             value: '96px',
//                             label: 'L',
//                         },
//                     ],
//                 },
//             ],
//             on: [
//                 {
//                     id: 'heightInputId',
//                     type: 'input',
//                     defaultValue: '100px',
//                     clearable: false,
//                     rules: [
//                         {
//                             errorMessage: "Please use a numerical value with or without 'px'",
//                             validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
//                         },
//                     ],
//                 },
//             ],
//         },
//         {
//             id: 'colorSpacingSwitchId',
//             label: 'Color spacing',
//             type: 'switch',
//             switchLabel: 'Custom',
//             defaultValue: false,
//             off: [
//                 {
//                     id: 'colorSpacingSliderId',
//                     type: 'slider',
//                     defaultValue: '4px',
//                     choices: [
//                         {
//                             value: '0px',
//                             label: 'None',
//                         },
//                         {
//                             value: '4px',
//                             label: 'S',
//                         },
//                         {
//                             value: '12px',
//                             label: 'M',
//                         },
//                         {
//                             value: '24px',
//                             label: 'L',
//                         },
//                     ],
//                 },
//             ],
//             on: [
//                 {
//                     id: 'colorSpacingInputId',
//                     type: 'input',
//                     defaultValue: '100px',
//                     clearable: false,
//                     rules: [
//                         {
//                             errorMessage: "Please use a numerical value with or without 'px'",
//                             validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
//     'Each color': [
//         {
//             id: 'borderSwitchId',
//             label: 'Border',
//             type: 'switch',
//             defaultValue: true,
//             off: [],
//             on: [
//                 {
//                     id: 'borderMultiInputId',
//                     type: 'multiInput',
//                     layout: MultiInputLayout.Columns,
//                     lastItemFullWidth: true,
//                     blocks: [
//                         {
//                             id: 'borderStyleDropdownId',
//                             type: 'dropdown',
//                             defaultValue: 'solid',
//                             choices: [
//                                 {
//                                     value: 'solid',
//                                     label: 'Solid',
//                                 },
//                                 {
//                                     value: 'dashed',
//                                     label: 'Dashed',
//                                 },
//                                 {
//                                     value: 'dotted',
//                                     label: 'Dotted',
//                                 },
//                             ],
//                         },
//                         {
//                             id: 'borderWidthInputId',
//                             type: 'input',
//                             defaultValue: '1px',
//                             clearable: false,
//                             rules: [
//                                 {
//                                     errorMessage: "Please use a numerical value with or without 'px'",
//                                     validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
//                                 },
//                             ],
//                         },
//                         {
//                             id: 'borderColorInputId',
//                             type: 'colorInput',
//                             defaultValue: {
//                                 hex: '#cccccc',
//                                 rgba: { r: 204, g: 204, b: 204, a: 1 },
//                                 name: 'Light Grey',
//                             },
//                         },
//                     ],
//                 },
//                 {
//                     id: 'borderCornerRadiusSwitchId',
//                     label: 'Corner Radius',
//                     type: 'switch',
//                     switchLabel: 'Custom',
//                     defaultValue: false,
//                     off: [
//                         {
//                             id: 'borderCornerRadiusSliderId',
//                             type: 'slider',
//                             defaultValue: '0px',
//                             choices: [
//                                 {
//                                     value: '0px',
//                                     label: 'None',
//                                 },
//                                 {
//                                     value: '2px',
//                                     label: 'S',
//                                 },
//                                 {
//                                     value: '4px',
//                                     label: 'M',
//                                 },
//                                 {
//                                     value: '12px',
//                                     label: 'L',
//                                 },
//                             ],
//                         },
//                     ],
//                     on: [
//                         {
//                             id: 'borderCornerRadiusMultiInputId',
//                             type: 'multiInput',
//                             layout: MultiInputLayout.Spider,
//                             blocks: [
//                                 {
//                                     id: 'borderCornerRadiusTopInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Top',
//                                 },
//                                 {
//                                     id: 'borderCornerRadiusLeftInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Left',
//                                 },
//                                 {
//                                     id: 'borderCornerRadiusRightInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Right',
//                                 },
//                                 {
//                                     id: 'borderCornerRadiusBottomInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Bottom',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
//     'Color scale': [
//         {
//             id: 'outerBorderSwitchId',
//             label: 'Border',
//             type: 'switch',
//             defaultValue: true,
//             off: [],
//             on: [
//                 {
//                     id: 'outerBorderMultiInputId',
//                     type: 'multiInput',
//                     layout: MultiInputLayout.Columns,
//                     lastItemFullWidth: true,
//                     blocks: [
//                         {
//                             id: 'outerBorderStyleDropdownId',
//                             type: 'dropdown',
//                             defaultValue: 'solid',
//                             choices: [
//                                 {
//                                     value: 'solid',
//                                     label: 'Solid',
//                                 },
//                                 {
//                                     value: 'dashed',
//                                     label: 'Dashed',
//                                 },
//                                 {
//                                     value: 'dotted',
//                                     label: 'Dotted',
//                                 },
//                             ],
//                         },
//                         {
//                             id: 'outerBorderWidthInputId',
//                             type: 'input',
//                             defaultValue: '1px',
//                             clearable: false,
//                             rules: [
//                                 {
//                                     errorMessage: "Please use a numerical value with or without 'px'",
//                                     validate: (value: string) => value.match(/^(?:\d+)(?:px)?$/g) !== null,
//                                 },
//                             ],
//                         },
//                         {
//                             id: 'outerBorderColorInputId',
//                             type: 'colorInput',
//                             defaultValue: {
//                                 hex: '#cccccc',
//                                 rgba: { r: 204, g: 204, b: 204, a: 1 },
//                                 name: 'Light Grey',
//                             },
//                         },
//                     ],
//                 },
//                 {
//                     id: 'outerBorderCornerRadiusSwitchId',
//                     label: 'Corner Radius',
//                     type: 'switch',
//                     switchLabel: 'Custom',
//                     defaultValue: false,
//                     off: [
//                         {
//                             id: 'outerBorderCornerRadiusSliderId',
//                             type: 'slider',
//                             defaultValue: '4px',
//                             choices: [
//                                 {
//                                     value: '0px',
//                                     label: 'None',
//                                 },
//                                 {
//                                     value: '2px',
//                                     label: 'S',
//                                 },
//                                 {
//                                     value: '4px',
//                                     label: 'M',
//                                 },
//                                 {
//                                     value: '12px',
//                                     label: 'L',
//                                 },
//                             ],
//                         },
//                     ],
//                     on: [
//                         {
//                             id: 'outerBorderCornerRadiusMultiInputId',
//                             type: 'multiInput',
//                             layout: MultiInputLayout.Spider,
//                             blocks: [
//                                 {
//                                     id: 'outerBorderCornerRadiusTopInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Top',
//                                 },
//                                 {
//                                     id: 'outerBorderCornerRadiusLeftInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Left',
//                                 },
//                                 {
//                                     id: 'outerBorderCornerRadiusRightInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Right',
//                                 },
//                                 {
//                                     id: 'outerBorderCornerRadiusBottomInputId',
//                                     type: 'input',
//                                     clearable: true,
//                                     label: 'Bottom',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
// };

// const settings = {};

// // // eslint-disable-next-line import/no-default-export
// export default settings;
