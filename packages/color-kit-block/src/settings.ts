/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { BlockSettings } from '@frontify/guideline-blocks-settings';

export const settings: BlockSettings = {
    basics: [
        {
            id: 'colorPalettes',
            label: 'Color Palettes',
            type: 'checklist',
            columns: 2,
            defaultValue: [],
            showClearAndSelectAllButtons: true,
            choices: async ({ getAppBridge }) => {
                const appBridge = getAppBridge();
                const palettes = await appBridge.getColorPalettes();
                return palettes.map(({ id, name }) => ({ id: id.toString(), label: name }));
            },
        },
    ],
};
