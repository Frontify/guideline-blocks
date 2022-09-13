/* (c) Copyright Frontify Ltd., all rights reserved. */

import { FrontifyColorPalette } from '@frontify/app-bridge';
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
            choices: async ({ appBridge }) => {
                const palettes = await appBridge.getColorPalettes();
                return palettes.map((palette: FrontifyColorPalette) => ({ id: palette.id, label: palette.name }));
            },
        },
    ],
};
