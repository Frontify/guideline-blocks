/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeBlock } from '@frontify/app-bridge';
import '@frontify/fondue-tokens/styles';
import 'tailwindcss/tailwind.css';

import { ColorBlock } from './ColorBlock';
import { settings } from './settings';

export default {
    block: ColorBlock,
    settings,
    onBlockCreated: async ({ appBridge }: { appBridge: AppBridgeBlock }) => {
        const colorPalette = await appBridge.createColorPalette({ name: 'Untitled palette' });
        await appBridge.updateBlockSettings({ colorPaletteId: colorPalette.id });
    },
    onBlockDeleted: async ({ appBridge }: { appBridge: AppBridgeBlock }) => {
        const settings = await appBridge.getBlockSettings<{ colorPaletteId: number }>();
        await appBridge.deleteColorPalette(settings.colorPaletteId);
    },
};
