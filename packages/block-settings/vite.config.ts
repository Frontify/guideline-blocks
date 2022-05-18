/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import { dependencies as dependenciesMap } from './package.json';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

const dependencies = Object.keys(dependenciesMap);

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: resolve(__dirname, 'types/index.ts'),
            fileName: (format: string) => `index.${format}.js`,
            formats: ['es', 'umd', 'cjs'],
            name: 'GuidelineBlocksSettings',
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies],
        },
    },
});
