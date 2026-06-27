<div class={pageBackground()}>
  <div class={CONTAINER} style="--toc-floor: {isTocCollapsed ? '2.5rem' : '14rem'}">
    <Toc {contentEl} {depth} bind:isCollapsed={isTocCollapsed} />

    <article class="col-start-2 min-w-0 max-w-4xl">
      <header class="mb-12" in:fly={{ y: 20, duration: 600 }}>
        <h1 class={brandHeading({ size: "sm", class: "mb-4" })}>
          {title}
        </h1>
        <p class="mb-2 text-xl text-muted">{description}</p>
        <time class="text-sm text-gray-500 dark:text-gray-500">{formattedDate}</time>
      </header>

      <div bind:this={contentEl} in:fade={{ duration: 800, delay: 200 }} class={PROSE}>
        {@render children()}
      </div>
    </article>
  </div>
</div>

<script lang="ts">
  import type { Snippet } from "svelte"
  import { browser } from "$app/environment"
  import { fade, fly } from "svelte/transition"
  import Toc from "$lib/components/toc/Toc.svelte"
  import { brandHeading, pageBackground } from "$lib/styles/brand"

  // A page-centred 3-column grid: the article holds the centre column while the TOC
  // lives in the left gutter. Above `lg` the left gutter reserves the rail's current
  // width (`--toc-floor`) so that, as the window narrows, the empty space closes
  // before the article does; the transition animates that resize and the rail's
  // arrival. Below `lg` both gutters collapse and the article spans full width.
  const CONTAINER = [
    "mx-auto",
    "grid",
    "w-full",
    "grid-cols-[minmax(0,1fr)_minmax(0,56rem)_minmax(0,1fr)]",
    "gap-x-0",
    "px-4",
    "py-16",
    "transition-[grid-template-columns,column-gap]",
    "duration-300",
    "motion-reduce:transition-none",
    "lg:grid-cols-[minmax(var(--toc-floor),1fr)_minmax(0,56rem)_minmax(0,1fr)]",
    "lg:gap-x-8",
  ].join(" ")

  const PROSE = [
    "prose",
    "prose-lg",
    "max-w-none",
    "dark:prose-invert",
    "prose-headings:font-bold",
    "prose-h2:mb-6",
    "prose-h2:mt-12",
    "prose-h2:text-3xl",
    "prose-h3:mb-4",
    "prose-h3:mt-8",
    "prose-h3:text-2xl",
    "prose-p:leading-relaxed",
    "prose-p:text-gray-700",
    "dark:prose-p:text-gray-300",
    "prose-a:text-purple-600",
    "prose-a:no-underline",
    "hover:prose-a:underline",
    "dark:prose-a:text-purple-400",
    "prose-strong:text-gray-900",
    "dark:prose-strong:text-gray-100",
    "prose-ul:text-gray-700",
    "dark:prose-ul:text-gray-300",
    "prose-code:rounded",
    "prose-code:bg-gray-100",
    "prose-code:px-1",
    "prose-code:text-purple-600",
    "dark:prose-code:bg-gray-800",
    "dark:prose-code:text-purple-400",
  ].join(" ")

  interface Props {
    title: string
    description: string
    date: string
    /** How many heading levels the table of contents shows. */
    depth?: number
    children: Snippet
  }

  let { title, description, date, depth = 2, children }: Props = $props()

  let contentEl = $state<HTMLElement | undefined>(undefined)

  // The rail's collapsed state lives here, not in the TOC, because the page grid
  // sizes its left gutter from it; the TOC binds to and toggles it.
  let isTocCollapsed = $state(
    browser && localStorage.getItem("toc-collapsed") === "true",
  )

  $effect(() => {
    if (browser) localStorage.setItem("toc-collapsed", String(isTocCollapsed))
  })

  const formattedDate = $derived(
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )
</script>
