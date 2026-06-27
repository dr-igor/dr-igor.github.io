<Instrument.Root engine="ADD" isInLab>
  <Instrument.AcousticDescription>ACOUSTIC_TEXT</Instrument.AcousticDescription>
  <Instrument.GlyphStrip>GLYPH_TEXT</Instrument.GlyphStrip>
  <Instrument.Recipe>RECIPE_TEXT</Instrument.Recipe>
</Instrument.Root>

<script lang="ts">
  // Test-only fixture: authors the slots out of order (acoustic, glyph, recipe)
  // to prove Root re-orders them to recipe → glyph → acoustic.
  import Instrument from "./index"
</script>
