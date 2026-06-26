<Pill variant="tag">{@render children()}</Pill>

<script lang="ts">
  import type { Snippet } from "svelte"
  import Pill from "./Pill.svelte"

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>
