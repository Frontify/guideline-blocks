/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * This custom plugin prepends every css rule in the generated style.css
 * with an extra selector, essentially scoping the whole css file to the specific block
 */

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
    return {
        postcssPlugin: "scope",
        Root(root) {
            root.walkRules((rule) => {
                if (
                    rule.parent &&
                    rule.parent.type === "atrule" &&
                    rule.parent.name.includes("keyframes")
                ) {
                    return;
                }
                rule.selectors = rule.selectors.map((originalSelector) =>
                    originalSelector
                        .split(/(?<!\\),\s*/g)
                        .map((individualSelector) =>
                            getScopedSelector(individualSelector, opts.scope),
                        )
                        .join(", "),
                );
            });
        },
    };
};

module.exports.postcss = true;

const tagSelectorRegex = /^[a-zA-Z][a-zA-Z0-9-]*$/;

const getScopedSelector = (selector, scope) => {
    // Replace :root with .selector, so variables are only applied to the block
    if (selector === ":root") {
        return scope;
    }

    // Prefix all rules with .selector that match the condition. Portaled content
    // (Dropdown, Tooltip, Dialog, …) carries the scope class via Fondue's ThemeProvider
    // className propagation, so a plain `${scope} ${selector}` prefix reaches it too.
    if (selector.includes("tw-") || tagSelectorRegex.test(selector)) {
        return `${scope} ${selector}`;
    }

    // Return the original rule
    return selector;
};
