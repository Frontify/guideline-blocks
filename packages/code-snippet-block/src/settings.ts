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
            defaultValue: 'plaintext',
            size: DropdownSize.Large,
            choices: [
                { value: 'coffeescript', icon: IconEnum.Code, label: 'CoffeeScript' },
                { value: 'css', icon: IconEnum.Code, label: 'CSS' },
                { value: 'sass', icon: IconEnum.Code, label: 'CSS (Sass)' },
                { value: 'haml', icon: IconEnum.Code, label: 'Haml' },
                { value: 'html', icon: IconEnum.Code, label: 'HTML' },
                { value: 'java', icon: IconEnum.Code, label: 'Java' },
                { value: 'javascript', icon: IconEnum.Code, label: 'JavaScript' },
                { value: 'jsp', icon: IconEnum.Code, label: 'JSP' },
                { value: 'jsx', icon: IconEnum.Code, label: 'JSX' },
                { value: 'kotlin', icon: IconEnum.Code, label: 'Kotlin' },
                { value: 'livescript', icon: IconEnum.Code, label: 'LiveScript' },
                { value: 'markdown', icon: IconEnum.Code, label: 'Markdown' },
                { value: 'jade', icon: IconEnum.Code, label: 'Pug (Jade)' },
                { value: 'plaintext', icon: IconEnum.Code, label: 'Plain text' },
                { value: 'php', icon: IconEnum.Code, label: 'PHP' },
                { value: 'shell', icon: IconEnum.Code, label: 'Shell' },
                { value: 'slim', icon: IconEnum.Code, label: 'Slim' },
                { value: 'sql', icon: IconEnum.Code, label: 'SQL' },
                { value: 'swift', icon: IconEnum.Code, label: 'Swift' },
                { value: 'typescript', icon: IconEnum.Code, label: 'TypeScript' },
                { value: 'tsx', icon: IconEnum.Code, label: 'TSX' },
                { value: 'xml', icon: IconEnum.Code, label: 'XML' },
                { value: 'yaml', icon: IconEnum.Code, label: 'Yaml' },
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
