/* (c) Copyright Frontify Ltd., all rights reserved. */

import tailwindFondue from '@frontify/fondue/tokens/tailwind';

module.exports = {
    presets: [tailwindFondue],
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
