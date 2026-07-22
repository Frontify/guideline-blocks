/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: ['tailwind.config.*', '**/*.config.{js,mjs,cjs,ts}', '**/*.md'],
    overrides: [
        {
            files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
            jsPlugins: ['@tony.ganchev/eslint-plugin-header', 'eslint-plugin-tailwindcss'],
            rules: {
                '@tony.ganchev/header/header': [
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
                'tailwindcss/no-custom-classname': [
                    'warn',
                    {
                        whitelist: ['^(?!tw-).*$'],
                        callees: ['className', 'sv', 'class', 'merge'],
                        cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build', '!**/public'],
                    },
                ],
                'tailwindcss/no-contradicting-classname': 'error',
                'tailwindcss/enforces-negative-arbitrary-values': 'error',
                'tailwindcss/no-unnecessary-arbitrary-value': 'error',
            },
        },
        {
            files: ['**/manifest.json'],
            rules: {
                'jsonc/sort-keys': 'off',
            },
        },
    ],
});
