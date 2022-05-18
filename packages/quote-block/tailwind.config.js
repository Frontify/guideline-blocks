module.exports = {
    presets: [require('@frontify/arcade/tailwind')],
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
};
