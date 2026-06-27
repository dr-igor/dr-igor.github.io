<MetaTags
  {...seo(page.url.pathname, {
    title: "Articles",
    description: "Exploring the intersection of audio, perception, and technology.",
  })}
/>

<div class={pageBackground()}>
  <div class="mx-auto max-w-5xl px-4 py-16">
    <h1
      in:fly={{ y: -20, duration: 600 }}
      class={brandHeading({ size: "sm", class: "mb-8" })}
    >
      Articles
    </h1>

    <p in:fade={{ duration: 600, delay: 200 }} class="mb-12 text-xl text-muted">
      Exploring the intersection of audio, perception, and technology
    </p>

    <div class="space-y-8">
      {#each articles as article, index (article.slug)}
        <article
          in:fly={{ y: 20, duration: 500, delay: index * 100 }}
          class={ARTICLE_CARD}
        >
          <a href="/articles/{article.slug}" class="block">
            <h2 class={ARTICLE_TITLE}>
              {article.frontmatter.title}
            </h2>
            <p class="mb-4 text-muted">
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
  import { MetaTags } from "svelte-meta-tags"
  import { page } from "$app/state"
  import { articles } from "$lib/content/articles"
  import { seo } from "$lib/seo"
  import { brandHeading, pageBackground } from "$lib/styles/brand"

  const ARTICLE_CARD = [
    "rounded-xl",
    "border",
    "border-gray-200",
    "bg-white",
    "p-8",
    "shadow-lg",
    "transition",
    "hover:scale-[1.02]",
    "hover:shadow-xl",
    "dark:border-zinc-800",
    "dark:bg-zinc-900",
  ].join(" ")

  const ARTICLE_TITLE = [
    "mb-3",
    "text-3xl",
    "font-bold",
    "text-gray-900",
    "transition-colors",
    "hover:text-purple-600",
    "dark:text-gray-100",
    "dark:hover:text-purple-400",
  ].join(" ")

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
</script>
