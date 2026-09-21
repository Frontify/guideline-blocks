# Release entries

Each file here is one pending release. On merge to `main`, CI publishes exactly the blocks
these files name -- nothing more -- and then deletes the files.

No entries means no release. Merging a change without one publishes nothing.

Create them with the CLI rather than by hand:

```sh
cd packages/audio-block && pnpm release   # this block
pnpm release                              # repo root: one changelog, every block
pnpm release:plan                         # preview what the next merge publishes
```

## Format

```markdown
---
blocks: [audio-block, quote-block]
---

Fixed alignment of the settings sidebar.
```

`blocks` is required and accepts `all`, an inline list, or a YAML list. The body is the
changelog text, shown to customers on the marketplace listing.

One file per change, so two PRs releasing different blocks never conflict. If two entries
name the same block, its changelog is both of their notes, in filename order.
