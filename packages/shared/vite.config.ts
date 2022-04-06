/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format: string) => `index.${format}.js`,
            formats: ['es', 'umd', 'cjs'],
            name: 'GuidelineBlocksShared',
        },
        sourcemap: true,
        minify: true,
    },
});
