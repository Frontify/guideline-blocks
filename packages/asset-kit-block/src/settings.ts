/* (c) Copyright Frontify Ltd., all rights reserved. */

import { SettingBlock, defineSettings } from '@frontify/guideline-blocks-settings';
import { Padding, getBorderRadiusSettings, getBorderSettings } from '@frontify/guideline-blocks-shared';

const backgroundColor = (id: string): SettingBlock => ({
    id: `has${id}Background`,
    label: 'Background',
    type: 'switch',
    defaultValue: true,
    on: [
        {
            id: `${id}BackgroundColor`,
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
                backgroundColor('blocks'),
                getBorderSettings({ id: 'blocksBorder' }),
                getBorderRadiusSettings({ dependentSettingId: 'hasBorder_blocksBorder' }),
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
                getBorderSettings({ id: 'thumbnailsBorder' }),
                getBorderRadiusSettings({ dependentSettingId: 'hasBorder_thumbnailsBorder' }),
            ],
        },
    ],
    targets: [],
});
