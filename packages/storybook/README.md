# Guideline blocks Storybook

Previews of the guideline blocks rendered against the `@frontify/app-bridge/testing` stub, so they can be reviewed without a Frontify instance. Every PR publishes a preview to GitHub Pages (see `.github/workflows/storybook.yml`).

```sh
pnpm storybook        # from the repo root, http://localhost:6006
pnpm build-storybook  # static build into packages/storybook/storybook-static
```

## Adding a block

1. Add `"@frontify/guideline-blocks-storybook": "workspace:*"` to the block's `devDependencies`.
2. Create `src/<Name>Block.stories.tsx`. Every block has one to copy from.

- `blockMeta(definition)` takes the block's `defineBlock` export. Defaults from `settings.ts` become the initial args, and switches, inputs, dropdowns and segmented controls become controls grouped by sidebar section.
- Story `args` are block settings, which is also where rich-text values such as `title` or `textValue` go.
- `parameters.appBridge` is passed to the stub (`blockAssets`, `privacySettings`, `blockTemplates`, …). Use `AssetFixture` (`image(n)`, `images(count)`, `audio()`, `svgIcon()`, …) for assets that actually load.
- Settings changed inside the block, for example by typing in edit mode, are written back to the controls panel.
- Changing a control runs the setting's `onChange` hooks like the sidebar does (`appendUnit`, `presetCustomValue`, …).

## What a preview can't show

- The guideline theme is a fixed stand-in (`.storybook/guidelineTheme.ts`), not a real brand's theme. It's set from JS rather than CSS because the CSS minifier rewrites `rgba()` colours to hex, and blocks parse these values.
- CSS isn't scoped per block the way deploys are (`/postcss/scope.js`), and all blocks share one Tailwind build, so a utility generated for one block applies to all of them.
- The asset chooser, uploads and templates come from the stub. "Browse asset" picks a Lorem Picsum photo (or the sample audio for audio choosers), which needs network access; uploads don't produce a usable asset.
- UI Pattern (CodeSandbox) and Sketchfab need network access to render their embeds.
- Blocks with async `settings` don't get generated controls yet.
