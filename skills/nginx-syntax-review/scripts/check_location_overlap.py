#!/usr/bin/env python3

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


SERVER_BLOCK_PATTERN = re.compile(r"^\s*server\s*\{")
STRUCTURAL_OPEN_PATTERN = re.compile(r"\{\s*(?:#.*)?$")
STRUCTURAL_CLOSE_PATTERN = re.compile(r"^\s*}\s*(?:#.*)?$")
LOCATION_MODIFIERS = ("=", "^~", "~*", "~")


@dataclass(frozen=True)
class LocationEntry:
    file_path: Path
    line_number: int
    modifier: str
    matcher: str
    server_scope: tuple[Path, int] | None

    @property
    def location_type(self) -> str:
        if self.matcher.startswith("@"):
            return "named"
        if self.modifier == "=":
            return "exact"
        if self.modifier == "^~":
            return "preferential-prefix"
        if self.modifier in {"~", "~*"}:
            return "regex"
        return "prefix"

    @property
    def comparable_matcher(self) -> str:
        return self.matcher.strip()


@dataclass(frozen=True)
class OverlapFinding:
    severity: str
    reason: str
    left: LocationEntry
    right: LocationEntry


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Report duplicate and prefix-overlap nginx location paths. "
            "Regex locations are listed separately for human review."
        ),
    )
    parser.add_argument(
        "path",
        help="Assembled nginx config snapshot to inspect",
    )
    return parser.parse_args()


def load_entries(paths: Iterable[str]) -> list[LocationEntry]:
    entries: list[LocationEntry] = []
    for raw_path in paths:
        file_path = Path(raw_path)
        if not file_path.is_file():
            raise FileNotFoundError(f"config file not found: {file_path}")

        block_stack: list[tuple[str, tuple[Path, int] | None]] = []
        process_file_entries(file_path, block_stack, entries)
    return entries


def process_file_entries(
    file_path: Path,
    block_stack: list[tuple[str, tuple[Path, int] | None]],
    entries: list[LocationEntry],
) -> None:
    server_index = 0

    for line_number, line in enumerate(file_path.read_text(encoding="utf-8").splitlines(), start=1):
        line_without_comment = line.split("#", 1)[0]
        parsed_location = parse_location_line(line_without_comment)
        if parsed_location is not None:
            modifier, matcher = parsed_location
            entries.append(
                LocationEntry(
                    file_path=file_path,
                    line_number=line_number,
                    modifier=modifier,
                    matcher=matcher,
                    server_scope=current_server_scope(block_stack),
                )
            )

        update_block_stack(block_stack, file_path, line_without_comment, server_index)
        if SERVER_BLOCK_PATTERN.match(line_without_comment):
            server_index += 1


def parse_location_line(line_without_comment: str) -> tuple[str, str] | None:
    stripped_line = line_without_comment.strip()
    if not stripped_line.startswith("location "):
        return None

    directive_body = stripped_line[len("location ") :].strip()
    if STRUCTURAL_OPEN_PATTERN.search(directive_body):
        directive_body = directive_body.rsplit("{", 1)[0].strip()

    modifier = ""
    matcher_body = directive_body
    for candidate in LOCATION_MODIFIERS:
        prefix = f"{candidate} "
        if directive_body.startswith(prefix):
            modifier = candidate
            matcher_body = directive_body[len(prefix) :].strip()
            break

    if modifier in {"~", "~*"}:
        matcher = matcher_body
    else:
        matcher = matcher_body.split(None, 1)[0] if matcher_body else ""

    if not matcher:
        return None

    return modifier, matcher


def current_server_scope(block_stack: list[tuple[str, tuple[Path, int] | None]]) -> tuple[Path, int] | None:
    for block_kind, scope in reversed(block_stack):
        if block_kind == "server":
            return scope
    return None


def update_block_stack(
    block_stack: list[tuple[str, tuple[Path, int] | None]],
    file_path: Path,
    line_without_comment: str,
    server_index: int,
) -> None:
    stripped_line = line_without_comment.strip()
    if STRUCTURAL_CLOSE_PATTERN.match(stripped_line):
        if block_stack:
            block_stack.pop()
        return

    if not STRUCTURAL_OPEN_PATTERN.search(line_without_comment):
        return

    if SERVER_BLOCK_PATTERN.match(line_without_comment):
        block_stack.append(("server", (file_path, server_index + 1)))
        return

    block_stack.append(("other", None))


