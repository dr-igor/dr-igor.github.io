<svelte:head>
  <title>{page.status} · Igor Labworks</title>
</svelte:head>

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
  import { page } from "$app/state"
  import { brandHeading } from "$lib/styles/brand"
</script>
