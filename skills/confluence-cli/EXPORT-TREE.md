---
name: confluence-export-tree
description: Export a Confluence page tree from a root page ID into local markdown folders using the provided Node.js script.
argument-hint: <rootPageId> [outputDir] [--recursive] [--skip-attachments] [--flat] [--clean] [--force]
allowed-tools: [Bash, Read, Write, Glob, Grep]
---

# Confluence Export Tree Skill

This helper skill documents how to use `scripts/export-confluence-tree.mjs` to export Confluence content locally from only a root page ID.

See the main Confluence CLI skill for setup and authentication details: [SKILL.md](./SKILL.md).

## Purpose

Use this script when you want to:

- Export one page or an entire descendant tree to local markdown files.
- Preserve hierarchy in local folders (or flatten it with `--flat`).
- Generate a machine-readable export manifest.

## Script Location

`scripts/export-confluence-tree.mjs`

## Prerequisites

- `confluence` CLI is installed and available on `PATH`.
- Confluence auth is configured (env vars or profile).

If `confluence` is missing, the script fails with:

`The "confluence" CLI is not installed or is not available on PATH. Install it with "npm install -g confluence-cli".`

## Usage

```sh
node .github/skills/confluence-cli/scripts/export-confluence-tree.mjs <pageId> [outputDir] [--recursive] [--skip-attachments] [--flat] [--clean] [--force]
```

## Arguments

- `<pageId>` (required): Root page ID to export.
- `[outputDir]` (optional): Output folder.
: defaults to `./docs/confluence`

## Flags

- `--recursive`
: Export full descendant tree under the root page.

- `--skip-attachments`
: Export markdown only, skip attachment downloads.

- `--flat`
: Export pages at a single folder level using Confluence export directory names.
: If two pages resolve to the same export directory name, a later export can overwrite an earlier one.

- `--clean`
: Remove output directory before export.

- `--force`
: Allow export into non-empty output directory and replace matching page folders.

## Behavior Notes

- Without `--recursive`, only the root page is exported.
- The script runs `confluence info` for root metadata and `confluence children --recursive` when recursive export is enabled.
- Every exported page is written as `page.md` inside its page directory.
- Existing page target folders are removed and replaced during export.
- A `manifest.json` file is written at the export root with page metadata and local paths.
- Unknown flags are ignored silently by the script, so flag typos will not throw a validation error.

## Output

In the output directory, the script writes:

- Page folders containing `page.md`
- Optional `attachments/` directories (unless `--skip-attachments`)
- `manifest.json`

Manifest item shape:

```json
{
	"id": "<page-id>",
	"title": "<page-title>",
	"depth": 0,
	"parentId": null,
	"outputPath": "<relative/path/to/page.md>",
	"url": "<confluence-url>",
	"exportDirectoryName": "<confluence-export-folder-name>"
}
```

## Examples

```sh
# Export only root page to default docs/confluence
node .github/skills/confluence-cli/scripts/export-confluence-tree.mjs 3507001483

# Export full tree to custom directory
node .github/skills/confluence-cli/scripts/export-confluence-tree.mjs 3507001483 ./tmp/confluence-export --recursive

# Export full tree as markdown only (no attachments)
node .github/skills/confluence-cli/scripts/export-confluence-tree.mjs 3507001483 ./tmp/confluence-export --recursive --skip-attachments

# Flatten output structure
node .github/skills/confluence-cli/scripts/export-confluence-tree.mjs 3507001483 ./tmp/confluence-export --recursive --flat

# Replace output directory content
node .github/skills/confluence-cli/scripts/export-confluence-tree.mjs 3507001483 ./tmp/confluence-export --recursive --clean
```

## Troubleshooting

- `Missing required rootPageId argument`
: Provide the first positional argument.

- `Output directory ... is not empty`
: Re-run with `--clean` or `--force`.

- `confluence ... failed: ...`
: Confirm CLI auth/profile config and page access.

- `did not create an export directory`
: Verify the page is exportable and the API request succeeded.
