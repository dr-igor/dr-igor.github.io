---
date: 2026-06-25
decision-makers: Igor, Claude
---

# Presentational Component Extraction with `tailwind-variants`

## Context and Problem Statement

This site is built with SvelteKit (Svelte 5 runes), Tailwind CSS v4, and [`bits-ui`](https://www.bits-ui.com/) primitives, with articles authored in `mdsvex`. Every component styles itself with hand-written utility classes.

At time of writing the synthesis components are the clearest pain point (though others are expected as the content grows): `EnginePill`, `TagPill`, and `LabPill` are near-duplicate `<span>` elements that share one "pill" base (`inline-block rounded border px-1.5 py-0.5 align-middle font-mono tracking-wider uppercase`) and differ only by color and a couple of size tweaks. The shared base is copy-pasted three times, so a change to pill shape means editing three files. Beyond the pills, the explainer components (`CueHierarchy`, `ComputationalMethods`, etc.) repeat the same utility clusters many times over.

We want to reduce this duplication and give the variants a single, type-safe definition, without switching away from Tailwind.

## Decision Drivers

- Should address Tailwind class verbosity and duplication without switching away from Tailwind.
- Should support type-safe, variant-based visual configurations (e.g. the pill colors).
- Must keep presentational components free of business logic.
- Prefer a maintained library over a hand-rolled helper we have to own and maintain.
- `bits-ui` is headless and ships no styling utility, so the styling layer is ours to choose.

## Considered Options

1. **[`tailwind-variants`](https://www.tailwind-variants.org/) (`tv()`)** — a standalone, framework-agnostic, maintained library (HeroUI, formerly NextUI). v3.x supports Tailwind v4 (requires `tailwind-merge` v3). Provides variant / compound-variant / slot APIs and Tailwind class-conflict resolution via `tailwind-merge`.
2. **`class-variance-authority` (cva)** — a similar maintained variant API with a smaller surface; no `tailwind-merge` conflict resolution unless paired separately.
3. **Hand-rolled typed variant-map** — a `Record<Variant, string>` we maintain ourselves; zero dependencies but our code to own.
4. **Status quo** — keep the inline class strings duplicated per component.

## Decision Outcome

Chosen option: **(1) `tailwind-variants` (`tv()`)**, used to drive small presentational components that encapsulate Tailwind styling behind a semantic interface.

We will extract presentational components and define their variants with `tv()`; e.g.:

- `Pill` — the shared pill base with a `variant` for the engine / tag / lab color treatments; `EnginePill`, `TagPill`, and `LabPill` become thin call sites that keep their data lookups (`ENGINE_COLOR`, `ENGINE_METHOD`) in the consuming layer, not the styled component.
- The same `tv()` pattern is available to the repeated explainer clusters as they warrant extraction (e.g. a card container with density variants).

We chose `tv()` over a hand-rolled variant-map because Igor prefers adopting a maintained solution rather than maintaining his own, and `tv()` adds type-safe variant definitions with defaults plus `tailwind-merge`-based conflict resolution at the call site. We chose `tv()` over cva for its built-in `tailwind-merge` integration and slot support, which the explainer extractions are likely to need.

Adopting `tv()` introduces `tailwind-variants` (v3.x) as a dependency, with `tailwind-merge` (v3) as a peer; `tv()` is a standalone library that works with any Svelte/`bits-ui` setup.

### Consequences

- 👍 **Tailwind verbosity is hidden behind semantic component interfaces** — consumers write `<Pill variant="lab" />` instead of raw utility classes, and the pill base is defined once.
- 👍 **`tailwind-variants` provides type-safe variant definitions** with defaults; an unknown `variant` is a type error.
- 👍 **Maintained dependency** — we don't own the variant machinery or class-conflict resolution.
- 👍 **Components stay purely presentational** — data lookups remain in the call sites.
- 👌 **Adds a dependency and a layer of components**, but each component is small and focused, and the dep is a single, widely-used package.

## More Information

### Dependency notes

- Use `tailwind-variants` **v3.x** with Tailwind v4; `tailwind-merge` v3 is a peer dependency and must be installed alongside it (it is not bundled). The implementation pins `tailwind-variants@^3.2.2` and `tailwind-merge@^3`. The `responsiveVariants` feature is unavailable under Tailwind v4; add responsive classes manually where needed.
- `bits-ui` is headless/unstyled and offers no built-in class utility, so `tv()` is a "bring your own" choice rather than a replacement of anything bits-ui provides.

### Related

- [array-join-for-tailwind-classes](array-join-for-tailwind-classes.md) — the array-`.join(" ")` convention used to format long `tv()` slot/variant values.
