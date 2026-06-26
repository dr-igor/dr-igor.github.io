<span
  class="inline-block rounded border px-1.5 py-0.5 align-middle font-mono text-[9.5px] tracking-wider text-gray-700 uppercase dark:text-gray-300"
  style="background: {ENGINE_COLOR[engine]}22; border-color: {ENGINE_COLOR[engine]}"
>
  {ENGINE_METHOD[engine]}
</span>

<script lang="ts">
  import { ENGINE_COLOR, ENGINE_METHOD, type EngineKey } from "./engines"

  interface Props {
    engine: EngineKey
  }

  let { engine }: Props = $props()
</script>
