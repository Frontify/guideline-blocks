/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The web app confines block CSS with `@scope`, where `:root` matches nothing because the
 * scope roots sit below `<body>`. Rewriting `:root` to `:scope` keeps root-level custom
 * properties (e.g. the Fondue tokens) applied to the block root. When the web app loads the
 * CSS unscoped, a top-level `:scope` matches the document root, so nothing changes there.
 */

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => ({
    postcssPlugin: 'root-to-scope',
    Rule(rule) {
        if (rule.selector.includes(':root')) {
            rule.selector = rule.selector.replace(/:root\b/g, ':scope');
        }
    },
});

module.exports.postcss = true;
