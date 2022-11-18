/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum } from '@frontify/fondue';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { Radius, getBorderSettings, getExtendedBorderRadiusSettings } from '@frontify/guideline-blocks-shared';
import { languageNameMap } from './types';

export const settings: BlockSettings = {
    main: [
        {
            id: 'language',
            type: 'dropdown',
            defaultValue: 'html',
            size: DropdownSize.Large,
            choices: Object.entries(languageNameMap).map(([value, label]) => ({ value, icon: IconEnum.Code, label })),
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
            defaultValue: 'default',
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
