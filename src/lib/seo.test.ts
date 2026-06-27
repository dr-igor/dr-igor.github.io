import { describe, expect, it } from "vitest"
import { absoluteUrl, seo, SITE_NAME } from "./seo"

describe("absoluteUrl", () => {
  it("builds an absolute URL from a root-relative path", () => {
    expect(absoluteUrl("/about")).toBe("https://igorlabworks.com/about")
  })

  it("resolves the site root", () => {
    expect(absoluteUrl("/")).toBe("https://igorlabworks.com/")
  })
})

describe("seo", () => {
  it("merges page overrides onto the shared defaults", () => {
    const tags = seo("/about", { title: "About" })

    expect(tags.title).toBe("About")
    expect(tags.titleTemplate).toBe(`%s · ${SITE_NAME}`)
    expect(tags.canonical).toBe("https://igorlabworks.com/about")
    expect(tags.openGraph?.url).toBe("https://igorlabworks.com/about")
    expect(tags.openGraph?.type).toBe("website")
    expect(tags.openGraph?.siteName).toBe(SITE_NAME)
    expect(tags.twitter?.cardType).toBe("summary_large_image")
  })

  it("keeps the default 1200x630 OG image after merging", () => {
    const [image] = seo("/about", { title: "About" }).openGraph?.images ?? []

    expect(image).toMatchObject({
      url: "https://igorlabworks.com/og-image.png",
      width: 1200,
      height: 630,
      type: "image/png",
    })
  })

  it("lets the home page suppress the site-name suffix", () => {
    const tags = seo("/", { title: SITE_NAME, titleTemplate: "%s" })

    expect(tags.title).toBe(SITE_NAME)
    expect(tags.titleTemplate).toBe("%s")
  })

  it("supports article overrides while retaining the base image", () => {
    const tags = seo("/articles/sounds-in-space", {
      title: "Sounds in Space",
      openGraph: { type: "article", article: { publishedTime: "2025-01-20" } },
    })

    expect(tags.openGraph?.type).toBe("article")
    expect(tags.openGraph?.article?.publishedTime).toBe("2025-01-20")
    expect(tags.openGraph?.siteName).toBe(SITE_NAME)
    expect(tags.openGraph?.images?.[0]?.url).toBe(
      "https://igorlabworks.com/og-image.png",
    )
  })
})
