<nav
  class="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80"
>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <a href="/" class="flex items-center" aria-label="Igor Labworks home">
        <SiteLogo />
      </a>

      <div class="flex items-center gap-8">
        {#each links as link (link.href)}
          {@const isCurrent = link.matches(page.url.pathname)}
          <a
            href={link.href}
            aria-current={isCurrent ? "page" : undefined}
            class="text-sm font-medium transition-colors {isCurrent
              ? 'text-purple-700 dark:text-purple-400'
              : 'text-gray-600 hover:text-purple-700 dark:text-gray-300 dark:hover:text-purple-400'}"
          >
            {link.label}
          </a>
        {/each}
      </div>

      <ThemeToggle />
    </div>
  </div>
</nav>

<script lang="ts">
  import { page } from "$app/state"
  import SiteLogo from "$lib/components/SiteLogo.svelte"
  import ThemeToggle from "$lib/components/ThemeToggle.svelte"

  interface NavLink {
    href: string
    label: string
    matches: (pathname: string) => boolean
  }

  const links: NavLink[] = [
    { href: "/", label: "Home", matches: (pathname) => pathname === "/" },
    { href: "/about", label: "About", matches: (pathname) => pathname === "/about" },
    {
      href: "/articles",
      label: "Articles",
      matches: (pathname) => pathname.startsWith("/articles"),
    },
  ]
</script>
