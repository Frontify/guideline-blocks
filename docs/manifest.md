# `manifest.json`

Reference for the block manifest and its `frontify-*` keywords. Rules are in [`../AGENTS.md`](../AGENTS.md).
The keyword semantics come
from the marketplace's server-side validator, which is not in this repo; `frontify-cli`'s `verifyManifest` calls it
through `POST /api/marketplace/app/manifest/validate`.

```json
{
    "appId": "clepuuziz00010iw1zvjzlvme",
    "settingsSchema": {
        "type": "object",
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "required": ["positioning", "security", "downloadable"],
        "additionalProperties": false,
        "properties": {
            "title": { "type": "string", "frontify-type": "fondueRte", "frontify-serializable": true,
                       "frontify-serialization-index": 1, "frontify-translatable": true,
                       "frontify-api-read": true, "frontify-api-write": true },
            "positioning": { "type": "string", "enum": ["Above", "Below"], "frontify-api-read": true, "frontify-api-write": true }
        }
    }
}
```

- `appId` is the 25-character Marketplace app id, assigned when the app is created on the Frontify instance. A
  package with a manifest and an `appId` is what the release CLI and the `verify-manifest` CI job treat as a
  releasable block; `packages/shared`, `packages/storybook` and `packages/release-cli` have none and never ship.
  Versions are not in the repo; the marketplace numbers each deploy.
- `settingsSchema` is plain JSON Schema plus `frontify-*` keywords. It lists every persisted key with
  `additionalProperties: false`, so `settings.ts`, `types.ts` and this schema must change together. Settings the
  block clears are written as `null`/`''`, so type them `['string', 'null']` or leave them optional.

  | Keyword                          | Type    | Meaning                                                                                   |
  | -------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
  | `frontify-api-read`              | boolean | Exposed in the public GraphQL API (`GuidelinePageBlock.settings`).                        |
  | `frontify-api-write`             | boolean | Writable through the API (`createGuidelinePageBlock` accepts only api-writable settings; `required` must be present). |
  | `frontify-translatable`          | boolean | Part of the page translation flow (human translation).                                    |
  | `frontify-machine-translatable`  | boolean | Eligible for machine translation. Requires `frontify-translatable: true` on the same node. |
  | `frontify-serializable`          | boolean | Included in the block's text content (search indexing and the GraphQL `content` field). The root must be serializable (bubbled up from any child) or the content is `null`. |
  | `frontify-serialization-index`   | integer | Order of serializable fields in that text.                                                |
  | `frontify-type`                  | string  | `fondueRte` (RichTextEditor JSON, validated server-side) or `htmlRte`, so the platform knows how to read the string. |

  `api-read`, `api-write`, `translatable`, `machine-translatable` and `serializable` bubble up: `true` on a
  nested property marks every ancestor that does not set the keyword itself (an explicit `false` stops it).
- Validation happens **server-side**: `pnpm verify-manifest` (needs `FRONTIFY_ACCESS_TOKEN` /
  `FRONTIFY_INSTANCE_URL`; CI has them), and `frontify-cli deploy` runs it before building. Unknown `frontify-*`
  keys and wrong value types are rejected, and the legacy top-level `i18nFields` / `searchFields` are not allowed
  next to a `settingsSchema`.
