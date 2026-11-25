# AGENTS.md — building Frontify guideline blocks

The single source of truth for agents and humans working in this repository (`CLAUDE.md` only imports it).
Rules, commands and conventions are here. Reference material lives in `docs/`; read a file when the task needs it:

| Read                 | When you…                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `docs/app-bridge.md` | call anything on `appBridge`: context keys, commands, API methods, hooks, `updateBlockSettings` rules |
| `docs/settings.md`   | edit `settings.ts`: setting types, bundle and `onChange`, preset groups, security, shared components  |
| `docs/manifest.md`   | edit `manifest.json`: `frontify-*` keywords, bubbling, server-side validation                        |
| `docs/host.md`       | need to know what the host does: loading, when context changes, error boundary, sidebar, local dev   |
| `docs/styling.md`    | write CSS or Tailwind: scoping mechanics, Fondue, theme variables, responsive images                  |
| `docs/testing.md`    | write a spec or story: stub options and quirks, dummies, Storybook                                    |
| `docs/upgrading.md`  | bump `@frontify/app-bridge`, `@frontify/guideline-blocks-settings` or `@frontify/fondue`                   |

**Version baseline.** `@frontify/app-bridge` 4.0.0-alpha.83, `@frontify/guideline-blocks-settings` 4.0.0-alpha.18
(sidebar-settings 0.12; Fondue 14.0.0-rc.3 is its peer dependency, so every block pins Fondue itself) and
`frontify-cli` ^6.4, as pinned in the `package.json` files. `docs/upgrading.md` is the bump procedure. Source of
truth for the APIs is `../brand-sdk` (`dev` branch) when it is checked out next to this
repo, otherwise the installed types in
`packages/<block>/node_modules/@frontify/{app-bridge,guideline-blocks-settings}/dist/index.d.ts`.

A block is a React component plus a settings definition, published as a Marketplace app and rendered by the
Frontify web app ("the host") inside a guideline page, in the host's own window. The host passes one
`AppBridgeBlock` through which the block reads settings, assets and edit state and asks for choosers, uploads and
downloads. Settings are the only persisted state (one JSON object per block, validated against `manifest.json`);
assets and templates are stored separately under keys the block chooses.

## Rules

1. **Never commit on `main`.** Work on a branch named `gcm-<ticket>-<slug>` when a Linear ticket exists, otherwise
   `<type>/<slug>` (`fix/…`, `feat/…`, `chore/…`). Commit with Conventional Commit messages, push, and open a
   **draft** pull request whose body says what changed and why, how it was verified, and whether a release entry
   was added. A human marks it ready for review.
2. **A customer-visible change to a block needs a release entry** in `.releases/`, created with
   `pnpm exec blocks-release add` as part of the change (see Releasing). No entry, no release.
3. **`settings.ts`, `types.ts` and `manifest.json#settingsSchema` describe the same thing; change all three.**
   The manifest has `additionalProperties: false`, so a key the block writes but the manifest omits fails validation.
4. **Every source file starts with** `/* (c) Copyright Frontify Ltd., all rights reserved. */` **and two blank lines.**
5. **`<StyleProvider scope={blockScope.scope}>` is the root of every block.** Without it no `tw-` utility applies.
6. **An empty block renders nothing in view mode**, and editing affordances show only when `useEditorState` is `true`.
7. **Everything goes through `appBridge`.** No `window` globals, no `fetch` to Frontify endpoints. glyphs-block's
   font fetch is known debt that waits for a host-provided API; it is not a pattern.
8. **Render defensively.** Default every setting, `?.[0]` every asset: a render error hides the block from viewers.
9. **Cross-block code goes to `packages/shared`** and is exported from its `index.ts`; code useful to third-party
   authors belongs in brand-sdk's `guideline-blocks-settings` instead.
10. **PR titles are Conventional Commits scoped by block, Linear ids in brackets at the end**:
    `fix(TemplateBlock): stop overwriting the title on load [GCM-1016]`.

## Commands

Node 26, pnpm 11 (`.nvmrc`, `engines`); TypeScript 6, Vite 8, Vitest 5 + happy-dom, oxlint, oxfmt, Tailwind 3,
Fondue 14, React 18 (`@frontify/app-bridge` peers on `react ^18`).

```sh
pnpm lint                                        # oxlint --type-aware, every package (lint:fix to autofix)
pnpm format:check                                # oxfmt (format to write); runs inside packages only, Markdown is not checked
pnpm typecheck                                   # tsc --noEmit per package; shared is included by every block
pnpm test                                        # vitest run, every package (test:unit:watch, test:unit:ui)
npx vitest run packages/image-block              # one package; add src/ImageBlock.spec.tsx for a file, -t "should …" for a test
pnpm storybook                                   # port 6006
pnpm exec blocks-release add --block <name>-block --notes "…"   # release entry, non-interactive (bare pnpm release prompts)
pnpm exec blocks-release plan                    # what the next merge to main publishes
cd packages/<name>-block && pnpm serve           # dev server on :5600; pair with the "Local Block Development" block
cd packages/<name>-block && pnpm verify-manifest # server-side manifest validation; needs FRONTIFY_ACCESS_TOKEN + FRONTIFY_INSTANCE_URL
```

