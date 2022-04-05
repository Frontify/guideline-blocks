/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, DropdownSize, IconEnum } from '@frontify/arcade';
import { BlockSettings } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings, getPaddingSettings } from '@frontify/guideline-blocks-shared';
import { NoteStyle, NoteVisibility, paddingStyleMap } from './types';

export const BACKGROUND_COLOR_DEFAULT_VALUE: Color = {
    r: 247,
    g: 247,
    b: 247,
    a: 1,
};
export const BORDER_COLOR_DEFAULT_VALUE: Color = {
    r: 234,
    g: 235,
    b: 235,
    a: 1,
};

const HAS_BACKGROUND_ID = 'hasBackground';

const settings: BlockSettings = {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: NoteStyle.Card,
            size: DropdownSize.Large,
            choices: [
                {
                    value: NoteStyle.Card,
                    icon: IconEnum.Cards,
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
};

export default settings;
