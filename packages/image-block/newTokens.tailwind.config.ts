/* (c) Copyright Frontify Ltd., all rights reserved. */

import frontifyTailwindConfig from '@frontify/fondue/tokens/tailwind';
// import tailwindTypography from '@tailwindcss/typography';
import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

// NOTICE:
// During the transition to the new Fondue tokens, web-app uses the `tailwind.config.ts` configuration file, which extends this file and adds the old tokens.
// Once the transition is complete, this file will be used directly.

export default {
    prefix: 'tw-',
    presets: [frontifyTailwindConfig],
    content: ['src/**/*.{ts,tsx}', 'node_modules/@frontify/fondue/dist/**/*.es*.js'],
    theme: {
        extend: {
            keyframes: {
                'slide-in-y-top': {
                    '0%': { transform: 'translateY(100%)' },
                    '100%': { transform: 'translateY(0)' },
                },
                'slide-out-y-bottom': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', maxHeight: '0' },
                    '100%': { opacity: '1', maxHeight: '100%' },
                },
                'fade-out': {
                    '0%': { opacity: '1', maxHeight: '100%' },
                    '100%': { opacity: '0', maxHeight: '0' },
                },
                'left-to-right': {
                    from: { transform: 'translateX(-100%)' },
                    to: { transform: 'translateX(100%)' },
                },
            },
            animation: {
                slideInYTop: 'slide-in-y-top 300ms',
                slideOutYBottomForwards: 'slide-out-y-bottom 300ms ease forwards',
                fadeIn: 'fade-in 350ms ease-in-out',
                fadeOut: 'fade-out 350ms ease-in-out',
                leftToRight: 'left-to-right 300ms ease-in-out',
            },
        },
    },
    plugins: [
        plugin(({ addBase }) => {
            addBase({
                '*': { boxSizing: 'content-box' },
                '::before': { boxSizing: 'content-box' },
                '::after': { boxSizing: 'content-box' },

                '[class^="tw-"]': { boxSizing: 'border-box' },
                '[class^="tw-"]::before': { boxSizing: 'border-box' },
                '[class^="tw-"]::after': { boxSizing: 'border-box' },

                '[class*=" tw-"]': { boxSizing: 'border-box' },
                '[class*=" tw-"]::before': { boxSizing: 'border-box' },
                '[class*=" tw-"]::after': { boxSizing: 'border-box' },

                '[data-radix-popper-content-wrapper]': { boxSizing: 'border-box' },
            });
        }),
        plugin(({ addVariant }) => {
            addVariant('starting', '@starting-style');
        }),
        // tailwindTypography,
    ],
} satisfies Config;
