# Testing and Storybook

Reference for specs against the app-bridge stub and for stories. Conventions are in
[`../AGENTS.md`](../AGENTS.md). Source: `../brand-sdk/packages/app-bridge/src/tests/AppBridgeBlockStub.ts` (or the
installed `packages/<block>/node_modules/@frontify/app-bridge/dist/testing.d.ts`), the root `vite.config.mts` /
`vitest.setup.ts`, and `packages/storybook/README.md`.

## Specs

Vitest + happy-dom + Testing Library, configured once in the root `vite.config.mts` / `vitest.setup.ts`
(jest-dom matchers, `testIdAttribute: 'data-test-id'`, `Worker` mocked, cleanup after each). Files are
`*.spec.{ts,tsx}` (or `*.test.*`); descriptions start with `should` / `should not`; cover both modes.

```tsx
import { AssetDummy, withAppBridgeBlockStubs } from '@frontify/app-bridge/testing';

const [AudioBlockWithStubs, appBridge] = withAppBridgeBlockStubs(AudioBlock, {
    editorState: true,
    blockSettings: { title },
    blockAssets: { [AUDIO_ID]: [AssetDummy.with(312)] },
});
render(<AudioBlockWithStubs />);
```

`getAppBridgeBlockStub(options)` facts that matter when writing tests:

- Options: `blockSettings`, `blockAssets`, `blockTemplates`, `editorState` (default `false`), `privacySettings`
  (default **both `false`**), `isAuthenticated` (`true`), `isNewlyInserted`, `projectId`, `translationLanguage`
  (`''`), `blockId` (3452), `sectionId` (2341), `user`, `emitChosenEventsOnSubscribe` (default `true`).
- `updateBlockSettings` deep-merges and notifies `context('settings')` subscribers, so `useBlockSettings`
  re-renders like in the host. Asset mutations update `context('assets')`; ids you add come back as
  `AssetDummy.with(id)` (title "A title", `previewUrl` `https://preview.url`).
- `api` answers `createAssets` (one dummy per file, callbacks fired synchronously), `setAssetIdsByBlockAssetKey`,
  `createAssetBulkDownload` (`https://example.com/bulk-download.zip`) and the deprecated token call; anything
  else throws "Method is not stubbed".
- With `emitChosenEventsOnSubscribe: true`, subscribing to `assetsChosen` immediately receives
  `AssetDummy.with(123)` (`templateChosen` → `TemplateLegacyDummy.with(234)`, `linkChosen` → `https://example.com`).
  That is how "click browse → asset appears" tests work without a modal. Set it to `false` and use
  `emitAppBridgeBlockStubEvent(appBridge, 'assetsChosen', { assets })` for explicit control.
- `dispatch` and `state` are bare sinon stubs: assert commands with `appBridge.dispatch.calledWith(...)`
  (`sinon` is a root devDependency). `context('isEditing').subscribe` is a no-op, so edit mode cannot change
  mid-test; remount with a new stub instead.
- Because `privacySettings` default to `false`/`false`, tests for download or viewer buttons must set
  `security: Security.Custom` plus the block's switch in `blockSettings`, or pass `privacySettings`.
- Dummies: `AssetDummy`, `TemplateDummy`, `TemplateLegacyDummy`, `UserDummy`, `BulkDownloadDummy`.
- happy-dom does not compute Tailwind styles; `TODO(vitest-migration)` comments mark hover/opacity checks that
  were dropped when the suite moved off Cypress. Assert on class names or DOM presence instead.
- RTE content in view mode renders asynchronously; use `findByTestId('rte-content-html')` or `waitFor`.
- Useful test ids from shared components: `block-item-wrapper`, `block-item-wrapper-toolbar`,
  `block-inject-button`, `responsive-image`, `rte-content-html`.

## Storybook

`packages/storybook` renders every `src/*Block.stories.tsx` against the stub, with a toolbar for view/edit mode
and column width, and GitHub Pages previews per PR (`.github/workflows/storybook.yml`). `pnpm storybook` serves
it on port 6006.

```tsx
import { AssetFixture, type BlockStory, blockMeta } from '@frontify/guideline-blocks-storybook';
import definition from './index';

export default { title: 'Blocks/Audio', ...blockMeta(definition) }; // title must stay a literal
export const WithAudio: BlockStory = {
    args: { title },                                                      // args = block settings
    parameters: { appBridge: { blockAssets: { audio: [AssetFixture.audio()] } } },
};
```

`blockMeta` derives default args and controls from `settings.ts` (not from async `settings` functions);
`parameters.appBridge` are stub options (everything except `blockSettings`/`editorState`); use `AssetFixture`
(`image(n)`, `images(count)`, `audio()`, `svgIcon()`, …) rather than `AssetDummy` so assets load. The preview
defers chooser events until the matching `open…` command is dispatched, swaps dummy assets for real fixtures, and
runs `onChange` hooks like the sidebar does. A block needs `"@frontify/guideline-blocks-storybook": "workspace:*"`
in its devDependencies. Storybook shares one Tailwind build with no per-block scope, so it cannot reveal scoping
bugs, and a utility one block generates applies to all of them there.
