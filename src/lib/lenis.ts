import Lenis from "lenis"
import { lenisStore } from "$lib/stores/lenis.svelte"

export function createSmoothScroll(
  onScroll: (scrollY: number, progress: number) => void,
): () => void {
  const lenis = new Lenis({
    duration: 0.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.5,
    touchMultiplier: 0.5,
  })

  lenisStore.set(lenis)

  lenis.on("scroll", (instance: Lenis) => {
    onScroll(instance.scroll, instance.progress)
  })

  let frameId = requestAnimationFrame(function raf(time) {
    lenis.raf(time)
    frameId = requestAnimationFrame(raf)
  })

  return () => {
    cancelAnimationFrame(frameId)
    lenis.destroy()
    lenisStore.set(undefined)
  }
}
