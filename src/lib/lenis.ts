import Lenis from "lenis"
import { lenis } from "$lib/stores/lenis.svelte"

export function createSmoothScroll(
  onScroll: (scrollY: number, progress: number) => void,
): () => void {
  const instance = new Lenis({
    duration: 0.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.5,
    touchMultiplier: 0.5,
  })

  lenis.set(instance)

  instance.on("scroll", (current: Lenis) => {
    onScroll(current.scroll, current.progress)
  })

  let frameId = requestAnimationFrame(function raf(time) {
    instance.raf(time)
    frameId = requestAnimationFrame(raf)
  })

  return () => {
    cancelAnimationFrame(frameId)
    instance.destroy()
    lenis.set(undefined)
  }
}
