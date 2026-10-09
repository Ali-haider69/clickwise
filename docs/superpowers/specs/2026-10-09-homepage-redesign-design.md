# ClickWise Homepage Redesign + YouTube Embeds

**Date:** 2026-10-09  
**Status:** Approved — ready for implementation planning

---

## 1. Goals

1. Replace the current homepage with a dark, image-first design that improves engagement and dwell time.
2. Add instant category filtering (no page reload) and Embla Carousel rows for content discovery.
3. Embed curated YouTube videos on the homepage and optionally mid-post — using a lazy facade to preserve Core Web Vitals.

---

## 2. Architecture

### Rendering
- `app/page.tsx` is a **Server Component** with `export const revalidate = 3600` (ISR, hourly rebuild).
- All data comes from static imports (`data/posts.ts`, new `data/videos.ts`) — no fetch latency.
- The page pre-slices post arrays server-side and passes them as props to client components.
- SSG HTML contains all post cards, so Google crawlers see full content without JS.

### Component tree
```
app/page.tsx  (Server, ISR)
├── TopBar              (client — dismissible newsletter bar)
├── Navbar              (client — Topics dropdown, Subscribe btn)  [replaces existing]
├── HeroSearch          (client — search input → /blog?q=)
├── HomeFeed            (client island — chips + featured grid)
│   ├── CategoryChips
│   └── FeaturedGrid    (PostCard × 4, first card 2-col)
├── CarouselRow × 3     (client, Embla)
│   ├── "Trending"            ← posts.filter(p => p.trending)
│   ├── "Beginner Tutorials"  ← posts.filter(p => p.category === "Tutorials")
│   └── "Tool Reviews"        ← posts.filter(p => p.category === "Reviews")
├── CarouselRow "Watch & Learn"  (VideoCard items from data/videos.ts)
└── Newsletter          (existing component, reused unchanged)
```

---

## 3. Visual Design System

### New Tailwind tokens (added to `tailwind.config.ts`)

| Token | Value | Purpose |
|---|---|---|
| `lime-accent` | `#a3e635` | Subscribe btn, active chip, search CTA ring, hover borders |
| `surface-0` | `#0a0a0a` | Page background |
| `surface-1` | `#111111` | Card backgrounds |
| `surface-2` | `#1a1a1a` | TopBar bg, hover states |

Existing `dark.bg`, `dark.card`, `dark.border` tokens and brand colors (purple/blue/pink) are **not removed** — they remain for inner pages.

### Global CSS
- `body` background set to `#0a0a0a` via CSS variable override on homepage only (scoped via `.homepage` class on `<main>`).
- Lime focus ring: `ring-lime-400` applied globally to interactive elements via `globals.css` `.focus-lime` utility.

### Typography
- Hero headline: `text-5xl font-black tracking-tight text-white`
- Card titles: `text-sm font-semibold text-white`
- Muted text: `text-zinc-400`
- Font: Inter (unchanged)

---

## 4. New Dependencies

| Package | Purpose |
|---|---|
| `embla-carousel-react` | Horizontal carousel rows |
| `@next/third-parties` | `YouTubeEmbed` facade component |

shadcn/ui is **initialized** (`npx shadcn@latest init`) and the following components are added:
- `button` — Subscribe btn, chip active state
- `dropdown-menu` — Topics nav dropdown
- `input` — HeroSearch box
- `badge` — Category badge on PostCard, chip pills

Existing Radix UI slot (`@radix-ui/react-slot`) is already installed and compatible.

---

## 5. Component Specifications

### 5.1 TopBar (`components/TopBar.tsx`)
- **Height:** 36px, `bg-surface-2`
- **Content:** `"Get our free AI tools newsletter →"` with lime-underlined link to `#newsletter`
- **Dismiss:** `×` button. State stored in `sessionStorage` key `topbar-dismissed` so it stays hidden for the session but reappears on next visit.
- **Client component.**

### 5.2 Navbar (`components/Navbar.tsx`) — replaces existing
- **Left:** Logo (unchanged)
- **Center:** Home, Blog, Reviews, Tools links + **Topics** `DropdownMenu`
  - Topics dropdown lists: AI Tools, Tutorials, News, Reviews, Gadgets — each links to `/blog?category={value}`
