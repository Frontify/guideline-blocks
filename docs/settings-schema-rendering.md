# Settings schema keywords for rendering

The platform will render a block's content as Markdown for search, the Brand Assistant, the public
API and the Frontify MCP server. A block's `settingsSchema` already says which settings are content
and in what order (`frontify-serializable`, `frontify-serialization-index`). Two more keywords say
what that content means, so a block renders with its structure instead of as one run of text.

| Keyword | On | Value | Rendering |
| --- | --- | --- | --- |
| `frontify-role` | a text field | `title` | A heading for the block, a bold lead inside a list item. |
| `frontify-role` | a text field | `attribution` | An attribution line after the body, for example a quote's author. |
| `frontify-kinds` | an `enum` field of a list item | `{ "<enum value>": "<kind>" }` | The field tells the items of the list apart. Items are grouped by kind, in the order of the map, under a label that the platform provides. |

## Type and role

`frontify-type` and `frontify-role` answer different questions, and a field can carry both.

| | `frontify-type` | `frontify-role` |
| --- | --- | --- |
| Says | how the stored value is encoded | what the field is for in the block |
| Read by | saving, which validates the value, and every reader that has to decode it | rendering only |
| Values | `fondueRte` | `title`, `attribution` |

The Image block's `name` carries both: its value is a Fondue rich text document, and it is the title
of the block. A role never changes how a value is stored or validated.

## Kinds

A kind is a meaning that the platform knows, not a word. The platform owns the words and renders
them in the language of the guideline, so a manifest never carries a label.

| Kind | Meaning |
| --- | --- |
| `do` | The item shows what to do. |
| `dont` | The item shows what not to do. |

```json
"type": {
    "type": "string",
    "enum": ["Do", "Dont"],
    "frontify-kinds": { "Do": "do", "Dont": "dont" }
}
```

## Placement

Like every `frontify-*` keyword, both sit on the field they describe: a string for a role, an enum
for kinds. A keyword on an object or an array is ignored.

## What a schema does not say

- **Block assets.** A schema describes the settings, and assets are stored beside them under keys
  that blocks form in several ways: a fixed key, the id of a list item, a prefix plus an id or an
  index. Some keys hold content and some hold decoration, such as a custom icon. Until a schema can
  declare that, the platform places the images of Frontify's own blocks itself and renders no asset
  of any other block.
- **Shape that belongs to one block type.** A callout is a Markdown alert, a divider is a thematic
  break, a code snippet is a fenced block with its language. The platform renders these per block
  type, by app id.
