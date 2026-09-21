/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types for oxlint-config-basic
import basicConfig from '@frontify/oxlint-config-basic';
import { defineConfig } from 'oxlint';

export default defineConfig({
    extends: [basicConfig],
    ignorePatterns: ['**/*.config.{js,mjs,cjs,ts}', '**/*.md'],
    overrides: [
        {
            files: ['**/*.{js,mjs,cjs,ts}'],
            jsPlugins: ['@tony.ganchev/eslint-plugin-header'],
            rules: {
                // This package is plain JS with no type information, so the type-aware
                // `no-unsafe-*` family has nothing to check against and only reports noise.
                'typescript/no-unsafe-argument': 'off',
                'typescript/no-unsafe-assignment': 'off',
                'typescript/no-unsafe-call': 'off',
                'typescript/no-unsafe-member-access': 'off',
                'typescript/no-unsafe-return': 'off',
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
            },
        },
    ],
});
