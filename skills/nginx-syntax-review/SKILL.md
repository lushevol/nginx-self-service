---
name: nginx-syntax-review
description: 'Review staged nginx configuration and return a strict GO or NO-GO decision. Use whenever the user is changing nginx proxy, upstream, include, rewrite, header, or location config, wants a release gate, asks whether an nginx diff is safe to deploy, or needs a real nginx -t validation harness for include-heavy configs.'
argument-hint: 'Entry nginx config path to test, or the path to a disposable validation config copied from references/nginx-real-validation-template.conf'
---

# Nginx Syntax Review

## What This Skill Produces
- A focused review of staged nginx configuration changes
- A full code review of staged nginx proxy, upstream, rewrite, and header changes
- Validation that upstream server address and port usage matches proxy routing intent
- Validation that `location` matching rules do not overlap in a way that silently changes routing precedence
- Validation that `proxy_set_header Host` matches the backend host-routing expectation, with intentional virtual-host overrides distinguished from broken host mismatches
- A deterministic syntax validation result from `nginx -t`
- A live-like disposable validation harness for configs that rely on includes, temp paths, or repo-specific layout
- A final deployment verdict: `GO` or `NO-GO`

## When To Use
- You changed nginx config and staged it with git
- You need release-gate confirmation before deployment
- You want a standard, repeatable syntax review workflow

## Inputs
- Entry config path for nginx test mode
- Optional disposable validation config built from the bundled template when the real entry config is not self-contained

Example:
- `ansible/roles/deploy_loadbalance/files/config/prod/nginx_test_non_ratan.conf`
- `skills/nginx-syntax-review/references/nginx-real-validation-template.conf`

## Bundled Resources
- `references/nginx-real-validation-template.conf`
  - Use this when the repo does not already have a clean test entrypoint, or when you need to verify upstream and proxy include files together in a disposable harness.
- `references/example-includes/non_ratan_upstream.conf`
  - Minimal upstream include used to prove the template is runnable.
- `references/example-includes/non_ratan_proxy.conf`
   - Minimal server-scope proxy include used to prove the template is runnable.
- `scripts/check_location_overlap.py`
   - Use this when the config has many `location` blocks and you want a deterministic first pass over duplicate and byte-prefix overlaps before doing the final human routing review.

## Validation Mode Selection
Choose the narrowest mode that still gives a trustworthy result.

1. Use the real entry config directly only when the reviewed files have already been materialized from the git index into a disposable validation root, so the verdict still reflects staged content rather than working-tree drift.
2. Use a disposable harness when the real config depends on environment-specific include paths, temp directories, or deployment-time file layout.
3. Return `NO-GO` instead of guessing when required include targets cannot be located or reconstructed.

## Disposable Harness Workflow
When the config is include-heavy, build a temporary validation root instead of testing production paths in place.

1. Create a temporary directory for nginx validation.
2. Materialize the staged nginx files from the git index into that temporary root instead of copying from working-tree paths.
3. Create the temp subdirectories referenced by the template under that temporary root.
4. Copy `references/nginx-real-validation-template.conf` into the temp directory.
5. Copy the relevant staged include files into the temp directory.
6. Replace the template include placeholders with the temp copies of the real upstream and proxy include files.
7. Run nginx with an explicit prefix so logs, pid, and temp paths stay inside the disposable root:
   - `nginx -p <temp_root> -t -c <temp_config>`
8. Preserve nested include layout when copied files themselves include sibling or child config files.
9. If the real change depends on additional includes, copy those too or return `NO-GO` with the unresolved path.

## Procedure
1. Identify staged nginx-related files.
   - If none are staged, return `NO-GO` with reason: `no staged nginx changes to review`.
2. Do not inspect unstaged files for this review.
   - Validate only the staged diff and note, when relevant, that the verdict applies to staged nginx changes only.
