/* (c) Copyright Frontify Ltd., all rights reserved. */

import guidelineBlockSettings from '@frontify/guideline-blocks-settings/tailwind';

/**
 * One config for every block: they all share the same preset, so a single unscoped stylesheet
 * is close enough for previews. Real deploys additionally scope each block's CSS (see /postcss/scope.js).
 */
export default {
    presets: [guidelineBlockSettings],
    // Tests are skipped: they mention classes like `hover:tw-outline` in comments, and generating those here
    // overrides the variants that guideline-blocks-settings' prebuilt CSS ships (e.g. BlockItemWrapper's outline).
    content: [
        '../*-block/src/**/*.{ts,tsx}',
        '../shared/src/**/*.{ts,tsx}',
        '!../*-block/src/**/*.{spec,test}.{ts,tsx}',
        '!../shared/src/**/*.{spec,test}.{ts,tsx}',
    ],
    corePlugins: {
        preflight: false,
    },
};
