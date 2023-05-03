/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, defineSettings } from '@frontify/guideline-blocks-settings';
import { getBackgroundSettings, getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';

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

export const settings = defineSettings({
    style: [
        {
            id: 'blockSection',
            type: 'sectionHeading',
            label: 'Block',
            blocks: [
                getBackgroundSettings({ id: 'Blocks' }),
                getBorderSettings({ id: 'blocks', defaultValue: true, defaultColor: BORDER_COLOR_DEFAULT_VALUE }),
                getBorderRadiusSettings({ id: 'blocks' }),
            ],
        },
        {
            id: 'thumbnailsSection',
            type: 'sectionHeading',
            label: 'Thumbnails',
            blocks: [
                getBackgroundSettings({ id: 'Thumbnails', defaultValue: true }),
                getBorderSettings({ id: 'thumbnails', defaultValue: true, defaultColor: BORDER_COLOR_DEFAULT_VALUE }),
                getBorderRadiusSettings({ id: 'thumbnails' }),
            ],
        },
    ],
    targets: [],
});
