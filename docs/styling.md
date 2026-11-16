# Styling and CSS scoping

How a block's CSS is built, scoped and themed. Rules are in [`../AGENTS.md`](../AGENTS.md). Source:
`postcss/scope.js`, `postcss/dedupe.js`, `packages/shared/src/components/StyleProvider`, the root
`tailwind.config.js`, and `../brand-sdk/packages/guideline-blocks-settings/tailwind.config.ts`.

**Build chain.** Each block's `postcss.config.js` runs tailwind → autoprefixer → `../../postcss/scope` (reads
`block-scope.json`) → `../../postcss/dedupe`. Its `tailwind.config.js` uses
`presets: [@frontify/guideline-blocks-settings/tailwind]` with `content: src + ../shared/src`. Because the block's
CSS lands in the host page, every block scopes its stylesheet to the class in `block-scope.json` and wraps its tree
in `<StyleProvider scope={…}>`.

- Tailwind preset from `@frontify/guideline-blocks-settings/tailwind`: **prefix `tw-`**, preflight off,
  `box-sizing: content-box` base, Fondue tokens, container queries (`tw-@container` on the block root, then
  `@sm:` 440px, `@md:` 740px, `@lg:` 1240px). The root `tailwind.config.js` adds blank-state colours and
  `inner-line` shadows for empty states. Use container variants, not viewport breakpoints: a block does not
  know how wide its column is.
- Fondue 14: components from `@frontify/fondue/components`, icons from `@frontify/fondue/icons`, RTE and the
  `merge` class helper from `@frontify/fondue/rte`, Tailwind preset from `@frontify/fondue/tokens/tailwind`.
  The subpaths are unchanged from 13.
- **`<StyleProvider scope={blockScope.scope}>` must be the root of every block.** It is Fondue's
  `ThemeProvider` with `className = scope` and imports `packages/shared/src/components/StyleProvider/styles.css`
  (guideline-blocks-settings styles, Fondue component/RTE/token CSS, and the Tailwind layers). Without the
  scope class on an ancestor, no `tw-` utility applies.
- `postcss/scope.js` rewrites every rule in the block's `style.css`: `:root` → `.<scope>` (CSS variables become
  block-local), selectors containing `tw-` → `.<scope> <selector>` (utilities beat host styles), class-less
  global selectors (`*`, `::before`, `input::placeholder`) → `:where(.<scope>) <selector>` (confined without
  extra specificity), and other class selectors stay untouched so Fondue's hashed classes keep working inside
  portalled overlays (flyouts, menus, dialogs mount on `body`). `postcss/dedupe.js` then drops duplicate rules
  (the shared CSS imports Fondue up to three times). Storybook uses the same chain minus the scope plugin, so
  it cannot reveal scoping bugs.
- Every stylesheet rule must survive that scoping: `tw-` classes and `:root` variables are rewritten, unscoped
  element selectors are confined, Fondue class selectors are left alone. Portalled UI lives outside the scope
  element; style it with Fondue components or class-based selectors, not with descendant selectors from the
  block root. The host additionally wraps the stylesheet in `@scope` ([host.md](host.md)); never rely on that
  to contain a selector you did not scope yourself.
- Theme typography and colours come from the guideline theme as `--f-theme-settings-*` variables; use
  `BlockStyles[TextStyles.p]` and friends instead of hard-coding fonts, and Fondue tokens
  (`--color-line-mid`, `tw-text-text-weak`, …) for chrome. guideline-blocks-settings no longer ships Fondue's
  deprecated `--text-color`/`--line-color`/`--box-neutral-color` variables; no block uses them. The shared
  `styles.css` still imports Fondue's `deprecatedBaseTokens.css` (present in 14) and can drop it.
- Images: `Asset.previewUrl`/`genericUrl` contain a `{width}` placeholder and accept `format`/`quality`
  params. `ResponsiveImage` + `useImageContainer()` (ResizeObserver, rounds widths up to the next 100px, requests
  up to 2× DPR) handle that; GIFs use `originUrl` to keep looping. Test id `responsive-image`.
- Text-like blocks keep a minimum height only in edit mode (`isEditing && 'tw-min-h-9'`), so an empty block
  takes no space for viewers.
- Lint: `tailwindcss/no-contradicting-classname` is an error; `tailwindcss/no-custom-classname` only checks
  `tw-` classes.
