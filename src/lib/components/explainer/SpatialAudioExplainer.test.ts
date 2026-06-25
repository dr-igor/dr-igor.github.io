import { fireEvent, render, screen } from "@testing-library/svelte"
import { describe, expect, it } from "vitest"
import SpatialAudioExplainer from "./SpatialAudioExplainer.svelte"

describe("SpatialAudioExplainer", () => {
  it("shows the cue hierarchy tab by default", () => {
    render(SpatialAudioExplainer)

    expect(screen.getByText("The Hierarchy: Which Cues Win?")).toBeInTheDocument()
  })

  it("switches to the key terms tab when selected", async () => {
    render(SpatialAudioExplainer)

    await fireEvent.click(screen.getByRole("button", { name: "Key Terms" }))

    expect(screen.getByText("Key Terms Explained")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Azimuth" })).toBeInTheDocument()
  })

  it("switches to the computational methods tab when selected", async () => {
    render(SpatialAudioExplainer)

    await fireEvent.click(screen.getByRole("button", { name: "Computational Methods" }))

    expect(screen.getByText("Localization (Where is it?)")).toBeInTheDocument()
  })
})
