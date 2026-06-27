import { deepMerge, type MetaTagsProps } from "svelte-meta-tags"

export const SITE_URL = "https://igorlabworks.com"
export const SITE_NAME = "Igor Labworks"
export const SITE_DESCRIPTION =
  "A creative space where technology meets art and design."

const OG_IMAGE_URL = `${SITE_URL}/og-image.png`

/**
 * Absolute URL for a site-root-relative path. Built from the hardcoded SITE_URL
 * rather than `url.origin`, which is `http://sveltekit-prerender` during prerender.
 */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).href
}

export function seo(pathname: string, overrides: MetaTagsProps = {}): MetaTagsProps {
  return deepMerge(baseMetaTags(pathname), overrides)
}

function baseMetaTags(pathname: string): MetaTagsProps {
  const url = absoluteUrl(pathname)
  return {
    titleTemplate: `%s · ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    canonical: url,
    openGraph: {
      type: "website",
      url,
      locale: "en_US",
      siteName: SITE_NAME,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
          type: "image/png",
        },
      ],
    },
    twitter: { cardType: "summary_large_image", imageAlt: SITE_NAME },
  }
}
