#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const DEFAULT_OUTPUT_DIR = path.join(process.cwd(), "docs", "confluence");
const MARKDOWN_FILE_NAME = "page.md";

const usage = [
  "Usage: npm run confluence:export -- <pageId> [outputDir] [--recursive] [--skip-attachments] [--flat] [--clean] [--force]",
  "",
  "Flags:",
  "  --clean  Remove the output directory before exporting.",
  "  --force  Allow exporting into a non-empty output directory and replace matching page folders.",
  "  --flat  Export all pages into a single level using each Confluence export directory name.",
  "  --recursive  Export the full descendant tree under the requested page. By default only the requested page is exported.",
  "  --skip-attachments  Export markdown only and do not download page attachments.",
  "",
  "Examples:",
  "  npm run confluence:export -- 3507001483",
  "  npm run confluence:export -- 3507001483 ./tmp/confluence-export",
  "  npm run confluence:export -- 3507001483 ./tmp/confluence-export --recursive",
  "  npm run confluence:export -- 3507001483 ./tmp/confluence-export --recursive --skip-attachments",
].join("\n");

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(usage);
  process.exit(args.length === 0 ? 1 : 0);
}

const positionalArgs = args.filter((arg) => !arg.startsWith("--"));
const flags = new Set(args.filter((arg) => arg.startsWith("--")));

const rootPageId = positionalArgs[0];
const outputDir = path.resolve(positionalArgs[1] ?? DEFAULT_OUTPUT_DIR);
const isFlat = flags.has("--flat");
const shouldClean = flags.has("--clean");
const shouldForce = flags.has("--force");
const shouldExportRecursively = flags.has("--recursive");
const shouldSkipAttachments = flags.has("--skip-attachments");

if (!rootPageId) {
  console.error("Missing required rootPageId argument.\n");
  console.error(usage);
  process.exit(1);
}

const confluenceEnv = {
  ...process.env,
  NO_COLOR: "1",
};

const RETRYABLE_ERROR_PATTERNS = [
  "socket hang up",
  "econnreset",
  "etimedout",
  "timed out",
  "eai_again",
  "502 bad gateway",
  "503 service unavailable",
  "504 gateway timeout",
];

const isRetryableConfluenceError = (details) => {
  const normalizedDetails = details.toLowerCase();

  return RETRYABLE_ERROR_PATTERNS.some((pattern) => normalizedDetails.includes(pattern));
};

const runConfluence = (commandArgs, { parseJson = false } = {}) => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const output = execFileSync("confluence", commandArgs, {
        encoding: "utf8",
        env: confluenceEnv,
        maxBuffer: 50 * 1024 * 1024,
      });

      return parseJson ? JSON.parse(output) : output;
    } catch (error) {
      if (error?.code === "ENOENT") {
        throw new Error(
          'The "confluence" CLI is not installed or is not available on PATH. Install it with "npm install -g confluence-cli".',
        );
      }

      const stderr = error?.stderr?.toString?.().trim();
      const stdout = error?.stdout?.toString?.().trim();
      const details = stderr || stdout || error.message;

      if (attempt < 3 && isRetryableConfluenceError(details)) {
        continue;
      }

      throw new Error(`confluence ${commandArgs.join(" ")} failed: ${details}`);
    }
  }
};

const buildOutputSegments = (page, pageMap, rootId, exportDirectoryNames) => {
  if (isFlat) {
    return [exportDirectoryNames.get(page.id) ?? page.title];
  }

  const segments = [];
  let currentPage = page;

  while (currentPage) {
    const directoryName = exportDirectoryNames.get(currentPage.id);

    if (!directoryName) {
      throw new Error(`Missing exported directory name for page ${currentPage.id} (${currentPage.title}).`);
    }

    segments.unshift(directoryName);

    if (currentPage.id === rootId) {
      return segments;
    }

    currentPage = pageMap.get(currentPage.parentId);
  }

  throw new Error(`Unable to resolve the full parent path for page ${page.id} (${page.title}).`);
};

