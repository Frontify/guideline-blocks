/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    presets: [require('@frontify/guideline-blocks-settings/tailwind')],
    content: ['src/**/*.{ts,tsx}', '../shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
