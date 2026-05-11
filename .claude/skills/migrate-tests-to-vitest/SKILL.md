---
name: migrate-tests-to-vitest
description: Use when migrating Cypress component tests (`.spec.ct.{ts,tsx}`) to Vitest in this monorepo. Triggered by "migrate X to vitest", "convert .ct tests", "drop cypress for <package>", or follow-up after a previous migration.
---

# Migrate Cypress component tests to Vitest

This monorepo is incrementally moving from Cypress component tests to Vitest + happy-dom. Each migration converts one package's `.spec.ct.{ts,tsx}` files into Vitest specs, deletes the originals, removes Cypress from the package's `devDependencies`, and adjusts `tsconfig.json`. The repo keeps Cypress installed at the root until the **last** package migrates.

The worked precedent: `packages/image-block/src/ImageBlock.spec.tsx` and `packages/image-block/tsconfig.json`.

## Decisions already made — don't re-litigate

- **One PR per package.** If the user doesn't say which package, ask. Don't bundle.
- **Tests that don't translate cleanly:** rewrite where reasonable; otherwise drop with `// TODO(vitest-migration): <reason>`. Don't fake coverage by asserting on something the test wasn't actually checking. If the lost coverage is on real logic (e.g. a hook), suggest a follow-up unit test for that logic rather than reaching for happy-dom workarounds.
- **Cypress root install stays** until the last package migrates — `pnpm test:components` at the repo root must keep working for unmigrated packages.
- **Test-id style:** flat top-level `const FOO_TEST_ID = 'foo';` declarations, one per id, used directly. No object wrappers, no enums.
- **Test naming:** every `it` description must start with `should` or `should not` (per the org testing guide). Rename any migrated description that doesn't comply — including pre-existing ones in the file you're touching.

## Ask the user only when

- The spec uses drag-drop or real-events interactions (`@4tw/cypress-drag-drop`, `cy.realPress/realClick/realHover`) — confirm "drop with TODO" vs "find an equivalent."
- The existing `.spec.tsx` and `.spec.ct.tsx` have semantically overlapping tests — confirm which to keep.
- The package has many `.spec.ct.*` files and a single PR would be unwieldy — confirm splitting.

Otherwise, proceed.

## Finding work

List every remaining `.spec.ct.*` across the monorepo:

```sh
find packages examples -name '*.spec.ct.*' -not -path '*/node_modules/*' | sort
```

For a single package: `find packages/<pkg>/src -name '*.spec.ct.*'`.

## Verification gate (the contract)

A migration is complete only when **all three** pass cleanly for the package:

```sh
npx vitest run packages/<pkg>                # all tests green
cd packages/<pkg> && pnpm typecheck          # exit 0
cd packages/<pkg> && pnpm lint               # exit 0 (warnings unrelated to your changes are fine)
```

If any step fails, the migration is not done. `pnpm lint:fix` autofixes mechanical issues (import order, type-import style). Pre-existing warnings in the source files (e.g. `@eslint-react/set-state-in-effect`) are not your problem — leave them.

## Process

1. **Read the source files the spec touches.** Identify:
    - `data-test-id` strings the spec selects on (centralize into constants in step 3)
    - hooks that depend on layout (`useImageContainer`, `useResizeObserver`, etc.) — these need mocking, see "Viewport / layout"
    - whether styling comes from inline `style={...}` (assertable) or Tailwind classes (not assertable in happy-dom)
    - whether `RichTextEditor` or other async renderers render the assertions' target text

