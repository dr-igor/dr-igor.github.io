<span
  class="inline-block rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 align-middle font-mono text-[10px] tracking-wider text-gray-500 uppercase dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400"
>
  {@render children()}
</span>

<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>
