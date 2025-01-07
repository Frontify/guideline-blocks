/* (c) Copyright Frontify Ltd., all rights reserved. */

import guidelineBlockSettings from '@frontify/guideline-blocks-settings/tailwind';

module.exports = {
    presets: [guidelineBlockSettings],
    content: ['src/**/*.{ts,tsx}', '../shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
