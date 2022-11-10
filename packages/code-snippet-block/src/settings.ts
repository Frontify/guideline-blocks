/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { DropdownSize, IconEnum } from '@frontify/fondue';
import { Radius, getBorderSettings, getExtendedBorderRadiusSettings } from '@frontify/guideline-blocks-shared';

import { DEFAULT_THEME_VALUE } from './constants';

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
        getBorderSettings({ defaultValue: true }),
        getExtendedBorderRadiusSettings({ defaultValue: Radius.Medium }),
    ],
};
