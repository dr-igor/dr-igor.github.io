import { render } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import InstrumentFixture from "./InstrumentFixture.svelte"

describe("Instrument.Root", () => {
  it("renders the engine and lab pills from props", () => {
    const { getByText } = render(InstrumentFixture)

    // EnginePill renders ENGINE_METHOD["ADD"]; LabPill renders "Lab".
    expect(getByText("additive")).toBeInTheDocument()
    expect(getByText("Lab")).toBeInTheDocument()
  })

  it("renders slots in Root's order regardless of authoring order", () => {
    const { container } = render(InstrumentFixture)

    const text = container.textContent ?? ""
    const recipeIdx = text.indexOf("RECIPE_TEXT")
    const glyphIdx = text.indexOf("GLYPH_TEXT")
    const acousticIdx = text.indexOf("ACOUSTIC_TEXT")

    expect(recipeIdx).toBeGreaterThanOrEqual(0)
    expect(recipeIdx).toBeLessThan(glyphIdx)
    expect(glyphIdx).toBeLessThan(acousticIdx)
  })
})
