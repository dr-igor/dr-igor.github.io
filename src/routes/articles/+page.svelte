<svelte:head>
  <title>Articles · Igor Labworks</title>
  <meta
    name="description"
    content="Exploring the intersection of audio, perception, and technology."
  />
</svelte:head>

<div
  class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-neutral-950"
>
  <div class="mx-auto max-w-5xl px-4 py-16">
    <h1
      in:fly={{ y: -20, duration: 600 }}
      class="font-display mb-8 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 bg-clip-text text-5xl font-bold text-transparent dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 md:text-6xl"
    >
      Articles
    </h1>

    <p
      in:fade={{ duration: 600, delay: 200 }}
      class="mb-12 text-xl text-gray-600 dark:text-gray-400"
    >
      Exploring the intersection of audio, perception, and technology
    </p>

    <div class="space-y-8">
      {#each articles as article, index (article.slug)}
        <article
          in:fly={{ y: 20, duration: 500, delay: index * 100 }}
          class="rounded-xl border border-gray-200 bg-white p-8 shadow-lg transition hover:scale-[1.02] hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
        >
          <a href="/articles/{article.slug}" class="block">
            <h2
              class="mb-3 text-3xl font-bold text-gray-900 transition-colors hover:text-purple-600 dark:text-gray-100 dark:hover:text-purple-400"
            >
              {article.frontmatter.title}
            </h2>
            <p class="mb-4 text-gray-600 dark:text-gray-400">
              {article.frontmatter.description}
            </p>
            <time class="text-sm text-gray-500 dark:text-gray-500">
              {formatDate(article.frontmatter.date)}
            </time>
          </a>
        </article>
      {/each}
    </div>
  </div>
</div>

<script lang="ts">
  import { fade, fly } from "svelte/transition"
  import { articles } from "$lib/content/articles"

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
</script>
