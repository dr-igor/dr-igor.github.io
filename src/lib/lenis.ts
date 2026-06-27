import Lenis from "lenis"
import { prefersReducedMotion } from "svelte/motion"
import { lenis } from "$lib/stores/lenis.svelte"

type ScrollReporter = (scrollY: number, progress: number) => void

export function createSmoothScroll(onScroll: ScrollReporter): () => void {
  return prefersReducedMotion.current
    ? trackNativeScroll(onScroll)
    : runSmoothScroll(onScroll)
}

function runSmoothScroll(onScroll: ScrollReporter): () => void {
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

function trackNativeScroll(onScroll: ScrollReporter): () => void {
  function report(): void {
    const { scrollHeight, clientHeight } = document.documentElement
    const max = scrollHeight - clientHeight
    onScroll(window.scrollY, max > 0 ? window.scrollY / max : 0)
  }

  report()
  window.addEventListener("scroll", report, { passive: true })

  return () => window.removeEventListener("scroll", report)
}
