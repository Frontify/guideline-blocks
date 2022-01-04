const arcadeTailwindConfig = require('@frontify/arcade/config').tailwindConfig;
const tailwindConfig = arcadeTailwindConfig({
    corePlugins: {
        preflight: false,
    },
});

// Convert Arcade Tailwind v2 to v3 config
tailwindConfig.content = JSON.parse(JSON.stringify(tailwindConfig.purge));
delete tailwindConfig.plugins;
delete tailwindConfig.purge;

module.exports = tailwindConfig;