3. Decide whether to validate a staged snapshot of the real entry config directly or build a disposable harness from the bundled template.
4. Print staged diff for staged nginx-related files.
5. Run syntax validation:
   - direct mode: `nginx -p <temp_root> -t -c <staged_entry_config_copy>`
   - harness mode: `nginx -p <temp_root> -t -c <temp_config>`
6. When the config contains many `location` blocks, run the overlap helper on one assembled staged server-scope snapshot or one temp proxy copy that already includes the relevant staged `location` blocks in their effective server context.
   - `python3 skills/nginx-syntax-review/scripts/check_location_overlap.py <assembled_proxy_snapshot>`
   - Do not pass unrelated include fragments from different server scopes as separate arguments, because the helper validates overlap within the assembled scope it is given.
   - Treat `blocking-candidate` output as release-blocking unless a human review can explicitly prove the duplicate match is intentional and safe.
   - Treat `review-needed` output as a routing-review prompt: validate at least one concrete URI and confirm the effective winner is the intended block.
   - Treat `regex-review-needed` output as a reminder that regex precedence still needs human review; the helper does not try to prove regex safety.
7. Review the staged diff for behavioral correctness:
   - upstream server address and port match the proxy target and intended backend service
   - upstream names referenced by `proxy_pass` exist and match intended targets
   - named upstream blocks resolve to the expected host:port combinations
   - `location`, `rewrite`, and `proxy_pass` paths preserve the expected request URI
   - `location` blocks do not overlap in a way that changes nginx match precedence by accident; check exact (`=`), preferential prefix (`^~`), regex (`~`, `~*`), and plain prefix locations together rather than reviewing each block in isolation
   - duplicate or near-duplicate prefixes are intentional; remember that nginx plain prefix matching is byte-prefix based, so `/foo` can also match `/foobar`
   - if two public routes can both match the same URI, identify the effective winner for at least one concrete example URI and confirm that the winning block is the intended one
   - `proxy_set_header` values are consistent with the upstream service and original client data
   - `proxy_set_header Host` matches the backend host-routing expectation; if the backend routes by virtual host, compare against that expected host, otherwise compare against the upstream target when the backend expects the socket host or host:port
   - if a backend intentionally requires a different `Host` than the upstream socket address, treat that as valid only when the virtual-host requirement is clear from the config or release context; otherwise record it as a risk note rather than silently accepting it
   - new blocks do not shadow or conflict with existing `location` matches
   - TLS / scheme assumptions in `proxy_pass`, `X-Forwarded-Proto`, and host headers are coherent
   - WebSocket or upgrade handling is present only when needed
   - comments, naming, and ordering are clear enough for future maintenance
   - proxy and upstream port numbers are consistent across `Host`, `proxy_pass`, and backend declarations when the backend expects an explicit port
   - duplicated backend endpoints are intentional and do not accidentally point multiple public routes at the wrong service
   - no stale references remain to renamed upstream blocks, locations, or backend hosts
   - `proxy_pass` trailing-slash behavior is intentional, because a trailing slash changes how nginx rewrites the upstream request URI
   - variable-based `proxy_pass` targets have the required supporting directives such as `resolver`, or they should be treated as risky and called out
   - include files referenced by the tested config are the same files changed in the staged diff, or an explicit temp copy of them
8. Evaluate decision:
   - `GO` when exit code is `0`
   - `NO-GO` when exit code is non-zero
   - `NO-GO` when the overlap helper reports any `blocking-candidate` that was not explicitly cleared by human review
   - `NO-GO` when the diff introduces a correctness, routing, or maintainability regression even if syntax passes
9. Report result using this template:
   - `Decision: GO|NO-GO`
   - `Validation Mode: direct|harness`
   - `Source Config: <entry_config_path>`
   - `Validated Config: <validated_config_path>`
   - `Exit Code: <code>`
   - `Key Output: <nginx -t output summary>`
   - `Risk Notes: <any non-syntax concerns found in diff>`
   - `Scope Note: verdict applies to staged nginx content materialized from the git index`

