/* (c) Copyright Frontify Ltd., all rights reserved. */

import frontifyConfig from '@frontify/eslint-config-react';
import { defineConfig } from 'eslint/config';

import headerPlugin from '@tony.ganchev/eslint-plugin-header';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';

export default defineConfig(
    {
        ignores: ['eslint.config.mjs', 'tailwind.config.*', '**/*.config.{js,mjs,cjs}', '**/*.md'],
    },
    frontifyConfig,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: null,
            },
        },
        plugins: {
            '@tony.ganchev': headerPlugin,
            tailwindcss: tailwindcssPlugin,
        },
        settings: {
            tailwindcss: {
                config: './tailwind.config.js',
                cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build', '!**/public'],
            },
        },
        rules: {
            '@tony.ganchev/header': [
                'error',
                {
                    header: {
                        commentType: 'block',
                        lines: [' (c) Copyright Frontify Ltd., all rights reserved. '],
                    },
                    trailingEmptyLines: {
                        minimum: 2,
                    },
                },
            ],
        },
    },
    {
        files: ['**/manifest.json'],
        rules: {
            'jsonc/sort-keys': 'off',
        },
    }
);
