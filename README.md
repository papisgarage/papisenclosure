# PAPIS Enclosures

Premium landing page for custom tow truck enclosures — **Luxury Meets Utility.**

Built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion. Designed for a dark, cinematic feel with glassmorphism, smooth scroll animations, and live YouTube integration.

---

## Live sections

| Order | Section | Description |
|------:|---------|-------------|
| 1 | **Hero** | Rotating backgrounds, pricing badge, gallery CTA, call/email to order |
| 2 | **Features** | Framing, hydraulics, premium finish — each with an image carousel |
| 3 | **YouTube Shorts** | Horizontal carousel loaded from your YouTube playlist |
| 4 | **Build Video** | Long-form YouTube embed |
| 5 | **Gallery** | Filterable grid with lightbox (tow truck photos interleaved 2 + 2) |
| 6 | **Contact** | Phone and email cards |
| 7 | **Footer** | Nav links, contact info, social placeholders |

---

## Quick start

```bash
npm install
npm run dev
```

Opens at **http://localhost:3000**

**Project folder:** `C:\Users\Papis\Documents\tow-truck-enclosure-website`

---

## Environment variables

Copy `.env.example` to `.env` and fill in your values:

```env
VITE_YOUTUBE_API_KEY=your_api_key_here
VITE_YOUTUBE_PLAYLIST_ID=https://www.youtube.com/playlist?list=PLxxxxxxxx
VITE_YOUTUBE_BUILD_VIDEO_ID=7Ol9WkUZeus
```

| Variable | Purpose |
|----------|---------|
| `VITE_YOUTUBE_API_KEY` | YouTube Data API v3 key ([Google Cloud Console](https://console.cloud.google.com/)) |
| `VITE_YOUTUBE_PLAYLIST_ID` | Full playlist URL or ID — must be **Unlisted** or **Public** |
| `VITE_YOUTUBE_BUILD_VIDEO_ID` | Long-form build video URL or ID |

Restart the dev server after changing `.env`.

---

## Images

### Sync from Web Pictures

```powershell
.\scripts\sync-images.ps1
```

| Web Pictures folder | Site folder | Used for |
|---------------------|-------------|----------|
| `Main photo` | `images/hero/` | Hero background rotation |
| `Tow truck #1 full photo shoot` | `images/gallery/tow-truck-1/` + `images/framing/` | Gallery (alternating) + framing carousel |
| `Tow truck #2 full photo shoot` | `images/gallery/tow-truck-2/` | Gallery (alternating) |
| `hydraulics photos` | `images/hydraulics/` | Hydraulics carousel |
| `glass` | `images/finish/` | Premium finish carousel |

The gallery interleaves **2 photos from truck #1, then 2 from truck #2**, repeating through both folders.

### Manual drops

Images in `src/assets/images/<category>/` are auto-loaded via Vite's `import.meta.glob` — no code changes needed.

```
src/assets/images/
  hero/
  framing/
  hydraulics/
  finish/
  gallery/
    tow-truck-1/
    tow-truck-2/
    framing/
    hydraulics/
    behind-the-scenes/
```

You can also serve images from `public/images/` by listing filenames in `PUBLIC_IMAGE_MANIFEST` inside `src/lib/images.ts`.

---

## Editing content

Most site copy and contact info lives in a few central files:

| File | What to edit |
|------|--------------|
| `src/lib/constants.ts` | Phone, email, pricing, section IDs, animation timing |
| `src/data/features.ts` | Feature section titles, bullets, image categories |
| `src/components/HeroSection.tsx` | Headline, subtext, hero CTAs |
| `src/components/ContactSection.tsx` | Contact section heading and cards |
| `index.html` | Page title, meta description, Open Graph tags |

**Brand font:** place `ethnocentric-rg.ttf` at `public/fonts/ethnocentric-rg.ttf` (the sync script copies it from `Font/` automatically).

---

## YouTube Shorts

Shorts load from a playlist you control in YouTube Studio:

1. Create a playlist and add your Shorts
2. Set visibility to **Unlisted** or **Public**
3. Add the playlist URL to `.env` as `VITE_YOUTUBE_PLAYLIST_ID`
4. Restart the dev server

To update Shorts on the site, add or remove videos from the playlist — no code changes needed. If the API key or playlist is missing, placeholder cards are shown instead.

---

## Git & GitHub

**Repo:** [github.com/papisgarage/papisenclosure](https://github.com/papisgarage/papisenclosure)

This folder is both your working project and your git repository:

`C:\Users\Papis\Documents\tow-truck-enclosure-website`

### First-time setup

```powershell
cd C:\Users\Papis\Documents\tow-truck-enclosure-website
.\scripts\git-setup.ps1
```

This connects the folder to GitHub. Remote URL is stored in `git.remote` (copy from `git.remote.example` if missing).

### Push to GitHub

After making changes:

```powershell
.\scripts\publish-to-github.ps1 "Describe your changes"
```

That commits and pushes to `main` on GitHub.

### GitHub Pages (auto-deploy)

Pushes to `main` trigger a GitHub Actions workflow that builds and deploys the site to:

**https://papisgarage.github.io/papisenclosure/**

Enable it once in your repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**

Optional: add these **repository secrets** so YouTube works on the live site:

| Secret | Value |
|--------|-------|
| `VITE_YOUTUBE_API_KEY` | Your API key |
| `VITE_YOUTUBE_PLAYLIST_ID` | Your playlist URL or ID |
| `VITE_YOUTUBE_BUILD_VIDEO_ID` | Build video URL or ID |

---

## Deploy (GitHub Pages)

Production base path is set in `vite.config.ts`:

```ts
const GITHUB_PAGES_BASE = '/papisenclosure/'
```

Manual build (if needed):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project structure

```
src/
  components/          Page sections and shared UI
    ui/                Button, Container, SectionTitle, Logo
  data/                Feature content, Shorts fallback data
  hooks/               useYouTubeShorts
  lib/                 images.ts, youtube.ts, constants.ts
  assets/images/       Source images (auto-globbed)
public/
  fonts/               Ethnocentric brand font
  favicon.svg
scripts/
  sync-images.ps1         Copy Web Pictures → site folders
  git-setup.ps1           One-time git clone + connect
  publish-to-github.ps1   Sync, commit, and push to GitHub
.github/workflows/
  deploy.yml              Auto-deploy to GitHub Pages on push
Web Pictures/          Original photo library (not deployed)
Font/                  Source font file
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `.\scripts\publish-to-github.ps1 "msg"` | Commit and push to GitHub |

---

## Tech stack

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS 3** — custom charcoal / navy / teal / cyan palette
- **Framer Motion** — scroll reveals, carousels, hero parallax
- **Lucide React** — icons
- **YouTube Data API v3** — playlist-driven Shorts carousel
