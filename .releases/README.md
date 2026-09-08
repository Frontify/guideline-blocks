# Release entries

Each file in this folder is one pending changelog entry. CI reads them on merge to `main`,
publishes the affected blocks to the Frontify Marketplace, then deletes the files.

Create one with the CLI rather than by hand:

```sh
# inside a block package -- targets that block
pnpm release

# from the repo root -- one changelog across every block
pnpm release
```

## Format

```markdown
---
blocks: [audio-block, quote-block]
---

Fixed alignment of the settings sidebar.
```

`blocks` accepts `all`, an inline list, or a YAML list. It does two things: it forces those
blocks into the release even when nothing under their path changed, and it scopes the notes
to them.

Omit `blocks` entirely and the entry becomes notes-only -- it annotates whatever the change
detection selects, without forcing anything in.

## What gets released without an entry

Entries are optional. A block is selected automatically when, since its `released/<block>`
tag, any of these changed:

- its own package directory
- `packages/shared`
- a shared build input outside the workspace graph (`postcss/`, `tailwind.config.js`, `postcss.config.js`, `pnpm-workspace.yaml`)
- the root `dependencies` (root `devDependencies` are ignored -- they never reach a bundle)

Its notes then fall back to the commit subjects touching that block. So a Renovate bump of
`@frontify/guideline-blocks-settings`, which edits every block's `package.json`, releases
every block with no entry file needed.

Run `pnpm release:plan` to see exactly what would ship.
