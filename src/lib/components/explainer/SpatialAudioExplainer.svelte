<div class="mx-auto w-full max-w-5xl rounded-lg bg-gray-900 p-6 text-gray-100">
  <h2 class="mb-6 text-3xl font-bold text-blue-400">
    Spatial Audio: Cues, Computation, and Concepts
  </h2>

  <Tabs tabs={TABS} active={activeSection} onSelect={selectSection} />

  {#if activeSection === "hierarchy"}
    <CueHierarchy />
  {:else if activeSection === "computational"}
    <ComputationalMethods />
  {:else}
    <Glossary />
  {/if}
</div>

<script lang="ts">
  import ComputationalMethods from "./ComputationalMethods.svelte"
  import CueHierarchy from "./CueHierarchy.svelte"
  import Glossary from "./Glossary.svelte"
  import Tabs from "./Tabs.svelte"

  type Section = "hierarchy" | "computational" | "terms"

  const TABS = [
    { id: "hierarchy", label: "Cue Hierarchy" },
    { id: "computational", label: "Computational Methods" },
    { id: "terms", label: "Key Terms" },
  ]

  let activeSection = $state<Section>("hierarchy")

  function selectSection(id: string): void {
    if (id === "hierarchy" || id === "computational" || id === "terms") {
      activeSection = id
    }
  }
</script>