2. **Pre-flight infra check** (skip if you've done it this session): `vite.config.ts` has `test: { environment: 'happy-dom', setupFiles: ['vitest.setup.ts'], include: ['packages/**/*.{test,spec}.{ts,tsx}'] }`, and `vitest.setup.ts` imports `@testing-library/jest-dom/vitest` with `testIdAttribute: 'data-test-id'`. If either is missing, stop and surface to the user.

3. **Convert the tests** using the mapping table. Write into the existing `.spec.tsx` (don't create a parallel file). If there's no `.spec.tsx`, create one. Extract test-ids into flat consts at the top. Rename every `it` to start with `should` / `should not` — see "Test naming convention."

4. **Iterate until the verification gate passes.** Run vitest, fix failures, run typecheck, fix, run lint, fix. If lint flags import order or type-import style, `pnpm lint:fix` clears most.

5. **Delete the cypress spec.** `rm packages/<pkg>/src/<spec>.spec.ct.tsx`.

6. **Drop Cypress from the package.** Remove `cypress`, `cypress-real-events`, `@4tw/cypress-drag-drop` from `packages/<pkg>/package.json` `devDependencies` (only the ones present). Then `pnpm i` at the repo root. Peer-dep warnings about eslint version mismatches in other packages are pre-existing — ignore them. Do **not** touch the root `package.json`'s `cypress` entry.

7. **Re-run the verification gate** after `pnpm i`.

8. **Update tsconfig** (see "Tsconfig changes").

9. **Report** what migrated, what dropped (with reason), what tsconfig/dep changes were made.

## Mapping table

| Cypress                                    | Vitest / RTL                                                                            |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `mount(<X />)` from `cypress/react`        | `render(<X />)` from `@testing-library/react`                                           |
| `cy.get('[data-test-id="X"]')`             | `screen.getByTestId(X_TEST_ID)`                                                         |
| `.should('exist')`                         | `expect(...).toBeInTheDocument()`                                                       |
| `.should('not.exist')`                     | `expect(screen.queryByTestId(...)).not.toBeInTheDocument()`                             |
| `.should('have.attr', 'src', '...')`       | `expect(el).toHaveAttribute('src', '...')`                                              |
| `.should('have.css', 'X', 'Y')`            | `expect(el).toHaveStyle({ X: 'Y' })` — see CSS caveats                                  |
| `.should('not.have.css', 'X', 'Y')`        | `expect(el).not.toHaveStyle({ X: 'Y' })`                                                |
| `.should('have.class', 'foo bar')`         | `expect(el).toHaveClass(...'foo bar'.split(' '))` (spread for multi-class)              |
| `.should('contain.text', 'X')`             | `expect(el).toHaveTextContent('X')` — wrap in `waitFor` for RTE                         |
| `cy.wrap(stub).should('have.been.called')` | `expect(stub.called).toBe(true)` inside `waitFor` (sinon stubs)                         |
| `cy.viewport(W, H)`                        | Mock the container/resize hook — see "Viewport / layout"                                |
| `cy.intercept(...)`                        | `msw` handlers (already a dep) or `vi.mock`                                             |
| `.focus().click()`                         | `await userEvent.click(el)` — drop the focus step, happy-dom doesn't gate on visibility |
| `cy.realPress/realClick/realHover`         | `userEvent` for click/keyboard; `fireEvent` + class assertions for `:hover` state       |
| `cy.fixture('foo.json')`                   | Import the JSON directly                                                                |
| `cy.viewport(...)` for media queries       | Not testable in happy-dom — assert on the underlying state/prop instead                 |

## CSS caveats in happy-dom

Happy-dom returns **inline styles only**. Tailwind-derived CSS won't be readable via `getComputedStyle`. Therefore:

- Only assert styles that come from inline `style={...}` props in the source.
- Color normalization: `{ r:0, g:0, b:255 }` → `rgb(0, 0, 255)` — not `rgba(..., 1)`. Match the helper's output, not Cypress's browser-computed string.
- Keyword normalization: `objectPosition: 'center center'` stays `center center`. Cypress returned `50% 50%` because browsers compute keywords to percentages.
- `border` shorthand stays as set: `'1px solid rgb(0, 0, 255)'`, not the browser-expanded longhand.
- If unsure of the actual format, write a one-off debug spec that logs `el.style.cssText` and the specific property (`el.style.border`, `el.style.objectPosition`, etc.), run it, then delete it. Don't guess — Cypress and happy-dom format styles differently and you'll burn iterations on string mismatches.

## Viewport / layout

`cy.viewport()`-driven tests that exercise `ResizeObserver`-backed hooks (e.g. `useImageContainer`) cannot run under happy-dom — there's no layout engine. Mock the hook:

```ts
import type * as GuidelineBlocksShared from '@frontify/guideline-blocks-shared';

let mockContainerWidth: number | undefined;

vi.mock('@frontify/guideline-blocks-shared', async () => {
    const actual = await vi.importActual<typeof GuidelineBlocksShared>('@frontify/guideline-blocks-shared');
    return {
        ...actual,
        useImageContainer: () => ({ containerWidth: mockContainerWidth, setContainerRef: () => {} }),
    };
});
```

Each test sets `mockContainerWidth = N;` before rendering. Tests that previously exercised the hook's own internal logic (e.g. "+100 when border present") collapse — that's the hook's responsibility, not the block's. Flag it in the report; suggest a follow-up `useImageContainer.spec.ts` instead of fudging the integration test.

**Why the top-level `import type`:** the inline form `vi.importActual<typeof import('@frontify/...')>(...)` trips `@typescript-eslint/consistent-type-imports` lint. Always use a top-level `import type * as Foo` and reference `typeof Foo` — never inline `typeof import('...')`.

## Async rendering (RichTextEditor)

`RichTextEditor` populates serialized text after a microtask. Synchronous `expect(el).toHaveTextContent('X')` will fail. Wrap in `waitFor`:

```ts
await waitFor(() => {
    expect(screen.getByTestId(CAPTION_TEST_ID)).toHaveTextContent('Test Name');
});
```

Same pattern for any other component that hydrates on a tick.

## Test naming convention

Org rule (from the testing guide): every `it` description starts with `should` or `should not`, followed by a concise statement of the expected behavior. Cypress specs in this repo were inconsistent — assume they violate the rule and fix as you migrate.

- `it('renders an image block')` → `it('should render an image block')`
- `it('renders the title if provided')` → `it('should render the title if it is provided')`
- Negation: prefer `should not` over `should ... not` — `it('should not render the placeholder in view mode')`.

Apply this to **every** description in the file you touch, including any pre-existing `.spec.tsx` tests that predate the migration. The renames are cheap and keep the file uniform.

## Test-id constants

At the top of the spec, after imports, declare one const per id:

```ts
const IMAGE_BLOCK_TEST_ID = 'image-block';
const DEFAULT_WRAPPER_TEST_ID = 'image-block-default-wrapper';
```

Use them directly at call sites: `screen.getByTestId(IMAGE_BLOCK_TEST_ID)`. No object wrappers.

**Footgun:** do **not** extract by running `Edit replace_all` on the raw string literals — the replacement will hit the constant declaration too and produce `FOO_TEST_ID = FOO_TEST_ID` self-references. Either write the constants up front and only inline-replace at call sites, or use `Edit` calls with enough surrounding context to be unique to each call site.

## Render helper

If the spec mounts the same component many times with varying props, add a small helper to cut boilerplate:

```ts
const renderXBlock = (appBridgeProps: Parameters<typeof withAppBridgeBlockStubs>[1] = {}) => {
    const [WithStubs, appBridge] = withAppBridgeBlockStubs(XBlock, appBridgeProps);
    const utils = render(<WithStubs />);
    return { ...utils, appBridge };
};
```

This is specific to Frontify blocks that use `withAppBridgeBlockStubs`. For other component shapes, adapt accordingly.

## Tsconfig changes

After the cypress spec is deleted and the package's dep is removed:

1. Add `"@testing-library/jest-dom"` to `compilerOptions.types`.
2. Drop `"cypress"`, `"cypress-real-events"`, `"@4tw/cypress-drag-drop"` from `types`.
3. If `include` pulls in another package's source (commonly `"../shared/src/**/*"`) and **that** package still has `.spec.ct.*` files, `tsc` will try to typecheck them and fail without Cypress types. Add explicit excludes:

```jsonc
"exclude": [
    "node_modules",
    "dist",
    "../shared/src/**/*.spec.ct.ts",
    "../shared/src/**/*.spec.ct.tsx"
]
```

`tsc`'s `exclude` does not expand braces — list `.ts` and `.tsx` separately.

The cross-package `include` is a separate refactor (project references). Don't touch it during a migration.
