/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineSettings } from '@frontify/guideline-blocks-settings';

export const settings = defineSettings({
    basics: [
        {
            id: 'colorPaletteIds',
            label: 'Color Palettes',
            type: 'checklist',
            columns: 2,
            defaultValue: [],
            showClearAndSelectAllButtons: true,
            choices: async ({ getAppBridge }) => {
                const appBridge = getAppBridge();
                const palettes = await appBridge.getColorPalettes();
                return palettes.map(({ id, name }) => ({ id: id.toString(), label: name || 'Untitled Palette' }));
            },
        },
    ],
});
