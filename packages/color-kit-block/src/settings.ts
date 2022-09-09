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
            // choices: async ({ appBridge }) => {
            //     const palettes = await appBridge.getColorPalettes();
            //     //! TODO: find out type and replace any
            //     return palettes.map((palette: any) => palette.id.toString());
            // },
            choices: [
                {
                    id: 'palette02',
                    label: 'Palette 02',
                },
                {
                    id: 'palette888',
                    label: 'Palette 888',
                },
                {
                    id: 'halloweenPalette',
                    label: 'Halloween Palette',
                },
                {
                    id: 'summerPalette',
                    label: 'Summer Palette',
                },
                {
                    id: 'paletteXyz',
                    label: 'Palette XYZ',
                },
            ],
        },
    ],
};
