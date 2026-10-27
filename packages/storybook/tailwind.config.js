/* (c) Copyright Frontify Ltd., all rights reserved. */

import guidelineBlockSettings from '@frontify/guideline-blocks-settings/tailwind';

/**
 * One config for every block: they all share the same preset, so a single unscoped stylesheet
 * is close enough for previews. Real deploys additionally scope each block's CSS (see /postcss/scope.js).
 */
export default {
    presets: [guidelineBlockSettings],
    content: ['../*-block/src/**/*.{ts,tsx}', '../shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
