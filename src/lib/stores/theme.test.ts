import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { theme } from "./theme.svelte"

function createMemoryStorage(): Storage {
  const data = new Map<string, string>()
  return {
    get length() {
      return data.size
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => {
      data.delete(key)
    },
    setItem: (key, value) => {
      data.set(key, value)
    },
  }
}

describe("theme store", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createMemoryStorage())
    document.documentElement.classList.remove("dark")
    theme.set(false)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("enabling dark mode sets the html class and persists the choice", () => {
    theme.set(true)

    expect(theme.isDark).toBe(true)
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(localStorage.getItem("theme")).toBe("dark")
  })

  it("disabling dark mode removes the class and persists light", () => {
    theme.set(true)
    theme.set(false)

    expect(theme.isDark).toBe(false)
    expect(document.documentElement.classList.contains("dark")).toBe(false)
    expect(localStorage.getItem("theme")).toBe("light")
  })

  it("toggle flips the current state", () => {
    expect(theme.isDark).toBe(false)

    theme.toggle()
    expect(theme.isDark).toBe(true)

    theme.toggle()
    expect(theme.isDark).toBe(false)
  })
})
