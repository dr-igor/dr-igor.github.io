<div
  class="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-1.5 pt-1.5 pb-1 dark:border-zinc-700 dark:bg-zinc-900/60"
>
  <svg viewBox="0 0 100 44" class="block h-9 w-full" role="presentation">
    <line
      x1="0"
      y1="40"
      x2="100"
      y2="40"
      stroke-width="1"
      class="stroke-current text-gray-300 dark:text-gray-600"
    />
    {#if bars.kind === "noise"}
      <rect
        x={bars.x}
        y="8"
        width={bars.width}
        height="32"
        opacity="0.3"
        class="fill-current text-amber-600 dark:text-amber-400"
      />
    {:else}
      {#each bars.bars as bar (bar.x)}
        <rect
          x={bar.x - 1.4}
          y={40 - bar.height}
          width="2.8"
          height={bar.height}
          class="fill-current text-amber-600 dark:text-amber-400"
        />
      {/each}
    {/if}
  </svg>
  <span
    class="block truncate text-center text-[8.5px] tracking-wider text-gray-400 uppercase dark:text-gray-500"
  >
    spectrum
  </span>
</div>

<script lang="ts">
  import { spectrum, type SpecShape } from "./glyphGeometry"

  interface Props {
    shape: SpecShape
  }

  let { shape }: Props = $props()

  const bars = $derived(spectrum(shape))
</script>
