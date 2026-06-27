<script lang="ts">
  import type { Snippet } from "svelte"
  import { getInstrumentSlots } from "./context.svelte"

  let { children }: { children: Snippet } = $props()

  // Registration-only: Root renders this after the glyph strip. Synchronous
  // capture keeps the content in the SSR-prerendered HTML.
  // svelte-ignore state_referenced_locally
  getInstrumentSlots().acousticDescription = children
</script>