There is no root `pnpm build`: `packages/shared` is consumed as TypeScript source. The root and per-block
`pnpm deploy` push a DRAFT to the marketplace from your machine, a manual fallback for trying a build on an
instance; releases go through `.releases/` and CI, never through a local deploy.

## Anatomy of a block package

```
packages/<name>-block/
├── manifest.json           appId + settingsSchema (docs/manifest.md). An appId is what makes a package releasable.
├── block-scope.json        { "scope": "<name>-block" }: the CSS scope class, read by postcss/scope.js
├── package.json            react, react-dom, @frontify/app-bridge stay in dependencies: the host reads them from the bundle
├── postcss.config.js, tailwind.config.js, tsconfig*.json, oxlint.config.ts, oxfmt.config.ts   copied from a sibling block
└── src/
    ├── index.ts                export default defineBlock({ block, settings })        ← deploy/serve entry
    ├── <Name>Block.tsx         ({ appBridge }: BlockProps) => …
    ├── settings.ts             defineSettings({...}); exports id constants (AUDIO_ID = 'audio') used by component, spec, story
    ├── types.ts                Settings type and enums for choice values
    ├── <Name>Block.spec.tsx    vitest + Testing Library against the app-bridge stub
    ├── <Name>Block.stories.tsx blockMeta(definition)
    └── components/, helpers/, hooks/
```

Imports come from three layers: `@frontify/app-bridge` (`AppBridgeBlock`, hooks, command/API creators, `Asset`,
`FileExtensionSets`, `getMimeType`), `@frontify/guideline-blocks-settings` (`defineBlock`, `defineSettings`,
`BlockProps`, setting helpers, `RichTextEditor`, `BlockItemWrapper`, `BlockInjectButton`, `Attachments`,
`ColorChooser`, `useBlockPrivacySettings`, colour/style utilities; re-exports `@frontify/sidebar-settings`) and
`@frontify/guideline-blocks-shared` (this repo's `packages/shared`: `StyleProvider`, `ResponsiveImage`,
`useImageContainer`, `DownloadButton`, `CopyButton`, `EditAltTextFlyout`, `useDndSensors`, `generateRandomId`, …).

## Conventions

**Component.** `const isEditing = useEditorState(appBridge)` and
`const [settings, setSettings] = useBlockSettings<Settings>(appBridge)`; spread defaults under the stored settings,
because blocks inserted before a setting existed lack it. `setSettings` takes a partial that the host deep-merges
(objects merge, arrays and primitives replace, nothing deletes: write `null`/`''`) and throws outside edit mode (the
hook swallows it), so gate writes on `isEditing`. Edit-mode chrome is `BlockItemWrapper` (toolbar) and
`BlockInjectButton` (empty state); view-only chrome is `DownloadButton`, attachments and the asset viewer.

**Assets.** The asset key is the exported setting-id constant, so the sidebar's `assetInput` and the block's own
chooser write the same slot. Open choosers per click through `useAssetChooser` (the host drops `assetsChosen`
subscriptions when the modal closes), restrict them with `FileExtensionSets.*` / `AssetChooserObjectType`, upload
with `useFileInput` + `useAssetUpload` and consume `results` in an effect keyed on `doneAll`. Save with
`updateAssetIdsFromKey(KEY, ids)` from `useBlockAssets`; the asset appears in `blockAssets` only after the host saw
processing finish, so keep a local `isLoading` in between. Downloads: `useBlockPrivacySettings` with the security
trio, `DownloadButton` only when `assetDownloadEnabled`, `dispatch(downloadAsset(asset))`. `Asset.previewUrl`
contains `{width}`: render through `ResponsiveImage`.

**Rich text and lists.** `RichTextEditor` stores a JSON string. `useMemo` the plugins and `useCallback` the handlers
(re-creating them remounts the editor), re-key the editor to push a derived value, build values with
`convertToRteValue(TextStyles.x, text)`. Lists keep ids from `generateRandomId()` and sort with `@dnd-kit` +
`useDndSensors`.

**Styling.** Tailwind prefix `tw-`, preflight off, `content-box`. Width-dependent layout uses container queries
(`tw-@container` on the root, `@sm:` 440px, `@md:` 740px, `@lg:` 1240px), never viewport breakpoints. Theme text
via `BlockStyles[TextStyles.p]` (the `--f-theme-settings-*` variables), chrome via Fondue tokens, Fondue 14 from
`@frontify/fondue/{components,icons,rte}`. The build scopes `tw-` rules and `:root` under `.<scope>`, confines bare
element selectors and leaves class selectors alone; portalled UI (flyouts, menus) sits outside the scope, so style
it with Fondue components or class selectors, never with descendant selectors from the block root.

