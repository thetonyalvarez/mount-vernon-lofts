# In The Press Page — Maintainer Guide

## Overview

The `/press` page displays an archive of press mentions and media articles about Mount Vernon Lofts. Each entry links to the original external article.

**URL:** `/press`
**Route:** `app/press/page.tsx`

## File Structure

```
app/
├── config/
│   └── press-data.ts          # Article data + PressArticle interface
├── press/
│   ├── page.tsx               # Page component (metadata, SEO, layout)
│   ├── PressSchema.tsx        # JSON-LD structured data
│   └── sections/
│       ├── index.ts           # Barrel export
│       ├── PressHeroSection.tsx    # Page title/subtitle
│       └── PressArticleList.tsx   # Article card grid
└── __tests__/
    └── press-page.test.ts     # Vitest tests
```

## How to Add a New Article

Edit `app/config/press-data.ts` and add an entry to the `pressArticles` array:

```typescript
{
  id: "unique-slug",              // Unique identifier (used as React key)
  title: "Article Headline",      // Full article title
  publication: "Publication Name", // e.g. "Houston Chronicle"
  author: "Author Name",          // Set to null if no author
  publishedDate: "2026-04-15",    // ISO 8601 date format (YYYY-MM-DD)
  description: "Brief summary of the article in 1-2 sentences.",
  url: "https://example.com/full-article-url",
  thumbnailSrc: "/images/press/article-thumbnail.jpg",
  thumbnailAlt: "Descriptive alt text for the thumbnail",
}
```

Articles are automatically sorted newest-first on the page.

## Field Reference

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `id` | Yes | `string` | Unique slug, used as React key. Never use array index. |
| `title` | Yes | `string` | Full article headline |
| `publication` | Yes | `string` | Outlet name (e.g. "Houston Chronicle") |
| `author` | Yes | `string \| null` | Author name, or `null` if not applicable |
| `publishedDate` | Yes | `string` | ISO 8601 date: `"YYYY-MM-DD"` |
| `description` | Yes | `string` | 1-2 sentence summary. Truncated to 3 lines on cards. |
| `url` | Yes | `string` | Full URL to the external article |
| `thumbnailSrc` | Yes | `string` | Image path (local or S3). See Thumbnails below. |
| `thumbnailAlt` | Yes | `string` | Descriptive alt text for accessibility |

## Thumbnails

- **Recommended size:** 1200x675px (16:9 aspect ratio)
- **Format:** JPG or WebP
- **Storage:** Place in `public/images/press/` for local dev, then upload to S3 via `npm run s3`
- **Path format:** `/images/press/your-image.jpg` — the image component auto-switches between local and S3 based on environment
- If you don't have a publication-provided image, use an existing MVL exterior photo as a fallback

## SEO / Structured Data

The page automatically generates JSON-LD structured data from the `pressArticles` array:

- **CollectionPage** — marks the page as an archive/listing
- **NewsArticle** — one per article with headline, date, publisher, author, image
- **BreadcrumbList** — Home > In The Press

No manual schema updates needed when adding articles — it's generated from the data.

## Navigation

The page is linked in the **footer only** (not the main mobile menu). The link is in `app/config/navigation.ts` under `footerNavLinks`.

## Sitemap

The page is included in the sitemap at `app/sitemap.xml/route.ts` with monthly change frequency.

## Testing

Run the press page tests:

```bash
npx vitest run app/__tests__/press-page.test.ts
```

Tests verify: page structure, config data shape, schema presence, sections, navigation link, sitemap entry, and brand compliance (no banned words).

## Brand Compliance

All content must follow MVL brand guidelines. Never use banned words: exclusive, bespoke, curated, premier, prestigious, elevated, refined, sophisticated, affordable, budget-friendly, bargain, stunning, amazing, incredible.
