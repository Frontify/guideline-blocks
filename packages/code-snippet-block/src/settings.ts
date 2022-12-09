/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { Radius, getBorderSettings, getExtendedBorderRadiusSettings } from '@frontify/guideline-blocks-shared';
import { languageNameMap, themeNameMap } from './types';

export const settings = defineSettings({
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
            choices: Object.entries(themeNameMap).map(([value, label]) => ({ value, label })),
        },
        getBorderSettings({ defaultValue: true }),
        getExtendedBorderRadiusSettings({ defaultValue: Radius.Medium }),
    ],
});
