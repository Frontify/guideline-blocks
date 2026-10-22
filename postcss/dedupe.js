/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * This custom plugin removes exact duplicate rules from the generated style.css, keeping the last copy.
 *
 * The shared styles import fondue's CSS, which `@frontify/guideline-blocks-settings/styles` already contains,
 * so the same rules ended up in every block up to three times. Removing only the earlier copies keeps the
 * cascade as it is, because each removed rule is overridden by its identical later copy anyway.
 */

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
    return {
        postcssPlugin: "dedupe",
        OnceExit(root) {
            const seen = new Set();

            for (let index = root.nodes.length - 1; index >= 0; index--) {
                const node = root.nodes[index];
                if (node.type !== "rule" && node.type !== "atrule") {
                    continue;
                }

                // Compare without formatting, which differs between the imported files.
                const copy = node.clone();
                copy.cleanRaws();
                const key = copy.toString();
                if (seen.has(key)) {
                    node.remove();
                } else {
                    seen.add(key);
                }
            }
        },
    };
};

module.exports.postcss = true;
