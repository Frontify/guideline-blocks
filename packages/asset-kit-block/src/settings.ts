/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, SettingBlock, defineSettings } from '@frontify/guideline-blocks-settings';
import { getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';

export const ASSET_SETTINGS_ID = 'images';
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

const backgroundColor = (id: string, defaultValue = true): SettingBlock => ({
    id: `hasBackground_${id}`,
    label: 'Background',
    type: 'switch',
    defaultValue,
    on: [
        {
            id: `backgroundColor_${id}`,
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
                backgroundColor('blocks', false),
                getBorderSettings({ id: 'blocks' }),
                getBorderRadiusSettings({ id: 'blocks', dependentSettingId: 'hasBorder_blocks' }),
            ],
        },
        {
            id: 'pressKitSectionsSection',
            type: 'sectionHeading',
            label: 'Section',
            blocks: [
                backgroundColor('sections'),
                getBorderSettings({ id: 'sectionsBorder' }),
                getBorderRadiusSettings({ dependentSettingId: 'hasBorder_sectionsBorder' }),
            ],
        },
        {
            id: 'thumbnailsSection',
            type: 'sectionHeading',
            label: 'Thumbnails',
            blocks: [
                backgroundColor('thumbnails'),
                getBorderSettings({ id: 'thumbnails' }),
                getBorderRadiusSettings({ id: 'thumbnails', dependentSettingId: 'hasBorder_thumbnails' }),
            ],
        },
    ],
    targets: [],
});
