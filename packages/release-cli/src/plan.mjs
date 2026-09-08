/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readEntries } from './entries.mjs';
import { changedFiles, commitSubjects, fileAtRevision, revParse, shortSha } from './git.mjs';
import { GLOBAL_TRIGGER_PATHS, SHARED_PATH, discoverBlocks } from './workspace.mjs';

const FALLBACK_NOTES = 'Maintenance release.';

/** The moving tag that records the last commit successfully published for a block. */
export const releaseTag = (blockName) => `released/${blockName}`;

const matchesTrigger = (path) =>
    GLOBAL_TRIGGER_PATHS.some((trigger) => (trigger.endsWith('/') ? path.startsWith(trigger) : path === trigger));

/**
 * Root `devDependencies` churn constantly (Renovate), and none of it reaches a block
 * bundle. Only a change to the root runtime `dependencies` should force a full release.
 */
const rootRuntimeDependenciesChanged = (repoRoot, base, head) => {
    const readDependencies = (ref) => {
        const raw = fileAtRevision(repoRoot, ref, 'package.json');
        return raw ? JSON.stringify(JSON.parse(raw).dependencies ?? {}) : null;
    };

    const before = readDependencies(base);
    const after = readDependencies(head);

    return before !== null && after !== null && before !== after;
};

/** @returns {string | undefined} why the block is being released, or undefined if it is not */
const selectionReason = (repoRoot, block, base, head, forced) => {
    if (forced.has(block.name)) {
        return 'requested in .releases';
    }

    if (base === null) {
        return 'never released';
    }

    const changed = changedFiles(repoRoot, base, head);

    if (changed.some((path) => path.startsWith(`${block.path}/`))) {
        return 'block sources changed';
    }

    if (changed.some((path) => path.startsWith(`${SHARED_PATH}/`))) {
        return 'shared package changed';
    }

    if (changed.some(matchesTrigger)) {
        return 'shared build config changed';
    }

    if (rootRuntimeDependenciesChanged(repoRoot, base, head)) {
        return 'root runtime dependencies changed';
    }

    return undefined;
};

/**
 * Entries without a `blocks` key annotate whatever ships; entries with one also force
 * those blocks into the release.
 */
const notesFor = (repoRoot, block, base, head, entries) => {
    const applicable = entries.filter(
        (entry) => entry.blocks === undefined || entry.blocks === 'all' || entry.blocks.includes(block.name)
    );

    if (applicable.length > 0) {
        return applicable.map((entry) => entry.notes).join('\n\n');
    }

    if (base === null) {
        return FALLBACK_NOTES;
    }

    const subjects = commitSubjects(repoRoot, base, head, [block.path, SHARED_PATH]);

    return subjects.length > 0 ? subjects.map((subject) => `- ${subject}`).join('\n') : FALLBACK_NOTES;
};

const forcedBlockNames = (entries, blocks) => {
    const names = new Set();

    for (const entry of entries) {
        if (entry.blocks === 'all') {
            for (const block of blocks) {
                names.add(block.name);
            }
        } else if (Array.isArray(entry.blocks)) {
            for (const name of entry.blocks) {
                names.add(name);
            }
        }
    }

    return names;
};

/**
 * @returns {{ blocks: object[], entries: object[], unknownBlocks: string[] }}
 */
export const buildPlan = (repoRoot, head = 'HEAD') => {
    const blocks = discoverBlocks(repoRoot);
    const entries = readEntries(repoRoot);
    const forced = forcedBlockNames(entries, blocks);

    const known = new Set(blocks.map((block) => block.name));
    const unknownBlocks = [...forced].filter((name) => !known.has(name)).sort();

    const selected = blocks.flatMap((block) => {
        const base = revParse(repoRoot, releaseTag(block.name));
        const reason = selectionReason(repoRoot, block, base, head, forced);

        if (!reason) {
            return [];
        }

        return [
            {
                name: block.name,
                appId: block.appId,
                path: block.path,
                base: base ? shortSha(repoRoot, base) : null,
                reason,
                notes: notesFor(repoRoot, block, base, head, entries),
            },
        ];
    });

    return { blocks: selected, entries, unknownBlocks };
};
