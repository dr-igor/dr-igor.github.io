<div class="flex items-center gap-3">
  <Sun class="h-4 w-4 text-amber-600 dark:text-amber-500" aria-hidden="true" />
  <Switch.Root
    checked={theme.isDark}
    onCheckedChange={(checked) => theme.set(checked)}
    aria-label="Toggle dark mode"
    class="relative h-6 w-11 cursor-pointer rounded-full bg-gray-300 outline-none transition-colors data-[state=checked]:bg-purple-700 dark:bg-zinc-700"
  >
    <Switch.Thumb
      class="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-md transition-transform duration-200 will-change-transform data-[state=checked]:translate-x-[22px]"
    />
  </Switch.Root>
  <Moon class="h-4 w-4 text-purple-700 dark:text-purple-400" aria-hidden="true" />
</div>

<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte"
  import { Switch } from "bits-ui"
  import { theme } from "$lib/stores/theme.svelte"
</script>
