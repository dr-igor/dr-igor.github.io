<span class={pill({ variant })} {style}>{@render children()}</span>

<script lang="ts">
  import type { Snippet } from "svelte"
  import { tv, type VariantProps } from "tailwind-variants"

  const pill = tv({
    base: [
      "inline-block",
      "rounded",
      "border",
      "px-1.5",
      "py-0.5",
      "align-middle",
      "font-mono",
      "tracking-wider",
      "uppercase",
    ],
    variants: {
      variant: {
        tag: [
          "text-[10px]",
          "border-gray-200",
          "bg-gray-100",
          "text-gray-500",
          "dark:border-zinc-700",
          "dark:bg-zinc-800",
          "dark:text-gray-400",
        ],
        lab: [
          "text-[9px]",
          "border-amber-400/70",
          "bg-amber-50",
          "text-amber-700",
          "dark:bg-amber-950/40",
          "dark:text-amber-400",
        ],
        engine: ["text-[9.5px]", "text-gray-700", "dark:text-gray-300"],
      },
    },
  })

  interface Props {
    variant: NonNullable<VariantProps<typeof pill>["variant"]>
    style?: string
    children: Snippet
  }

  let { variant, style, children }: Props = $props()
</script>
