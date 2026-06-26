import { tv } from "tailwind-variants"

export const brandHeading = tv({
  base: [
    "font-display",
    "bg-linear-to-r",
    "from-purple-700",
    "via-purple-600",
    "to-amber-600",
    "bg-clip-text",
    "font-bold",
    "text-transparent",
    "dark:from-purple-400",
    "dark:via-purple-300",
    "dark:to-amber-400",
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
