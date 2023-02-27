/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    presets: [require('@frontify/fondue/tailwind')],
    content: ['src/**/*.{ts,tsx}', '../shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