- **Right:** Search icon (existing behavior), **Subscribe** button (`bg-lime-400 text-black font-bold rounded-full px-4 py-1.5`)
- **Scroll behavior:** `bg-transparent` at top → `backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/8` after 10px scroll (via `useEffect` + `addEventListener`).
- Old `Navbar.tsx` saved as `components/Navbar.legacy.tsx` before replacement.

### 5.3 HeroSearch (`components/HeroSearch.tsx`)
- **Headline:** `"Ask about any AI tool, tutorial or trend."`
- **Subheading:** `"Covering AI tools, tutorials, news and reviews."`
- **Input:** Full-width `max-w-2xl`, lime focus ring, magnifier icon (Lucide `Search`), placeholder `"Search ClickWise…"`
- **Submit:** Navigates to `/blog?q={value}` (reuses existing blog search).
- **No additional chips here** — chips live in HomeFeed below.
- Client component.

### 5.4 HomeFeed (`components/HomeFeed.tsx`)
- **Props:** `posts: Post[]` (the `featuredPosts` slice, max 8, passed from server — not the full 100+ array)
- **State:** `activeCategory: string` (default `"All"`)
- **Chip labels → filter logic:**
  ```
  "All"       → all posts
  "Tools"     → category includes "Tool" (case-insensitive) || category === "AI Tools"
  "Tutorials" → category === "Tutorials"
  "News"      → category === "News"
  "Reviews"   → category === "Reviews"
  ```
- Filtered posts passed to `FeaturedGrid` (first 4 results shown).
- Active chip styled: `bg-lime-400 text-black font-bold`; inactive: `bg-surface-1 text-zinc-400 border border-white/8`

### 5.5 FeaturedGrid (`components/FeaturedGrid.tsx`)
- **Layout:** CSS grid, 2 columns on md+, 1 on mobile.
- **First card:** spans 2 columns (`col-span-2`), taller image (`aspect-[16/7]`).
- **Remaining 3 cards:** standard `aspect-video` (16:9).
- All cards are `PostCard` components.

### 5.6 PostCard (`components/PostCard.tsx`)
- **Wrapper:** `<Link href={/blog/${post.slug}}>` — entire card is clickable, SEO-safe.
- **Image:** `<Image>` with `fill` layout, `sizes="(max-width: 768px) 100vw, 50vw"`, `priority` on first card only, `loading="lazy"` on all others.
- **Overlay:** dark gradient from bottom, category badge (lime text, surface-1 bg) top-left.
- **Body:** title (2-line clamp), excerpt (2-line clamp, zinc-400), read-time + date row.
- **Hover:** `border-lime-400/40` border transition, `scale-[1.01]` transform.
- This component is **homepage-only**. Existing `BlogCard.tsx` is not modified.

### 5.7 CarouselRow (`components/CarouselRow.tsx`)
- **Props:** `{ title: string; posts?: Post[]; videos?: VideoEntry[]; }`
- **Engine:** `useEmblaCarousel({ containScroll: "trimSnaps", dragFree: true })`
- **Card width:** 300px fixed, gap 16px, no wrap.
- **Arrows:** Left/right `ChevronLeft`/`ChevronRight` buttons; hidden when at boundary (`canScrollPrev`/`canScrollNext`).
- **Images below row 1:** all `loading="lazy"`.
- Renders `PostCard` (compact variant) for post rows, `VideoCard` for video row.

### 5.8 VideoCard (`components/VideoCard.tsx`)
- **Default state:** Static `<img>` of YouTube thumbnail (`https://img.youtube.com/vi/{id}/hqdefault.jpg`), play button overlay, title, channel name.
- **On click:** Replaces thumbnail with `<YouTubeEmbed videoid={id} params="autoplay=1&controls=1" />` from `@next/third-parties/google`. YouTube scripts load only at this point.
- **Wrapper:** `<a href="https://youtube.com/watch?v={id}" target="_blank" rel="noopener noreferrer">` when JS is disabled (progressive enhancement). When JS enabled, click handler intercepts.
- **Size:** 300×169px (16:9), matches carousel card width.

---

## 6. Data Strategy

### 6.1 Post interface addition (`data/posts.ts`)
Add one optional field — non-breaking, all existing posts unaffected:
```ts
videoId?: string  // YouTube video ID for optional mid-post embed
```

