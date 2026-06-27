<!--
  Registration pass: mounting the sub-components runs their slot writes. They
  emit no DOM, so this renders nothing visible — it only populates `slots`.
-->
{@render children()}

<!-- Root owns the layout and order; the sub-components only supplied content. -->
<div class="my-6">
  <div class="not-prose mb-2 flex items-center gap-1.5">
    <EnginePill {engine} />
    {#if isInLab}
      <LabPill />
    {/if}
  </div>

  {#if slots.acousticDescription}
    {@render slots.acousticDescription()}
  {/if}

  {#if slots.glyphStrip}
    {@const glyphStrip = slots.glyphStrip}
    <GlyphStrip children={glyphStrip} />
  {/if}

  {#if slots.recipe}
    {@render slots.recipe()}
  {/if}
</div>

<script lang="ts">
  import type { Snippet } from "svelte"
  import type { EngineKey } from "../engines"
  import EnginePill from "../EnginePill.svelte"
  import GlyphStrip from "../GlyphStrip.svelte"
  import LabPill from "../LabPill.svelte"
  import { createInstrumentSlots } from "./context.svelte"

  interface Props {
    engine: EngineKey
    isInLab?: boolean
    children: Snippet
  }

  let { engine, isInLab = false, children }: Props = $props()

  // Sub-components register their content here; Root reads `engine`/`isInLab`
  // directly (reactive) rather than threading them through context.
  const slots = createInstrumentSlots()
</script>
