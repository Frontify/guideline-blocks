/* (c) Copyright Frontify Ltd., all rights reserved. */

import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export const alias = {
    '@components': resolve(__dirname, './src/components'),
    '@hooks': resolve(__dirname, './src/hooks'),
    '@utilities': resolve(__dirname, './src/utilities'),
};

export default defineConfig({
    resolve: {
        alias,
    },
    plugins: [reactRefresh()],
    
    build: {
        sourcemap: true,
        minify: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'GuidelineComponents',
            fileName: (format: string): string => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                assetFileNames: (assetInfo: any): string => {
                    if (assetInfo.name == 'style.css') {
                        return 'index.css';
                    }
                    return assetInfo.name ?? 'unknown';
                },
            },
        },
    },
});
