<div>
  <h3 class="mb-4 text-2xl font-semibold text-blue-300">
    The Hierarchy: Which Cues Win?
  </h3>
  <p class="mb-4 text-gray-300">
    When your brain receives conflicting spatial information, it follows this priority
    order (strongest to weakest):
  </p>

  <div class="mb-6 space-y-3">
    {#each CUES as cue (cue.rank)}
      <div class="rounded bg-gray-800 p-4">
        <div class="mb-2 flex items-center gap-3">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-white"
          >
            {cue.rank}
          </div>
          <div class="flex-1">
            <div class="text-lg font-semibold">{cue.name}</div>
            <div class="mt-1 h-2 w-full rounded-full bg-gray-700">
              <div
                class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                style="width: {cue.strength}%"
              ></div>
            </div>
          </div>
        </div>
        <p class="ml-11 text-sm text-gray-400">{cue.description}</p>
      </div>
    {/each}
  </div>

  <div class="mb-6 rounded bg-gray-800 p-4">
    <h4 class="mb-3 font-semibold text-blue-300">
      Fundamental Localization Cues (for position, not grouping)
    </h4>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="rounded bg-gray-700 p-3">
        <div class="mb-2 font-semibold text-green-400">ITD (Timing)</div>
        <ul class="space-y-1 text-sm text-gray-300">
          <li>• Dominant below 1500 Hz</li>
          <li>• Detects 10 microsecond differences</li>
          <li>• Max delay: ~650 microseconds</li>
          <li>• Used for horizontal positioning</li>
        </ul>
      </div>
      <div class="rounded bg-gray-700 p-3">
        <div class="mb-2 font-semibold text-green-400">ILD (Volume)</div>
        <ul class="space-y-1 text-sm text-gray-300">
          <li>• Dominant above 1500 Hz</li>
          <li>• Up to 20 dB difference at extreme angles</li>
          <li>• Detects 0.5-1 dB changes</li>
          <li>• Head shadow creates volume difference</li>
        </ul>
      </div>
    </div>
  </div>

  <EarsDiagram />
</div>

<script lang="ts">
  import EarsDiagram from "./EarsDiagram.svelte"

  interface Cue {
    rank: string
    name: string
    strength: number
    description: string
  }

  const CUES: Cue[] = [
    {
      rank: "1",
      name: "Harmonicity",
      strength: 100,
      description:
        "Sounds with mathematically related frequencies always fuse. Even if spatial cues conflict, harmonic sounds group together.",
    },
    {
      rank: "2",
      name: "Common Onset/Offset",
      strength: 85,
      description:
        "Sounds starting or stopping together (within ~30ms) are perceived as one source.",
    },
    {
      rank: "3",
      name: "Temporal Coherence",
      strength: 75,
      description:
        "Sounds modulating together in synchronized patterns group together.",
    },
    {
      rank: "4",
      name: "Spectrotemporal Continuity",
      strength: 60,
      description:
        "Smooth frequency changes and continuous patterns maintain source unity.",
    },
    {
      rank: "5",
      name: "Spatial Consistency",
      strength: 45,
      description:
        "Sounds from the same location tend to group, but this can be overridden by stronger cues.",
    },
    {
      rank: "6",
      name: "Binaural Coherence",
      strength: 30,
      description:
        "Correlation between left/right channels. Alone, this is the weakest grouping cue.",
    },
  ]
</script>
