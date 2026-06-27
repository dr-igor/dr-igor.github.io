const STORAGE_KEY = "theme"

// Mirrors --color-page in app.css; drives Safari's adaptive browser chrome.
const THEME_COLOR = { light: "#f9fafb", dark: "#09090b" } as const

function readInitialIsDark(): boolean {
  if (typeof document === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

function createTheme() {
  let isDark = $state(readInitialIsDark())

  function apply(nextIsDark: boolean): void {
    isDark = nextIsDark
    if (typeof document === "undefined") return
    document.documentElement.classList.toggle("dark", nextIsDark)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", nextIsDark ? THEME_COLOR.dark : THEME_COLOR.light)
    localStorage.setItem(STORAGE_KEY, nextIsDark ? "dark" : "light")
  }

  return {
    get isDark(): boolean {
      return isDark
    },
    toggle(): void {
      apply(!isDark)
    },
    set(nextIsDark: boolean): void {
      apply(nextIsDark)
    },
  }
}

export const theme = createTheme()
