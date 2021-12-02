const arcadeTailwindConfig = require('@frontify/arcade/config').tailwindConfig;
const tailwindConfig = arcadeTailwindConfig({
    mode: 'jit',
    purge: ['./src/**/*.{tsx}'],
    corePlugins: {
        preflight: false,
    },
});
delete tailwindConfig.plugins;
module.exports = tailwindConfig;
