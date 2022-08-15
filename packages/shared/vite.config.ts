/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

const dependencies = Object.keys(dependenciesMap);
const peerDependencies = Object.keys(peerDependenciesMap);

export const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
};

export default defineConfig({
    plugins: [react(), dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format: string) => `[name].${format}.js`,
            name: 'GuidelineBlocksShared',
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies, ...peerDependencies],
            output: [
                {
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    globals,
                },
                {
                    format: 'umd',
                    globals,
                },
                {
                    format: 'cjs',
                    globals,
                },
            ],
        },
    },
});
