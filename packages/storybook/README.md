# Guideline blocks Storybook

Previews of the guideline blocks rendered against the `@frontify/app-bridge/testing` stub, so they can be reviewed without a Frontify instance. Every PR publishes a preview to GitHub Pages (see `.github/workflows/storybook.yml`).

```sh
pnpm storybook        # from the repo root, http://localhost:6006
pnpm build-storybook  # static build into packages/storybook/storybook-static
```

## Adding a block

1. Add `"@frontify/guideline-blocks-storybook": "workspace:*"` to the block's `devDependencies`.
2. Create `src/<Name>Block.stories.tsx`. See `audio-block` and `callout-block` for examples.

- `blockMeta(definition)` takes the block's `defineBlock` export. Defaults from `settings.ts` become the initial args, and switches, inputs, dropdowns and segmented controls become controls grouped by sidebar section.
- Story `args` are block settings, which is also where rich-text values such as `title` or `textValue` go.
- `parameters.appBridge` is passed to the stub (`blockAssets`, `privacySettings`, `blockTemplates`, …). Use `AssetFixture` for assets that actually load.
- Settings changed inside the block, for example by typing in edit mode, are written back to the controls panel.

## What a preview can't show

- The guideline theme is a fixed stand-in (`.storybook/guideline-theme.css`), not a real brand's theme.
- CSS isn't scoped per block the way deploys are (`/postcss/scope.js`), so specificity can differ slightly.
- The asset chooser, uploads and templates come from the stub. Choosing an asset returns a placeholder whose URL doesn't load.
- Blocks with async `settings` don't get generated controls yet.