**Accessibility.** Blocks target WCAG 2.2 level AAA for everything they control. Icon-only controls get an
`aria-label`; decorative icons get `aria-hidden="true"`; loading and status changes are announced through
`aria-live`; every pointer interaction has a keyboard path with a visible focus style (`focus-visible`); state is
never conveyed by colour alone; block-owned text and controls meet 7:1 contrast and 44×44 px targets. Specs assert
roles and accessible names, not only test ids. Theme colours and Fondue components are the guideline's and
Fondue's responsibility, but a block must not make them worse.

**Tests.** `*.spec.tsx`, descriptions start with `should`, both modes covered, test ids via `data-test-id`.
`withAppBridgeBlockStubs(Block, { editorState, blockSettings, blockAssets, privacySettings })`; the stub's
`privacySettings` default to both `false`, chooser subscriptions receive a dummy asset immediately and `dispatch` is
a sinon stub. View-mode RTE renders async (`findByTestId('rte-content-html')`); happy-dom computes no Tailwind, so
assert classes and DOM, not styles. Every block has one story: `blockMeta(definition)`, `AssetFixture`,
`parameters.appBridge`.

**Lint and format.** oxlint type-aware (the root `oxlint.config.ts` must keep `options.typeAware`; package configs
extend `@frontify/oxlint-config-react`), oxfmt (4 spaces, single quotes, 120 columns). Disable comments
(`// oxlint-disable-next-line <rule>`) are rare and deliberate: `typescript/no-floating-promises` for
fire-and-forget saves, `@eslint-react/exhaustive-deps` for effects meant to run on `doneAll`/`selectedFiles` only,
`@eslint-react/set-state-in-effect`. Shared `.tsx` files `import * as React` behind a `no-restricted-syntax`
disable because `packages/shared/tsconfig.json` still uses the classic `jsx: react` transform; keep the pattern
there until shared moves to `react-jsx`.

## Releasing

Merging to `main` publishes exactly the blocks named by the files in `.releases/` (CD runs `frontify-cli deploy
--no-verify` and then `publish --availability=COMMUNITY` per block; the marketplace numbers the versions). Create an
entry for fixes, features, a11y, UX and copy changes, and dependency bumps that change block behaviour, including
`packages/shared` changes that blocks consume. Skip it for `packages/release-cli`, CI, repo config, docs, tests and
unconsumed shared code, and say that you skipped it.

```sh
pnpm exec blocks-release add --block audio-block --notes "Fixed alignment of the settings sidebar."
pnpm exec blocks-release add --block audio-block --block quote-block --notes "…"
pnpm exec blocks-release add --all --notes "…"
```

Notes are customer-facing changelog text (one or two sentences on the outcome, not the implementation) and appear
verbatim on the marketplace listing. The entry `.releases/<slug>-<uuid>.md` goes into the same commit as the change;
CI deletes it after a successful publish.

## Definition of done

- `pnpm lint`, `pnpm format:check`, `pnpm typecheck` and `npx vitest run packages/<name>-block` pass.
- Settings, types and manifest agree. Schema changes are validated by the `verify-manifest` CI job; run
  `pnpm verify-manifest` locally only when the two `FRONTIFY_*` variables are set.
- Both modes behave: edit mode shows the affordance, view mode shows content or nothing.
- New interactions have a keyboard path and accessible names (see Accessibility).
- The spec covers the change; the story is updated when settings or the empty state changed.
- Release entry created, or the skip explained.
- `AGENTS.md` or `docs/` updated when the change adds or alters a convention, a command or an app-bridge usage.
- Committed on a branch, pushed, draft PR opened (Rule 1).

## New block

Copy `divider-block` or `quote-block` (or `examples/asset-upload` for the asset flow) to `packages/<name>-block`;
set `name`, a unique `block-scope.json` scope and the `"@frontify/guideline-blocks-storybook": "workspace:*"`
devDependency (`frontify-cli block create` scaffolds standalone repos and does not fit this monorepo). Create the
Marketplace app on the instance to get the `appId`, write the full `settingsSchema`, then settings, types,
component, spec, story, a local check with `pnpm serve`, and the release entry. For a Frontify-owned block, ask the
web-app team to add the `appId` to the host's list of Frontify block ids.

## Gotchas

- Tests of download or viewer buttons must set `security: Security.Custom` plus the block's switch, or pass
  `privacySettings`, because the stub defaults both to `false`.
- `settings` may be an async function (resolved once per sidebar open), but Storybook cannot derive controls from it.
- Storybook shares one Tailwind build with no per-block scope, so it cannot reveal scoping bugs, and a utility one
  block generates applies to all of them there.
- On a translated page saves go to the translation; only `showForTranslations`/translatable settings are affected.
- A failed save marks the block as failed in the host UI until the next successful save.
- `examples/basic-react-18` and `examples/basic-react-19` are untracked leftovers; `examples/asset-upload` is the
  only tracked example and is linted and typechecked with the packages.
