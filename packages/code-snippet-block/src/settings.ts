/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import { appendUnit, numericalOrPixelRule } from '@frontify/guideline-blocks-shared';
import { BlockSettings, Bundle } from '@frontify/guideline-blocks-settings';
import { BORDER_COLOR_DEFAULT_VALUE, DEFAULT_THEME_VALUE } from './constants';

export const settings: BlockSettings = {
    main: [
        {
            id: 'language',
            type: 'dropdown',
            defaultValue: 'html',
            size: DropdownSize.Large,
            choices: [
                {
                    value: 'html',
                    icon: IconEnum.Code,
                    label: 'HTML',
                },
                {
                    value: 'css',
                    icon: IconEnum.Code,
                    label: 'CSS',
                },
                {
                    value: 'js',
                    icon: IconEnum.Code,
                    label: 'JS',
                },
                {
                    value: 'jsx',
                    icon: IconEnum.Code,
                    label: 'JSX',
                },
                {
                    value: 'ts',
                    icon: IconEnum.Code,
                    label: 'TS',
                },
                {
                    value: 'json',
                    icon: IconEnum.Code,
                    label: 'JSON',
                },
                {
                    value: 'php',
                    icon: IconEnum.Code,
                    label: 'PHP',
                },
            ],
        },
    ],
    basics: [],
    layout: [
        {
            id: 'withHeading',
            type: 'switch',
            defaultValue: true,
            label: 'Snippet heading',
        },
        {
            id: 'withRowNumbers',
            type: 'switch',
            label: 'Row numbers',
            defaultValue: true,
        },
        {
            id: 'withCustomMargin',
            label: 'Margin',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            on: [
                {
                    id: 'customMargin',
                    type: 'multiInput',
                    layout: MultiInputLayout.Spider,
                    blocks: [
                        {
                            id: 'marginTop',
                            type: 'input',
                            label: 'Top',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'marginTop'),
                        },
                        {
                            id: 'marginLeft',
                            type: 'input',
                            label: 'Left',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'marginLeft'),
                        },
                        {
                            id: 'marginRight',
                            type: 'input',
                            label: 'Right',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'marginRight'),
                        },
                        {
                            id: 'marginBottom',
                            type: 'input',
                            label: 'Bottom',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'marginBottom'),
                        },
                    ],
                },
            ],
            off: [
                {
                    id: 'margin',
                    type: 'slider',
                    defaultValue: '0px',
                    choices: [
                        {
                            value: '0px',
                            label: 'None',
                        },
                        {
                            value: '24px',
                            label: 'S',
                        },
                        {
                            value: '36px',
                            label: 'M',
                        },
                        {
                            value: '60px',
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    style: [
        {
            id: 'theme',
            type: 'dropdown',
            defaultValue: DEFAULT_THEME_VALUE,
            label: 'Color scheme',
            size: DropdownSize.Small,
            choices: [
                {
                    value: 'default',
                    label: 'Default Theme',
                },
                {
                    value: 'dracula',
                    label: 'Dracula',
                },
                {
                    value: 'evaLight',
                    label: 'Eva Light',
                },
                {
                    value: 'gitHubDark',
                    label: 'GitHub Dark',
                },
                {
                    value: 'gitHubLight',
                    label: 'GitHub Light',
                },
                {
                    value: 'materialDarker',
                    label: 'Material Darker',
                },
                {
                    value: 'materialLighter',
                    label: 'Material Lighter',
                },
                {
                    value: 'materialPalenight',
                    label: 'Material Palenight',
                },
                {
                    value: 'oneDark',
                    label: 'One Dark',
                },
                {
                    value: 'oneLight',
                    label: 'One Light',
                },
                {
                    value: 'base16Dark',
                    label: 'Base16 Dark',
                },
                {
                    value: 'base16Light',
                    label: 'Base16 Light',
                },
                {
                    value: 'cobalt',
                    label: 'Cobalt',
                },
            ],
        },
        {
            id: 'withBorder',
            type: 'switch',
            defaultValue: true,
            label: 'Border',
            on: [
                {
                    id: 'border',
                    type: 'multiInput',
                    lastItemFullWidth: true,
                    onChange: (bundle: Bundle): void => {
                        appendUnit(bundle, 'lineWidth');
                    },
                    blocks: [
                        {
                            id: 'lineStyle',
                            type: 'dropdown',
                            defaultValue: 'solid',
                            choices: [
                                {
                                    value: 'none',
                                    label: 'None',
                                },
                                {
                                    value: 'dotted',
                                    label: 'Dotted',
                                },
                                {
                                    value: 'dashed',
                                    label: 'Dashed',
                                },
                                {
                                    value: 'solid',
                                    label: 'Solid',
                                },
                                {
                                    value: 'double',
                                    label: 'Double',
                                },
                            ],
                        },
                        {
                            id: 'lineWidth',
                            type: 'input',
                            defaultValue: '1px',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                        },
                        {
                            id: 'borderColor',
                            type: 'colorInput',
                            defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                        },
                    ],
                    layout: MultiInputLayout.Columns,
                },
            ],
        },
        {
            id: 'withCustomBorderRadius',
            label: 'Corner Radius',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            on: [
                {
                    id: 'customBorderRadius',
                    type: 'multiInput',
                    layout: MultiInputLayout.Spider,
                    onChange: (bundle: Bundle): void => {
                        appendUnit(bundle, 'borderRadiusTop');
                        appendUnit(bundle, 'borderRadiusLeft');
                        appendUnit(bundle, 'borderRadiusRight');
                        appendUnit(bundle, 'borderRadiusBottom');
                    },
                    blocks: [
                        {
                            id: 'borderRadiusTopLeft',
                            type: 'input',
                            label: 'Top left',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                        },
                        {
                            id: 'borderRadiusTopRight',
                            type: 'input',
                            label: 'Top right',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                        },
                        {
                            id: 'borderRadiusBottomRight',
                            type: 'input',
                            label: 'Bottom right',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                        },
                        {
                            id: 'borderRadiusBottomLeft',
                            type: 'input',
                            label: 'Bottom left',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                        },
                    ],
                },
            ],
            off: [
                {
                    id: 'borderRadius',
                    type: 'slider',
                    defaultValue: '4px',
                    choices: [
                        {
                            value: '0px',
                            label: 'None',
                        },
                        {
                            value: '2px',
                            label: 'S',
                        },
                        {
                            value: '4px',
                            label: 'M',
                        },
                        {
                            value: '12px',
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
};
