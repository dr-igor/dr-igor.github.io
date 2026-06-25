<svelte:head>
  <title>{data.frontmatter.title} · Igor Labworks</title>
  <meta name="description" content={data.frontmatter.description} />
</svelte:head>

{#if article}
  {@const Article = article.component}
  <Article />
{/if}

<script lang="ts">
  import { getArticle } from "$lib/content/articles"
  import type { PageProps } from "./$types"

  let { data }: PageProps = $props()

  const article = $derived(getArticle(data.slug))
</script>
