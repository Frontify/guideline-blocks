/* (c) Copyright Frontify Ltd., all rights reserved. */

import guidelineBlockSettings from '@frontify/guideline-blocks-settings/tailwind';

import sharedTailwind from '../../packages/shared/tailwind.config';

module.exports = {
    presets: [guidelineBlockSettings, sharedTailwind],
    content: ['src/**/*.{ts,tsx}', '../../packages/shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
