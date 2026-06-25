import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { createRotator } from "./rotator.svelte"

describe("createRotator", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("advances the index on each interval tick", () => {
    const rotator = createRotator(3, 1000)
    rotator.start()

    expect(rotator.index).toBe(0)
    vi.advanceTimersByTime(1000)
    expect(rotator.index).toBe(1)
    vi.advanceTimersByTime(1000)
    expect(rotator.index).toBe(2)
  })

  it("wraps back to the start after the last item", () => {
    const rotator = createRotator(2, 1000)
    rotator.start()

    vi.advanceTimersByTime(2000)
    expect(rotator.index).toBe(0)
  })

  it("stops advancing once stopped", () => {
    const rotator = createRotator(3, 1000)
    rotator.start()
    rotator.stop()

    vi.advanceTimersByTime(5000)
    expect(rotator.index).toBe(0)
  })
})
