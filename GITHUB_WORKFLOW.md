# GitHub Workflow

## Branch plan

- `main`
- `dev`
- `feature/mvp-core`
- `feature/design-system`
- `feature/legal-safety`
- `feature/export-system`

## Recommended process

1. Create a feature branch from `dev`.
2. Keep commits focused and descriptive.
3. Run `npm run typecheck`, `npm run lint`, and `npm run build` before merging.
4. Open a pull request with a short change summary and test notes.
5. Merge only after the legal-safety and export checks are complete.

## CI expectations

- TypeScript check
- lint
- build

