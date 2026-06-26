import base from "@igorlabworks/eslint-config-typescript"
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
        // `projectService` + `extraFileExtensions` lets typescript-eslint build a
        // type-aware program for `.svelte` files, so the strict-typing rules
        // (no-explicit-any, no-unsafe-*, no-floating-promises, prefer-readonly,
        // consistent-type-assertions, naming-convention) run inside `<script>`.
        // svelte-check type-checks templates; it does not enforce these lints.
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
      // Runes (`$props`/`$state`/`$derived`) require `let`; the rune-aware rule
      // replaces core prefer-const, which can't see the compiler's reassignment.
      "prefer-const": "off",
      "svelte/prefer-const": "error",
    },
  },
  {
    // SvelteKit page options (`prerender`/`ssr`/`csr`) are framework-mandated
    // boolean export names the app cannot choose; exempt only those from the
    // boolean-prefix rule so app-authored booleans here are still checked.
    files: ["src/**/+*.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has", "should", "can", "did", "will"],
          filter: { regex: "^(prerender|ssr|csr)$", match: false },
        },
      ],
    },
  },
)
