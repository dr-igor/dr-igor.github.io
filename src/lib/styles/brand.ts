import { tv } from "tailwind-variants"

export const brandHeading = tv({
  base: [
    "font-display",
    "bg-linear-to-r",
    "from-grad-from",
    "via-grad-via",
    "to-grad-to",
    "bg-clip-text",
    "font-bold",
    "text-transparent",
    "w-fit",
  ],
  variants: {
    size: {
      sm: "text-5xl md:text-6xl",
      lg: "text-6xl md:text-8xl",
      xl: "text-7xl",
    },
  },
})

export const pageBackground = tv({
  base: [
    "min-h-screen",
    "bg-linear-to-br",
    "from-gray-50",
    "to-gray-100",
    "dark:from-zinc-950",
    "dark:to-neutral-950",
  ],
})
