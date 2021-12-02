const arcadeTailwindConfig = require('@frontify/arcade/config').tailwindConfig;
const tailwindConfig = arcadeTailwindConfig({
    corePlugins: {
        preflight: false,
    },
});
delete tailwindConfig.plugins;
module.exports = tailwindConfig;
