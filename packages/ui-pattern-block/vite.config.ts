/* (c) Copyright Frontify Ltd., all rights reserved. */

export default {
    build: {
        rolldownOptions: {
            output: {
                // @codesandbox/sandpack-client ships pre-split chunks that Rolldown would
                // otherwise keep separate; the marketplace only accepts index.js + style.css.
                codeSplitting: false,
            },
        },
    },
};
