/* (c) Copyright Frontify Ltd., all rights reserved. */

import guidelineBlockSettings from '@frontify/guideline-blocks-settings/tailwind';

module.exports = {
    presets: [guidelineBlockSettings],
    content: ['src/**/*.{ts,tsx}', '../shared/src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            boxShadow: {
                'inner-line': 'inset 0 0 0 var(--line-width) var(--line-color)',
                'inner-line-first':
                    'inset var(--line-width) 0 0 0 var(--line-color), inset 0 var(--line-width) 0 0 var(--line-color), inset 0 calc(var(--line-width) * -1) 0 0 var(--line-color)',
                'inner-line-last':
                    'inset calc(var(--line-width) * -1) 0 0 0 var(--line-color), inset 0 var(--line-width) 0 0 var(--line-color), inset 0 calc(var(--line-width) * -1) 0 0 var(--line-color)',
                'inner-line-y':
                    'inset 0 var(--line-width) 0 0 var(--line-color), inset 0 calc(var(--line-width) * -1) 0 0 var(--line-color)',
                'inner-line-strong': 'inset 0 0 0 var(--line-width) var(--line-color-strong)',
            },
        },
    },
};
