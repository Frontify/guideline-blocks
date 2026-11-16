# App Bridge v4, block side

Reference for `@frontify/app-bridge` 4.0.0-alpha.83 as a block sees it. Rules and conventions are in
[`../AGENTS.md`](../AGENTS.md). Source: `../brand-sdk/packages/app-bridge/src` (`AppBridgeBlock.ts`, `react/`,
`tests/AppBridgeBlockStub.ts`, `CHANGELOG.md`) or the installed
`packages/<block>/node_modules/@frontify/app-bridge/dist/index.d.ts`.

`AppBridgeBlock` is an interface. The host implements it; the block only ever receives an instance via
`BlockProps.appBridge`. It has five primitives plus a handful of direct methods.

## The five primitives

| Primitive                           | Purpose                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `api({ name, payload })`            | Request/response call into Frontify. Returns a promise of the method's response.                                    |
| `dispatch({ name, payload })`       | Fire a command (open a chooser, download, track). Resolves when the host accepted it; results arrive as events.     |
| `subscribe(eventName, cb)`          | Listen to an event (`assetsChosen`, `linkChosen`, `templateChosen`, `Context.<key>`, `State.<key>`). Returns unsubscribe. |
| `context()` / `context(key)`        | Read host-owned, read-only data (`get()`), and `subscribe()` to changes of one key or the whole object.             |
| `state()` / `state(key)`            | A get/set/subscribe scratch store (`settings`, `assets`, `templates`). Nothing in this repo uses it; the test stub does not implement it. |

Names are validated by TypeScript template-literal types: API methods start with `get|create|update|delete|add|remove|set`,
commands with `open|close|download|track`, events end in `Chosen` or start with `State.`/`Context.`. Each
command and API method also has a creator function with the same name, so both forms type-check:

```ts
import { downloadAsset, openAssetChooser, createAssets } from '@frontify/app-bridge';

await appBridge.dispatch(downloadAsset(asset));
await appBridge.dispatch({ name: 'openAssetChooser', payload: { multiSelection: false } });
const { assets, failures } = await appBridge.api(createAssets({ files: [file] }));
```

## Block context

`BlockContext` is what the host knows about this block instance. All keys are readable with
`appBridge.context('<key>').get()`; the ones marked ✓ change at runtime and can be subscribed to.

