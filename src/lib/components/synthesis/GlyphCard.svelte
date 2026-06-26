<div class={CONTAINER}>
  <svg viewBox="0 0 100 44" class="block h-9 w-full" role="presentation">
    {@render children()}
  </svg>
  <span class={LABEL}>{label}</span>
</div>

<script lang="ts">
  import type { Snippet } from "svelte"

  const CONTAINER = [
    "min-w-0",
    "flex-1",
    "rounded-lg",
    "border",
    "border-gray-200",
    "bg-gray-50",
    "px-1.5",
    "pt-1.5",
    "pb-1",
    "dark:border-zinc-700",
    "dark:bg-zinc-900/60",
  ].join(" ")

  const LABEL = [
    "block",
    "truncate",
    "text-center",
    "text-[8.5px]",
    "tracking-wider",
    "text-gray-400",
    "uppercase",
    "dark:text-gray-500",
  ].join(" ")

  interface Props {
    label: string
    children: Snippet
  }

  let { label, children }: Props = $props()
</script>
