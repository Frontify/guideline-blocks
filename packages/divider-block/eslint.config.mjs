/* (c) Copyright Frontify Ltd., all rights reserved. */

import frontifyConfig from '@frontify/eslint-config-react';
import { defineConfig } from 'eslint/config';
import noticePlugin from 'eslint-plugin-notice';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';

export default defineConfig(
    {
        ignores: ['eslint.config.mjs', 'tailwind.config.*', '**/*.config.{js,mjs,cjs}'],
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
            notice: noticePlugin,
            tailwindcss: tailwindcssPlugin,
        },
        settings: {
            tailwindcss: {
                config: './tailwind.config.js',
                cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build', '!**/public'],
            },
        },
        rules: {
            'notice/notice': [
                'error',
                {
                    template: '/* (c) Copyright Frontify Ltd., all rights reserved. */\n\n',
                    messages: {
                        whenFailedToMatch: 'No Frontify copyright header set.',
                    },
                },
            ],
        },
    }
);
