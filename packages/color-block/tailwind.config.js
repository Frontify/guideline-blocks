module.exports = {
    presets: [require('@frontify/fondue/tailwind')],
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            width: {
                'list-color-types': 'calc(100% - 306px)',
                'cards-card': 'calc(25% - 16px)',
            },
            boxShadow: {
                inset: 'inset 0 0 0 1px rgba(8, 8, 8, 0.1)',
                'inset-top': 'inset 0 1px 0 0 rgba(8, 8, 8, 0.1)',
                'inset-bottom': 'inset 0 -1px 0 0 rgba(8, 8, 8, 0.1)',
                'inset-full': 'inset 0 0 0 1px rgba(8, 8, 8, 0.1)',
                'inset-list-add': 'inset -1px 0 0 0 rgba(8, 8, 8, 0.1), inset 1px 0 0 0 rgba(8, 8, 8, 0.1)',
                'inset-hover': 'inset 0 0 0 1px rgb(45, 50, 50)',
            },
            content: {
                empty: '',
            },
        },
    },
};
