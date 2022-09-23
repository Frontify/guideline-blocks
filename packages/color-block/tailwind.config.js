module.exports = {
    presets: [require('@frontify/fondue/tailwind')],
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            boxShadow: {
                'inner-line': 'inset 0 0 0 var(--line-width) var(--line-color)',
                't-inner-line': 'inset 0 var(--line-width) 0 0 var(--line-color)',
                'inner-line-strong': 'inset 0 0 0 var(--line-width) var(--line-color-strong)',
                't-inner-line-strong': 'inset 0 var(--line-width) 0 0 var(--line-color-strong)',
            },
        },
    },
};
