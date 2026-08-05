/* (c) Copyright Frontify Ltd., all rights reserved. */

const blockScope = require('./block-scope.json');

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('../../postcss/scope')({ scope: blockScope.scope }),
    ],
};
