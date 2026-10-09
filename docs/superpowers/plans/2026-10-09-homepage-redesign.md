# Homepage Redesign + YouTube Embeds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ClickWise homepage with a dark image-first design featuring a lime accent, category chip filtering, Embla carousel rows, and lazy-facade YouTube embeds on both the homepage and blog posts.

**Architecture:** Server component `app/page.tsx` with `revalidate = 3600` (ISR) pre-slices static post arrays and passes them to client islands. `HomeFeed` is the only client island on the feed section; carousels are separate client components. YouTube scripts load only on click via a facade pattern.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3.4, embla-carousel-react, @next/third-parties, @radix-ui/react-dropdown-menu, lucide-react

**Spec:** `docs/superpowers/specs/2026-10-09-homepage-redesign-design.md`

## Global Constraints

- Next.js 15, React 19, TypeScript strict mode — no `any`
- Tailwind class names only (no inline `style={}` except where noted for existing CSS vars on non-homepage components)
- All card wrappers are `<Link>` or `<a>` — never `onClick` for navigation
- `priority` prop only on the very first above-fold image
- `loading="lazy"` on all images that are not the first above-fold image
- `aspect-video` (16:9) or `aspect-[16/7]` on all image containers — no CLS
- Do NOT modify: `BlogCard.tsx`, `BentoGrid.tsx`, `Hero.tsx`, `Footer.tsx`, `Newsletter.tsx`, `ProductCard.tsx`, any `/app/blog/` files, any category page files, `lib/`, `middleware.ts`
- No git commits during implementation — user will push when ready

---

## File Map

| File | Action |
|---|---|
| `package.json` | Add 3 deps |
| `lib/cn.ts` | Create — Tailwind merge utility |
| `components/ui/button.tsx` | Create — shadcn-style Button |
| `components/ui/badge.tsx` | Create — shadcn-style Badge |
| `components/ui/input.tsx` | Create — shadcn-style Input |
| `components/ui/dropdown-menu.tsx` | Create — Radix DropdownMenu wrapper |
| `tailwind.config.ts` | Extend — add lime-accent, surface-0/1/2 tokens |
| `app/globals.css` | Extend — add `.homepage` scope + `.focus-lime` |
| `data/posts.ts` | Extend — add `videoId?: string` to Post interface |
| `data/videos.ts` | Create — VideoEntry interface + curated list |
| `components/TopBar.tsx` | Create — dismissible newsletter bar |
| `components/Navbar.legacy.tsx` | Create — copy of old Navbar (backup) |
| `components/Navbar.tsx` | Replace — Topics dropdown + Subscribe btn |
| `components/HeroSearch.tsx` | Create — hero search input |
| `components/PostCard.tsx` | Create — dark 16:9 card for homepage |
| `components/FeaturedGrid.tsx` | Create — 2-col grid with featured hero card |
| `components/HomeFeed.tsx` | Create — client island: chips + grid |
| `components/VideoCard.tsx` | Create — YouTube facade card |
| `components/CarouselRow.tsx` | Create — Embla horizontal carousel |
| `components/VideoSection.tsx` | Create — mid-post YouTube embed |
| `app/page.tsx` | Rewrite — ISR + new layout |

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `embla-carousel-react`, `@next/third-parties`, `@radix-ui/react-dropdown-menu` available to import

- [ ] **Step 1: Install the three new packages**

```bash
npm install embla-carousel-react @next/third-parties @radix-ui/react-dropdown-menu
```

- [ ] **Step 2: Verify package.json has the new deps**

Open `package.json` and confirm these three appear under `"dependencies"`:
- `"embla-carousel-react"`
- `"@next/third-parties"`
- `"@radix-ui/react-dropdown-menu"`

