/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * This custom plugin prepends every css rule in the generated style.css
 * with an extra selector, essentially scoping the whole css file to the specific block
 *
 * The `scope` option is the block scope class name (e.g. `text-block`) and has to come from the
 * block's `block-scope.json`, which is the single source of truth shared with the block itself.
 */

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
    if (!opts.scope) {
        throw new Error(
            "The scope plugin requires a `scope` option, read it from the block's `block-scope.json`",
        );
    }

    const scopeSelector = `.${opts.scope}`;

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
                            getScopedSelector(individualSelector, scopeSelector)
                        )
                        .join(", ")
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

    // Prefix all rules with .selector that match the condition
    if (selector.includes("tw-") || tagSelectorRegex.test(selector)) {
        return `${scope} ${selector}`;
    }

    // Return the original rule
    return selector;
};
