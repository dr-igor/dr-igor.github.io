<div
  class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-neutral-950"
>
  <article class="mx-auto max-w-4xl px-4 py-16">
    <header class="mb-12" in:fly={{ y: 20, duration: 600 }}>
      <h1
        class="font-display mb-4 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 bg-clip-text text-5xl font-bold text-transparent dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 md:text-6xl"
      >
        {title}
      </h1>
      <p class="mb-2 text-xl text-gray-600 dark:text-gray-400">{description}</p>
      <time class="text-sm text-gray-500 dark:text-gray-500">{formattedDate}</time>
    </header>

    <div
      in:fade={{ duration: 800, delay: 200 }}
      class="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-3xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-purple-400 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:text-purple-600 dark:prose-code:bg-gray-800 dark:prose-code:text-purple-400"
    >
      {@render children()}
    </div>
  </article>
</div>

<script lang="ts">
  import type { Snippet } from "svelte"
  import { fade, fly } from "svelte/transition"

  interface Props {
    title: string
    description: string
    date: string
    children: Snippet
  }

  let { title, description, date, children }: Props = $props()

  const formattedDate = $derived(
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )
</script>
