import type { Component } from "svelte"

export interface ArticleFrontmatter {
  title: string
  description: string
  date: string
}

interface ArticleModule {
  default: Component
  metadata: ArticleFrontmatter
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  component: Component
}

const modules = import.meta.glob<ArticleModule>("./articles/*.svx", { eager: true })

function slugFromPath(path: string): string {
  const filename = path.slice(path.lastIndexOf("/") + 1)
  return filename.replace(/\.svx$/, "")
}

export const articles: Article[] = Object.entries(modules)
  .map(([path, module]) => ({
    slug: slugFromPath(path),
    frontmatter: module.metadata,
    component: module.default,
  }))
  .sort((first, second) =>
    second.frontmatter.date.localeCompare(first.frontmatter.date),
  )

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
