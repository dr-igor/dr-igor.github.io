<div
  class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 transition-colors duration-300 dark:from-zinc-950 dark:to-neutral-950"
>
  <Navbar />

  <div class="pt-16">
    {@render children()}
  </div>

  <footer
    class="pointer-events-none fixed bottom-6 left-0 right-0 text-center text-sm text-gray-600 dark:text-gray-400"
  >
    <p>2025 © Igor Petrik</p>
  </footer>
</div>

<script lang="ts">
  import "../app.css"
  import Navbar from "$lib/components/Navbar.svelte"
  import { createSmoothScroll } from "$lib/lenis"
  import { scroll } from "$lib/stores/scroll.svelte"

  let { children } = $props()

  $effect(() => createSmoothScroll((y, progress) => scroll.set(y, progress)))
</script>
