/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readEntries } from './entries.mjs';
import { discoverBlocks } from './workspace.mjs';

export class PlanError extends Error {
    name = 'PlanError';
}

/**
 * Expand every entry into the blocks it names, keeping the notes attached.
 *
 * @returns {Map<string, string[]>} block name -> notes, in entry order
 */
const notesByBlock = (entries, blocks) => {
    const collected = new Map();

    for (const entry of entries) {
        if (entry.blocks === undefined) {
            throw new PlanError(`${entry.file} is missing a "blocks" key. Use "all" or a list of block names.`);
        }

        const names = entry.blocks === 'all' ? blocks.map((block) => block.name) : entry.blocks;
        const unknown = names.filter((name) => !blocks.some((block) => block.name === name));

        if (unknown.length > 0) {
            throw new PlanError(`${entry.file} names unknown block(s): ${unknown.join(', ')}`);
        }

        for (const name of names) {
            collected.set(name, [...(collected.get(name) ?? []), entry.notes]);
        }
    }

    return collected;
};

/**
 * What the next merge to main will publish: exactly the blocks named by the entry files in
 * `.releases`, and nothing else.
 *
 * @returns {{ blocks: { name: string, appId: string, path: string, notes: string }[], entries: object[] }}
 */
export const buildPlan = (repoRoot) => {
    const blocks = discoverBlocks(repoRoot);
    const entries = readEntries(repoRoot);
    const notes = notesByBlock(entries, blocks);

    return {
        blocks: blocks
            .filter((block) => notes.has(block.name))
            .map((block) => ({ ...block, notes: notes.get(block.name).join('\n\n') })),
        entries,
    };
};
