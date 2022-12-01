/* (c) Copyright Frontify Ltd., all rights reserved. */

import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';

import { defineBlock } from '@frontify/guideline-blocks-settings';
import { ColorBlock } from './ColorBlock';
import { settings } from './settings';

export default defineBlock({
    block: ColorBlock,
    settings,
    onBlockCreated: async ({ appBridge }) => {
        const colorPalette = await appBridge.createColorPalette({ name: 'Untitled palette' });
        await appBridge.updateBlockSettings({ colorPaletteId: colorPalette.id });
    },
    onBlockDeleted: async ({ appBridge }) => {
        const settings = await appBridge.getBlockSettings<{ colorPaletteId: number }>();
        await appBridge.deleteColorPalette(settings.colorPaletteId);
    },
});
