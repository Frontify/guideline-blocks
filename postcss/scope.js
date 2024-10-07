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
                            !individualSelector.includes("tw-")
                                ? individualSelector
                                : `${opts.scope} ${individualSelector}${getModalExtensions(individualSelector)}`,
                        )
                        .join(", "),
                );
            });
        },
    };
};

module.exports.postcss = true;

const getModalExtensions = (individualSelector) => {
    if (!individualSelector.includes(".")) {
        return "";
    }

    return `, body > [role='toolbar'] ${individualSelector}, body > [data-overlay-container] ${individualSelector}`;
};