- [ ] **Step 3: Verify TypeScript types resolve**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: zero new errors (there may be pre-existing ones — that is OK as long as the count doesn't increase).

---

## Task 2: UI Primitives (cn utility + shadcn-style components)

**Files:**
- Create: `lib/cn.ts`
- Create: `components/ui/button.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/dropdown-menu.tsx`

**Interfaces:**
- Produces:
  - `cn(...inputs: ClassValue[]): string` from `lib/cn.ts`
  - `Button` component from `components/ui/button.tsx`
  - `Badge` component from `components/ui/badge.tsx`
  - `Input` component from `components/ui/input.tsx`
  - `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` from `components/ui/dropdown-menu.tsx`

- [ ] **Step 1: Create `lib/cn.ts`**

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create `components/ui/button.tsx`**

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-lime-400 text-black hover:bg-lime-300",
        ghost: "bg-transparent text-zinc-400 border border-white/10 hover:border-lime-400/40 hover:text-white",
        outline: "border border-white/10 bg-[#111] text-white hover:bg-[#1a1a1a]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 px-3 text-xs",
        lg: "h-11 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 3: Create `components/ui/badge.tsx`**

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#111] text-lime-400 border border-lime-400/20",
        secondary: "bg-[#1a1a1a] text-zinc-300 border border-white/10",
        outline: "border border-white/10 text-zinc-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

- [ ] **Step 4: Create `components/ui/input.tsx`**

```tsx
import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl bg-[#111] border border-white/10 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

- [ ] **Step 5: Create `components/ui/dropdown-menu.tsx`**

```tsx
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/cn";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-[#111] p-1 shadow-xl animate-fade-in",
        className
      )}
      {...props}
    />
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none transition-colors hover:bg-[#1a1a1a] hover:text-white focus:bg-[#1a1a1a] focus:text-white",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
```

- [ ] **Step 6: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep -E "ui/(button|badge|input|dropdown)" | head -20
```

Expected: no errors on the new files.

---

## Task 3: Design Tokens + CSS Utilities

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: Tailwind classes `bg-surface-0`, `bg-surface-1`, `bg-surface-2`, `text-lime-accent`, `border-lime-accent` available project-wide; `.homepage` CSS scope; `.focus-lime` utility

- [ ] **Step 1: Extend `tailwind.config.ts` — add surface + lime tokens**

In `tailwind.config.ts`, inside `theme.extend.colors`, add the following alongside the existing `brand` and `dark` keys:

```ts
surface: {
  0: "#0a0a0a",
  1: "#111111",
  2: "#1a1a1a",
},
"lime-accent": "#a3e635",
```

The full `colors` block becomes:
```ts
colors: {
  brand: {
    purple: "#7C3AED",
    blue: "#2563EB",
    pink: "#EC4899",
  },
  dark: {
    bg: "#0A0A0F",
    card: "#12121A",
    border: "rgba(255,255,255,0.08)",
  },
  surface: {
    0: "#0a0a0a",
    1: "#111111",
    2: "#1a1a1a",
  },
  "lime-accent": "#a3e635",
},
```

- [ ] **Step 2: Add homepage scope + utility to `app/globals.css`**

Append this block at the end of the file, after the last `@keyframes` line:

```css
/* ── Homepage dark scope ───────────────────────── */
.homepage {
  background-color: #0a0a0a;
  color: #ffffff;
}

/* ── Lime focus ring utility ───────────────────── */
.focus-lime:focus-visible {
  outline: none;
  ring: 2px;
  ring-color: #a3e635;
  box-shadow: 0 0 0 2px #a3e635;
}

/* ── Line clamp helpers ────────────────────────── */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

- [ ] **Step 3: Verify Tailwind classes resolve**

```bash
npm run build 2>&1 | grep -i "error" | head -10
```

Expected: no Tailwind-related errors. (Build may fail on missing components — that is expected at this stage; look only for Tailwind/CSS errors.)

---

## Task 4: Data Layer — VideoEntry + Post.videoId

**Files:**
- Modify: `data/posts.ts` (interface only — first 22 lines)
- Create: `data/videos.ts`

**Interfaces:**
- Produces:
  - `Post.videoId?: string` optional field
  - `VideoEntry` interface exported from `data/videos.ts`
  - `videos: VideoEntry[]` array exported from `data/videos.ts`

- [ ] **Step 1: Add `videoId` to the Post interface in `data/posts.ts`**

In `data/posts.ts`, find the `Post` interface (lines 1–22). After the `primaryKeyword?: string;` line, add:

```ts
/** YouTube video ID for optional mid-post embed (e.g. "dQw4w9WgXcQ"). Never autoplay. */
videoId?: string;
```

- [ ] **Step 2: Create `data/videos.ts`**

```ts
export interface VideoEntry {
  id: string;        // YouTube video ID
  title: string;
  channel: string;
  category: "Tools" | "Tutorials" | "News" | "Reviews";
  thumbnail?: string; // custom thumbnail URL; falls back to ytimg CDN
}

// Manually curated. Update these IDs to keep the Watch & Learn carousel fresh.
// Verify each ID at: https://www.youtube.com/watch?v=<id>
export const videos: VideoEntry[] = [
  {
    id: "JTxsNm9IdYU",
    title: "Introducing ChatGPT",
    channel: "OpenAI",
    category: "News",
  },
  {
    id: "e0aqqFHsNP0",
    title: "Claude AI: Full Demo",
    channel: "Anthropic",
    category: "Tools",
  },
  {
    id: "pLCQDFWplGs",
    title: "How to Use Midjourney v6",
    channel: "AI Advantage",
    category: "Tutorials",
  },
  {
    id: "gqUQbjsYZLQ",
    title: "Cursor AI: The Best AI Code Editor",
    channel: "Fireship",
    category: "Tools",
  },
  {
    id: "UIZAiXYceBI",
    title: "Google Gemini: Everything You Need to Know",
    channel: "Google",
    category: "News",
  },
  {
    id: "Sqa8Zo2XWc4",
    title: "GitHub Copilot — Full Review 2025",
    channel: "Fireship",
    category: "Reviews",
  },
  {
    id: "8ext9G7xZCA",
    title: "Perplexity AI vs ChatGPT — Which is Better?",
    channel: "The AI Advantage",
    category: "Reviews",
  },
  {
    id: "oc6RV5c1yd0",
    title: "ElevenLabs Voice AI — Complete Tutorial",
    channel: "Matt Wolfe",
    category: "Tutorials",
  },
  {
    id: "ZXILzUpVx7A",
    title: "Make Money Online with AI Tools in 2025",
    channel: "Income Stream Surfers",
    category: "Tutorials",
  },
  {
    id: "kYWLZbKAZC0",
    title: "Top 10 AI Tools You're NOT Using",
    channel: "Matt Wolfe",
    category: "Tools",
  },
  {
    id: "aywZrzNaKjs",
    title: "Runway Gen-3 — AI Video Generation Review",
    channel: "Two Minute Papers",
    category: "Reviews",
  },
  {
    id: "jNQXAC9IVRw",
    title: "AI for Absolute Beginners — Full Course",
    channel: "freeCodeCamp",
    category: "Tutorials",
  },
  {
    id: "hJP5GqnTrNo",
    title: "Notion AI Complete Guide",
    channel: "Keep Productive",
    category: "Tools",
  },
  {
    id: "tFHeUSJAYbE",
    title: "GPT-4o Explained in 5 Minutes",
    channel: "AI Explained",
    category: "News",
  },
  {
    id: "DJimm8TnNKo",
    title: "I Built a SaaS with AI — Here's What Happened",
    channel: "Pieter Levels",
    category: "Tutorials",
  },
];
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit 2>&1 | grep "data/" | head -10
```

Expected: no errors on data files.

---

## Task 5: TopBar

**Files:**
- Create: `components/TopBar.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<TopBar />` — a 36px dismissible bar, renders `null` after dismiss

- [ ] **Step 1: Create `components/TopBar.tsx`**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function TopBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("topbar-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem("topbar-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-surface-2 border-b border-white/8 h-9 flex items-center justify-center px-4 relative z-40">
      <p className="text-xs text-zinc-300 text-center">
        Get our free AI tools newsletter —{" "}
        <Link
          href="#newsletter"
          className="underline decoration-lime-accent underline-offset-2 text-lime-accent font-semibold hover:text-lime-300 transition-colors"
        >
          subscribe now →
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Visual check**

Import `<TopBar />` temporarily at the top of `app/page.tsx`, run `npm run dev`, open `http://localhost:3000`, verify the bar appears and dismisses on click, and does not reappear on reload within the same session. Then remove the temporary import (it will be added properly in Task 12).

---

## Task 6: Navbar Replacement

**Files:**
- Create: `components/Navbar.legacy.tsx` (copy of current Navbar)
- Replace: `components/Navbar.tsx`

**Interfaces:**
- Consumes: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` from `components/ui/dropdown-menu.tsx`
- Produces: `<Navbar />` — fixed nav with Topics dropdown + lime Subscribe button; scroll-aware backdrop

- [ ] **Step 1: Copy current Navbar as backup**

Copy the full content of `components/Navbar.tsx` into a new file `components/Navbar.legacy.tsx`. The file should be identical — just a renamed copy. Do not import or use this file anywhere.

- [ ] **Step 2: Replace `components/Navbar.tsx`**

```tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, Menu, X, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Tools", href: "/tools" },
  { label: "Reviews", href: "/reviews" },
  { label: "Compare", href: "/compare" },
];

