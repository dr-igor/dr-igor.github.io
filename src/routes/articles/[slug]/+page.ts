import { error } from "@sveltejs/kit"
import { articles, getArticle } from "$lib/content/articles"
import type { EntryGenerator, PageLoad } from "./$types"

export const prerender = true

export const entries: EntryGenerator = () =>
  articles.map((article) => ({ slug: article.slug }))

export const load: PageLoad = ({ params }) => {
  const article = getArticle(params.slug)
  if (!article) {
    error(404, `Article not found: ${params.slug}`)
  }
  return { slug: article.slug, frontmatter: article.frontmatter }
}
