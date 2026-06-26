<GlyphCard label="spectrum">
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
</GlyphCard>

<script lang="ts">
  import GlyphCard from "./GlyphCard.svelte"
  import { spectrum, type SpecShape } from "./glyphGeometry"

  interface Props {
    shape: SpecShape
  }

  let { shape }: Props = $props()

  const bars = $derived(spectrum(shape))
</script>
