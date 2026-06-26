<div>
  <h3 class="mb-4 text-2xl font-semibold text-blue-300">Key Terms Explained</h3>
  <p class="mb-4 text-gray-300">Click any term to expand its definition:</p>

  <div class="space-y-2">
    {#each TERMS as item (item.term)}
      <div class="overflow-hidden rounded bg-gray-800">
        <button
          type="button"
          onclick={() => toggle(item.term)}
          aria-expanded={expanded.has(item.term)}
          class={TERM_BUTTON}
        >
          <span class="text-left font-semibold text-blue-300">{item.term}</span>
          {#if expanded.has(item.term)}
            <ChevronDown class="h-5 w-5 text-blue-400" aria-hidden="true" />
          {:else}
            <ChevronRight class="h-5 w-5 text-blue-400" aria-hidden="true" />
          {/if}
        </button>
        {#if expanded.has(item.term)}
          <div class="px-4 pb-4 text-gray-300">{item.definition}</div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<script lang="ts">
  import { ChevronDown, ChevronRight } from "@lucide/svelte"
  import { SvelteSet } from "svelte/reactivity"

  const TERM_BUTTON = [
    "flex",
    "w-full",
    "items-center",
    "justify-between",
    "p-4",
    "transition-colors",
    "hover:bg-gray-700",
  ].join(" ")

  interface Term {
    term: string
    definition: string
  }

  const TERMS: Term[] = [
    {
      term: "Fusing",
      definition:
        "The brain combining separate audio signals into a single perceived sound source. Like seeing two slightly different images from each eye as one 3D object.",
    },
    {
      term: "Azimuth",
      definition:
        "Horizontal angle around you (left-right direction). 0° is straight ahead, 90° is directly to your right, 180° is behind you.",
    },
    {
      term: "Elevation",
      definition:
        "Vertical angle (up-down direction). 0° is ear level, 90° is directly overhead, -90° is directly below.",
    },
    {
      term: "ITD",
      definition:
        "Interaural Time Difference - the microseconds of delay between when sound reaches your left vs. right ear. Your brain uses this to locate sounds.",
    },
    {
      term: "ILD",
      definition:
        "Interaural Level Difference - the volume difference between your ears. Your head blocks high frequencies, making sounds louder in the nearer ear.",
    },
    {
      term: "Harmonicity",
      definition:
        "When sound frequencies are mathematically related (like musical notes). Harmonic sounds are perceived as coming from one source.",
    },
    {
      term: "Temporal Coherence",
      definition:
        "When sounds change together in synchronized patterns over time. Like instruments playing in rhythm together.",
    },
    {
      term: "Binaural",
      definition:
        "Relating to both ears. Binaural audio uses the differences between what each ear hears.",
    },
    {
      term: "Localization",
      definition:
        "The brain's process of determining where a sound is coming from in 3D space.",
    },
    {
      term: "Decorrelation",
      definition:
        "When the left and right audio channels become increasingly different/independent from each other.",
    },
    {
      term: "HRTF",
      definition:
        'Head-Related Transfer Function - the unique way your head and ears filter sound from different directions, creating spectral "fingerprints" for locations.',
    },
  ]

  const expanded = new SvelteSet<string>()

  function toggle(term: string): void {
    if (expanded.has(term)) {
      expanded.delete(term)
    } else {
      expanded.add(term)
    }
  }
</script>