const topicLinks = [
  { label: "AI Tools", href: "/blog?category=AI+Tools" },
  { label: "Tutorials", href: "/blog?category=Tutorials" },
  { label: "News", href: "/blog?category=News" },
  { label: "Reviews", href: "/blog?category=Reviews" },
  { label: "Make Money", href: "/make-money" },
];

function NavbarInner() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  function handleSearch() {
    const q = navQuery.trim();
    if (q) {
      router.push(`/blog?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setNavQuery("");
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-[#0a0a0a]/80 border-b border-white/8"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-lime-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold text-white">
              Click<span className="text-lime-accent">Wise</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-lime-accent"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Topics dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors focus:outline-none">
                  Topics <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {topicLinks.map((t) => (
                  <DropdownMenuItem key={t.label} asChild>
                    <Link href={t.href}>{t.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="p-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="#newsletter">Subscribe</Link>
            </Button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                autoFocus
                type="text"
                value={navQuery}
                onChange={(e) => setNavQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search ClickWise…"
                className="w-full rounded-xl bg-surface-1 border border-white/10 pl-11 pr-24 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-lime-accent"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-lime-accent text-black text-xs font-bold rounded-lg px-3 py-1.5 hover:bg-lime-300 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#0a0a0a] animate-fade-up">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-lime-accent bg-lime-accent/10"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-1 border-t border-white/8 mt-2">
              <p className="px-4 py-2 text-xs text-zinc-600 uppercase tracking-wider font-semibold">Topics</p>
              {topicLinks.map((t) => (
                <Link
                  key={t.label}
                  href={t.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Button asChild className="w-full">
                <Link href="#newsletter" onClick={() => setMenuOpen(false)}>
                  Subscribe — It&apos;s Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`, open `http://localhost:3000`, verify the navbar renders, the Topics dropdown opens, the Subscribe button is lime, and the scroll behavior triggers after 10px.

---

## Task 7: HeroSearch

**Files:**
- Create: `components/HeroSearch.tsx`

**Interfaces:**
- Consumes: `Input` from `components/ui/input.tsx`
- Produces: `<HeroSearch />` — full-width hero with headline, subheading, and search input

- [ ] **Step 1: Create `components/HeroSearch.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/blog?q=${encodeURIComponent(q)}`);
  }

  return (
    <section className="pt-32 pb-16 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
        Ask about any AI tool,
        <br />
        <span className="text-lime-accent">tutorial or trend.</span>
      </h1>
      <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
        Covering AI tools, tutorials, news and reviews — no fluff.
      </p>
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ClickWise…"
          className="w-full h-14 rounded-2xl bg-surface-1 border border-white/10 pl-12 pr-32 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-lime-accent transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 bg-lime-accent text-black text-sm font-bold rounded-xl hover:bg-lime-300 transition-colors"
        >
          Search
        </button>
      </form>
    </section>
  );
}
```

---

## Task 8: PostCard

**Files:**
- Create: `components/PostCard.tsx`

**Interfaces:**
- Consumes: `Post` from `data/posts.ts`; `Badge` from `components/ui/badge.tsx`
- Produces:
  - `PostCard({ post, priority?, featured? }: PostCardProps)` — dark 16:9 card; `featured` makes it taller (`aspect-[16/7]`)

- [ ] **Step 1: Create `components/PostCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/data/posts";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  featured?: boolean; // spans 2 cols and uses taller aspect ratio — controlled by parent grid
  compact?: boolean;  // carousel variant: fixed 300px width, no col-span
}

