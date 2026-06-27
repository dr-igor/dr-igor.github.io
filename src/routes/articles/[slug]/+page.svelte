<MetaTags
  {...seo(page.url.pathname, {
    title: data.frontmatter.title,
    description: data.frontmatter.description,
    openGraph: {
      type: "article",
      article: { publishedTime: data.frontmatter.date },
    },
  })}
/>

{#if article}
  {@const Article = article.component}
  <Article />
{/if}

<script lang="ts">
  import { MetaTags } from "svelte-meta-tags"
  import { page } from "$app/state"
  import { getArticle } from "$lib/content/articles"
  import { seo } from "$lib/seo"
  import type { PageProps } from "./$types"

  let { data }: PageProps = $props()

  const article = $derived(getArticle(data.slug))
</script>
