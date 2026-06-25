import base from "@igor/eslint-config-typescript"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import svelteParser from "svelte-eslint-parser"
import tseslint from "typescript-eslint"
import svelteConfig from "./svelte.config.js"

export default tseslint.config(
  {
    ignores: [
      "build/",
      ".svelte-kit/",
      "dist/",
      "node_modules/",
      "*.config.js",
      "*.config.ts",
      "src/vitest-setup.ts",
    ],
  },
  ...base,
  ...svelte.configs["flat/recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: [".svelte"],
        svelteFeatures: { runes: true },
        svelteConfig,
      },
    },
    rules: {
      // Template markup consumes script variables; the rule can't see that usage.
      "no-useless-assignment": "off",
      // The site is served from a custom-domain root (base path is empty), so
      // plain internal hrefs never need base-prefixing via resolve().
      "svelte/no-navigation-without-resolve": "off",
      // svelte-check owns type-aware checks for components; these rules need a
      // TS program that isn't available once type-checking is disabled below.
      "@typescript-eslint/naming-convention": "off",
      // Runes (`$props`/`$state`/`$derived`) require `let`; the rune-aware rule
      // replaces core prefer-const, which can't see the compiler's reassignment.
      "prefer-const": "off",
      "svelte/prefer-const": "error",
    },
  },
  {
    // SvelteKit page-option exports (prerender/ssr/csr/trailingSlash) and load
    // functions are framework-mandated names that the app cannot choose.
    files: ["src/**/+*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // svelte-check is the authoritative type-checker for tests (it resolves
    // `.svelte` component imports, which typescript-eslint's own program cannot).
    files: ["**/*.test.ts", "**/*.spec.ts"],
    ...tseslint.configs.disableTypeChecked,
  },
)
