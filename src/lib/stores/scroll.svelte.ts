function createScroll() {
  let y = $state(0)
  let progress = $state(0)

  return {
    get y(): number {
      return y
    },
    get progress(): number {
      return progress
    },
    set(nextY: number, nextProgress: number): void {
      y = nextY
      progress = nextProgress
    },
  }
}

export const scroll = createScroll()
