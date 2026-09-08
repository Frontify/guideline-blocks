/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

export const PACKAGES_DIR = 'packages';

/** Walks up from `startPath` to the directory holding the pnpm workspace file. */
export const findRepoRoot = (startPath) => {
    let current = startPath;

    while (!existsSync(join(current, 'pnpm-workspace.yaml'))) {
        const parent = dirname(current);
        if (parent === current) {
            throw new Error('Could not find the repository root (no pnpm-workspace.yaml in any parent directory).');
        }
        current = parent;
    }

    return current;
};

/**
 * A block is any package under `packages/` carrying a marketplace manifest with an `appId`.
 * This is the same rule the `verify-manifest` CI job uses.
 *
 * @returns {{ name: string, appId: string, path: string }[]}
 */
export const discoverBlocks = (repoRoot) => {
    const packagesPath = join(repoRoot, PACKAGES_DIR);

    return readdirSync(packagesPath, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort()
        .flatMap((name) => {
            const manifestPath = join(packagesPath, name, 'manifest.json');
            if (!existsSync(manifestPath)) {
                return [];
            }

            const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
            return manifest.appId ? [{ name, appId: manifest.appId, path: `${PACKAGES_DIR}/${name}` }] : [];
        });
};

/**
 * Resolve the block the caller is standing in, so `pnpm release` inside a block package
 * needs no arguments.
 *
 * @returns {string | undefined}
 */
export const blockNameFromCwd = (repoRoot, cwd, blocks) => {
    const segments = relative(repoRoot, cwd).split(sep);
    if (segments[0] !== PACKAGES_DIR) {
        return undefined;
    }

    return blocks.find((block) => block.name === segments[1])?.name;
};
