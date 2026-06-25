<div class="mb-6 flex flex-wrap gap-2">
  {#each tabs as tab (tab.id)}
    <button
      type="button"
      onclick={() => onSelect(tab.id)}
      aria-pressed={active === tab.id}
      class="rounded px-4 py-2 {active === tab.id
        ? 'bg-blue-600 text-white'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}"
    >
      {tab.label}
    </button>
  {/each}
</div>

<script lang="ts">
  interface Tab {
    id: string
    label: string
  }

  interface Props {
    tabs: Tab[]
    active: string
    onSelect: (id: string) => void
  }

  let { tabs, active, onSelect }: Props = $props()
</script>
