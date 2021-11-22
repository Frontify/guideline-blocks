import { defineConfig } from 'vite';

export default defineConfig({
    esbuild: {
        jsxInject: `import 'regenerator-runtime'; import React from 'react';`,
    },
    resolve: {
        dedupe: ['react', 'react-dom'],
    },
});
