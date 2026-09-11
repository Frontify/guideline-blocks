# blocks-release

Decides which blocks ship to the Frontify Marketplace and with which changelog. See
[`.releases/README.md`](../../.releases/README.md) for the entry format.

## Commands

| Command | Who runs it | What it does |
| --- | --- | --- |
| `add` | you | Writes an entry to `.releases/`. Infers the block from the working directory; `--all` targets every block. |
| `plan` | CI | Turns the entries into the list of blocks to publish, each with its notes. `--json` for the Actions matrix. |
| `clean` | CI | Deletes the entries once every block has published. |

## Design

Releases are declared, never inferred. There is no change detection and no release state
stored anywhere -- `.releases` *is* the state, and it is visible in the PR diff.

There are also no version numbers. The marketplace assigns its own integer version per app
on every deploy, so a version in this repo would only ever be a second, less accurate copy.

Re-running a failed release is safe. `deploy` uploads a new `DRAFT`, and the marketplace
opens a fresh version when the current one is already published (`AppMutabilityHelper::
makeAppMutable`), so a block that succeeded before simply publishes another version rather
than erroring. The `clean` job only runs when every block succeeded, so the entries — and
their notes — survive a partial failure.
