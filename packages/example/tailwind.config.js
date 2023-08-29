/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    presets: [require('@frontify/fondue/tailwind'), require('../shared/tailwind.config')],
    content: [
        'src/**/*.{ts,tsx}',
        '../shared/src/**/*.{ts,tsx}',
        'node_modules/@frontify/guideline-blocks-settings/dist/**/*.es*.js',
    ],
    corePlugins: {
        preflight: false,
    },
};
