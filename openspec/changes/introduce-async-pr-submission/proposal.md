# Async PR Submission & Config Split

## Goal

Improve reliability of config submission by introducing an asynchronous queue and loop-back testing for ADO connectivity, and refactor config management to split upstreams from proxy rules.

## Problem

Currently, config submission is synchronous. If the ADO PAT is inactive or the network is flaky, the request fails immediately, leading to a poor user experience. Additionally, storing the entire nginx config as a single blob makes it difficult to manage upstreams and location blocks separately.

## Solution

1. **Middle Service**: Introduce a database-backed queue for config changes.
2. **Async Worker**: A background worker will pick up pending changes, verify ADO connectivity (loop test), and then submit the PR.
3. **Config Split**: Refactor the data model and API to treat `upstreams` and `locations` (proxy rules) as distinct entities, merging them only at generation time.
