/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

import { git } from './git.mjs';

export const PACKAGES_DIR = 'packages';
export const SHARED_PATH = 'packages/shared';

/**
 * Paths outside any workspace package that still end up in every block bundle.
 * pnpm's dependency graph cannot see these, so they are tracked explicitly.
 */
export const GLOBAL_TRIGGER_PATHS = ['postcss/', 'pnpm-workspace.yaml', 'tailwind.config.js', 'postcss.config.js'];

export const findRepoRoot = () => git(['rev-parse', '--show-toplevel']);

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
 * Resolve the block the caller is standing in, so `pnpm release` inside a block
 * package needs no arguments.
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
