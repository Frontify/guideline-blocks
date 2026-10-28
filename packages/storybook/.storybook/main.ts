/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import { type AcceptedPlugin } from 'postcss';
import tailwindcss from 'tailwindcss';

// The repo's PostCSS plugins are untyped CommonJS.
const dedupe = createRequire(import.meta.url)('../../../postcss/dedupe.js') as () => AcceptedPlugin;

const tailwindConfig = fileURLToPath(new URL('../tailwind.config.js', import.meta.url));

const config: StorybookConfig = {
    framework: '@storybook/react-vite',
    stories: ['../../*-block/src/**/*.stories.tsx'],
    core: { disableTelemetry: true },
    viteFinal: (viteConfig) => ({
        ...viteConfig,
        // Same chain as each block's postcss.config.js, minus the per-block scope plugin.
        css: {
            ...viteConfig.css,
            postcss: { plugins: [tailwindcss({ config: tailwindConfig }), autoprefixer(), dedupe()] },
        },
        server: { ...viteConfig.server, fs: { strict: false } },
        // Fixture URLs get Frontify-style `?width=` params appended, which breaks inlined `data:` URLs.
        build: { ...viteConfig.build, assetsInlineLimit: 0 },
    }),
};

export default config;
