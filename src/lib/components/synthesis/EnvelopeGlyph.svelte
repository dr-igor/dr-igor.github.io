<GlyphCard label="amp env">
  <line
    x1="0"
    y1="40"
    x2="100"
    y2="40"
    stroke-width="1"
    class="stroke-current text-gray-300 dark:text-gray-600"
  />
  <polyline
    points={ENVELOPE_POINTS[shape]}
    fill="none"
    stroke-width="2"
    stroke-linejoin="round"
    class="stroke-current text-emerald-600 dark:text-emerald-400"
  />
</GlyphCard>

<script lang="ts">
  import GlyphCard from "./GlyphCard.svelte"
  import { ENVELOPE_POINTS, type EnvShape } from "./glyphGeometry"

  interface Props {
    shape: EnvShape
  }

  let { shape }: Props = $props()
</script>
