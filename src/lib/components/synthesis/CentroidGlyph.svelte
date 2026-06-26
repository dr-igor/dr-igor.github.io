<div
  class="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-1.5 pt-1.5 pb-1 dark:border-zinc-700 dark:bg-zinc-900/60"
>
  <svg viewBox="0 0 100 44" class="block h-9 w-full" role="presentation">
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
  </svg>
  <span
    class="block truncate text-center text-[8.5px] tracking-wider text-gray-400 uppercase dark:text-gray-500"
  >
    centroid vs pitch
  </span>
</div>

<script lang="ts">
  import { CENTROID_POINTS, type CenShape } from "./glyphGeometry"

  interface Props {
    shape: CenShape
  }

  let { shape }: Props = $props()
</script>
