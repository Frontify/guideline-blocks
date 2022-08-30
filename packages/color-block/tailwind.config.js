module.exports = {
    presets: [require('@frontify/fondue/tailwind')],
    content: ['src/**/*.{ts,tsx}'],
    corePlugins: {
        preflight: false,
    },
    theme: {
        boxShadow: {
            line: '0 0 0 var(--line-width) var(--line-color)',
            'line-strong': '0 0 0 var(--line-width) var(--line-color-strong)',
        },
        extend: {
            width: {
                'list-color-types': 'calc(100% - 306px)',
            },
            colors: {
                gray: {
                    'add-button': '#F1F1F1',
                },
            },
            boxShadow: {
                line: '0 0 0 1px var(--line-color)',
                'inner-line': 'inset 0 0 0 var(--line-width) var(--line-color)',
                't-inner-line': 'inset 0 var(--line-width) 0 0 var(--line-color)',
                'line-strong': '0 0 0 1px var(--line-color-strong)',
                'inner-line-strong': 'inset 0 0 0 var(--line-width) var(--line-color-strong)',
                't-inner-line-strong': 'inset 0 var(--line-width) 0 0 var(--line-color-strong)',
            },
        },
    },
};
