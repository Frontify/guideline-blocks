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
                    icon: IconEnum.Snippet,
                    label: 'HTML',
                },
                {
                    value: 'css',
                    icon: IconEnum.Snippet,
                    label: 'CSS',
                },
                {
                    value: 'js',
                    icon: IconEnum.Snippet,
                    label: 'JS',
                },
                {
                    value: 'jsx',
                    icon: IconEnum.Snippet,
                    label: 'JSX',
                },
                {
                    value: 'ts',
                    icon: IconEnum.Snippet,
                    label: 'TS',
                },
                {
                    value: 'json',
                    icon: IconEnum.Snippet,
                    label: 'JSON',
                },
                {
                    value: 'php',
                    icon: IconEnum.Snippet,
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
            defaultValue: false,
            label: 'Snippet heading',
        },
        {
            id: 'withRowNumbers',
            type: 'switch',
            label: 'Row numbers',
            defaultValue: true,
        },
        {
            id: 'withCustomPadding',
            label: 'Padding',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            on: [
                {
                    id: 'customPadding',
                    type: 'multiInput',
                    layout: MultiInputLayout.Spider,
                    blocks: [
                        {
                            id: 'paddingTop',
                            type: 'input',
                            label: 'Top',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'paddingTop'),
                        },
                        {
                            id: 'paddingLeft',
                            type: 'input',
                            label: 'Left',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'paddingLeft'),
                        },
                        {
                            id: 'paddingRight',
                            type: 'input',
                            label: 'Right',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'paddingRight'),
                        },
                        {
                            id: 'paddingBottom',
                            type: 'input',
                            label: 'Bottom',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'paddingBottom'),
                        },
                    ],
                },
            ],
            off: [
                {
                    id: 'padding',
                    type: 'slider',
                    defaultValue: '0px',
                    choices: [
                        {
                            value: '0px',
                            label: 'None',
                        },
                        {
                            value: '6rem',
                            label: 'S',
                        },
                        {
                            value: '9rem',
                            label: 'M',
                        },
                        {
                            value: '15rem',
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
            label: 'Color schema',
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
        },
        {
            id: 'border',
            type: 'multiInput',
            lastItemFullWidth: true,
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
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: Bundle): void => appendUnit(bundle, 'lineWidth'),
                },
                {
                    id: 'borderColor',
                    type: 'colorInput',
                    defaultValue: BORDER_COLOR_DEFAULT_VALUE,
                },
            ],
            layout: MultiInputLayout.Columns,
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
                    blocks: [
                        {
                            id: 'borderRadiusTop',
                            type: 'input',
                            label: 'Top',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'borderRadiusTop'),
                        },
                        {
                            id: 'borderRadiusLeft',
                            type: 'input',
                            label: 'Left',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'borderRadiusLeft'),
                        },
                        {
                            id: 'borderRadiusRight',
                            type: 'input',
                            label: 'Right',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'borderRadiusRight'),
                        },
                        {
                            id: 'borderRadiusBottom',
                            type: 'input',
                            label: 'Bottom',
                            rules: [numericalOrPixelRule],
                            onChange: (bundle: Bundle): void => appendUnit(bundle, 'borderRadiusBottom'),
                        },
                    ],
                },
            ],
            off: [
                {
                    id: 'borderRadius',
                    type: 'slider',
                    defaultValue: '0px',
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
