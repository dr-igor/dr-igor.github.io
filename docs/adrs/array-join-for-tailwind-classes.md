---
date: 2026-06-25
decision-makers: Igor, Claude
---

# Array `.join(" ")` for Long Tailwind Class Strings

## Context and Problem Statement

Tailwind utility classes frequently produce long class strings that are hard to read and diff when written as a single string literal. This site has several examples already (more are expected as the content grows): `TagPill`/`EnginePill` carry ~12-class `<span>` strings, `SpectrumGlyph` and the explainer components carry long container strings, and `Navbar`/`Tabs` mix a static base with an inline conditional ternary inside the same `class` attribute.

With `tailwind-variants` (`tv()`) adopted per [presentational-component-extraction](presentational-component-extraction.md), the long strings now live both in component markup and inside `tv()` `base`/`variants`/`slots` values. We want a consistent way to make the long ones readable and to keep their diffs clean — without over-formatting short strings.

## Considered Options

1. **Array + `.join(" ")`** — write classes as array elements, one per line, joined into a string.
2. **Template literal** — backtick string with line breaks.
3. **String concatenation** — multiple concatenated string segments.

## Decision Outcome

We will use **array + `.join(" ")` with one class per line** for long Tailwind class strings.

### Scope rules

- **`tv()` values** — `base`, `variants`, and `slots` class lists: write as arrays, one class per line, joined. (`tv()` also accepts string arrays directly in many positions; prefer the array form for long lists.)
- **Long static class attributes** in component markup (e.g. `SpectrumGlyph`'s container, the explainer cards) that are not yet behind a `tv()` component: a `const` array joined in the `<script>`, referenced from the markup.
- **Short strings (3 or fewer classes):** leave as plain string literals.
- **Conditional / dynamic classes** (e.g. `Navbar` and `Tabs`, where the active state toggles colors): keep the Svelte conditional expression separate from the joined base — compose them at the use site (or model them as `tv()` variants) rather than folding the logic into the array.

### Consequences

- 👍 **One class per line makes diffs clean** — adding or removing a class is a single-line change.
- 👍 **Easy to scan visually** — each utility class is on its own line.
- 👎 **Slight runtime cost of array creation and join** (negligible in practice; hoist to a module-level `const` where the value is static).
- 👌 **Scope rules prevent over-application** to short strings and keep conditional class logic out of the array.

## More Information

### Related

- [presentational-component-extraction](presentational-component-extraction.md) — the `tv()` values formatted with this convention.
