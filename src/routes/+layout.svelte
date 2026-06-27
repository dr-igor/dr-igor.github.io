<div
  class={pageBackground({
    class: "flex min-h-screen flex-col transition-colors duration-300",
  })}
>
  <Navbar />

  <div class="flex grow flex-col pt-16">
    {@render children()}
  </div>

  {#if !isHome}
    <footer class="py-8 text-center text-sm text-muted">
      <p>2025-2026 © Igor Petrik</p>
    </footer>
  {/if}
</div>

<script lang="ts">
  import type { Snippet } from "svelte"
  import "../app.css"
  import { page } from "$app/state"
  import Navbar from "$lib/components/Navbar.svelte"
  import { createSmoothScroll } from "$lib/lenis"
  import { scroll } from "$lib/stores/scroll.svelte"
  import { pageBackground } from "$lib/styles/brand"

  let { children }: { children: Snippet } = $props()

  const isHome = $derived(page.url.pathname === "/")

  $effect(() => createSmoothScroll((y, progress) => scroll.set(y, progress)))
</script>
