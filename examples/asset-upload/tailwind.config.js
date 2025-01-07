/* (c) Copyright Frontify Ltd., all rights reserved. */

import tailwindFondue from '@frontify/fondue/tailwind';
import sharedTailwind from '../../packages/shared/tailwind.config';

module.exports = {
    presets: [tailwindFondue, sharedTailwind],
    content: ['src/**/*.{ts,tsx}', '../../packages/shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
