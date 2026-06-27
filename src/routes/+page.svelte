<svelte:head>
  <title>Igor Labworks</title>
  <meta
    name="description"
    content="A creative space where technology meets art and design."
  />
</svelte:head>

{#snippet orb(animation: string, position: string, color: string)}
  <div class="orb {animation} {ORB_BASE} {position} {color}"></div>
{/snippet}

<div class="relative min-h-screen overflow-hidden">
  <div class={HERO_BACKDROP} style="transform: translateY({backgroundShift}%)"></div>

  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    {@render orb("orb-1", "left-1/4 top-1/4", "bg-purple-300/20 dark:bg-purple-600/10")}
    {@render orb("orb-2", "right-1/4 top-1/3", "bg-amber-300/20 dark:bg-amber-600/10")}
    {@render orb(
      "orb-3",
      "bottom-1/4 left-1/3",
      "bg-purple-400/20 dark:bg-purple-500/10",
    )}
  </div>

  <div
    class="relative flex min-h-screen flex-col items-center justify-center px-4"
    style="opacity: {heroOpacity}"
  >
    <div class="mx-auto max-w-4xl text-center">
      <h1
        in:fly={{ y: 50, duration: 800, easing: quintOut }}
        class={brandHeading({ size: "lg", class: "mb-8" })}
      >
        Igor Labworks
      </h1>

      <div class="mb-12" in:fade={{ duration: 800, delay: 300 }}>
        <h2
          class="mb-8 text-3xl font-semibold text-gray-800 dark:text-gray-100 md:text-4xl"
        >
          Coming Soon
        </h2>

        <div class="relative flex h-16 items-center justify-center overflow-hidden">
          {#key rotator.index}
            <div
              class="absolute text-2xl font-medium text-accent md:text-3xl"
              in:fly={{ y: 20, duration: 500 }}
              out:fly={{ y: -20, duration: 500 }}
            >
              {TOPICS[rotator.index]}
            </div>
          {/key}
        </div>
      </div>

      <p in:fly={{ y: 20, duration: 800, delay: 600 }} class="mb-8 text-lg text-muted">
        A creative space where technology meets art and design
      </p>
    </div>
  </div>
</div>

<script lang="ts">
  import { quintOut } from "svelte/easing"
  import { fade, fly } from "svelte/transition"
  import { createRotator } from "$lib/rotator.svelte"
  import { scroll } from "$lib/stores/scroll.svelte"
  import { brandHeading } from "$lib/styles/brand"

  const HERO_BACKDROP = [
    "absolute",
    "inset-0",
    "bg-linear-to-br",
    "from-purple-50",
    "via-amber-50",
    "to-purple-100",
    "dark:from-purple-950/20",
    "dark:via-zinc-950",
    "dark:to-amber-950/20",
  ].join(" ")

  const ORB_BASE = ["absolute", "h-96", "w-96", "rounded-full", "blur-3xl"].join(" ")

  const TOPICS = [
    "Software Engineering",
    "Music Science",
    "Light & Color Science",
    "Automation",
    "Electronics Design",
    "Art & Design",
    "Interior Design",
    "CAD & 3D Modeling",
    "Music Production",
    "Audio DSP",
    "Burning Man",
  ]

  const rotator = createRotator(TOPICS.length, 3000)

  $effect(() => {
    rotator.start()
    return rotator.stop
  })

  const heroOpacity = $derived(Math.max(0, 1 - scroll.progress / 0.5))
  const backgroundShift = $derived(scroll.progress * 100)
</script>

<style>
  .orb {
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  .orb-1 {
    animation-name: orb-1;
    animation-duration: 20s;
  }
  .orb-2 {
    animation-name: orb-2;
    animation-duration: 25s;
  }
  .orb-3 {
    animation-name: orb-3;
    animation-duration: 30s;
  }

  @keyframes orb-1 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(50px, 30px) scale(1.2);
    }
  }
  @keyframes orb-2 {
    0%,
    100% {
      transform: translate(0, 0) scale(1.2);
    }
    50% {
      transform: translate(-30px, 50px) scale(1);
    }
  }
  @keyframes orb-3 {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(-50px, -30px) scale(1.3);
    }
  }
</style>
