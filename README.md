# dr-igor.github.io

Pages site for [igorlabworks.com](https://igorlabworks.com).

## Under Construction

A modern landing page and blog built with:

- [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5, runes) with `adapter-static`
- Vite + TypeScript
- Tailwind CSS v4
- [mdsvex](https://mdsvex.pngwn.io/) for Markdown articles
- [bits-ui](https://bits-ui.com/) + [`@lucide/svelte`](https://lucide.dev/) for UI
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling

Features:

- Light/Dark mode toggle (system-aware)
- Fully prerendered static pages (good SEO, no SPA redirect hacks)
- Scroll and entrance animations
- Interactive article components

## Development

### Using just

If you have [just](https://github.com/casey/just) installed:

```bash
just install    # Install dependencies
just dev        # Start development server
just dev-host   # Start dev server with network access
just build      # Build for production
just preview    # Preview production build
just lint       # Run ESLint
just check      # Type-check with svelte-check
just test       # Run the test suite
just format     # Format with Prettier
```

### Using npm directly

```bash
npm install
npm run dev
```

## Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start the dev server                 |
| `npm run build`        | Build and prerender the static site  |
| `npm run preview`      | Preview the production build locally |
| `npm run check`        | Type-check with `svelte-check`       |
| `npm run lint`         | Lint with ESLint                     |
| `npm run format`       | Format with Prettier                 |
| `npm run format:check` | Verify formatting                    |
| `npm test`             | Run the Vitest test suite            |

## Build output

The prerendered site is written to the `build` directory, ready for deployment to GitHub Pages (custom domain configured via `static/CNAME`).
