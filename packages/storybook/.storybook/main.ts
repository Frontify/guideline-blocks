/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const tailwindConfig = fileURLToPath(new URL('../tailwind.config.js', import.meta.url));

const config: StorybookConfig = {
    framework: '@storybook/react-vite',
    stories: ['../../*-block/src/**/*.stories.tsx'],
    core: { disableTelemetry: true },
    viteFinal: (viteConfig) => ({
        ...viteConfig,
        css: { ...viteConfig.css, postcss: { plugins: [tailwindcss({ config: tailwindConfig }), autoprefixer()] } },
        server: { ...viteConfig.server, fs: { strict: false } },
    }),
};

export default config;
