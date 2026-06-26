<div class={pageBackground()}>
  <div class="mx-auto max-w-6xl px-4 py-16 lg:flex lg:gap-8">
    <Toc {contentEl} {depth} />

    <article class="min-w-0 max-w-4xl flex-1">
      <header class="mb-12" in:fly={{ y: 20, duration: 600 }}>
        <h1 class={brandHeading({ size: "sm", class: "mb-4" })}>
          {title}
        </h1>
        <p class="mb-2 text-xl text-gray-600 dark:text-gray-400">{description}</p>
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
  import { fade, fly } from "svelte/transition"
  import Toc from "$lib/components/toc/Toc.svelte"
  import { brandHeading, pageBackground } from "$lib/styles/brand"

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

  const formattedDate = $derived(
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )
</script>
