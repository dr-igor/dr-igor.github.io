<svelte:head>
  <title>About · Igor Labworks</title>
  <meta
    name="description"
    content="Igor Petrik — a multidisciplinary maker exploring the intersection of technology, art, and design."
  />
</svelte:head>

<div class="relative min-h-screen overflow-hidden">
  <div
    class="pointer-events-none absolute right-10 top-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-800/20"
    style="transform: translateY({orbShift}px)"
  ></div>

  <div class="relative mx-auto max-w-4xl px-4 py-16">
    <h1
      in:fly={{ y: 30, duration: 800 }}
      class={brandHeading({ size: "sm", class: "mb-8" })}
    >
      About Me
    </h1>

    <div class="prose prose-lg max-w-none dark:prose-invert">
      <p
        in:fly={{ x: -20, duration: 600, delay: 200 }}
        class="mb-6 text-gray-700 dark:text-gray-300"
      >
        Welcome to Igor Labworks — a creative space where technology meets art and
        design.
      </p>

      <p
        in:fly={{ x: -20, duration: 600, delay: 300 }}
        class="mb-6 text-gray-700 dark:text-gray-300"
      >
        I'm Igor Petrik, a multidisciplinary maker passionate about exploring the
        intersection of:
      </p>

      <ul class="mb-6 space-y-2 text-gray-700 dark:text-gray-300">
        {#each INTERESTS as interest, index (interest)}
          <li in:fly={{ x: -20, duration: 400, delay: 500 + index * 50 }}>
            {interest}
          </li>
        {/each}
      </ul>

      <p
        in:fly={{ x: -20, duration: 600, delay: 1000 }}
        class="text-gray-700 dark:text-gray-300"
      >
        This portfolio showcases my journey through creative technology and artistic
        expression. Stay tuned for projects, experiments, and adventures in making.
      </p>
    </div>
  </div>
</div>

<script lang="ts">
  import { fly } from "svelte/transition"
  import { scroll } from "$lib/stores/scroll.svelte"
  import { brandHeading } from "$lib/styles/brand"

  const INTERESTS = [
    "Software Engineering & Development",
    "Electronics Design & Prototyping",
    "Automation & Systems",
    "Art & Design",
    "Interior Design & Architecture",
    "Home Improvement",
    "CAD & 3D Modeling",
    "Music Production & Audio DSP",
    "Light & Color Reproduction",
    "Burning Man Projects",
  ]

  const orbShift = $derived(scroll.y * 0.15)
</script>
