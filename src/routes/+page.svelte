<MetaTags {...seo(page.url.pathname, { title: SITE_NAME, titleTemplate: "%s" })} />

{#snippet orb(animation: string, position: string, color: string)}
  <div class="orb {animation} {ORB_BASE} {position} {color}"></div>
{/snippet}

<div class="relative flex min-h-0 grow flex-col">
  <div class={HERO_BACKDROP}></div>

  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    {@render orb("orb-1", "left-1/4 top-1/4", "bg-grad-from/20")}
    {@render orb("orb-2", "right-1/4 top-1/3", "bg-grad-to/20")}
    {@render orb("orb-3", "bottom-1/4 left-1/3", "bg-grad-via/20")}
  </div>

  <div class="relative flex grow flex-col items-center justify-center px-4">
    <div class="mx-auto max-w-4xl text-center">
      <h1
        in:fly={{ y: 50, duration: 800, easing: quintOut }}
        class={brandHeading({ size: "lg", class: "mb-8" })}
      >
        Igor Labworks
      </h1>

      <div class="mb-12" in:fade={{ duration: 800, delay: 300 }}>
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

  <p class="relative py-8 text-center text-sm text-muted">2025-2026 © Igor Petrik</p>
</div>

<script lang="ts">
  import { quintOut } from "svelte/easing"
  import { fade, fly } from "svelte/transition"
  import { MetaTags } from "svelte-meta-tags"
  import { page } from "$app/state"
  import { createRotator } from "$lib/rotator.svelte"
  import { seo, SITE_NAME } from "$lib/seo"
  import { brandHeading } from "$lib/styles/brand"

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

  const HERO_BACKDROP = [
    "absolute",
    "inset-0",
    "bg-linear-to-br",
    "from-grad-from/10",
    "via-grad-via/10",
    "to-grad-to/10",
  ].join(" ")

  const ORB_BASE = ["absolute", "h-96", "w-96", "rounded-full", "blur-3xl"].join(" ")
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
