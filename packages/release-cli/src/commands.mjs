/* (c) Copyright Frontify Ltd., all rights reserved. */

import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';

import { removeEntries, writeEntry } from './entries.mjs';
import { moveTag } from './git.mjs';
import { buildPlan, releaseTag } from './plan.mjs';
import { blockNameFromCwd, discoverBlocks } from './workspace.mjs';

export class UsageError extends Error {
    name = 'UsageError';
}

const promptForNotes = async () => {
    const rl = createInterface({ input: stdin, output: stdout });
    try {
        const answer = await rl.question('Release notes (shown in the marketplace changelog): ');
        return answer.trim();
    } finally {
        rl.close();
    }
};

/**
 * Resolve which blocks an entry targets: an explicit --all, explicit --block flags, or --
 * when run from inside a block package -- that block.
 */
const resolveTargets = (repoRoot, cwd, blocks, { all, block: blockFlags }) => {
    if (all) {
        return 'all';
    }

    if (blockFlags.length > 0) {
        const known = new Set(blocks.map((entry) => entry.name));
        const unknown = blockFlags.filter((name) => !known.has(name));

        if (unknown.length > 0) {
            throw new UsageError(`Unknown block(s): ${unknown.join(', ')}`);
        }

        return blockFlags;
    }

    const inferred = blockNameFromCwd(repoRoot, cwd, blocks);
    if (inferred) {
        return [inferred];
    }

    throw new UsageError(
        'Not inside a block package. Pass --block <name> (repeatable), or --all to release every block.'
    );
};

export const add = async (repoRoot, cwd, options) => {
    const blocks = discoverBlocks(repoRoot);
    const targets = resolveTargets(repoRoot, cwd, blocks, options);
    const notes = options.notes?.trim() || (stdin.isTTY ? await promptForNotes() : '');

    if (!notes) {
        throw new UsageError('Release notes are required. Pass --notes "..." or run interactively.');
    }

    const file = writeEntry(repoRoot, targets, notes);
    const scope = targets === 'all' ? 'every block' : targets.join(', ');

    stdout.write(`Created ${file}\n  will release: ${scope}\n`);
};

export const plan = (repoRoot, options) => {
    const result = buildPlan(repoRoot, options.head);

    if (options.json) {
        stdout.write(`${JSON.stringify(result)}\n`);
        return;
    }

    if (result.unknownBlocks.length > 0) {
        stdout.write(`Unknown blocks referenced in .releases: ${result.unknownBlocks.join(', ')}\n\n`);
    }

    if (result.blocks.length === 0) {
        stdout.write('Nothing to release.\n');
        return;
    }

    stdout.write(`${result.blocks.length} block(s) to release\n\n`);

    for (const block of result.blocks) {
        const since = block.base ? `since ${block.base}` : 'first release';
        stdout.write(`  ${block.name} (${block.reason}, ${since})\n`);
        for (const line of block.notes.split('\n')) {
            stdout.write(`    | ${line}\n`);
        }
        stdout.write('\n');
    }

    if (result.entries.length > 0) {
        stdout.write(`Consuming ${result.entries.length} entry file(s) on success.\n`);
    }
};

/** Records that a block published successfully, so a re-run of the workflow skips it. */
export const mark = (repoRoot, options) => {
    if (options.block.length === 0) {
        throw new UsageError('Pass at least one --block <name>.');
    }

    for (const name of options.block) {
        moveTag(repoRoot, releaseTag(name), options.ref);
        stdout.write(`Moved ${releaseTag(name)} to ${options.ref}\n`);
    }
};

/** Clears the entry files a completed release consumed. */
export const clean = (repoRoot) => {
    const { entries } = buildPlan(repoRoot);

    removeEntries(repoRoot, entries);
    stdout.write(`Removed ${entries.length} entry file(s)\n`);
};
