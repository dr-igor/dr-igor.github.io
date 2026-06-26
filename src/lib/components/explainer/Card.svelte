<div class={card({ variant, class: className })}>{@render children()}</div>

<script lang="ts">
  import type { Snippet } from "svelte"
  import { tv, type VariantProps } from "tailwind-variants"

  const card = tv({
    base: "rounded",
    variants: {
      variant: {
        panel: "bg-gray-800 p-4",
        nested: "bg-gray-700 p-3",
        code: "bg-gray-800 p-2 font-mono text-xs",
      },
    },
  })

  interface Props {
    variant: NonNullable<VariantProps<typeof card>["variant"]>
    class?: string
    children: Snippet
  }

  let { variant, class: className, children }: Props = $props()
</script>
