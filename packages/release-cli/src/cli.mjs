/* (c) Copyright Frontify Ltd., all rights reserved. */

import { argv, cwd, exit, stderr, stdout } from 'node:process';
import { parseArgs } from 'node:util';

import { UsageError, add, clean, mark, plan } from './commands.mjs';
import { findRepoRoot } from './workspace.mjs';

const USAGE = `
blocks-release -- decide what ships to the Frontify Marketplace, and with which changelog.

  blocks-release add [--block <name>...] [--all] [--notes "..."]
      Record a release entry under .releases/. Run inside a block package to target that
      block, or pass --all for one changelog across every block.

  blocks-release plan [--json] [--head <ref>]
      Show which blocks would be released and with what notes. Used by CI.

  blocks-release mark --block <name>... [--ref <ref>]
      Move the released/<name> tag after a successful publish. Used by CI.

  blocks-release clean
      Delete the entry files a completed release consumed. Used by CI.
`;

const OPTIONS = {
    all: { type: 'boolean', default: false },
    block: { type: 'string', multiple: true, default: [] },
    notes: { type: 'string' },
    json: { type: 'boolean', default: false },
    head: { type: 'string', default: 'HEAD' },
    ref: { type: 'string', default: 'HEAD' },
    help: { type: 'boolean', short: 'h', default: false },
};

const run = async () => {
    const { values, positionals } = parseArgs({ args: argv.slice(2), options: OPTIONS, allowPositionals: true });
    const [command] = positionals;

    if (values.help || !command) {
        stdout.write(`${USAGE}\n`);
        return;
    }

    const repoRoot = findRepoRoot();

    switch (command) {
        case 'add':
            return add(repoRoot, cwd(), values);
        case 'plan':
            return plan(repoRoot, values);
        case 'mark':
            return mark(repoRoot, values);
        case 'clean':
            return clean(repoRoot);
        default:
            throw new UsageError(`Unknown command "${command}".`);
    }
};

try {
    await run();
} catch (error) {
    if (error instanceof UsageError) {
        stderr.write(`${error.message}\n`);
        exit(1);
    }
    throw error;
}
