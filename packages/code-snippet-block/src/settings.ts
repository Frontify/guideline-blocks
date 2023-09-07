/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconEnum,
    Radius,
    defineSettings,
    getBorderSettings,
    getExtendedBorderRadiusSettings,
} from '@frontify/guideline-blocks-settings';
import { languageNameMap, themeNameMap } from './types';

export const settings = defineSettings({
    main: [
        {
            id: 'language',
            type: 'dropdown',
            defaultValue: 'html',
            size: 'large',
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
            size: 'small',
            choices: Object.entries(themeNameMap).map(([value, label]) => ({ value, label })),
        },
        getBorderSettings({ defaultValue: true }),
        getExtendedBorderRadiusSettings({ defaultValue: Radius.Medium }),
    ],
});
