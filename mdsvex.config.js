import { fileURLToPath } from "node:url"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const articleLayout = fileURLToPath(
  new URL("./src/lib/mdsvex/ArticleLayout.svelte", import.meta.url),
)

/** @type {import('mdsvex').MdsvexOptions} */
export default {
  extensions: [".svx"],
  layout: articleLayout,
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
}
