/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEnum } from '@frontify/arcade';
import { Bundle, Settings } from '@frontify/guideline-blocks-settings';
import {
    appendUnit,
    getBorderSettings,
    getPaddingSettings,
    numericalOrPixelRule,
} from '@frontify/guideline-blocks-shared';
import { NoteBorderRadius, NoteStyle, NoteVisibility } from './types';

export const BACKGROUND_COLOR_DEFAULT_VALUE = {
    rgba: { r: 247, g: 247, b: 247, a: 1 },
    hex: '#F7F7F7',
};
export const BORDER_COLOR_DEFAULT_VALUE = {
    rgba: { r: 234, g: 235, b: 235, a: 1 },
    hex: '#eaebeb',
};

const HAS_BACKGROUND_ID = 'hasBackground';
const HAS_BORDER_ID = 'hasBorder';
const BORDER_RADIUS_VALUE_ID = 'borderRadiusValue';

const settings: Settings = {
    main: [
        {
            id: 'style',
            type: 'dropdown',
            defaultValue: NoteStyle.Card,
            size: 'Large',
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
        getPaddingSettings(),
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
        {
            id: 'hasCustomBorderRadius',
            label: 'Corner radius',
            type: 'switch',
            switchLabel: 'Custom',
            defaultValue: false,
            show: (bundle: Bundle): boolean =>
                bundle.getBlock(HAS_BACKGROUND_ID)?.value === true || bundle.getBlock(HAS_BORDER_ID)?.value === true,
            on: [
                {
                    id: BORDER_RADIUS_VALUE_ID,
                    type: 'input',
                    rules: [numericalOrPixelRule],
                    onChange: (bundle: Bundle): void => appendUnit(bundle, BORDER_RADIUS_VALUE_ID),
                },
            ],
            off: [
                {
                    id: 'borderRadiusChoice',
                    type: 'slider',
                    defaultValue: NoteBorderRadius.None,
                    choices: [
                        {
                            value: NoteBorderRadius.None,
                            label: 'None',
                        },
                        {
                            value: NoteBorderRadius.Small,
                            label: 'S',
                        },
                        {
                            value: NoteBorderRadius.Medium,
                            label: 'M',
                        },
                        {
                            value: NoteBorderRadius.Large,
                            label: 'L',
                        },
                    ],
                },
            ],
        },
    ],
    security: [
        {
            id: 'visibility',
            type: 'slider',
            label: 'Visible to',
            defaultValue: NoteVisibility.Everyone,
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

// eslint-disable-next-line import/no-default-export
export default settings;
