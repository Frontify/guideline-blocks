/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Color, SettingBlock, defineSettings } from '@frontify/guideline-blocks-settings';
import {
    Radius,
    getBorderRadiusSettings,
    getBorderRadiusSlider,
    getBorderSettings,
} from '@frontify/guideline-blocks-shared';

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
                getBorderSettings({ id: 'blocks', defaultValue: true }),
                {
                    ...getBorderRadiusSettings({ id: 'blocks' }),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    off: [getBorderRadiusSlider('radiusChoice_blocks', Radius.Medium)],
                    show: (bundle) =>
                        !!(
                            bundle.getBlock('hasBorder_blocks')?.value || bundle.getBlock('hasBackground_blocks')?.value
                        ),
                },
            ],
        },
        {
            id: 'thumbnailsSection',
            type: 'sectionHeading',
            label: 'Thumbnails',
            blocks: [
                backgroundColor('thumbnails'),
                getBorderSettings({ id: 'thumbnails', defaultValue: true }),
                {
                    ...getBorderRadiusSettings({ id: 'thumbnails' }),
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    off: [getBorderRadiusSlider('radiusChoice_thumbnails', Radius.Small)],
                    show: (bundle) =>
                        !!(
                            bundle.getBlock('hasBorder_thumbnails')?.value ||
                            bundle.getBlock('hasBackground_thumbnails')?.value
                        ),
                },
            ],
        },
    ],
    targets: [],
});
