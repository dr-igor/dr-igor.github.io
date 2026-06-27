{#if allHeadings.length > 1}
  {@render desktopRail()}
  {@render mobileTrigger()}
  {#if isDrawerOpen}
    {@render mobileDrawer()}
  {/if}
{/if}

{#snippet desktopRail()}
  <aside
    inert={!isDesktop.current}
    class="{RAIL_ASIDE} {isCollapsed ? 'lg:w-10' : 'lg:w-56'}"
  >
    <div class="{RAIL_INNER} {isCollapsed ? 'w-10' : 'w-56'}">
      {#if isCollapsed}
        <button
          type="button"
          onclick={() => (isCollapsed = false)}
          aria-expanded="false"
          aria-label="Expand table of contents"
          class={RAIL_EXPAND_BUTTON}
        >
          <ChevronRight class="h-4 w-4" aria-hidden="true" />
        </button>
      {:else}
        <nav
          aria-label="Table of contents"
          class={RAIL_NAV}
          transition:fade={{ duration: motionDuration(150) }}
        >
          <div class="mb-2 flex items-center justify-between">
            <span class={CAPTION}> Contents </span>
            <button
              type="button"
              onclick={() => (isCollapsed = true)}
              aria-expanded="true"
              aria-label="Collapse table of contents"
              class={ICON_BUTTON}
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
    onclick={() => (isDrawerOpen = true)}
    aria-controls="toc-drawer"
    aria-expanded={isDrawerOpen}
    class={MOBILE_TRIGGER}
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
      onclick={() => (isDrawerOpen = false)}
      class="absolute inset-0 bg-black/40"
      transition:fade={{ duration: motionDuration(150) }}
    ></button>
    <nav
      bind:this={drawerEl}
      id="toc-drawer"
      tabindex="-1"
      aria-label="Table of contents"
      transition:fly={{ x: -320, duration: motionDuration(250) }}
      class={DRAWER_NAV}
    >
      <div class="flex items-center justify-between">
        <span class={CAPTION}> Contents </span>
        <button
          type="button"
          onclick={() => (isDrawerOpen = false)}
          aria-label="Close table of contents"
          class={ICON_BUTTON}
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
    <div class={DEPTH_HEADER}>
      <span class={CAPTION}> Levels </span>
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
          class={DEPTH_BUTTON}
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
          class={DEPTH_BUTTON}
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
          class="{TOC_LINK_BASE} {activeId === heading.id
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
  import { prefersReducedMotion } from "svelte/motion"
  import { MediaQuery } from "svelte/reactivity"
  import { fade, fly } from "svelte/transition"
  import { extractHeadings, observeActiveHeading } from "./headings"
  import { lenis } from "$lib/stores/lenis.svelte"

  const CAPTION = [
    "font-mono",
    "text-[10px]",
    "tracking-wider",
    "text-gray-400",
    "uppercase",
    "dark:text-gray-500",
  ].join(" ")

  const ICON_BUTTON = [
    "flex",
    "h-6",
    "w-6",
    "items-center",
    "justify-center",
    "rounded",
    "text-gray-400",
    "transition-colors",
    "hover:text-purple-600",
    "dark:text-gray-500",
    "dark:hover:text-purple-400",
  ].join(" ")

  const DEPTH_BUTTON = [
    "flex",
    "h-5",
    "w-5",
    "items-center",
    "justify-center",
    "rounded",
    "border",
    "border-gray-200",
    "text-gray-500",
    "transition-colors",
    "hover:border-purple-500",
    "hover:text-purple-600",
    "disabled:cursor-not-allowed",
    "disabled:opacity-40",
    "disabled:hover:border-gray-200",
    "disabled:hover:text-gray-500",
    "dark:border-zinc-700",
    "dark:text-gray-400",
    "dark:hover:border-purple-400",
    "dark:hover:text-purple-400",
    "dark:disabled:hover:border-zinc-700",
    "dark:disabled:hover:text-gray-400",
  ].join(" ")

  const RAIL_EXPAND_BUTTON = [
    "flex",
    "h-9",
    "w-9",
    "items-center",
    "justify-center",
    "rounded-lg",
    "border",
    "border-gray-200",
    "bg-white/60",
    "text-gray-500",
    "transition-colors",
    "hover:border-purple-500",
    "hover:text-purple-600",
    "dark:border-zinc-800",
    "dark:bg-zinc-900/60",
    "dark:text-gray-400",
    "dark:hover:border-purple-400",
    "dark:hover:text-purple-400",
  ].join(" ")

  const RAIL_NAV = [
    "rounded-xl",
    "border",
    "border-gray-200",
    "bg-white/60",
    "p-3",
    "dark:border-zinc-800",
    "dark:bg-zinc-900/60",
  ].join(" ")

  // The rail stays mounted at every width so it can animate; below `lg` it has no
  // width and is slid off the left edge (the inner wrapper carries the transform so
  // the content slides as a unit rather than reflowing as the gutter collapses).
  // Clip only below `lg`: at desktop widths overflow must stay visible or the
  // `overflow` scroll container would break the inner element's `sticky` pinning.
  const RAIL_ASIDE = [
    "col-start-1",
    "row-start-1",
    "h-0",
    "w-0",
    "overflow-hidden",
    "opacity-0",
    "transition-[width,opacity]",
    "duration-300",
    "motion-reduce:transition-none",
    "lg:h-auto",
    "lg:overflow-visible",
    "lg:opacity-100",
    "lg:justify-self-end",
  ].join(" ")

  const RAIL_INNER = [
    "sticky",
    "top-20",
    "-translate-x-full",
    "transition-transform",
    "duration-300",
    "motion-reduce:transition-none",
    "lg:translate-x-0",
  ].join(" ")

  const MOBILE_TRIGGER = [
    "col-start-2",
    "justify-self-start",
    "sticky",
    "top-16",
    "z-30",
    "mb-6",
    "flex",
    "items-center",
    "gap-2",
    "rounded-lg",
    "border",
    "border-gray-200",
    "bg-white/80",
    "px-3",
    "py-2",
    "text-sm",
    "font-medium",
    "text-gray-600",
    "backdrop-blur-sm",
    "transition-colors",
    "hover:text-purple-600",
    "lg:hidden",
    "dark:border-zinc-800",
    "dark:bg-zinc-950/80",
    "dark:text-gray-300",
    "dark:hover:text-purple-400",
  ].join(" ")

  const DRAWER_NAV = [
    "absolute",
    "top-0",
    "left-0",
    "flex",
    "h-full",
    "w-72",
    "max-w-[80%]",
    "flex-col",
    "gap-2",
    "overflow-y-auto",
    "border-r",
    "border-gray-200",
    "bg-white",
    "p-4",
    "focus:outline-none",
    "dark:border-zinc-800",
    "dark:bg-zinc-950",
  ].join(" ")

  const DEPTH_HEADER = [
    "mb-2",
    "flex",
    "items-center",
    "justify-between",
    "gap-2",
    "border-b",
    "border-gray-100",
    "pb-2",
    "dark:border-zinc-800/60",
  ].join(" ")

  const TOC_LINK_BASE = [
    "block",
    "border-l-2",
    "py-1",
    "pr-2",
    "leading-snug",
    "transition-colors",
  ].join(" ")

  interface Props {
    /** The rendered article container to scan for headings. */
    contentEl: HTMLElement | undefined
    /** Default number of heading levels to show, before any reader override. */
    depth?: number
    /** Whether the desktop rail is collapsed; owned by the layout so the page
     * grid can reclaim the gutter when it changes. */
    isCollapsed?: boolean
  }

  let { contentEl, depth = 2, isCollapsed = $bindable(false) }: Props = $props()

  // Only the docked rail exists at desktop widths; below it the rail is off-canvas
  // and must be inert so its links leave the tab order and accessibility tree.
  const isDesktop = new MediaQuery("min-width: 1024px", false)

  const motionDuration = (ms: number): number => (prefersReducedMotion.current ? 0 : ms)

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
  let isDrawerOpen = $state(false)
  let drawerEl = $state<HTMLElement | undefined>(undefined)

  function setDepth(next: number): void {
    selectedDepth = Math.min(Math.max(next, 1), maxDepth)
    if (browser) localStorage.setItem("toc-depth", String(selectedDepth))
  }

  function goTo(event: MouseEvent, id: string): void {
    event.preventDefault()
    activeId = id
    isDrawerOpen = false

    const target = document.getElementById(id)
    if (!target) return

    const instance = lenis.get()
    if (instance) instance.scrollTo(target, { offset: -80 })
    else
      target.scrollIntoView({
        behavior: prefersReducedMotion.current ? "auto" : "smooth",
      })

    history.replaceState(null, "", `#${id}`)
  }

  $effect(() => {
    if (shownHeadings.length === 0) return
    return observeActiveHeading(shownHeadings, (id) => (activeId = id))
  })

  // The open drawer is a modal dialog, so focus must move into it and Escape
  // must close it for keyboard and screen-reader users.
  $effect(() => {
    if (!isDrawerOpen) return

    drawerEl?.focus()

    function onKeydown(event: KeyboardEvent): void {
      if (event.key === "Escape") isDrawerOpen = false
    }

    window.addEventListener("keydown", onKeydown)
    return () => window.removeEventListener("keydown", onKeydown)
  })
</script>
