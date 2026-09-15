/* (c) Copyright Frontify Ltd., all rights reserved. */

export default {
    build: {
        rolldownOptions: {
            output: {
                // @uiw/codemirror-extensions-langs loads @codemirror/language-data, which
                // dynamic-imports every language mode. Rolldown would emit those as extra
                // .mjs chunks; the marketplace only accepts index.js + style.css.
                codeSplitting: false,
            },
        },
    },
};
