# Upgrading brand-sdk packages

How to bump `@frontify/app-bridge`, `@frontify/guideline-blocks-settings` and `@frontify/fondue`. The versions
in use are the ones pinned in the `package.json` files and named in the version baseline paragraph of
[`../AGENTS.md`](../AGENTS.md).

## Procedure

(See commits like "chore(deps): bump app-bridge to 4.0.0-alpha.81 and guideline-blocks-settings to 4.0.0-alpha.15".)

1. Read the CHANGELOGs in `../brand-sdk/packages/app-bridge` and `…/guideline-blocks-settings` for every
   version in between; alphas contain breaking changes. Check which Fondue range the new
   guideline-blocks-settings declares as a peer dependency and bump `@frontify/fondue` to match.
2. Update the version in **every** block `package.json`, `packages/shared`, `packages/storybook`,
   `examples/asset-upload`, the root (`@frontify/fondue`), and the `minimumReleaseAgeExclude` list in
   `pnpm-workspace.yaml` (pnpm otherwise refuses fresh releases). guideline-blocks-settings is pinned exactly,
   app-bridge with a caret, fondue exactly.
3. `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build-storybook` (exercises the Tailwind and
   Fondue CSS chain), grep for removed APIs, then add a release entry for all blocks
   (`pnpm exec blocks-release add --all --notes "…"`) when behaviour changes.
4. Update the version baseline paragraph in `AGENTS.md`, and any doc that names a version or a behaviour that changed.

## Notes from the last bump (2026-11-16)

- Fondue 14 removed the root `@frontify/fondue` entry and `@frontify/fondue/styles`; the `components`, `icons`,
  `rte` and `tokens` subpaths and the `dist/packages/*/style.css` files the shared `styles.css` imports still
  exist. gradient-block's `Validation` enum import from the root entry was replaced with a string union.
- guideline-blocks-settings alpha.18 made Fondue a peer dependency, so a single Fondue copy is installed and
  block-owned `PluginComposer`s type-check against the editor props.
- `pnpm why @frontify/fondue@<old>` after the install confirms nothing still pulls the old major.
