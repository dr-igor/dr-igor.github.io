<svelte:head>
  <title>{page.status} · Igor Labworks</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center px-4 text-center">
  <h1
    class="font-display mb-4 bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 bg-clip-text text-7xl font-bold text-transparent dark:from-purple-400 dark:via-purple-300 dark:to-amber-400"
  >
    {page.status}
  </h1>
  <p class="mb-8 text-lg text-gray-600 dark:text-gray-400">
    {page.error?.message ?? "Something went wrong."}
  </p>
  <a
    href="/"
    class="text-sm font-medium text-purple-700 hover:underline dark:text-purple-400"
  >
    Return home
  </a>
</div>

<script lang="ts">
  import { page } from "$app/state"
</script>
