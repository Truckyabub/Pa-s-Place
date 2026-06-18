# Remaining Limitations

## Runtime

- Production build was verified with Node 22.22.3.
- Node 24.15.0 in this workspace triggered a Next.js build worker SIGBUS during `next build`.

## Product scope

- Audio generation is still mock-only.
- No paid provider adapters are wired in yet.
- No real database layer is connected yet; the app still relies on local browser storage and static export artifacts.
- The module route pages currently summarize workflows rather than duplicating every editor control from the main studio shell.

## Compliance

- The app enforces legal-safety warnings, but it still depends on user honesty and review for final rights clearance.
- Commercial release remains a manual, user-approved step.

