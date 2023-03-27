/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, SettingBlock, defineSettings } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';

export const ASSET_SETTINGS_ID = 'images';
export const BACKGROUND_COLOR_DEFAULT_VALUE: Color = {
    red: 241,
    green: 241,
    blue: 241,
    alpha: 1,
};
export const BORDER_COLOR_DEFAULT_VALUE: Color = {
    red: 230,
    green: 230,
    blue: 230,
    alpha: 1,
};

const backgroundColor = (id: string, defaultValue = true): SettingBlock => ({
    id: `hasBackground${id}`,
    label: 'Background',
    type: 'switch',
    defaultValue,
    on: [
        {
            id: `backgroundColor${id}`,
            defaultValue: defaultValue ? BACKGROUND_COLOR_DEFAULT_VALUE : undefined,
            type: 'colorInput',
        },
    ],
    off: [],
});

export const settings = defineSettings({
    style: [
        {
            id: 'blockSection',
            type: 'sectionHeading',
            label: 'Block',
            blocks: [
                backgroundColor('Blocks', false),
                getBorderSettings({ id: 'blocks', defaultValue: true, defaultColor: BORDER_COLOR_DEFAULT_VALUE }),
                getBorderRadiusSettings({ id: 'blocks', dependentSettingId: 'hasBorder_blocks' }),
            ],
        },
        {
            id: 'thumbnailsSection',
            type: 'sectionHeading',
            label: 'Thumbnails',
            blocks: [
                backgroundColor('Thumbnails'),
                getBorderSettings({ id: 'thumbnails', defaultValue: true, defaultColor: BORDER_COLOR_DEFAULT_VALUE }),
                getBorderRadiusSettings({ id: 'thumbnails' }),
            ],
        },
    ],
    targets: [],
});
