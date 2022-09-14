module.exports = {
    presets: [require('@frontify/fondue/tailwind')],
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            gridTemplateColumns: {
                font: '1fr 0.1fr',
            },
            fontSize: {
                desc: '1.375rem',
            },
            colors: {
                default: '#2D3232',
            },
        },
    },
};
