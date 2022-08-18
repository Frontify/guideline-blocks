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
            fileName: (format: string) => `[name].${format}.js`,
            name: 'GuidelineBlocksSettings',
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies],
            output: [
                {
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                },
                {
                    format: 'umd',
                },
                {
                    format: 'cjs',
                },
            ],
        },
    },
});
