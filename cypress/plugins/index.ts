import path from 'path';
import { startDevServer } from '@cypress/vite-dev-server';

const pluginConfig: Cypress.PluginConfig = (on, config) => {
    on('dev-server:start', async (options) =>
        startDevServer({
            options,
            viteConfig: {
                configFile: path.resolve(__dirname, '..', '..', 'vite.dev.config.ts'),
            },
        })
    );

    return config;
};

module.exports = pluginConfig;
