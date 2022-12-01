/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings, getPaddingSettings } from '@frontify/guideline-blocks-shared';
import { NoteStyle, NoteVisibility, paddingStyleMap } from './types';

export const BACKGROUND_COLOR_DEFAULT_VALUE: Color = {
    red: 247,
    green: 247,
    blue: 247,
    alpha: 1,
};
export const BORDER_COLOR_DEFAULT_VALUE: Color = {
    red: 234,
    green: 235,
    blue: 235,
    alpha: 1,
};

const HAS_BACKGROUND_ID = 'hasBackground';

export const settings = defineSettings({
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: NoteStyle.Card,
            size: DropdownSize.Large,
            choices: [
                {
                    value: NoteStyle.Card,
                    icon: IconEnum.Card,
                    label: 'Card',
                },
            ],
            disabled: true,
        },
    ],
    layout: [
        {
            id: 'hasAvatarName',
            label: 'Avatar and name',
            type: 'switch',
            defaultValue: true,
        },
        {
            id: 'hasDateEdited',
            label: 'Date last edited',
            type: 'switch',
            defaultValue: true,
        },
        getPaddingSettings({ paddingStyleMap }),
    ],
    style: [
        {
            id: HAS_BACKGROUND_ID,
            label: 'Background',
            type: 'switch',
            defaultValue: false,
            on: [
                {
                    id: 'backgroundColor',
                    type: 'colorInput',
                    defaultValue: BACKGROUND_COLOR_DEFAULT_VALUE,
                },
            ],
            off: [],
        },
        getBorderSettings(),
        getBorderRadiusSettings(),
    ],
    security: [
        {
            id: 'visibility',
            type: 'slider',
            label: 'Visible to',
            defaultValue: NoteVisibility.Everyone,
            info: 'Switch between Block visibility permissions',
            choices: [
                {
                    value: NoteVisibility.YouOnly,
                    label: 'You only',
                },
                {
                    value: NoteVisibility.Editors,
                    label: 'Editors',
                },
                {
                    value: NoteVisibility.Everyone,
                    label: 'Everyone',
                },
            ],
        },
    ],
});
