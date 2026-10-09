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
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold text-white">
              Click<span className="text-blue-400">Wise</span>
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
                    ? "text-blue-400"
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
                className="w-full rounded-xl bg-surface-1 border border-white/10 pl-11 pr-24 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-black text-xs font-bold rounded-lg px-3 py-1.5 hover:bg-blue-400 transition-colors"
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
                    ? "text-blue-400 bg-blue-500/10"
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