def is_prefix_overlap(left: str, right: str) -> bool:
    if left == right:
        return True
    if left == "/" or right == "/":
        return True
    return right.startswith(left) or left.startswith(right)


def are_prefix_like(left: LocationEntry, right: LocationEntry) -> bool:
    prefix_types = {"prefix", "preferential-prefix"}
    return left.location_type in prefix_types and right.location_type in prefix_types


def classify_exact_pair(left: LocationEntry, right: LocationEntry) -> tuple[str, str] | None:
    if left.location_type != "exact" or right.location_type != "exact":
        return None
    if left.comparable_matcher != right.comparable_matcher:
        return None
    return "blocking-candidate", "duplicate exact location path"


def classify_exact_prefix_pair(left: LocationEntry, right: LocationEntry) -> tuple[str, str] | None:
    if left.location_type != "exact" and right.location_type != "exact":
        return None

    exact_entry = left if left.location_type == "exact" else right
    other_entry = right if exact_entry is left else left
    if exact_entry.comparable_matcher != other_entry.comparable_matcher:
        return None
    return "review-needed", "exact location shares the same matcher as a prefix location"


def classify_prefix_pair(left: LocationEntry, right: LocationEntry) -> tuple[str, str] | None:
    if not are_prefix_like(left, right):
        return None
    if not is_prefix_overlap(left.comparable_matcher, right.comparable_matcher):
        return None
    if left.comparable_matcher == right.comparable_matcher and left.modifier == right.modifier:
        return "blocking-candidate", "duplicate prefix location path"
    if left.comparable_matcher == right.comparable_matcher:
        return "review-needed", "same prefix path uses different location modifiers"
    return "review-needed", "prefix overlap"


def classify_overlap(left: LocationEntry, right: LocationEntry) -> tuple[str, str] | None:
    ignored_types = {"regex", "named"}
    if left.location_type in ignored_types or right.location_type in ignored_types:
        return None
    if left.server_scope != right.server_scope:
        return None
    if left.server_scope is None and left.file_path != right.file_path:
        return None

    exact_pair_result = classify_exact_pair(left, right)
    if exact_pair_result is not None:
        return exact_pair_result

    exact_prefix_result = classify_exact_prefix_pair(left, right)
    if exact_prefix_result is not None:
        return exact_prefix_result

    return classify_prefix_pair(left, right)


def find_overlaps(entries: list[LocationEntry]) -> tuple[list[OverlapFinding], list[LocationEntry]]:
    findings: list[OverlapFinding] = []
    regex_entries: list[LocationEntry] = []

    comparable_entries = [entry for entry in entries if entry.location_type != "regex"]
    regex_entries.extend(entry for entry in entries if entry.location_type == "regex")

    for index, left in enumerate(comparable_entries):
        for right in comparable_entries[index + 1 :]:
            classification = classify_overlap(left, right)
            if classification is None:
                continue
            severity, reason = classification

            findings.append(
                OverlapFinding(
                    severity=severity,
                    reason=reason,
                    left=left,
                    right=right,
                )
            )

    return findings, regex_entries


def format_entry(entry: LocationEntry) -> str:
    modifier_text = f" {entry.modifier}" if entry.modifier else ""
    return (
        f"{entry.file_path}:{entry.line_number} "
        f"[{entry.location_type}{modifier_text}] {entry.matcher}"
    )


def print_report(findings: list[OverlapFinding], regex_entries: list[LocationEntry]) -> int:
    if not findings:
        print("No exact duplicates or prefix overlaps found.")
    else:
        for finding in findings:
            print(f"{finding.severity}: {finding.reason}")
            print(f"  - {format_entry(finding.left)}")
            print(f"  - {format_entry(finding.right)}")

    if regex_entries:
        print("regex-review-needed:")
        for entry in regex_entries:
            print(f"  - {format_entry(entry)}")

    return 1 if any(finding.severity == "blocking-candidate" for finding in findings) else 0


def main() -> int:
    args = parse_args()
    try:
        entries = load_entries([args.path])
    except FileNotFoundError as error:
        print(str(error), file=sys.stderr)
        return 2

    findings, regex_entries = find_overlaps(entries)
    return print_report(findings, regex_entries)


if __name__ == "__main__":
    raise SystemExit(main())