# Upgrading brand-sdk packages

How to bump `@frontify/app-bridge`, `@frontify/guideline-blocks-settings` and `@frontify/fondue`, and what differs
between the versions the repo pins and the versions [`../AGENTS.md`](../AGENTS.md) and these docs describe. Delete
the "What changes" section once the repo is on the baseline.

## Procedure

(See commits like "chore(deps): bump app-bridge to 4.0.0-alpha.81 and guideline-blocks-settings to 4.0.0-alpha.15".)

1. Read the CHANGELOGs in `../brand-sdk/packages/app-bridge` and `…/guideline-blocks-settings` for every
   version in between; alphas contain breaking changes.
2. Update the version in **every** block `package.json`, `packages/shared`, `packages/storybook`,
   `examples/asset-upload`, the root (`@frontify/fondue`), and the `minimumReleaseAgeExclude` list in
   `pnpm-workspace.yaml` (pnpm otherwise refuses fresh releases). guideline-blocks-settings is pinned exactly,
   app-bridge with a caret, fondue exactly.
3. `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, grep for removed APIs, run Storybook, then add a
   release entry for all blocks (`pnpm exec blocks-release add --all --notes "…"`) when behaviour changes.
4. Update the version baseline paragraph in `AGENTS.md` and this file.

## What changes between the pinned versions and the documented baseline

Pinned at the time of writing: app-bridge 4.0.0-alpha.81, guideline-blocks-settings 4.0.0-alpha.15, fondue 13.11.
Documented: app-bridge 4.0.0-alpha.83, guideline-blocks-settings 4.0.0-alpha.17, fondue 14.0.0-rc.0.

- app-bridge alpha.82: `useAssetUpload` callbacks receive the `createAssets` payloads directly instead of
  `MessageEvent`s (no block reads the arguments today); Node ≥ 22. alpha.83: removes `useAfterInsertion`,
  `compareObjects`, stale `DispatchPayload`/`Subscription`/`TerrificComponent` types and the
  `AssetChooserOptionsDummy`/`AssetChooserResultDummy` dummies (none referenced here).
- guideline-blocks-settings alpha.16: built against **Fondue 14** (`14.0.0-rc.0` on alpha.17), so
  `@frontify/fondue` must move to 14 in the root and every block in the same change, and every block-owned
  `PluginComposer` has to type-check against it. Fondue 14 keeps the `components`/`icons`/`rte`/`tokens`
  subpaths and the `dist/packages/*/style.css` files the shared `styles.css` imports. alpha.16 also stops
  shipping Fondue's deprecated CSS variables (no block uses them). alpha.17 removes `isDark`,
  `getReadableColor` and `toShortRgba` (no block uses them; `@ctrl/tinycolor` on a `toRgbaString(color)` string
  replaces them), and makes toolbar/RTE popover buttons `type="button"`.
