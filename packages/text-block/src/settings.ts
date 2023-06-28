/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings } from '@frontify/guideline-blocks-settings';
import { GutterSpacing, getGutterSettings } from '@frontify/guideline-blocks-shared';

export const PLACEHOLDER = 'Your text here';
const CUSTOM_GUTTER_ID = 'columnGutterCustom';
const SIMPLE_GUTTER_ID = 'columnGutterSimple';
const COLUMN_NR_ID = 'columnNumber';

export const settings = defineSettings({
    basics: [
        {
            id: 'link',
            type: 'link',
            label: 'Link',
            clearable: true,
            required: true,
        },
    ],
    layout: [
        {
            id: COLUMN_NR_ID,
            type: 'segmentedControls',
            label: 'Columns',
            defaultValue: 1,
            choices: [
                {
                    value: 1,
                    label: '1',
                },
                {
                    value: 2,
                    label: '2',
                },
                {
                    value: 3,
                    label: '3',
                },
                {
                    value: 4,
                    label: '4',
                },
            ],
        },
        getGutterSettings({
            id: 'isColumnGutterCustom',
            dependentSettingId: COLUMN_NR_ID,
            spacingChoiceId: SIMPLE_GUTTER_ID,
            spacingCustomId: CUSTOM_GUTTER_ID,
            defaultValueChoices: GutterSpacing.Auto,
        }),
    ],
});