| Key                   | Type                          | Live | Notes                                                                                  |
| --------------------- | ----------------------------- | ---- | -------------------------------------------------------------------------------------- |
| `blockId`             | `number`                      |      | The document block id (the block's DOM element carries `data-block="<id>"`).            |
| `sectionId`           | `number?`                     |      |                                                                                        |
| `portalId`            | `number`                      |      |                                                                                        |
| `projectId`           | `number`                      |      | The guideline's project. Replaces the removed `getProjectId()`.                        |
| `translationLanguage` | `string`                      |      | Locale of a translated page, `''` on the source language. Replaces `getTranslationLanguage()`. |
| `isAuthenticated`     | `boolean`                     |      | Whether a logged-in user views the page (template-block hides itself for anonymous viewers). |
| `isNewlyInserted`     | `boolean`                     |      | `true` right after the editor inserted the block.                                      |
| `isEditing`           | `boolean`                     | ✓    | Edit mode and not a referenced block. `useEditorState`.                                 |
| `settings`            | `Record<string, unknown>`     | ✓    | The persisted settings. `useBlockSettings`.                                             |
| `assets`              | `Record<string, Asset[]>?`    | ✓    | Block assets by key. `useBlockAssets`.                                                  |
| `templates`           | `Record<string, Template[]>?` | ✓    | Block templates by key, loaded lazily by the host on first access. `useBlockTemplates`. |
| `privacySettings`     | `{ assetViewerEnabled, assetDownloadEnabled }` | ✓ | The guideline-wide defaults. `usePrivacySettings` / `useBlockPrivacySettings`. |

## Commands a block may dispatch (`BlockCommand`)

| Command                                    | Payload                                                     | Result                                                                 |
| ------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| `openAssetChooser` / `closeAssetChooser`   | `AssetChooserOptions?` (`projectTypes`, `objectTypes`, `multiSelection`, `extensions`, `urlContains`, `selectedValueId(s)`) | `assetsChosen` event `{ assets: Asset[] }`. The host passes `selectedValueId(s)` to the picker as an inverted `id` filter (the current selection is filtered out). Closing the modal drops every `assetsChosen` subscription. |
| `openAssetViewer`                          | `{ token, isDownloadable? }` (`asset.token`)                | Opens the asset detail viewer; tracks the view.                        |
| `openTemplateChooser` / `closeTemplateChooser` | —                                                        | `templateChosen` event `{ template: TemplateLegacy }`.                 |
| `openLinkChooser` / `closeLinkChooser`     | `{ selectedUrl? }`                                          | `linkChosen` event `{ url }`.                                          |
| `openColorChooser` / `closeColorChooser`   | `{ element, color?, onColorSelect }` / `{ element }`        | Host renders its palette + picker **into `element`**; `onColorSelect` fires on every pick. Use the `ColorChooser` component from guideline-blocks-settings instead of calling this yourself. |
| `downloadAsset`                            | `Asset`                                                     | Host fetches `originUrl`, triggers a download, records analytics.      |
| `openNewPublication`                       | `{ template }`                                              | Opens the publishing flow (template-block).                            |
| `openPlatformAppDirect`                    | `{ marketplaceAppId }`                                      |                                                                        |
| `openBrandChecker`                         | see `OpenBrandCheckerPayload`                               |                                                                        |
| `trackEvent`                               | `{ action: 'button:clicked', payload }`                     | Analytics.                                                             |

## API methods a block may call (`BlockApiMethod`)

| Method                          | Payload → response                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `createAssets`                  | `{ files, signal?, onProgress?, onFileProgress?, onFileDone?, onFileFail? }` → `{ assets, failures }`. The host uploads each file, creates an asset in the guideline's project, and returns results in file order. Blocks never upload themselves; `useAssetUpload` wraps this. |
| `setAssetIdsByBlockAssetKey`    | `{ key, assetIds }` → `void`. Replaces the whole list for a key. The host waits until every asset in that key has finished processing before `context('assets')` changes. |
| `createAssetBulkDownload`       | `{ blockAssets?, signal? }` → `{ downloadUrl }`. Resolves once the archive is ready (the host polls); omit `blockAssets` for all of the block's assets; abort with `signal`. |
| `getCurrentUser`                | `void` → `{ id, name?, avatar?, email }`.                                                                   |
| `getAssetBulkDownloadToken`     | deprecated, removed in 5.0; use `createAssetBulkDownload`.                                                  |

## Direct methods

Still current: `getBlockAssets()`, `getAssetById(id)`, `addAssetIdsToBlockAssetKey(key, ids)`,
`deleteAssetIdsFromBlockAssetKey(key, ids)`, `addTemplateIdsToBlockTemplateKey(key, ids)`,
`deleteTemplateIdsFromBlockTemplateKey(key, ids)`, `getTemplateById(id)`, `updateBlockSettings(partial)`,
`getCurrentLoggedUser()`.

Deprecated (`@deprecated`, removed in app-bridge 5): `getBlockSettings()` → `context('settings')`,
`getEditorState()` → `context('isEditing')`, `getPrivacySettings()` → `context('privacySettings')`,
`getBlockTemplates()` → `context('templates')`, `getBulkDownloadByToken/BySignature()` → `createAssetBulkDownload`.

Gone in 4.0 (do not reintroduce): `getProjectId`, `getTranslationLanguage`, `getColorPalettesWithColors` /
`useColorPalettes` (use the host color chooser), `HttpClient` (blocks must not call Frontify endpoints),
`useFileUpload`, `useReadyForPrint`, `useAfterInsertion`, `compareObjects`, the `window.emitter` events and the
`window` globals app-bridge 3 read. The `glyphs-block` still `fetch`es `/api/project-font-family` for its font
dropdown; that is known debt: it should move to a host-provided API method once brand-sdk offers one (ask for it
there), and no new block may fetch.

## `updateBlockSettings` semantics

- Accepts a **partial** object. The host deep-merges it into the stored settings: nested objects merge key by
  key, arrays and primitives are replaced. There is no way to delete a key; write `null`/`''` instead and treat
  that as empty in the block and in the manifest (`type: ['string', 'null']` or optional).
- **Throws outside edit mode** ("Block settings can only be updated in edit mode"). `useBlockSettings` catches
  and logs it, so a stray write in view mode is silent. Gate writes on `isEditing`.
- On a translated page the host saves to the translation, so only `showForTranslations`/translatable settings
  are affected.
- A failed save marks the block as failed in the host UI; a later successful save clears it.

## React hooks

All hooks take `appBridge` as first argument and re-render from `context(...)` subscriptions.

| Hook                                  | Returns / behaviour                                                                                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useBlockSettings<T>(appBridge)`      | `[settings, setSettings]`; `setSettings(partial)` is async and never throws. Backed by `useSyncExternalStore`.                                            |
| `useEditorState(appBridge)`           | `boolean`.                                                                                                                                                |
| `useBlockAssets(appBridge)`           | `{ blockAssets, addAssetIdsToKey, deleteAssetIdsFromKey, updateAssetIdsFromKey }`. `updateAssetIdsFromKey` = `setAssetIdsByBlockAssetKey` (whole list). Assets appear in `blockAssets` only once processing finished, so keep a local loading flag between "chosen/uploaded" and "appeared". |
| `useAssetChooser(appBridge)`          | `{ openAssetChooser(callback, options), closeAssetChooser() }`. Subscribes to `assetsChosen` per open; call `closeAssetChooser()` in the callback for single selection. |
| `useAssetUpload(appBridge, callbacks?)` | `[uploadFiles(FileList \| File), { results, doneAll }]`. Uploads via `createAssets`; aborts on unmount. `results` is only populated when `doneAll` flips to `true`, so consume it in an effect keyed on `doneAll` (every block here does). Callbacks receive the `createAssets` payloads: `onUploadProgress({ file, index, loaded, total })`, `onUploadProgressAll({ loaded, total })`, `onUploadDone({ file, index, asset })`, `onUploadDoneAll(assets)`, `onUploadAssetFail({ file, index, message })`, `onUploadFail()`. |
| `useFileInput({ accept?, multiple? })` | `[openFileDialog, { selectedFiles }]`. Creates a hidden `<input type=file>`; watch `selectedFiles` in an effect and hand it to `uploadFiles`.            |
| `useAssetViewer(appBridge)`           | `{ open(asset, isDownloadable?) }`.                                                                                                                       |
| `useAssetBulkDownload(appBridge)`     | `{ generateBulkDownload(blockAssets?), status: Init \| Started \| Pending \| Ready \| Error, downloadUrl }`.                                               |
| `useBlockTemplates(appBridge)`        | `{ blockTemplates, addTemplateIdsToKey, deleteTemplateIdsFromKey, updateTemplateIdsFromKey, error }`.                                                     |
| `useTemplateChooser(appBridge)`       | `{ openTemplateChooser(callback), closeTemplateChooser() }` (`TemplateLegacy`).                                                                           |
| `useLinkChooser(appBridge)`           | `{ openLinkChooser(callback, { selectedUrl }), closeLinkChooser() }`.                                                                                     |
| `usePrivacySettings(appBridge)`       | Guideline-wide `{ assetViewerEnabled, assetDownloadEnabled }`. Prefer `useBlockPrivacySettings` ([settings.md](settings.md), Security).                   |

Hooks keep their `subscribe` callbacks stable with `useCallback` because `context()` is typed as returning a
new handle per call.

## Asset flow, end to end

Choosing or uploading an asset (audio, image, dos-donts blocks): open the chooser or file dialog → set a local
`isLoading` → `updateAssetIdsFromKey(KEY, [asset.id])` (or `uploadFiles` then wait for `doneAll`) → derive default
text from the asset on first insert (`convertToRteValue(TextStyles.imageTitle, asset.title)`) and re-key the
editor → clear `isLoading` once the awaited update resolves. Restrict pickers with
`FileExtensionSets.<Audio|Images|Documents|Videos|Templates>` and `AssetChooserObjectType`, and the file dialog
with `getMimeType(extensions)`.

Downloads: show `DownloadButton` only when `assetDownloadEnabled` and dispatch `downloadAsset(asset)`. Bulk
downloads go through `useAssetBulkDownload` and open the `downloadUrl` when `status === Ready`.
