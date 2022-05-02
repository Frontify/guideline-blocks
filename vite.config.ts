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
    optimizeDeps: {
        // INFO: Remove possible linked packages from the optimization.
        include: ["@frontify/app-bridge", "@frontify/arcade"],
    },
});
