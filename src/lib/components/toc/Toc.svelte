{#if allHeadings.length > 1}
  {@render desktopRail()}
  {@render mobileTrigger()}
  {#if drawerOpen}
    {@render mobileDrawer()}
  {/if}
{/if}

{#snippet desktopRail()}
  <aside class="hidden shrink-0 lg:block {collapsed ? 'w-10' : 'w-56'}">
    <div class="sticky top-20">
      {#if collapsed}
        <button
          type="button"
          onclick={() => (collapsed = false)}
          aria-expanded="false"
          aria-label="Expand table of contents"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white/60 text-gray-500 transition-colors hover:border-purple-500 hover:text-purple-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-gray-400 dark:hover:border-purple-400 dark:hover:text-purple-400"
        >
          <ChevronRight class="h-4 w-4" aria-hidden="true" />
        </button>
      {:else}
        <nav
          aria-label="Table of contents"
          class="rounded-xl border border-gray-200 bg-white/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/60"
          transition:fade={{ duration: 150 }}
        >
          <div class="mb-2 flex items-center justify-between">
            <span
              class="font-mono text-[10px] tracking-wider text-gray-400 uppercase dark:text-gray-500"
            >
              Contents
            </span>
            <button
              type="button"
              onclick={() => (collapsed = true)}
              aria-expanded="true"
              aria-label="Collapse table of contents"
              class="flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-400"
            >
              <ChevronLeft class="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {@render depthControl()}
          {@render tocList()}
        </nav>
      {/if}
    </div>
  </aside>
{/snippet}

{#snippet mobileTrigger()}
  <button
    type="button"
    onclick={() => (drawerOpen = true)}
    aria-controls="toc-drawer"
    aria-expanded={drawerOpen}
    class="sticky top-16 z-30 mb-6 flex items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-colors hover:text-purple-600 lg:hidden dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-gray-300 dark:hover:text-purple-400"
  >
    <List class="h-4 w-4" aria-hidden="true" />
    Contents
  </button>
{/snippet}

{#snippet mobileDrawer()}
  <div
    class="fixed inset-0 z-50 lg:hidden"
    role="dialog"
    aria-modal="true"
    aria-label="Table of contents"
  >
    <button
      type="button"
      aria-label="Close table of contents"
      onclick={() => (drawerOpen = false)}
      class="absolute inset-0 bg-black/40"
      transition:fade={{ duration: 150 }}
    ></button>
    <nav
      bind:this={drawerEl}
      id="toc-drawer"
      tabindex="-1"
      aria-label="Table of contents"
      transition:fly={{ x: -320, duration: 250 }}
      class="absolute top-0 left-0 flex h-full w-72 max-w-[80%] flex-col gap-2 overflow-y-auto border-r border-gray-200 bg-white p-4 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div class="flex items-center justify-between">
        <span
          class="font-mono text-[10px] tracking-wider text-gray-400 uppercase dark:text-gray-500"
        >
          Contents
        </span>
        <button
          type="button"
          onclick={() => (drawerOpen = false)}
          aria-label="Close table of contents"
          class="flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-400"
        >
          <X class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {@render depthControl()}
      {@render tocList()}
    </nav>
  </div>
{/snippet}

{#snippet depthControl()}
  {#if maxDepth > 1}
    <div
      class="mb-2 flex items-center justify-between gap-2 border-b border-gray-100 pb-2 dark:border-zinc-800/60"
    >
      <span
        class="font-mono text-[10px] tracking-wider text-gray-400 uppercase dark:text-gray-500"
      >
        Levels
      </span>
      <div
        class="flex items-center gap-1.5"
        role="group"
        aria-label="Heading levels shown"
      >
        <button
          type="button"
          onclick={() => setDepth(effectiveDepth - 1)}
          disabled={effectiveDepth <= 1}
          aria-label="Show fewer heading levels"
          class="flex h-5 w-5 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:border-purple-500 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500 dark:border-zinc-700 dark:text-gray-400 dark:hover:border-purple-400 dark:hover:text-purple-400 dark:disabled:hover:border-zinc-700 dark:disabled:hover:text-gray-400"
        >
          <Minus class="h-3 w-3" aria-hidden="true" />
        </button>
        <span
          class="w-3 text-center text-xs tabular-nums text-gray-600 dark:text-gray-300"
          aria-live="polite"
        >
          {effectiveDepth}
        </span>
        <button
          type="button"
          onclick={() => setDepth(effectiveDepth + 1)}
          disabled={effectiveDepth >= maxDepth}
          aria-label="Show more heading levels"
          class="flex h-5 w-5 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:border-purple-500 hover:text-purple-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500 dark:border-zinc-700 dark:text-gray-400 dark:hover:border-purple-400 dark:hover:text-purple-400 dark:disabled:hover:border-zinc-700 dark:disabled:hover:text-gray-400"
        >
          <Plus class="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  {/if}
{/snippet}

{#snippet tocList()}
  <ul class="space-y-0.5 text-sm">
    {#each shownHeadings as heading (heading.id)}
      <li>
        <a
          href="#{heading.id}"
          onclick={(event) => goTo(event, heading.id)}
          aria-current={activeId === heading.id ? "true" : undefined}
          style="padding-left: {0.75 + (heading.level - baseLevel) * 0.75}rem"
          class="block border-l-2 py-1 pr-2 leading-snug transition-colors {activeId ===
          heading.id
            ? 'border-purple-500 font-medium text-purple-600 dark:border-purple-400 dark:text-purple-400'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-purple-600 dark:text-gray-400 dark:hover:border-zinc-600 dark:hover:text-purple-400'}"
        >
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
{/snippet}

<script lang="ts">
  import { browser } from "$app/environment"
  import { ChevronLeft, ChevronRight, List, Minus, Plus, X } from "@lucide/svelte"
  import { untrack } from "svelte"
  import { fade, fly } from "svelte/transition"
  import { extractHeadings, observeActiveHeading } from "./headings"
  import { lenis } from "$lib/stores/lenis.svelte"

  interface Props {
    /** The rendered article container to scan for headings. */
    contentEl: HTMLElement | undefined
    /** Default number of heading levels to show, before any reader override. */
    depth?: number
  }

  let { contentEl, depth = 2 }: Props = $props()

  const allHeadings = $derived(contentEl ? extractHeadings(contentEl) : [])
  const baseLevel = $derived(
    allHeadings.length > 0
      ? Math.min(...allHeadings.map((heading) => heading.level))
      : 2,
  )
  const maxDepth = $derived(
    allHeadings.length > 0
      ? Math.max(...allHeadings.map((heading) => heading.level)) - baseLevel + 1
      : 1,
  )

  // Seeded once from localStorage or the prop, then driven by the reader.
  let selectedDepth = $state(
    untrack(() => (browser && Number(localStorage.getItem("toc-depth"))) || depth),
  )
  const effectiveDepth = $derived(Math.min(Math.max(selectedDepth, 1), maxDepth))
  const shownHeadings = $derived(
    allHeadings.filter((heading) => heading.level < baseLevel + effectiveDepth),
  )

  let activeId = $state<string | undefined>(undefined)
  let collapsed = $state(browser && localStorage.getItem("toc-collapsed") === "true")
  let drawerOpen = $state(false)
  let drawerEl = $state<HTMLElement | undefined>(undefined)

  function setDepth(next: number): void {
    selectedDepth = Math.min(Math.max(next, 1), maxDepth)
    if (browser) localStorage.setItem("toc-depth", String(selectedDepth))
  }

  function goTo(event: MouseEvent, id: string): void {
    event.preventDefault()
    activeId = id
    drawerOpen = false

    const target = document.getElementById(id)
    if (!target) return

    const instance = lenis.get()
    if (instance) instance.scrollTo(target, { offset: -80 })
    else target.scrollIntoView({ behavior: "smooth" })

    history.replaceState(null, "", `#${id}`)
  }

  $effect(() => {
    if (shownHeadings.length === 0) return
    return observeActiveHeading(shownHeadings, (id) => (activeId = id))
  })

  $effect(() => {
    if (browser) localStorage.setItem("toc-collapsed", String(collapsed))
  })

  // The open drawer is a modal dialog, so focus must move into it and Escape
  // must close it for keyboard and screen-reader users.
  $effect(() => {
    if (!drawerOpen) return

    drawerEl?.focus()

    function onKeydown(event: KeyboardEvent): void {
      if (event.key === "Escape") drawerOpen = false
    }

    window.addEventListener("keydown", onKeydown)
    return () => window.removeEventListener("keydown", onKeydown)
  })
</script>
