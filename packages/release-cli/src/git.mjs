/* (c) Copyright Frontify Ltd., all rights reserved. */

import { execFileSync } from 'node:child_process';

/** @returns {string} trimmed stdout */
export const git = (args, cwd) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

const gitOrNull = (args, cwd) => {
    try {
        return git(args, cwd);
    } catch {
        return null;
    }
};

export const revParse = (repoRoot, ref) => gitOrNull(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`], repoRoot);

export const shortSha = (repoRoot, ref) => gitOrNull(['rev-parse', '--short', ref], repoRoot);

/** @returns {string[]} repo-relative paths changed between `base` and `head` */
export const changedFiles = (repoRoot, base, head) => {
    const output = gitOrNull(['diff', '--name-only', `${base}..${head}`], repoRoot);
    return output ? output.split('\n').filter(Boolean) : [];
};

/** @returns {string[]} commit subjects touching `paths`, newest first */
export const commitSubjects = (repoRoot, base, head, paths) => {
    const output = gitOrNull(['log', '--format=%s', `${base}..${head}`, '--', ...paths], repoRoot);
    return output ? output.split('\n').filter(Boolean) : [];
};

/** Read a file at a specific revision. Returns null when it did not exist there. */
export const fileAtRevision = (repoRoot, ref, path) => gitOrNull(['show', `${ref}:${path}`], repoRoot);

export const moveTag = (repoRoot, tag, ref) => git(['tag', '--force', tag, ref], repoRoot);
