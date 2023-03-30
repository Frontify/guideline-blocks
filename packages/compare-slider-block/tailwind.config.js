/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    presets: [require('@frontify/fondue/tailwind'), require('../../tailwind.config')],
    content: ['src/**/*.{ts,tsx}', '../shared/src/**/*.{ts,tsx}'],
    prefix: 'tw-',
    corePlugins: {
        preflight: false,
    },
};
