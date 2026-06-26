import type Lenis from "lenis"

function createLenisStore() {
  let instance = $state<Lenis | undefined>(undefined)

  return {
    get(): Lenis | undefined {
      return instance
    },
    set(next: Lenis | undefined): void {
      instance = next
    },
  }
}

export const lenisStore = createLenisStore()
