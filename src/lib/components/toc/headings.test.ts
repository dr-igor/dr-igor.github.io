import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { extractHeadings, observeActiveHeading } from "./headings"

function renderContent(html: string): HTMLElement {
  const container = document.createElement("div")
  container.innerHTML = html
  return container
}

describe("extractHeadings", () => {
  it("collects each heading with its id, trimmed text, and numeric level", () => {
    const content = renderContent(`
      <h2 id="intro">  Intro  </h2>
      <h3 id="setup">Setup</h3>
    `)

    const headings = extractHeadings(content)

    expect(headings.map(({ id, text, level }) => ({ id, text, level }))).toEqual([
      { id: "intro", text: "Intro", level: 2 },
      { id: "setup", text: "Setup", level: 3 },
    ])
    expect(headings.map((heading) => heading.el.tagName)).toEqual(["H2", "H3"])
  })

  it("ignores headings that have no id", () => {
    const content = renderContent(`
      <h2 id="kept">Kept</h2>
      <h2>Skipped</h2>
      <h3 id="also-kept">Also kept</h3>
    `)

    expect(extractHeadings(content).map((heading) => heading.id)).toEqual([
      "kept",
      "also-kept",
    ])
  })

  it("returns nothing when fewer than two headings qualify", () => {
    const content = renderContent(`<h2 id="lonely">Lonely</h2>`)

    expect(extractHeadings(content)).toEqual([])
  })
})

class FakeIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin = ""
  readonly scrollMargin = ""
  readonly thresholds: readonly number[] = []
  disconnected = false

  private readonly callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    observers.push(this)
  }

  observe(): void {}
  unobserve(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  disconnect(): void {
    this.disconnected = true
  }

  emit(ids: { id: string; isIntersecting: boolean }[]): void {
    const entries = ids.map(({ id, isIntersecting }) => {
      const target = document.createElement("h2")
      target.id = id
      const rect = target.getBoundingClientRect()
      return {
        target,
        isIntersecting,
        intersectionRatio: isIntersecting ? 1 : 0,
        boundingClientRect: rect,
        intersectionRect: rect,
        rootBounds: null,
        time: 0,
      }
    })
    this.callback(entries, this)
  }
}

let observers: FakeIntersectionObserver[] = []

function makeHeadings(ids: string[]) {
  return ids.map((id) => ({
    el: document.createElement("h2"),
    id,
    text: id,
    level: 2,
  }))
}

describe("observeActiveHeading", () => {
  beforeEach(() => {
    observers = []
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("reports the lowest visible heading when several share the band", () => {
    const onActive = vi.fn()

    observeActiveHeading(makeHeadings(["one", "two", "three"]), onActive)
    observers[0].emit([
      { id: "one", isIntersecting: true },
      { id: "two", isIntersecting: true },
    ])

    expect(onActive).toHaveBeenLastCalledWith("two")
  })

  it("drops a heading once it leaves the band", () => {
    const onActive = vi.fn()

    observeActiveHeading(makeHeadings(["one", "two"]), onActive)
    observers[0].emit([
      { id: "one", isIntersecting: true },
      { id: "two", isIntersecting: true },
    ])
    observers[0].emit([{ id: "two", isIntersecting: false }])

    expect(onActive).toHaveBeenLastCalledWith("one")
  })

  it("disconnects the observer on teardown", () => {
    const stop = observeActiveHeading(makeHeadings(["one", "two"]), vi.fn())

    stop()

    expect(observers[0].disconnected).toBe(true)
  })
})