export default function PostCard({ post, priority = false, featured = false, compact = false }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-surface-1 border border-white/8",
        "transition-all duration-300 hover:border-lime-accent/40 hover:scale-[1.01]",
        compact && "w-[300px] flex-shrink-0"
      )}
    >
      {/* Image container */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          featured ? "aspect-[16/7]" : "aspect-video"
        )}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 66vw"
              : compact
              ? "300px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent opacity-80" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge>{post.category}</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className={cn(
            "font-semibold text-white leading-snug line-clamp-2",
            featured ? "text-lg" : "text-sm"
          )}
        >
          {post.title}
        </h3>
        {!compact && (
          <p className="text-xs text-zinc-400 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-auto flex items-center gap-2 text-xs text-zinc-500 pt-2">
          <span>{post.readTime}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
```

---

## Task 9: FeaturedGrid + HomeFeed (client island)

**Files:**
- Create: `components/FeaturedGrid.tsx`
- Create: `components/HomeFeed.tsx`

**Interfaces:**
- `FeaturedGrid` consumes: `Post[]` (max 4), renders first as `featured`, rest as normal
- `HomeFeed` consumes: `posts: Post[]` (featuredPosts, max 8); manages `activeCategory` state; filters and passes max-4 to `FeaturedGrid`

- [ ] **Step 1: Create `components/FeaturedGrid.tsx`**

```tsx
import PostCard from "@/components/PostCard";
import type { Post } from "@/data/posts";

interface FeaturedGridProps {
  posts: Post[];
}

export default function FeaturedGrid({ posts }: FeaturedGridProps) {
  if (posts.length === 0) {
    return (
      <p className="text-zinc-500 text-sm py-12 text-center">No posts found in this category yet.</p>
    );
  }

  const [first, ...rest] = posts.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Hero card — full width on md+ */}
      <div className="md:col-span-2">
        <PostCard post={first} priority featured />
      </div>
      {/* Supporting cards */}
      {rest.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/HomeFeed.tsx`**

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import FeaturedGrid from "@/components/FeaturedGrid";
import type { Post } from "@/data/posts";

const CHIPS = ["All", "Tools", "Tutorials", "News", "Reviews"] as const;
type Chip = (typeof CHIPS)[number];

function filterPosts(posts: Post[], chip: Chip): Post[] {
  if (chip === "All") return posts;
  if (chip === "Tools")
    return posts.filter(
      (p) =>
        p.category.toLowerCase().includes("tool") ||
        p.category === "AI Tools"
    );
  return posts.filter((p) => p.category === chip);
}

interface HomeFeedProps {
  posts: Post[];
}

export default function HomeFeed({ posts }: HomeFeedProps) {
  const [active, setActive] = useState<Chip>("All");
  const filtered = filterPosts(posts, active).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category chips */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setActive(chip)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
              active === chip
                ? "bg-lime-accent text-black"
                : "bg-surface-1 text-zinc-400 border border-white/8 hover:border-lime-accent/40 hover:text-white"
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Featured grid */}
      <FeaturedGrid posts={filtered} />

      {/* View all link */}
      <div className="mt-6 text-center">
        <a
          href="/blog"
          className="text-sm text-zinc-500 hover:text-lime-accent transition-colors underline underline-offset-4"
        >
          View all articles →
        </a>
      </div>
    </section>
  );
}
```

---

## Task 10: VideoCard + CarouselRow

**Files:**
- Create: `components/VideoCard.tsx`
- Create: `components/CarouselRow.tsx`

**Interfaces:**
- `VideoCard` consumes: `VideoEntry` from `data/videos.ts`; produces self-contained facade card
- `CarouselRow` consumes: `{ title: string; posts?: Post[]; videos?: VideoEntry[] }`; renders Embla carousel

- [ ] **Step 1: Create `components/VideoCard.tsx`**

```tsx
"use client";

import { useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Play } from "lucide-react";
import type { VideoEntry } from "@/data/videos";

interface VideoCardProps {
  video: VideoEntry;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const thumb =
    video.thumbnail ??
    `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="w-[300px] flex-shrink-0 rounded-2xl overflow-hidden bg-surface-1 border border-white/8">
        <div className="w-full aspect-video">
          <YouTubeEmbed videoid={video.id} params="controls=1&autoplay=1" />
        </div>
        <div className="p-3">
          <p className="text-xs font-semibold text-white line-clamp-2">{video.title}</p>
          <p className="text-xs text-zinc-500 mt-1">{video.channel}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[300px] flex-shrink-0 rounded-2xl overflow-hidden bg-surface-1 border border-white/8 group transition-all hover:border-lime-accent/40">
      {/* Thumbnail facade */}
      <button
        onClick={() => setPlaying(true)}
        aria-label={`Play: ${video.title}`}
        className="relative w-full aspect-video block focus:outline-none focus:ring-2 focus:ring-lime-accent rounded-t-2xl overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={300}
          height={169}
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
          <div className="w-12 h-12 rounded-full bg-lime-accent flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          </div>
        </div>
      </button>
      <div className="p-3">
        <p className="text-xs font-semibold text-white line-clamp-2">{video.title}</p>
        <p className="text-xs text-zinc-500 mt-1">{video.channel}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/CarouselRow.tsx`**

```tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import VideoCard from "@/components/VideoCard";
import type { Post } from "@/data/posts";
import type { VideoEntry } from "@/data/videos";
import { cn } from "@/lib/cn";

interface CarouselRowProps {
  title: string;
  posts?: Post[];
  videos?: VideoEntry[];
}

export default function CarouselRow({ title, posts, videos }: CarouselRowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("init", updateButtons);
    updateButtons();
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("init", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const items = posts ?? videos ?? [];
  if (items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Row header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Scroll left"
            className={cn(
              "p-1.5 rounded-lg border border-white/10 text-zinc-400 transition-all",
              canPrev ? "hover:border-lime-accent/40 hover:text-white" : "opacity-30 cursor-default"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Scroll right"
            className={cn(
              "p-1.5 rounded-lg border border-white/10 text-zinc-400 transition-all",
              canNext ? "hover:border-lime-accent/40 hover:text-white" : "opacity-30 cursor-default"
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden -mx-1">
        <div className="flex gap-4 px-1">
          {posts?.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
          {videos?.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 11: VideoSection (Blog Post Embed)

**Files:**
- Create: `components/VideoSection.tsx`

**Interfaces:**
- Consumes: `{ videoId: string; title?: string; caption?: string }`
- Produces: `<VideoSection />` — facade figure element for mid-post use; no autoplay

- [ ] **Step 1: Create `components/VideoSection.tsx`**

```tsx
"use client";

import { useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Play } from "lucide-react";

interface VideoSectionProps {
  videoId: string;
  title?: string;
  caption?: string;
}

export default function VideoSection({ videoId, title, caption }: VideoSectionProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <figure className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-surface-1">
      {playing ? (
        <div className="w-full aspect-video">
          <YouTubeEmbed videoid={videoId} params="controls=1&autoplay=1" />
        </div>
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={title ? `Play: ${title}` : "Play video"}
          className="relative w-full aspect-video block group focus:outline-none focus:ring-2 focus:ring-lime-accent"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt={title ?? "Video thumbnail"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-lime-accent flex items-center justify-center shadow-xl">
              <Play className="w-7 h-7 text-black fill-black ml-0.5" />
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-left">
              <p className="text-sm font-semibold text-white">▶ Watch: {title}</p>
            </div>
          )}
        </button>
      )}
      {caption && (
        <figcaption className="px-4 py-2 text-xs text-zinc-500">{caption}</figcaption>
      )}
    </figure>
  );
}
```

---

## Task 12: Rewrite `app/page.tsx`

**Files:**
- Replace: `app/page.tsx`

**Interfaces:**
- Consumes: all new components; `posts` and `videos` data
- Produces: the new homepage; ISR revalidation every 3600s

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";
import TopBar from "@/components/TopBar";
import HeroSearch from "@/components/HeroSearch";
import HomeFeed from "@/components/HomeFeed";
import CarouselRow from "@/components/CarouselRow";
import Newsletter from "@/components/Newsletter";
import AdSenseUnit from "@/components/AdSenseUnit";
import { posts } from "@/data/posts";
import { videos } from "@/data/videos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ClickWise — Smart Picks. Real Reviews. Best Deals.",
  description:
    "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  ...canonicalMeta("/", {
    title: "ClickWise — Smart Picks. Real Reviews. Best Deals.",
    description:
      "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  }),
};

// Pre-slice server-side — client components receive only what they need
const featuredPosts = posts.filter((p) => p.featured).slice(0, 8);
const trendingPosts = posts.filter((p) => p.trending).slice(0, 12);
const tutorialPosts = posts.filter((p) => p.category === "Tutorials").slice(0, 12);
const reviewPosts   = posts.filter((p) => p.category === "Reviews").slice(0, 12);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ClickWise",
  url: "https://clickwise.website",
  logo: "https://clickwise.website/opengraph-image",
  description:
    "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ClickWise",
  url: "https://clickwise.website",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://clickwise.website/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <main className="homepage min-h-screen">
        {/* Top newsletter bar */}
        <TopBar />

        {/* Hero search */}
        <HeroSearch />

        {/* AdSense — top */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <AdSenseUnit format="horizontal" />
        </div>

        {/* Category chips + featured grid (client island) */}
        <HomeFeed posts={featuredPosts} />

        {/* Carousel: Trending */}
        <CarouselRow title="Trending Now" posts={trendingPosts} />

        {/* AdSense — mid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdSenseUnit format="rectangle" />
        </div>

        {/* Carousel: Beginner Tutorials */}
        <CarouselRow title="Beginner Tutorials" posts={tutorialPosts} />

        {/* Carousel: Tool Reviews */}
        <CarouselRow title="Tool Reviews" posts={reviewPosts} />

        {/* Carousel: Watch & Learn */}
        <CarouselRow title="Watch & Learn" videos={videos} />

        {/* Newsletter */}
        <div id="newsletter">
          <Newsletter />
        </div>

        {/* AdSense — bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
          <AdSenseUnit format="horizontal" />
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Update `app/layout.tsx` — offset content below the fixed Navbar**

In `app/layout.tsx`, find the `<body>` or `<main>` wrapper and ensure the Navbar offset is correct. The TopBar adds 36px above the 64px navbar. Verify the `<main>` content starts below both. If `layout.tsx` has a `pt-16` or `mt-16` on the content wrapper, change it to account for the TopBar: `pt-[100px]` (36 + 64). If there is no such padding, the `HeroSearch` already has `pt-32` so nothing to change.

Open `app/layout.tsx`, read the current structure, and ensure the Navbar sits above TopBar. The render order in `layout.tsx` should be: `<Navbar />` first, then `{children}`. TopBar is rendered inside `page.tsx` (homepage only), so it should NOT be in `layout.tsx`.

---

## Task 13: Build Verification

**Files:**
- None modified

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: 0 errors on any of the new files created in this plan. Pre-existing errors on unrelated files are acceptable.

- [ ] **Step 2: Run production build**

```bash
npm run build 2>&1
```

Expected: build completes successfully. The homepage route (`/`) should appear as a static page in the build output. Look for `○ /` in the output (static) or `◐ /` (ISR).

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- [ ] Page background is `#0a0a0a` (near-black)
- [ ] TopBar visible with lime link, dismisses correctly
- [ ] Navbar: Topics dropdown opens, Subscribe button is lime
- [ ] Hero search bar works — submitting navigates to `/blog?q=...`
- [ ] Category chips filter the featured grid with no page reload
- [ ] All three post carousel rows scroll horizontally
- [ ] Watch & Learn carousel shows YouTube thumbnails, plays video on click
- [ ] All post cards link to `/blog/[slug]`
- [ ] Newsletter section is reachable via `#newsletter` anchor
- [ ] `/blog` page, `/reviews`, and other inner pages are unaffected

- [ ] **Step 4: Verify no broken inner pages**

Open `http://localhost:3000/blog` and `http://localhost:3000/reviews`. Both should render with the old styles (dark theme toggle intact, BlogCard components unchanged).
