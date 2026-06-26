export interface Heading {
  el: HTMLElement
  id: string
  text: string
  level: number
}

export function extractHeadings(contentEl: HTMLElement): Heading[] {
  const nodes = [
    ...contentEl.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"),
  ].filter((node) => node.id)

  if (nodes.length < 2) return []

  return nodes.map((node) => ({
    el: node,
    id: node.id,
    text: node.textContent?.trim() ?? "",
    level: Number(node.tagName[1]),
  }))
}

export function observeActiveHeading(
  headings: Heading[],
  onActive: (id: string) => void,
): () => void {
  const visible = new Set<string>()

  // Top margin clears the fixed navbar; the -70% bottom narrows the "active"
  // band to the upper third of the viewport so one section wins at a time.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      }
      const active = headings.find((heading) => visible.has(heading.id))
      if (active) onActive(active.id)
    },
    { rootMargin: "-80px 0px -70% 0px" },
  )

  for (const heading of headings) observer.observe(heading.el)

  return () => observer.disconnect()
}
