/**
 * Press/media coverage data for the In The Press page.
 * Add new articles to the pressArticles array below.
 * Articles are displayed newest-first on the page.
 */

export interface PressArticle {
  readonly id: string
  readonly title: string
  readonly publication: string
  readonly author: string | null
  readonly publishedDate: string // ISO 8601 date, e.g. "2026-01-15"
  readonly description: string
  readonly url: string
  readonly thumbnailSrc: string
  readonly thumbnailAlt: string
}

/**
 * Press articles array — add new entries here.
 * Each entry requires a unique `id` (used as React key).
 * Set `author` to `null` if not applicable.
 * `thumbnailSrc` uses the same path format as other images
 * (local path in dev, auto-switched to S3 in production).
 */
export const pressArticles: ReadonlyArray<PressArticle> = [
  {
    id: "placeholder-houston-chronicle",
    title: "Montrose Condos Offer First-Time Buyers a Path to Ownership",
    publication: "Houston Chronicle",
    author: "Jane Doe",
    publishedDate: "2026-03-01",
    description: "A look at how Mount Vernon Lofts is helping renters in Houston's Montrose neighborhood make the transition to homeownership with modern condos starting in the $215Ks.",
    url: "https://example.com/article-1",
    thumbnailSrc: "/images/gallery/exteriors/exterior-1.jpg",
    thumbnailAlt: "Mount Vernon Lofts exterior in Montrose, Houston",
  },
  {
    id: "placeholder-houston-business-journal",
    title: "Inner Loop Condo Market Sees Renewed Interest from Young Buyers",
    publication: "Houston Business Journal",
    author: null,
    publishedDate: "2026-02-15",
    description: "Industry trends show growing demand for walkable, owner-focused condo communities in Houston's inner loop neighborhoods.",
    url: "https://example.com/article-2",
    thumbnailSrc: "/images/gallery/exteriors/exterior-1.jpg",
    thumbnailAlt: "Montrose neighborhood street view",
  },
  {
    id: "placeholder-culturemap",
    title: "Why Montrose Remains One of Houston's Most Walkable Neighborhoods",
    publication: "CultureMap Houston",
    author: "John Smith",
    publishedDate: "2026-01-10",
    description: "From local coffee shops to museums and parks, Montrose continues to draw residents who value walkability and community.",
    url: "https://example.com/article-3",
    thumbnailSrc: "/images/gallery/exteriors/exterior-1.jpg",
    thumbnailAlt: "Walkable Montrose neighborhood in Houston",
  },
]
