import { getContext, setContext } from "svelte"
import type { Snippet } from "svelte"

const KEY = Symbol("instrument")

/**
 * Content slots a recipe can supply. Each sub-component (`<Instrument.Recipe>`,
 * `<Instrument.GlyphStrip>`, `<Instrument.AcousticDescription>`) writes its own
 * `children` snippet here; `<Instrument.Root>` decides where and in what order
 * they render. Slots are optional so an entry can omit any of them.
 */
export interface InstrumentSlots {
  recipe?: Snippet
  glyphStrip?: Snippet
  acousticDescription?: Snippet
}

/**
 * Create the per-recipe slot registry and publish it to descendants. The object
 * is `$state`, so a sub-component assigning `slots.recipe = children` during its
 * init reactively updates Root's render.
 */
export function createInstrumentSlots(): InstrumentSlots {
  const slots = $state<InstrumentSlots>({})
  setContext(KEY, slots)
  return slots
}

/** Read the enclosing Root's slot registry; throws if used outside `<Instrument.Root>`. */
export function getInstrumentSlots(): InstrumentSlots {
  const slots = getContext<InstrumentSlots | undefined>(KEY)
  if (!slots) {
    throw new Error(
      "<Instrument.*> sub-components must be used inside <Instrument.Root>",
    )
  }
  return slots
}
