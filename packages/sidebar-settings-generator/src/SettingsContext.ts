/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/fondue';
import { createContext } from 'react';
import { SidebarSettingsGeneratorContext } from './types';

export const SettingsContext = createContext<SidebarSettingsGeneratorContext>({
    settings: {
        main: [
            {
                id: 'STYLE_ID',
                type: 'dropdown',
                choices: [
                    {
                        value: 'true',
                        icon: IconEnum.Iframe,
                        label: 'Story (with add-ons)',
                    },
                    {
                        value: 'StorybookStyle.WithoutAddons',
                        icon: IconEnum.Iframe,
                        label: 'Story (no add-ons)',
                    },
                ],
            },
        ],
        content: [
            {
                id: 'url',
                label: 'Link',
                type: 'input',
                placeholder: 'URL_INPUT_PLACEHOLDER',
            },
        ],
    },
    setSettings: () => ({}),
});