const prepareOutputDirectory = async (directoryPath) => {
  try {
    const directoryEntries = await readdir(directoryPath);

    if (directoryEntries.length === 0) {
      return;
    }

    if (shouldClean) {
      await rm(directoryPath, { recursive: true, force: true });
      await mkdir(directoryPath, { recursive: true });
      return;
    }

    if (!shouldForce) {
      throw new Error(
        `Output directory ${directoryPath} is not empty. Re-run with --clean to replace it or --force to allow replacing matching page folders inside it.`,
      );
    }
  } catch (error) {
    if (error?.code === "ENOENT") {
      await mkdir(directoryPath, { recursive: true });
      return;
    }

    throw error;
  }
};

const exportPage = async (pageId) => {
  const tempDirectory = await mkdtemp(path.join(tmpdir(), "confluence-export-tree-"));

  try {
    const exportArgs = [
      "export",
      pageId,
      "--format",
      "markdown",
      "--dest",
      tempDirectory,
      "--file",
      MARKDOWN_FILE_NAME,
    ];

    if (shouldSkipAttachments) {
      exportArgs.push("--skip-attachments");
    }

    runConfluence(exportArgs);

    const exportEntries = await readdir(tempDirectory, { withFileTypes: true });
    const exportDirectory = exportEntries.find((entry) => entry.isDirectory());

    if (!exportDirectory) {
      throw new Error(`confluence export ${pageId} did not create an export directory.`);
    }

    return {
      exportRoot: path.join(tempDirectory, exportDirectory.name),
      exportDirectoryName: exportDirectory.name,
      cleanup: async () => {
        await rm(tempDirectory, { recursive: true, force: true });
      },
    };
  } finally {
    // cleanup is deferred until the caller finishes copying the export directory.
  }
};

const rootPage = runConfluence(["info", rootPageId, "--format", "json"], {
  parseJson: true,
});

const treeResponse = shouldExportRecursively
  ? runConfluence(
      ["children", rootPageId, "--recursive", "--format", "json", "--show-id", "--show-url"],
      { parseJson: true },
    )
  : null;
const childPages = Array.isArray(treeResponse?.children) ? treeResponse.children : [];
const pages = [{ ...rootPage, depth: 0 }, ...childPages];
const pageMap = new Map(pages.map((page) => [page.id, page]));
const pagesByDepth = [...pages].sort((left, right) => {
  const depthDifference = (left.depth ?? 0) - (right.depth ?? 0);

  if (depthDifference !== 0) {
    return depthDifference;
  }

  return left.title.localeCompare(right.title);
});

await prepareOutputDirectory(outputDir);

const manifest = [];
const exportDirectoryNames = new Map();

for (const page of pagesByDepth) {
  const exportedPage = await exportPage(page.id);

  try {
    exportDirectoryNames.set(page.id, exportedPage.exportDirectoryName);

    const outputSegments = buildOutputSegments(page, pageMap, rootPageId, exportDirectoryNames);
    const pageDirectory = path.join(outputDir, ...outputSegments);
    const relativeFilePath = path.relative(outputDir, path.join(pageDirectory, MARKDOWN_FILE_NAME));

    await rm(pageDirectory, { recursive: true, force: true });
    await mkdir(path.dirname(pageDirectory), { recursive: true });
    await cp(exportedPage.exportRoot, pageDirectory, { recursive: true });

    manifest.push({
      id: page.id,
      title: page.title,
      depth: page.depth ?? 0,
      parentId: page.parentId ?? null,
      outputPath: relativeFilePath,
      url: page.url ?? rootPage.url,
      exportDirectoryName: exportedPage.exportDirectoryName,
    });

    console.log(`Exported ${page.id} -> ${relativeFilePath}`);
  } finally {
    await exportedPage.cleanup();
  }
}

const manifestPath = path.join(outputDir, "manifest.json");
await writeFile(`${manifestPath}`, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

console.log(`\nExported ${pages.length} pages to ${outputDir}`);
console.log(`Manifest written to ${manifestPath}`);