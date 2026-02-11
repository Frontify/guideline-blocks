/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        fs: {
            // INFO: Allow linked packages `../..`.
            strict: false,
        },
    },
    test: {
        setupFiles: ["setupTests.ts"],
        environment: "happy-dom",
        include: ["packages/**/*.{test,spec}.{ts,tsx}"],
    },
    optimizeDeps: {
        exclude: ["@frontify/app-bridge"],
    },
});
