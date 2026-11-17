# Settings sidebar and `@frontify/guideline-blocks-settings`

Reference for `@frontify/guideline-blocks-settings` 4.0.0-alpha.18 and the `@frontify/sidebar-settings` 0.12 it
re-exports. Since alpha.18 `@frontify/fondue` is a peer dependency, so every block pins Fondue itself and only one
copy is installed. Rules and conventions are in [`../AGENTS.md`](../AGENTS.md). Source:
`../brand-sdk/packages/guideline-blocks-settings/src` and `../brand-sdk/packages/sidebar-settings/src`, or the
installed `packages/<block>/node_modules/@frontify/guideline-blocks-settings/dist/index.d.ts`.

## `defineBlock` and `defineSettings`

```ts
export default defineBlock({
    block: AudioBlock,            // FC<BlockProps>
    settings,                     // defineSettings({...}) | () => structure | () => Promise<structure>
    onBlockCreated?: ({ appBridge }) => void | Promise<void>,   // host awaits it before the block is added
    onBlockDeleted?: ({ appBridge }) => void | Promise<void>,   // host awaits it before deletion
});
```

Both are identity functions that exist for typing. `settings` is an object keyed by sidebar section:
`main` (rendered above the accordion, no header), `basics`, `layout`, `style`, `security`, plus any custom key
(label = Start Case of the key). `targets` is rendered by the host, not by blocks. Sections appear in object
order. A function or async function is allowed and is resolved once per sidebar open (Storybook cannot derive
controls from async settings).

`@frontify/sidebar-settings` 0.12 also defines an array form (`SettingsSection[]` with `MainSection` /
`LabeledSection`), and the host accepts both. `defineSettings` in guideline-blocks-settings still types the
record form; use the record form.

## Setting block types

Every setting extends `BaseBlock`: `id` (the persisted key), `label`, `info` (tooltip), `defaultValue`,
`showForTranslations` (editable on translated pages), `show(bundle)`, `onChange(bundle)`. `label`, `info` and
`choices` may be values, functions of the bundle, or async functions of the bundle.

| `type`               | Value                                             | Extras                                                                                      |
| -------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `switch`             | `boolean`                                         | `switchLabel`, `on: SettingBlock[]`, `off: SettingBlock[]` (nested settings shown per state) |
| `segmentedControls`  | `string \| number`                                | `choices: [{ value, label?, icon? }]`, `helperText`. `slider` is a deprecated alias.        |
| `dropdown`           | `string \| number`                                | `choices`, `clearable`, `disabled` (value or `(bundle) => boolean`), `placeholder`          |
| `input`              | `string`                                          | `inputType`, `placeholder`, `clearable`, `icon`, `rules: Rule[]`                            |
| `textarea`           | `string`                                          | `placeholder`, `rules`                                                                      |
| `colorInput`         | `{ red, green, blue, alpha?, name? }`             | `clearable`                                                                                 |
| `assetInput`         | asset id(s); stored as block assets under `id`    | `multiSelection`, `projectTypes`, `objectTypes`, `extensions`, `mode`, `allowDelete`, `size`, `hideSize`, `hideExtension` |
| `templateInput`      | `number`                                          |                                                                                             |
| `link`               | `{ link: { link } \| null, openInNewTab }`        | `clearable`, `openInNewTab`, `hideInternalLinkButton`. `linkChooser` is deprecated.         |
| `checklist`          | `string[] \| null`                                | `choices: Checkbox[]`, `columns`, `showClearAndSelectAllButtons`                            |
| `multiInput`         | —                                                 | `blocks` of `input`/`colorInput`/`dropdown`, `layout: 'columns' \| 'spider'`, `lastItemFullWidth` |
| `sectionHeading`     | `boolean` (when `hasSwitch`)                      | `blocks`, `hasSwitch`                                                                       |
| `notification`       | —                                                 | `title`, `text`, `footer: createFooter({ label: 'Change global settings [here].', replace: { here: { event: 'general-settings.open' } } })`, `styles` |
| `fontInput`          | `FontValue`                                       | theme-level typography; rarely used in blocks                                               |
| dynamic              | array of the above                                | add `dynamic: { addButtonLabel }` to an `input`/`colorInput`/`dropdown` for a repeatable list |

An `assetInput` setting stores its chosen asset under the block-assets key equal to the setting id, so the
sidebar's asset input and the block's own chooser write the same slot. That is why setting ids that double as
asset keys are exported constants (`AUDIO_ID = 'audio'`) imported by the component, the spec and the story.

## The bundle, `onChange`, rules

`show`, `onChange`, `disabled` and dynamic `choices` receive a `Bundle`:

```ts
type Bundle = {
    getBlock: (id: string) => { value?: unknown } | null;   // read another setting's current value
    setBlockValue: (id: string, value: unknown) => void;    // write another setting (runs in the sidebar only)
    getAppBridge: () => AppBridgeBlock;                     // e.g. appBridge.context('projectId').get()
};
```

Common helpers from `@frontify/sidebar-settings` (re-exported):

- `appendUnit(bundle, id, unit = 'px')` in `onChange` of a numeric input: turns `20` into `20px`.
- `presetCustomValue(bundle, choiceId, customId, map)` in `onChange` of a "Custom" switch: pre-fills the custom
  input with the value of the currently selected preset.
