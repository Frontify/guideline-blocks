/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Color,
    defineSettings,
    getBackgroundSettings,
    getBorderRadiusSettings,
    getBorderSettings,
} from '@frontify/guideline-blocks-settings';

export const ASSET_SETTINGS_ID = 'images';
const COUNT_COLOR_ID = 'assetCountColor';
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
    layout: [
        {
            id: 'showThumbnails',
            type: 'switch',
            label: 'Thumbnails',
            defaultValue: true,
        },
        {
            id: 'showCount',
            type: 'switch',
            label: 'Asset count',
            defaultValue: true,
        },
    ],
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
        {
            id: 'textSection',
            type: 'sectionHeading',
            label: 'Text',
            blocks: [
                {
                    id: COUNT_COLOR_ID,
                    type: 'slider',
                    label: 'Asset count color',
                    info: 'This setting is defined in the text style and you can override it here.',
                    defaultValue: 'inherit',
                    choices: [
                        {
                            value: 'inherit',
                            label: 'Inherit settings',
                        },
                        {
                            value: 'override',
                            label: 'Override',
                        },
                    ],
                },
                {
                    id: 'countCustomColor',
                    type: 'colorInput',
                    show: (bundle) => bundle.getBlock(COUNT_COLOR_ID)?.value === 'override',
                },
            ],
        },
    ],
    targets: [],
});
