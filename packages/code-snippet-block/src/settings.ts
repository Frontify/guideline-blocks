/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { Radius, getBorderSettings, getExtendedBorderRadiusSettings } from '@frontify/guideline-blocks-shared';

export const settings: BlockSettings = {
    main: [
        {
            id: 'language',
            type: 'dropdown',
            defaultValue: 'html',
            size: DropdownSize.Large,
            choices: [
                { value: 'coffeescript', icon: IconEnum.Code, label: 'CoffeeScript' },
                { value: 'css', icon: IconEnum.Code, label: 'CSS' },
                { value: 'sass', icon: IconEnum.Code, label: 'CSS (Sass)' },
                { value: 'c', icon: IconEnum.Code, label: 'C' },
                { value: 'cpp', icon: IconEnum.Code, label: 'C++' },
                { value: 'csharp', icon: IconEnum.Code, label: 'C#' },
                { value: 'go', icon: IconEnum.Code, label: 'Go' },
                { value: 'html', icon: IconEnum.Code, label: 'HTML' },
                { value: 'java', icon: IconEnum.Code, label: 'Java' },
                { value: 'javascript', icon: IconEnum.Code, label: 'JavaScript' },
                { value: 'json', icon: IconEnum.Code, label: 'JSON' },
                { value: 'jsx', icon: IconEnum.Code, label: 'JSX' },
                { value: 'kotlin', icon: IconEnum.Code, label: 'Kotlin' },
                { value: 'livescript', icon: IconEnum.Code, label: 'LiveScript' },
                { value: 'markdown', icon: IconEnum.Code, label: 'Markdown' },
                { value: 'python', icon: IconEnum.Code, label: 'Phyton' },
                { value: 'php', icon: IconEnum.Code, label: 'PHP' },
                { value: 'shell', icon: IconEnum.Code, label: 'Shell' },
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
            defaultValue: 'light',
            label: 'Color scheme',
            size: DropdownSize.Small,
            choices: [
                { value: 'default', label: 'Default Theme' },
                { value: 'abcdef', label: 'Abcdef' },
                { value: 'androidstudio', label: 'Android Studio' },
                { value: 'atomone', label: 'Atom One' },
                { value: 'bbedit', label: 'BBEdit' },
                { value: 'bespin', label: 'Bespin' },
                { value: 'darcula', label: 'Darcula' },
                { value: 'dracula', label: 'Dracula' },
                { value: 'duotoneDark', label: 'Duotone Dark' },
                { value: 'duotoneLight', label: 'Duotone Light' },
                { value: 'eclipse', label: 'Eclipse' },
                { value: 'githubDark', label: 'GitHub Dark' },
                { value: 'githubLight', label: 'GitHub Light' },
                { value: 'gruvboxDark', label: 'Gruvbox Dark' },
                { value: 'okaidia', label: 'Okaidia' },
                { value: 'sublime', label: 'Sublime' },
                { value: 'xcodeDark', label: 'Xcode Dark' },
                { value: 'xcodeLight', label: 'Xcode Light' },
            ],
        },
        getBorderSettings({ defaultValue: true }),
        getExtendedBorderRadiusSettings({ defaultValue: Radius.Medium }),
    ],
};