- Validation rules for `input`/`textarea`: `numericalOrPixelRule`, `pixelRule`, `numericalOrPercentRule`,
  `minimumNumericalOrPixelRule(n)`, `maximumNumericalOrPixelOrAutoRule(n)`, `betweenPixelRule(a, b)`, `urlRule`,
  … (`Rule<string> = { errorMessage, validate }`).

The Storybook preview runs `onChange` hooks the same way the sidebar does, so a control change produces the
same derived writes.

## Ready-made setting groups

`getBorderSettings({ id?, defaultValue?, defaultColor?, switchLabel? })`, `getBorderRadiusSettings({ id?, radiusStyleMap? })`,
`getBorderRadiusExtendedSettings`, `getPaddingSettings` / `getPaddingExtendedSettings`, `getMarginSettings` /
`getMarginExtendedSettings`, `getGutterSettings({ id, dependentSettingId, spacingChoiceId, spacingCustomId, defaultValueChoices })`,
`getBackgroundSettings`. They generate switches with nested `on`/`off` blocks and well-known ids; an `id` option
becomes a suffix (`hasBorder_blocks`, `radiusChoice_cornerRadius`, `radiusValue_cornerRadius`). The matching
enums and maps (`BorderStyle`/`borderStyleMap`, `Radius`/`radiusStyleMap`, `Padding`/`paddingStyleMap`,
`Margin`/`marginStyleMap`, `GutterSpacing`/`gutterSpacingStyleMap`) and the style utilities
(`getBorderStyles`, `getRadiusStyles`, `getBackgroundColorStyles`) turn those settings into inline CSS.

## Security / privacy

Blocks that show downloadable or viewable assets offer the standard "Security" section:

```ts
security: [...getSecurityGlobalControlSetting(), getSecurityAssetViewerSetting(), getSecurityDownloadableSetting()]
```

That writes `security: 'Global' | 'Custom'`, `assetViewerEnabled`, `downloadable`. In the component:

```ts
const { assetViewerEnabled, assetDownloadEnabled } = useBlockPrivacySettings(appBridge, {
    assetViewerId: 'assetViewerEnabled',   // omit the ones the block has no switch for
    downloadableId: 'downloadable',
});
```

It returns the guideline's global privacy settings unless the block is set to `Custom`, in which case the
block's own switches win (a never-touched switch resolves to its `defaultValue`). The older `isDownloadable()`
helper does the same by hand; prefer the hook. `manifest.json` lists `security` as required.

## Components

- **`RichTextEditor`** (`{ isEditing, value, placeholder, plugins, columns, gap, showSerializedText, onTextChange }`).
  `value` is a JSON string of editor nodes, not HTML. In view mode it renders static `SerializedText`
  (`data-test-id="rte-content-html"`); in edit mode the real editor mounts only once it has scrolled into
  view. `onTextChange` only fires for changed values, so handlers can write straight to settings. Build
  `plugins` once with `useMemo` (`LinkPlugin`/`ButtonPlugin` need `appBridge`) and keep handlers in
  `useCallback`; re-creating them re-mounts the editor. To push a value change into a mounted editor (e.g. a
  title derived from a chosen asset), change its `key` (`titleKey` pattern). Plugins and props are typed
  against Fondue 14's `@frontify/fondue/rte`; with Fondue as a peer dependency there is one copy, so a block's own
  `PluginComposer` type-checks against them. Helpers: `convertToRteValue(textStyle, text, align?)`, `hasRichTextValue(value)`, `TextStyles` enum,
  `AllTextStylePlugins`, `AllTextStyles`, `defaultPluginsWithLinkChooser`, `BlockStyles` (inline styles bound to
  the guideline theme's `--f-theme-settings-*` variables, including `buttonPrimary`/`buttonSecondary`/`buttonTertiary` with `hover`).
- **`BlockItemWrapper`** draws the hover outline and the floating toolbar in edit mode. `toolbarItems` is an
  array of `{ type: 'dragHandle' | 'button' | 'flyout' | 'menu', … }` (undefined entries are skipped);
  `shouldHideWrapper` renders children only (use in view mode); `showAttachments` needs an attachments
  provider; `useMultiFlyoutState(flyoutId)` controls flyouts. Test ids `block-item-wrapper`, `block-item-wrapper-toolbar`.
- **`BlockInjectButton`** is the empty-state "Upload or browse" tile with drag-and-drop (`onDrop`,
  `onUploadClick`, `onAssetChooseClick`, `validFileType`, `withMenu`, `fillParentContainer`). Test id `block-inject-button`.
- **`Attachments`** + **`useAttachmentsContext()`**: a flyout listing extra downloadable assets stored under a
  second asset key (`ATTACHMENTS_ASSET_ID = 'attachments'`). Provide it with `AttachmentsProvider` (creates its
  own `useBlockAssets`), `AttachmentOperationsProvider` (reuses the block's existing `useBlockAssets` bundle; the
  pattern in audio/image blocks), or `withAttachmentsProvider(Component, key)`.
- **`ColorChooser`** `{ appBridge, color, onColorSelect }` renders the host's chooser in place; wrap it in your
  own flyout and handle save/cancel yourself (gradient-block).
- **`LinkInput`** for URL fields with the internal link chooser.

## Utilities

`joinClassNames([...])`, color conversions (`toRgbaString`, `toHexString`, `toHex8String`, `toColorObject`,
`setAlpha`), `addHttps`. `isDark`, `getReadableColor` and `toShortRgba` no longer exist; use `@ctrl/tinycolor`
on a `toRgbaString(color)` string instead.
