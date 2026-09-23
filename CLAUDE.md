# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A pnpm monorepo of Frontify **guideline blocks** — React apps published individually to the Frontify Marketplace and embedded in customer guidelines. Each `packages/<name>-block/` is one marketplace app; `packages/shared` and `packages/release-cli` are internal tooling that never ships on its own.

Requires Node 26 and pnpm 11 (`.nvmrc`, `engines`).

## Commands

Run from the repo root (each fans out to every package via pnpm filters):

```sh
pnpm lint            # oxlint --type-aware
pnpm lint:fix
pnpm format          # oxfmt
pnpm format:check
pnpm typecheck       # tsc --noEmit per package
pnpm test            # unit + component
pnpm test:unit       # vitest run
pnpm test:unit:watch
pnpm test:components # cypress run --component
```

Single test / single package:

```sh
npx vitest run packages/image-block                    # one package
npx vitest run packages/image-block/src/ImageBlock.spec.tsx
npx vitest run -t "should render the caption"          # one test by name
pnpm test:components --spec packages/audio-block/src/AudioBlock.spec.ct.tsx
```

Per package:

```sh
cd packages/audio-block
pnpm serve            # frontify-cli serve, port 5600 — pair with the "Local Block
                      # Development" block in a guideline in edit mode
pnpm typecheck
pnpm lint
pnpm verify-manifest  # validates manifest.json against the marketplace app
```

There is no root `pnpm build` despite what `readme.md` says — `@frontify/guideline-blocks-shared` is consumed directly as TypeScript source (`main: src/index.ts`), so no prebuild step is needed.

## Architecture

**Block anatomy.** Every block package has the same shape:

- `src/index.ts` — `export default defineBlock({ block, settings })`; this is the deploy entry point (`--entryPath src/index.ts`).
- `src/<Name>Block.tsx` — the component, receives `{ appBridge }: BlockProps`.
- `src/settings.ts` — `defineSettings({ basics, layout, style, security, ... })`; the sidebar UI the guideline editor renders. Setting `id`s used as asset keys are exported as consts (`AUDIO_ID`, `ATTACHMENTS_ASSET_ID`) and shared between `settings.ts` and the component.
- `src/types.ts` — the `BlockSettings` type, kept in sync by hand with `settings.ts`.
- `manifest.json` — `appId` plus a JSON-Schema `settingsSchema` describing every persisted setting with `frontify-*` annotations (translatable, serializable, api-read/write). Hand-maintained; CI runs `verify-manifest` against the real app. **A package counts as a releasable block only if it has `manifest.json` with an `appId`** — that same rule drives the release CLI and the verify-manifest CI job.
- `block-scope.json` — a unique CSS scope class, passed as `<StyleProvider scope={blockScope.scope}>` so Tailwind/Fondue styles can't leak between blocks on the same guideline page.

**The three dependency layers.** `@frontify/app-bridge` (hooks into the guideline host: `useBlockSettings`, `useBlockAssets`, `useEditorState`, `useAssetChooser`, `useAssetUpload`, `usePrivacySettings`) → `@frontify/guideline-blocks-settings` (`defineBlock`, `defineSettings`, `RichTextEditor`, setting helpers like `getSecurityDownloadableSetting`) → `@frontify/guideline-blocks-shared` (this repo's own cross-block components/hooks: `StyleProvider`, `ResponsiveImage`, `DownloadButton`, `EditAltTextFlyout`, `useImageContainer`, …). New cross-block code belongs in `packages/shared` and must be re-exported from `packages/shared/src/index.ts`.

**Editing vs viewing.** Blocks render both the editor and the published guideline; `useEditorState(appBridge)` gates edit-only affordances. Assume both paths in changes and tests.

## Tests

Two suites coexist while the repo migrates off Cypress:

- **Vitest + happy-dom** (`*.spec.{ts,tsx}`, `*.test.{ts,tsx}`) — the target. `testIdAttribute` is configured as `data-test-id`.
- **Cypress component** (`*.spec.ct.{ts,tsx}`) — legacy, still run in CI, sharded across 7 runners.

Migrating a package's `.ct` specs is a defined workflow — use the `migrate-tests-to-vitest` skill rather than improvising. Test descriptions start with `should` / `should not`.

## Conventions

- Every source file starts with `/* (c) Copyright Frontify Ltd., all rights reserved. */` followed by two blank lines — enforced by oxlint, not optional.
- Lint is oxlint with `@frontify/oxlint-config-react`; formatting is oxfmt. Both are configured per package, and type-aware linting needs `options.typeAware` in the **root** `oxlint.config.ts`.
- PR titles must be Conventional Commits (`feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `test`, `ci`, `build`); the repo convention scopes them by block, e.g. `fix(CalloutBlock): make sr skip icons`.

## Releasing — generate the release entry automatically

Merging to `main` publishes **exactly** the blocks named by the files in `.releases/`, and nothing else. No entry file, no release. There are no version numbers; the marketplace assigns its own version per deploy.

**When your change touches one or more releasable blocks (any package with a `manifest.json` + `appId`) in a way customers would see or benefit from, create the release entry as part of the change — don't wait to be asked.** That includes fixes, features, a11y and UX improvements, copy changes, and dependency bumps that alter block behaviour.

Do **not** create an entry for changes that only affect internal tooling: `packages/release-cli`, CI workflows, repo config, docs/READMEs, tests, or `packages/shared` edits that no block actually consumes yet. Changes to `packages/shared` that alter behaviour of blocks importing it **do** need entries for each affected block.

Generate entries non-interactively (the bare `pnpm release` prompts on a TTY, which won't work here):

```sh
pnpm exec blocks-release add --block audio-block --notes "Fixed alignment of the settings sidebar."
pnpm exec blocks-release add --block audio-block --block quote-block --notes "..."
pnpm exec blocks-release add --all --notes "..."       # every block, one changelog
pnpm exec blocks-release plan                          # preview what the next merge publishes
```

This writes `.releases/<slug>-<uuid>.md`, which must be committed with the change. Write the notes as customer-facing changelog text — they appear verbatim on the marketplace listing. One sentence or two, describing the user-visible outcome, not the implementation. Never `git commit` unless the user asked for a commit; just leave the entry file in the working tree alongside the rest of the change, and mention that you created it.

If you deliberately skip an entry for a block-touching change, say so and why.

Shipping is fully automated from there: the CD workflow reads the entries, runs `frontify-cli deploy` + `publish` per block (matrix, `max-parallel: 4`), then a follow-up commit deletes the consumed entries. Entries survive a partial failure so a re-run still has the notes.
