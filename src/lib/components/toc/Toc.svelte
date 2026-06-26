{#if allHeadings.length > 1}
  <!-- Desktop rail -->
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

  <!-- Mobile trigger -->
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

  <!-- Mobile drawer -->
  {#if drawerOpen}
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
  {/if}
{/if}

{#snippet tocList()}
  <ul class="space-y-0.5 text-sm">
    {#each headings as heading (heading.id)}
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

<script lang="ts">
  import { browser } from "$app/environment"
  import { ChevronLeft, ChevronRight, List, Minus, Plus, X } from "@lucide/svelte"
  import { untrack } from "svelte"
  import { SvelteSet } from "svelte/reactivity"
  import { fade, fly } from "svelte/transition"
  import { lenis } from "$lib/stores/lenis.svelte"

  interface Heading {
    el: HTMLElement
    id: string
    text: string
    level: number
  }

  interface Props {
    /** The rendered article container to scan for headings. */
    contentEl: HTMLElement | undefined
    /** Default number of heading levels to show, before any reader override. */
    depth?: number
  }

  let { contentEl, depth = 2 }: Props = $props()

  // Every heading in the article, regardless of the depth currently shown.
  let allHeadings = $state<Heading[]>([])
  // Shallowest heading level present (e.g. 2 when the body starts at <h2>).
  let baseLevel = $state(2)
  let activeId = $state<string | undefined>(undefined)
  let collapsed = $state(browser && localStorage.getItem("toc-collapsed") === "true")
  let drawerOpen = $state(false)
  let drawerEl = $state<HTMLElement | undefined>(undefined)

  // Reader-selected depth, seeded once from localStorage or the prop default.
  let selectedDepth = $state(
    untrack(() => (browser && Number(localStorage.getItem("toc-depth"))) || depth),
  )

  // How many levels the article actually offers (e.g. h2–h4 → 3).
  const maxDepth = $derived(
    allHeadings.length > 0
      ? Math.max(...allHeadings.map((heading) => heading.level)) - baseLevel + 1
      : 1,
  )
  // The selected depth clamped to what the article supports.
  const effectiveDepth = $derived(Math.min(Math.max(selectedDepth, 1), maxDepth))
  // The subset of headings shown at the current depth.
  const headings = $derived(
    allHeadings.filter((heading) => heading.level < baseLevel + effectiveDepth),
  )

  function setDepth(next: number): void {
    selectedDepth = Math.min(Math.max(next, 1), maxDepth)
    if (browser) localStorage.setItem("toc-depth", String(selectedDepth))
  }

  $effect(() => {
    if (browser) localStorage.setItem("toc-collapsed", String(collapsed))
  })

  // While the mobile drawer is open, move focus into it and let Escape close it.
  $effect(() => {
    if (!drawerOpen) return

    drawerEl?.focus()

    function onKeydown(event: KeyboardEvent): void {
      if (event.key === "Escape") drawerOpen = false
    }

    window.addEventListener("keydown", onKeydown)
    return () => window.removeEventListener("keydown", onKeydown)
  })

  // Scan every heading in the article whenever the rendered content changes.
  $effect(() => {
    if (!contentEl) {
      allHeadings = []
      return
    }

    const nodes = [
      ...contentEl.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"),
    ].filter((node) => node.id)

    if (nodes.length < 2) {
      allHeadings = []
      return
    }

    baseLevel = Math.min(...nodes.map((node) => Number(node.tagName[1])))
    allHeadings = nodes.map((node) => ({
      el: node,
      id: node.id,
      text: node.textContent?.trim() ?? "",
      level: Number(node.tagName[1]),
    }))
  })

  // Track which shown section is in view, re-observing when the shown set changes.
  $effect(() => {
    if (headings.length === 0) return

    const visible = new SvelteSet<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = headings.find((heading) => visible.has(heading.id))
        if (current) activeId = current.id
      },
      { rootMargin: "-80px 0px -70% 0px" },
    )

    for (const heading of headings) observer.observe(heading.el)

    return () => observer.disconnect()
  })

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
</script>
