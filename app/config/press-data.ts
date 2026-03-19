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
    id: "houston-agent-mag-nan-sales-partner",
    title: "Nan and Company named exclusive sales partner for Mount Vernon Lofts in Montrose",
    publication: "Houston Agent Magazine",
    author: "Emily Marek",
    publishedDate: "2026-03-04",
    description: "Nan and Company Properties selected to market and sell Mount Vernon Lofts, a 42-unit condo community in Houston's Montrose neighborhood with studios and 1-bedrooms.",
    url: "https://houstonagentmagazine.com/2026/03/04/nan-and-co-exclusive-sales-partner-mount-vernon-lofts-montrose/",
    thumbnailSrc: "/images/unit-9_1-bed/9-4.jpg",
    thumbnailAlt: "Living and dining area at Mount Vernon Lofts in Montrose",
  },
]
