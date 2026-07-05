## Scope

You've asked for ~9 major pages/features on top of the existing landing page:

1. **Islands page** (`/orollar`) — hero, 3 big island cards, adventure timeline, achievements, leaderboard preview, CTA
2. **Subjects page** (`/fanlar`) — 12 subject cards with progress, favorite, tilt hover, recommended/recent/popular sections
3. **Leaderboard page** (`/reyting`) — global/school/class/friends tabs, top-3 podium, table, XP charts, side cards
4. **Rewards page** (`/mukofotlar`) — daily/weekly/monthly rewards, badges, XP shop, certificates, animated reward box
5. **Profile page** (`/profil`) — avatar, stats, activity chart, badges, recent lessons, settings
6. **Blog page** (`/blog`) — featured article, categories, grid, search, newsletter
7. **AI Teacher page** (`/ai-ustoz`) — chat interface, feature buttons, suggested questions, animated avatar
8. **Interactive World Map** (`/xarita`) — fullscreen animated map with pan/zoom, popups
9. **Admin Dashboard** (`/admin`) — sidebar, stat cards, charts, student table

Plus updates to the Navbar so every menu item routes correctly, and a shared design-system pass (Poppins font, `#6C5CE7`/`#00D4FF`/`#FF9F43` accents, 24px radius) layered onto the existing aurora theme.

## Reality Check

This is roughly **3–5 full builds of work** in a single request. Doing all of it in one turn would produce shallow, generic pages — the opposite of the "premium $50k SaaS" quality you're asking for. Each page needs its own illustrations, motion choreography, and data shape to feel Pixar-grade rather than templated.

I'd like to build these **in focused batches** so each page gets real craft. My proposed order (highest impact first):

### Batch 1 — Core student journey (this turn)
- **Islands page** (`/orollar`) — the centerpiece you described first, with the 3 big cards, timeline, achievements, mini-leaderboard, CTA
- **Subjects page** (`/fanlar`) — 12-subject grid with tilt/progress/favorite
- Wire the Navbar links to route to these + update the design tokens (Poppins, new accent palette, 24px radius) so everything downstream inherits it

### Batch 2 — Engagement loop
- Leaderboard (`/reyting`) with podium + tabs + chart
- Rewards (`/mukofotlar`) with animated reward box + XP shop
- Profile (`/profil`) with stats dashboard

### Batch 3 — Content & AI
- Blog (`/blog`)
- AI Teacher (`/ai-ustoz`) — chat UI via AI Elements

### Batch 4 — Advanced surfaces
- Interactive World Map (`/xarita`) — pan/zoom Pixar map
- Admin Dashboard (`/admin`) — sidebar shell, charts, tables

## Technical Notes

- Stack stays as-is: TanStack Start + React + TS + Tailwind v4 + shadcn + motion + lucide. (You mentioned Next.js — this project is TanStack Start, which gives the same SSR/routing benefits; I'll keep it.)
- Each new page = one route file under `src/routes/` with its own `head()` metadata for SEO.
- Design tokens updated once in `src/styles.css` — every page inherits the palette.
- All data (islands, subjects, leaderboard, rewards) stays as typed mock data in `src/lib/` for now. When you're ready for real users/XP/rankings, we enable Lovable Cloud and swap the mock data for DB queries — no UI rewrites needed.
- Illustrations: I'll generate 3D Pixar-style images per page as we go (subjects need ~12, admin/blog need thumbnails, etc.). Batching keeps image-gen cost sane.

## Question before I start

Do you want me to proceed with **Batch 1 now** (Islands + Subjects + design-system + navbar routing), then come back for your review before Batch 2? Or would you rather I pick a different starting batch?
