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

const getScopedSelector = (selector, scope) => {
    const trimmed = selector.trim();

    // Replace :root with .selector, so variables are only applied to the block
    if (trimmed === ":root") {
        return scope;
    }

    // Skip selectors that are already scoped (idempotency)
    if (trimmed === scope || trimmed.startsWith(`${scope} `)) {
        return selector;
    }

    // Prefix every other selector with the scope. Class selectors also get the
    // modal extensions so portaled content (dialogs, overlays, toolbars) keeps working.
    return `${scope} ${trimmed}${getModalExtensions(trimmed)}`;
};

const getModalExtensions = (selector) => {
    if (!selector.includes(".")) {
        return "";
    }

    return `, body > [role='toolbar'] ${selector}, body [data-overlay-container] ${selector}, body [role='dialog'] ${selector}, body [data-is-underlay="true"] ${selector}`;
};
