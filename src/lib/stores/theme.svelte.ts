const STORAGE_KEY = "theme"

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
