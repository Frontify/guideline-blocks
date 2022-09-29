/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { DropdownSize, IconEnum, MultiInputLayout } from '@frontify/fondue';
import {
    Radius,
    appendUnit,
    getExtendedBorderRadiusSettings,
    getMarginExtendedSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-shared';

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
        getMarginExtendedSettings(),
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
                    onChange: (bundle) => {
                        appendUnit(bundle, 'lineWidth');
                    },
                    blocks: [
                        {
                            id: 'lineStyle',
                            type: 'dropdown',
                            defaultValue: 'solid',
                            size: DropdownSize.Small,
                            choices: [
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
                            ],
                        },
                        {
                            id: 'lineWidth',
                            type: 'input',
                            defaultValue: '1px',
                            placeholder: 'e.g. 2px',
                            rules: [numericalOrPixelRule],
                            clearable: false,
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
        getExtendedBorderRadiusSettings({ defaultValue: Radius.Medium }),
    ],
};
