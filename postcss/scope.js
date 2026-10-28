/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * This custom plugin prepends every css rule in the generated style.css
 * with an extra selector, essentially scoping the whole css file to the specific block
 *
 * The `scope` option is the block scope class name (e.g. `text-block`) and has to come from the
 * block's `block-scope.json`, which is the single source of truth shared with the block itself.
 */

const selectorParser = require("postcss-selector-parser");

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
                // `rule.selectors` only splits on top-level commas, so `:is(a, b)` stays intact
                rule.selectors = rule.selectors.map((selector) =>
                    getScopedSelector(selector, scopeSelector)
                );
            });
        },
    };
};

module.exports.postcss = true;

const hasClass = (selector) => {
    let found = false;
    selectorParser((root) => root.walkClasses(() => (found = true))).processSync(selector);
    return found;
};

// Selectors without any class (`*`, `:before`, `input::placeholder`, `[hidden]`, … e.g. Tailwind base styles)
// would otherwise style the whole host page. Selectors with a class only target their own components
// (e.g. Fondue's hashed classes) and stay unscoped so portalled overlays outside the block keep their styles.
const isGlobalSelector = (selector) => !hasClass(selector);

const getScopedSelector = (selector, scope) => {
    // Replace :root with .selector, so variables are only applied to the block
    if (selector === ":root") {
        return scope;
    }

    // Prefix Tailwind utilities with .selector so they win over styles from outside the block
    if (selector.includes("tw-")) {
        return `${scope} ${selector}`;
    }

    // Confine global selectors to the block without adding specificity, so they still lose against
    // class-based component styles (e.g. Fondue's hashed classes) like they would unscoped
    if (isGlobalSelector(selector)) {
        return `:where(${scope}) ${selector}`;
    }

    // Return the original rule
    return selector;
};