## Decision Rules
- Blocking failures:
   - No staged nginx files found
   - `nginx -t` syntax errors
   - Overlap helper reported a `blocking-candidate` and human review did not clear it as intentional and safe
   - Missing include targets referenced by tested config or harness template
   - Mismatch between `proxy_pass` target and the matching upstream server address or port
   - Mismatch between `proxy_set_header Host` and the backend host-routing expectation when the backend routing depends on a specific host:port or virtual host
   - Incorrect `proxy_pass` or rewrite target paths
   - Duplicate, shadowed, or conflicting `location` blocks that change request routing or make precedence ambiguous
   - Overlapping `location` rules where a concrete reachable URI resolves to a different winning block than intended, or where the effective winner cannot be determined confidently from the config
   - Header, host, or scheme settings that would break backend communication
   - A hidden URI rewrite caused by `proxy_pass` trailing-slash changes that would send the wrong upstream path
- Non-blocking notes:
  - Formatting inconsistencies (tabs/spaces)
  - Header style consistency observations
   - Small naming or comment cleanup items that do not affect routing or runtime behavior

## Recommended Additional Validations
- Check whether any upstream block is now unused, renamed, or duplicated in a way that suggests stale config rather than intentional reuse.
- Check whether `listen`, `server_name`, and included server blocks create an accidental overlap that would route traffic to the wrong virtual server before `location` matching even begins.
- Check whether timeout, body-size, buffering, or upgrade settings changed alongside the route; syntax may pass while the backend behavior still regresses for large payloads, streaming, or WebSocket traffic.
- Check whether comments or naming capture any non-default routing assumption such as an intentional `Host` override, regex precedence dependency, or backend path rewrite. If the config only works because of tribal knowledge, record that as risk even when syntax and routing still appear correct.

## Command Snippets
```bash
git diff --staged -- '*.conf' '*.nginx'
nginx -t -c <entry_config_path>
python3 skills/nginx-syntax-review/scripts/check_location_overlap.py path/to/assembled_proxy_snapshot.conf
tmp_root="$(mktemp -d)"
git show ":path/to/staged_entry.conf" > "$tmp_root/staged_entry.conf"
cp skills/nginx-syntax-review/references/nginx-real-validation-template.conf "$tmp_root/nginx.conf"
cp skills/nginx-syntax-review/references/example-includes/non_ratan_upstream.conf "$tmp_root/non_ratan_upstream.conf"
cp skills/nginx-syntax-review/references/example-includes/non_ratan_proxy.conf "$tmp_root/non_ratan_proxy.conf"
mkdir -p "$tmp_root"/tmp/nginx_client_body_temp "$tmp_root"/tmp/nginx_proxy_temp \
   "$tmp_root"/tmp/nginx_fastcgi_temp "$tmp_root"/tmp/nginx_uwsgi_temp \
   "$tmp_root"/tmp/nginx_scgi_temp
python3 -c 'from pathlib import Path; import sys; p = Path(sys.argv[1]); text = p.read_text(); text = text.replace("__UPSTREAM_INCLUDE__", sys.argv[2]).replace("__SERVER_INCLUDE__", sys.argv[3]); p.write_text(text)' \
   "$tmp_root/nginx.conf" "$tmp_root/non_ratan_upstream.conf" "$tmp_root/non_ratan_proxy.conf"
nginx -p "$tmp_root" -t -c "$tmp_root/nginx.conf"
```

## Real-World Template Notes
The bundled template mirrors a realistic config shape:
- top-level `worker_processes` and `events`
- an `http` block with explicit temp paths
- one upstream include
- one server include

It is based on the same structure as a production-like sample config, but keeps temp paths prefix-relative so the harness stays isolated and reproducible.

## Completion Criteria
- Staged diff reviewed
- Syntax check executed
- Final `GO` or `NO-GO` provided with evidence