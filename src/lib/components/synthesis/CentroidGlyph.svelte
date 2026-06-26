<GlyphCard label="centroid vs pitch">
  <line
    x1="0"
    y1="30"
    x2="100"
    y2="30"
    stroke-width="1"
    stroke-dasharray="3 3"
    class="stroke-current text-gray-400 dark:text-gray-600"
  />
  <polyline
    points={CENTROID_POINTS[shape]}
    fill="none"
    stroke-width="2"
    stroke-linejoin="round"
    class="stroke-current text-violet-600 dark:text-violet-400"
  />
</GlyphCard>

<script lang="ts">
  import GlyphCard from "./GlyphCard.svelte"
  import { CENTROID_POINTS, type CenShape } from "./glyphGeometry"

  interface Props {
    shape: CenShape
  }

  let { shape }: Props = $props()
</script>
