<div class={pageBackground({ class: "transition-colors duration-300" })}>
  <Navbar />

  <div class="pt-16">
    {@render children()}
  </div>

  <footer
    class="pointer-events-none fixed bottom-6 left-0 right-0 text-center text-sm text-gray-600 dark:text-gray-400"
  >
    <p>2025-2026 © Igor Petrik</p>
  </footer>
</div>

<script lang="ts">
  import type { Snippet } from "svelte"
  import "../app.css"
  import Navbar from "$lib/components/Navbar.svelte"
  import { createSmoothScroll } from "$lib/lenis"
  import { scroll } from "$lib/stores/scroll.svelte"
  import { pageBackground } from "$lib/styles/brand"

  let { children }: { children: Snippet } = $props()

  $effect(() => createSmoothScroll((y, progress) => scroll.set(y, progress)))
</script>
