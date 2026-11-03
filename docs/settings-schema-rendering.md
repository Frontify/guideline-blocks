# Settings schema keywords for rendering

A block's `settingsSchema` already tells the platform which settings are content
(`frontify-serializable`, `frontify-serialization-index`) and which values are rich text
(`frontify-type: "fondueRte"`). The platform will render that content as Markdown for search, the
Brand Assistant, the public API and the Frontify MCP server. Three keywords let a schema say what
the content *means*, so a block renders with its structure instead of as a run of text.

| Keyword | Where | Value | Rendering |
| --- | --- | --- | --- |
| `frontify-role` | a text or rich text field | `title` | A heading for the block, a bold lead inside a list item. |
| `frontify-role` | a text field | `attribution` | An attribution line after the body, for example a quote's author. |
| `frontify-role` | a text field | `alt` | Alt text of the images bound to the same block or item. Not emitted as text. |
| `frontify-labels` | an `enum` field | `{ "<enum value>": "<label>" }` | Marks the field as a discriminator. In a list, items are grouped under the label of their value, in the order of the map. On the block itself, the label leads the content. |
| `frontify-asset-key` | the `items` object schema of an array | a field name | The item's block assets are stored under the setting named by that field's value, typically `id`. |
| `frontify-type` | a text field | `code` | The value is source code and renders as a fenced code block. |

Everything a schema cannot express stays with the platform's per-block-type rendering, keyed by
app id: a callout is a blockquote, a divider is a thematic break, a palette comes from the brand's
colors.

Labels are plain strings and are not translated. A guideline in another language shows the
label as written here.
