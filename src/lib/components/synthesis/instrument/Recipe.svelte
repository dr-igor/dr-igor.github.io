<script lang="ts">
  import type { Snippet } from "svelte"
  import { getInstrumentSlots } from "./context.svelte"

  let { children }: { children: Snippet } = $props()

  // Registration-only: hand the snippet to Root, render nothing here. The capture
  // is intentional and must be synchronous so the content is present during SSR
  // prerendering (an $effect would not run on the server).
  // svelte-ignore state_referenced_locally
  getInstrumentSlots().recipe = children
</script>
