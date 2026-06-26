<div class="not-prose my-2 flex gap-2">{@render children()}</div>

<script lang="ts">
  import type { Snippet } from "svelte"

  let { children }: { children: Snippet } = $props()
</script>
