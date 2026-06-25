import { describe, expect, it } from "vitest"
import { articles, getArticle } from "./articles"

describe("articles registry", () => {
  it("registers every article with well-formed frontmatter", () => {
    expect(articles.length).toBeGreaterThanOrEqual(2)

    for (const article of articles) {
      expect(article.slug).toMatch(/^[a-z0-9-]+$/)
      expect(article.frontmatter.title.length).toBeGreaterThan(0)
      expect(article.frontmatter.description.length).toBeGreaterThan(0)
      expect(article.frontmatter.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(typeof article.component).toBe("function")
    }
  })

  it("resolves a known slug and rejects an unknown one", () => {
    expect(getArticle("edge-of-hearing")).toBeDefined()
    expect(getArticle("sounds-in-space")).toBeDefined()
    expect(getArticle("does-not-exist")).toBeUndefined()
  })

  it("orders articles newest first", () => {
    const dates = articles.map((article) => article.frontmatter.date)
    const sortedDescending = [...dates].sort((first, second) =>
      second.localeCompare(first),
    )

    expect(dates).toEqual(sortedDescending)
  })
})
