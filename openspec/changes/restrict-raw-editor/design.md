# Design: Read-Only Diff View

## Architecture

- **State Management:** `App.tsx` will hold both `current` (mutable) and `original` (immutable, from server) config state.
- **Component:** `ConfigEditor` will receive `upstreams` (current), `locations` (current), `originalUpstreams`, `originalLocations`.
- **UI Library:** Use `@monaco-editor/react`'s `DiffEditor` component instead of the standard `Editor`.

## Data Flow

1. `App` loads config -> `setUpstreams(data)`, `setOriginalUpstreams(data)`.
2. User edits in Wizard -> `setUpstreams(newData)`.
3. `ConfigEditor` renders `DiffEditor` with `original` as "original" model and `current` as "modified" model.
4. `DiffEditor` is set to `readOnly: true`.

## Trade-offs

- **Flexibility:** Advanced users can no longer paste large config blocks directly. This is an intentional constraint to enforce "Padded Cell" architecture.