### 6.2 New file: `data/videos.ts`
```ts
export interface VideoEntry {
  id: string        // YouTube video ID (e.g. "dQw4w9WgXcQ")
  title: string
  channel: string
  category: string  // "Tools" | "Tutorials" | "News" | "Reviews"
  thumbnail?: string // optional custom thumbnail URL; falls back to ytimg CDN
}

export const videos: VideoEntry[] = [
  // ~15 manually curated entries — update this file to refresh the carousel
]
```

No YouTube API key required. Video IDs are manually curated and updated when stale.

### 6.3 Homepage data slicing (in `app/page.tsx`)
```ts
const featuredPosts  = posts.filter(p => p.featured).slice(0, 8)
const trendingPosts  = posts.filter(p => p.trending).slice(0, 10)
const tutorialPosts  = posts.filter(p => p.category === "Tutorials").slice(0, 10)
const reviewPosts    = posts.filter(p => p.category === "Reviews").slice(0, 10)
```
`featuredPosts` and the full `posts` array both passed to `HomeFeed`. Carousel arrays passed to their respective `CarouselRow` instances.

---

## 7. YouTube Embeds on Blog Posts

### VideoSection component (`components/VideoSection.tsx`)
- **Props:** `{ videoId: string; title?: string; caption?: string }`
- **Placement rule:** Never within the first 600px of article content (protects LCP).
- **Markup for SEO:**
  ```html
  <figure>
    <div class="video-facade">...</div>
    <figcaption>▶ Watch: {title}</figcaption>
  </figure>
  ```
- Uses same facade → `YouTubeEmbed` swap pattern as `VideoCard`.
- Added to `blogContent.tsx` entries manually where relevant.

### Mid-post embed strategy
- Add `VideoSection` to ~10 existing high-traffic posts (tool reviews, tutorials) as an initial rollout.
- Placement: after the second heading / intro section, before the main body.
- Never autoplay — `params="controls=1"` only.

---

## 8. Files Changed / Created

### New files
| File | Type |
|---|---|
| `components/TopBar.tsx` | New |
| `components/HeroSearch.tsx` | New |
| `components/HomeFeed.tsx` | New (client island) |
| `components/FeaturedGrid.tsx` | New |
| `components/PostCard.tsx` | New (homepage card) |
| `components/CarouselRow.tsx` | New |
| `components/VideoCard.tsx` | New |
| `components/VideoSection.tsx` | New (blog post embed) |
| `data/videos.ts` | New |

### Modified files
| File | Change |
|---|---|
| `app/page.tsx` | Full rewrite — new layout, ISR, data slicing |
| `components/Navbar.tsx` | Replaced (old saved as `Navbar.legacy.tsx`) |
| `tailwind.config.ts` | Add lime-accent, surface-0/1/2 tokens |
| `app/globals.css` | Add `.homepage` scope, `.focus-lime` utility |
| `data/posts.ts` | Add `videoId?: string` to `Post` interface |
| `data/blogContent.tsx` | Add `<VideoSection>` to ~10 posts |
| `package.json` | Add `embla-carousel-react`, `@next/third-parties` |

### Untouched files
`BlogCard.tsx`, `BentoGrid.tsx`, `Hero.tsx`, `Footer.tsx`, `Newsletter.tsx`, `ProductCard.tsx`, all `/app/blog/` routes, all category pages, all lib/ and middleware files.

---

## 9. SEO & Core Web Vitals

- All `PostCard` and `VideoCard` wrappers are `<Link>` / `<a>` tags — crawlable, no JS required to discover links.
- `priority` prop on first `PostCard` image only (above fold LCP candidate).
- `loading="lazy"` on all images below the first carousel row.
- YouTube scripts never load on page load — only on user click (facade pattern).
- `revalidate = 3600` ensures homepage stays fresh without a full rebuild.
- No CLS risk: image containers have explicit aspect ratios set via CSS (`aspect-video`, `aspect-[16/7]`).

---

## 10. Out of Scope

- YouTube Data API integration (auto-fetching trending videos) — manually curated `data/videos.ts` for now.
- Dark/light mode toggle on homepage — homepage is dark-only; inner pages keep existing theme toggle.
- Pagination or infinite scroll on the featured grid — chips + 4 cards is sufficient; full listing is at `/blog`.
- A/B testing framework.
