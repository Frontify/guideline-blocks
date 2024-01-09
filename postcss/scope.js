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
                        .split(/,\s*/g)
                        .map((individualSelector) =>
                            individualSelector === opts.selector
                                ? individualSelector
                                : `${opts.scope} ${individualSelector}`,
                        )
                        .join(", "),
                );
            });
        },
    };
};

module.exports.postcss = true;
