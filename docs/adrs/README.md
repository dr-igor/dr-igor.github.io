# Architecture Decision Records

Architecture Decision Records (ADRs) for this project. Each file captures one decision — its context, the options weighed, and the outcome.

## Conventions

This project uses a deliberately minimal ADR process:

- **The descriptive slug is the identifier.** Files are named for the decision (e.g. `array-join-for-tailwind-classes.md`), not numbered. Reference an ADR by its slug, not a number.
- **No `status` field.** Git is the source of truth for an ADR's standing:
  - **Accepted and active** — the ADR is in `main`.
  - **Proposed** — the ADR exists only on a branch that has not been merged into `main`.
  - **Superseded / withdrawn** — the ADR is deleted from `main`. Its history remains in git, so a removed ADR can still be referenced by pointing to the last `main` commit that contained it.

## Records

- [**presentational-component-extraction**](presentational-component-extraction.md) — Presentational component extraction with `tailwind-variants`: extract small presentational components and define their variants with `tv()`, hiding Tailwind verbosity behind type-safe, semantic interfaces.
- [**array-join-for-tailwind-classes**](array-join-for-tailwind-classes.md) — Array `.join(" ")` for long Tailwind class strings: write long class lists (and `tv()` values) one class per line in an array joined with `" "`, with scope rules so short and conditional classes are left alone.
- [**type-aware-eslint-for-svelte-and-tests**](type-aware-eslint-for-svelte-and-tests.md) — Type-aware ESLint for `.svelte` files and tests: enable typescript-eslint's type-aware rules in component scripts and tests via `projectService` + `extraFileExtensions`, instead of disabling them and assuming `svelte-check` (a type-checker, not a linter) covers them.
