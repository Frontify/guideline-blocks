/* (c) Copyright Frontify Ltd., all rights reserved. */

import guidelineBlockSettings from '@frontify/guideline-blocks-settings/tailwind';

module.exports = {
    presets: [guidelineBlockSettings],
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            keyframes: {
                'fade-in-forwards': {
                    from: {
                        'background-color': 'rgba(255, 255, 255, 0)',
                    },
                    to: {
                        'background-color': 'rgba(255, 255, 255, 1)',
                    },
                },
            },
            animation: {
                'fade-in-forwards': 'fade-in-forwards 0.3s forwards',
            },
        },
    },
};
