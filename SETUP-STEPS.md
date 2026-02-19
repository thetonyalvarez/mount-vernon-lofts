# Mount Vernon Lofts Website Setup

Repurposed from a previous NAN Properties project — Next.js + TypeScript + Tailwind CSS (~252 files).

## Steps

### 1. Clone the repo into this directory
```bash
git clone https://github.com/thetonyalvarez/mount-vernon-lofts-website.git .
rm -rf .git
git init
```

### 2. Create new GitHub repo and connect
```bash
gh repo create thetonyalvarez/mount-vernon-lofts-website --private
git remote add origin https://github.com/thetonyalvarez/mount-vernon-lofts-website.git
```

### 3. Install dependencies and verify it runs
```bash
npm install
npm run dev
```

### 4. Update config files (most content lives here)
| File | What it controls |
|------|-----------------|
| `app/config/navigation.ts` | Nav links, site name |
| `app/config/amenities-data.ts` | Amenity listings |
| `app/config/architecture-interiors.ts` | Architecture copy |
| `app/config/contact.ts` | Contact form config |
| `app/config/contact-modal.ts` | Contact modal config |
| `app/config/features-finishes.ts` | Unit features |
| `app/config/footer-grid.ts` | Footer content |
| `app/config/gallery-data.ts` | Gallery images |
| `app/config/neighborhood-timeline.ts` | Neighborhood info |
| `app/config/team-data.ts` | Team/agent info |

### 5. Swap branding and assets
- Replace logos, favicons, OG images in `public/`
- Update S3 bucket references for Mount Vernon imagery
- Update `app/globals.css` and `tailwind.config.ts` for colors/fonts

### 6. Update environment variables
- Contact form endpoints
- S3 bucket/paths
- GTM container ID
- Vercel project config

### 7. Update `.claude/` and `.cursor/` configs
- Verify agents and rules reflect Mount Vernon Lofts context
- Update `CLAUDE.md` for new project context

### 8. Remove or stub unused pages
Delete pages that don't apply to Mount Vernon Lofts.

### 9. Deploy to Vercel
- Create new Vercel project
- Connect GitHub repo
- Configure env vars
- Set up domain
