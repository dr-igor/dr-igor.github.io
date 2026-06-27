<MetaTags {...seo(page.url.pathname, { title: String(page.status) })} />

<div class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
  <h1 class={brandHeading({ size: "xl", class: "mb-4" })}>
    {page.status}
  </h1>
  <p class="mb-8 text-lg text-muted">
    {page.error?.message ?? "Something went wrong."}
  </p>
  <a href="/" class="text-sm font-medium text-accent hover:underline"> Return home </a>
</div>

<script lang="ts">
  import { MetaTags } from "svelte-meta-tags"
  import { page } from "$app/state"
  import { seo } from "$lib/seo"
  import { brandHeading } from "$lib/styles/brand"
</script>
