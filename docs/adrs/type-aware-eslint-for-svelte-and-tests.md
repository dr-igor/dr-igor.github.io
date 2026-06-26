---
date: 2026-06-25
decision-makers: Igor, Claude
---

# Type-Aware ESLint for `.svelte` Files and Tests

## Context and Problem Statement

The project's ESLint config extends `@igorlabworks/eslint-config-typescript`, whose value is its **type-aware** strict-typing rules: `no-explicit-any`, `consistent-type-assertions` (ban `as`/`satisfies`), `no-unsafe-*`, `no-floating-promises`, `no-misused-promises`, `prefer-readonly`, `switch-exhaustiveness-check`, and the boolean-prefix `naming-convention`. These require a TypeScript program (`parserOptions.projectService`) to run.

The config previously applied `...tseslint.configs.disableTypeChecked` to both `.svelte` files and test files, with the rationale that "svelte-check owns type-aware checks." It also disabled `naming-convention` for `.svelte` files (claimed to need a TS program that was unavailable) and disabled it wholesale for `src/**/+*.ts`.

The problem: **`svelte-check` is a type-checker, not a linter.** It reports type errors; it does not enforce ESLint rules. So disabling type-aware linting did not delegate those rules to another tool — it disabled them entirely for every component `<script>` and every test. Two consequences directly contradicted the opinionated conventions this config is meant to enforce:

- `consistent-type-assertions` is itself type-aware, so the signature "no `as`/`satisfies`" rule was off in all `.svelte` files and all tests.
- Disabling type-aware rules in tests defeated the "behavioral tests don't reach into private state via `(x as any).y`" convention, which relies on `no-explicit-any` + `consistent-type-assertions`.

## Considered Options

1. **Disable type-aware linting in `.svelte`/tests; rely on `svelte-check`** (the prior state).
2. **Enable type-aware linting everywhere** via `projectService` + `extraFileExtensions: [".svelte"]`, keeping only genuinely Svelte-incompatible rules off.
3. **Add a separate `eslint-plugin-svelte` rule set** to approximate the type-aware rules without a TS program.

## Decision Outcome

We chose **Option 2: enable type-aware linting for `.svelte` files and tests.**

This was validated empirically before adopting it. typescript-eslint v8's Project Service API supports extra file extensions, so a type-aware program can be built for `.svelte` files when the config sets `parserOptions.projectService: true` and `extraFileExtensions: [".svelte"]` (both already present). A fixture containing `any`, an `as` cast, a floating promise, and an unprefixed boolean fired all the expected rules inside a `.svelte` `<script>`. Test files that import `.svelte` components also lint cleanly under type-aware mode, so the "typescript-eslint can't resolve `.svelte` imports" rationale no longer holds with `projectService`.

Enabling the rules surfaced real, previously-hidden violations that were then fixed:

- `Toc.svelte` — booleans `collapsed`/`drawerOpen` lacked the `is`/`has` prefix → renamed `isCollapsed`/`isDrawerOpen`.
- `+layout.svelte` — `let { children } = $props()` was untyped, making `{@render children()}` an unsafe call on `any` → typed as `Snippet`.

### What changed in `eslint.config.ts`

- **Removed** both `...tseslint.configs.disableTypeChecked` blocks (for `.svelte` and for `**/*.{test,spec}.ts`).
- **Removed** the `@typescript-eslint/naming-convention: "off"` override for `.svelte` files — it works once the type program is available.
- **Narrowed** the `src/**/+*.ts` `naming-convention` exemption from a blanket `off` to a `filter` that exempts only the framework-mandated boolean page options (`prerender`/`ssr`/`csr`), so app-authored booleans in load functions are still checked.

### Overrides deliberately kept

- `prefer-const: "off"` + `svelte/prefer-const: "error"` — the rune-aware replacement (runes require `let`; the core rule can't see compiler reassignment). This is the model for substituting a Svelte-aware rule for a core one.
- `no-useless-assignment: "off"` — genuine Svelte limitation: template markup consumes script variables the rule can't see.
- `svelte/no-navigation-without-resolve: "off"` — a SvelteKit base-path safety rule, not an opinionated-convention proxy; the site is served from a custom-domain root with an empty base path (no `paths.base` in `svelte.config.js`).

### Consequences

- 👍 The full strict-typing rule set now runs in component `<script>` blocks and tests — the conventions the shared config exists to enforce are actually enforced.
- 👍 Real type holes (untyped `$props()`, unprefixed booleans) are caught instead of silently passing.
- 👎 Type-aware linting of `.svelte` files is slower (~20s full-project run at current size) and degrades as the project grows — a known typescript-eslint/Svelte limitation. If it becomes painful, the experimental `typescript-eslint-parser-for-extra-files` package targets this.
- 👌 `svelte-check` remains the authority for template/component **type errors**; ESLint owns **lint rules**. The two are complementary, not interchangeable — do not reintroduce `disableTypeChecked` to "let svelte-check handle it."

## More Information

### Verification

`eslint .` → 0 problems · `svelte-check` → 0 errors · `vitest` → 12/12 passing.

### References

- [typescript-eslint — Typed Linting with Project Service](https://typescript-eslint.io/blog/project-service/) (extra-file-extension support).
- [eslint-plugin-svelte — User Guide](https://sveltejs.github.io/eslint-plugin-svelte/user-guide/) (type-aware flat config for `.svelte`).
- [typescript-eslint #8153](https://github.com/typescript-eslint/typescript-eslint/issues/8153) — `consistent-type-assertions` requires type information.

### Related

- [presentational-component-extraction](presentational-component-extraction.md), [array-join-for-tailwind-classes](array-join-for-tailwind-classes.md).
