/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    presets: [require('@frontify/fondue/tailwind'), require('../../packages/shared/tailwind.config')],
    content: ['src/**/*.{ts,tsx}', '../../packages/shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
