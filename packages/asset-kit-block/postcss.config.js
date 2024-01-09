/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('../../postcss/scope')({ scope: '.asset-kit-block' }),
    ],
};
