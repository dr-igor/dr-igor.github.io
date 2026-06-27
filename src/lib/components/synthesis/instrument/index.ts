import AcousticDescription from "./AcousticDescription.svelte"
import GlyphStrip from "./GlyphStrip.svelte"
import Recipe from "./Recipe.svelte"
import Root from "./Root.svelte"

/**
 * Compound `Instrument` component. `Root` owns the layout and render order and
 * derives the engine/lab pills from its props; the sub-components carry only
 * content and register it into Root's context. Use via member syntax:
 *
 *   <Instrument.Root engine="ADD" isInLab>
 *     <Instrument.Recipe>…</Instrument.Recipe>
 *     <Instrument.GlyphStrip>…</Instrument.GlyphStrip>
 *     <Instrument.AcousticDescription>…</Instrument.AcousticDescription>
 *   </Instrument.Root>
 */
export default { Root, Recipe, GlyphStrip, AcousticDescription }
