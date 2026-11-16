# How the host runs a block

What a block can rely on from the Frontify web app, without the host's internals. Rules are in
[`../AGENTS.md`](../AGENTS.md). The host is not in this repo; this page records its observed behaviour. The local
dev server and the deploy pipeline are `../brand-sdk/packages/cli/src`.

```
src/index.ts  ──defineBlock({ block, settings })──►  frontify-cli deploy  ──►  Marketplace app version (DRAFT)
                                                       (Vite lib build, ESM,        │  frontify-cli publish
                                                        react external)             ▼
                                                                                   published version
                                                                                        │
guideline page  ◄── host import()s dist/index.js + loads dist/style.css ◄───────────────┘
   └─ <wrapper>  <error boundary>  <Block appBridge={AppBridgeBlock for this block instance} />
```

**Loading.** The host `import()`s the published `dist/index.js` as an ES module and expects
`default = { block, settings, onBlockCreated?, onBlockDeleted? }` (what `defineBlock` returns). It reads the
`dependencies` shipped with the bundle: `react` selects an isolated React 18 (or 19) runtime that the bundle
imports as bare specifiers, and `@frontify/app-bridge` selects the v3 or v4 host implementation. A bundle
without `dependencies` is treated as a legacy non-ESM block. That is why `react`, `react-dom` and
`@frontify/app-bridge` stay in a block's `dependencies`, not `devDependencies`.

**One `AppBridgeBlock` per block instance.** Context is filled from the page data before the block renders:
settings, assets, project, translation language, privacy defaults, and `isEditing` (edit mode **and** this is
not a referenced instance; a referenced block is the same block shown on another page and is never editable).
Templates are fetched on first access.

**When context changes reach the block** (blocks only subscribe, through the hooks):

| Context key        | Changes when                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `isEditing`        | The editor toggles edit mode (all blocks on the page re-render).                                              |
| `settings`         | After any save: the block's own `updateBlockSettings` or a change in the settings sidebar. The new object is a copy; compare by value. |
| `assets`           | After `addAssetIdsToBlockAssetKey` / `setAssetIdsByBlockAssetKey` once every asset in the key has finished processing (the host polls); after `delete` immediately. |
| `templates`        | After `addTemplateIdsToBlockTemplateKey` / `deleteTemplateIdsFromBlockTemplateKey` or the first read.         |
| `privacySettings`  | The guideline's asset settings change.                                                                        |

**Rendering.** The host wraps the block in an error boundary. In edit mode a render error shows an error card
with the block name, app id, version, message, and the block's settings/assets JSON. **In view mode a crashed
block renders nothing**, silently. Render defensively: defaults for missing settings, `?.[0]` on assets.

**CSS.** The host confines the block's stylesheet to the block's own subtree and its portalled overlays
(`@scope`), on top of the scoping this repo does itself ([styling.md](styling.md)). Both must keep working: never
rely on the host to contain a selector you did not scope. For Frontify-owned blocks the host keeps a list of our
app ids for this handling; ask the web-app team to add a new block's `appId`.

**Settings sidebar.** The host resolves `settings` (plain object, function or async function; cached per
block), renders the sections, and saves every change through the same bridge as the block, so the block
re-renders via `useBlockSettings`. `defaultValue`s are merged into the stored settings when the structure is
applied (on insert; on every load in local development), but a block inserted before a setting existed will not
have it: **always fall back in code** (image-block spreads `DEFAULT_IMAGE_BLOCK_SETTINGS` under the stored settings).

**Lifecycle.** `onBlockCreated` / `onBlockDeleted` from `defineBlock` are awaited around insertion and deletion.
No block in this repo uses them.

**Local development.** `pnpm serve` runs `frontify-cli serve --entryPath src/index.ts` (`--port`, default 5600):
a Vite dev server with React externalized and HMR. In a guideline in edit mode, add the "Local Block
Development" block and enter the port (screenshots: `guideline-edit-mode.png`, `local-block-development.png` in
this folder). The host asks the dev server for its entrypoint
(`GET /_entrypoint` → `{ url, dependencies: { '@frontify/app-bridge', react }, manifest, … }`), imports `url`,
requires a `block` export, resolves `settings` and applies defaults. The block's status messages mean: "CLI not
running" (entrypoint unreachable or import failed), "wrong app type" (no `block` export), "no settings
structure" (`settings` threw).

**Deploy and publish.** CD runs, per block, `frontify-cli deploy --entryPath src/index.ts --no-verify` (manifest
validated on the server, Vite lib build → `dist/index.js` + `dist/style.css`, React externalized, uploaded with
the source files and `package.json#dependencies` as a new DRAFT) and then
`frontify-cli publish --release-notes="…" --availability=COMMUNITY`. Four blocks run in parallel; `.releases/`
entries are deleted by a follow-up commit only when every block succeeded, so a re-run still has the notes.
`pnpm deploy` inside a block runs `pnpm lint` first and then the same deploy (the CLI's own verify step only runs
`tsc` and looks for an eslint config, which this repo does not have). CI (`continuous-integration.yml`) runs
lint, format check, typecheck, `verify-manifest` for every package with a `manifest.json`, and the unit tests.
