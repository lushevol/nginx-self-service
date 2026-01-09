# Proposal: Restrict Raw Editor & Show Diffs

## Problem

Currently, the "Raw" mode in the Config Editor allows direct text editing. This bypasses the structured validation and guidance provided by the "Wizard" mode. Users might introduce syntax errors or untracked changes that are hard to visualize. Furthermore, users cannot easily see what changes they have made compared to the original configuration.

## Solution

1.  **Disable Raw Editing:** Make the "Raw" tab read-only. Users must use the "Wizard" components (Upstreams/Locations lists) to make changes.
2.  **Show Diffs:** Transform the "Raw" tab into a "Diff" view. It will display the difference between the **original** server configuration and the **current** draft configuration (modified via Wizard).

## Impact

- **Safety:** Reduces likelihood of malformed Nginx config by forcing usage of vetted Wizard inputs.
- **Usability:** distinct visualization of "Before vs After" helps users verify their changes before submission.
