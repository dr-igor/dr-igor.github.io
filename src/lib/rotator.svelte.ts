export function createRotator(length: number, intervalMs: number) {
  let index = $state(0)
  let timer: ReturnType<typeof setInterval> | undefined

  function stop(): void {
    if (timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
  }

  function start(): void {
    stop()
    timer = setInterval(() => {
      index = (index + 1) % length
    }, intervalMs)
  }

  return {
    get index(): number {
      return index
    },
    start,
    stop,
  }
}
