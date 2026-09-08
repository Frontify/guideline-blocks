# blocks-release

Decides which blocks ship to the Frontify Marketplace on merge to `main`, and with which
changelog. See [`.releases/README.md`](../../.releases/README.md) for the entry format and
the selection rules.

## Commands

| Command | Who runs it | What it does |
| --- | --- | --- |
| `add` | you | Writes an entry to `.releases/`. Infers the block from the working directory; `--all` targets every block. |
| `plan` | CI | Resolves entries + change detection into the set of blocks to publish, each with its notes. `--json` for the Actions matrix. |
| `mark` | CI | Moves `released/<block>` after that block publishes. |
| `clean` | CI | Deletes the entry files a completed release consumed. |

## State

There is no version number anywhere. The marketplace keeps its own integer version per app;
this tool only tracks *what was last published*, as one moving git tag per block:

```
released/audio-block -> <sha>
```

That per-block tag is what makes the pipeline retry-safe. If 3 of 19 blocks fail, re-running
the workflow re-plans from the tags and picks up only those 3 -- the 16 that succeeded are
already at `HEAD` and drop out. Without it, a re-run would re-publish everything and hit
`status !== DRAFT` on the ones that already went through.
