<Pill
  variant="engine"
  style="background: {ENGINE_COLOR[engine]}22; border-color: {ENGINE_COLOR[engine]}"
>
  {ENGINE_METHOD[engine]}
</Pill>

<script lang="ts">
  import Pill from "./Pill.svelte"
  import { ENGINE_COLOR, ENGINE_METHOD, type EngineKey } from "./engines"

  interface Props {
    engine: EngineKey
  }

  let { engine }: Props = $props()
</script>
