import "@testing-library/jest-dom/vitest"

// jsdom does not implement `window.matchMedia`, but Svelte's `svelte/motion`
// (and our `MediaQuery` usage in the TOC) constructs a `MediaQuery` at import
// time, which calls it. Provide a minimal, inert stub so component modules can
// be imported under the test environment.
window.matchMedia = (query: string): MediaQueryList => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})
