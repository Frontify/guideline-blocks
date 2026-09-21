/* (c) Copyright Frontify Ltd., all rights reserved. */

import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const RELEASES_DIR = '.releases';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Deliberately tiny: the only key we support is `blocks`, in three shapes.
 *
 *   blocks: all
 *   blocks: [audio-block, quote-block]
 *   blocks:
 *     - audio-block
 *
 * @returns {'all' | string[] | undefined}
 */
const parseBlocksKey = (frontmatter) => {
    const lines = frontmatter.split('\n');
    const index = lines.findIndex((line) => line.trimEnd().startsWith('blocks:'));
    if (index === -1) {
        return undefined;
    }

    const inline = lines[index].slice(lines[index].indexOf(':') + 1).trim();

    if (inline === 'all') {
        return 'all';
    }

    if (inline.startsWith('[')) {
        return inline
            .replaceAll(/^\[|\]$/g, '')
            .split(',')
            .map((name) => name.trim().replaceAll(/^['"]|['"]$/g, ''))
            .filter(Boolean);
    }

    if (inline === '') {
        const collected = [];
        for (const line of lines.slice(index + 1)) {
            const match = line.match(/^\s*-\s*(.+?)\s*$/);
            if (!match) {
                break;
            }
            collected.push(match[1].replaceAll(/^['"]|['"]$/g, ''));
        }
        return collected;
    }

    return [inline.replaceAll(/^['"]|['"]$/g, '')];
};

/** @returns {{ file: string, blocks: 'all' | string[] | undefined, notes: string }[]} */
export const readEntries = (repoRoot) => {
    const directory = join(repoRoot, RELEASES_DIR);
    if (!existsSync(directory)) {
        return [];
    }

    return readdirSync(directory)
        .filter((file) => file.endsWith('.md') && file !== 'README.md')
        .sort()
        .map((file) => {
            const raw = readFileSync(join(directory, file), 'utf8');
            const match = raw.match(FRONTMATTER);

            return {
                file: `${RELEASES_DIR}/${file}`,
                blocks: match ? parseBlocksKey(match[1]) : undefined,
                notes: (match ? raw.slice(match[0].length) : raw).trim(),
            };
        });
};

const slugify = (notes) =>
    notes
        .toLowerCase()
        .replaceAll(/[^a-z0-9]+/g, '-')
        .replaceAll(/^-|-$/g, '')
        .split('-')
        .slice(0, 5)
        .join('-') || 'release';

/**
 * @param {'all' | string[]} blocks
 * @returns {string} the repo-relative path of the created entry
 */
export const writeEntry = (repoRoot, blocks, notes) => {
    const directory = join(repoRoot, RELEASES_DIR);
    mkdirSync(directory, { recursive: true });

    const file = `${slugify(notes)}-${randomUUID().slice(0, 8)}.md`;
    const value = blocks === 'all' ? 'all' : `[${blocks.join(', ')}]`;

    writeFileSync(join(directory, file), `---\nblocks: ${value}\n---\n\n${notes.trim()}\n`, 'utf8');

    return `${RELEASES_DIR}/${file}`;
};

export const removeEntries = (repoRoot, entries) => {
    for (const entry of entries) {
        rmSync(join(repoRoot, entry.file), { force: true });
    }
};
