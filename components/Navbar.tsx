"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Blogs", href: "/blog" },
  { label: "Tools 🔥", href: "/tools" },
  { label: "Reviews", href: "/reviews" },
  { label: "Compare", href: "/compare" },
  { label: "Make Money", href: "/blog?cat=money" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  const isNewsActive = pathname === "/blog" && cat === "News";

  function isLinkActive(href: string) {
    if (href === "/blog") return pathname === "/blog" && !cat;
    if (href === "/blog?cat=money") return pathname === "/blog" && cat === "money";
    return pathname === href || pathname.startsWith(href + "/");
  }

  function handleNavSearch() {
    const q = navQuery.trim();
    if (q) { router.push(`/blog?q=${encodeURIComponent(q)}`); setSearchOpen(false); setNavQuery(""); }
  }

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: scrolled ? "var(--shadow)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span style={{ color: "var(--text-primary)" }}>Click</span>
              <span className="gradient-text">Wise</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                  style={active
                    ? { background: "rgba(147,51,234,0.15)", color: "var(--purple-400, #a855f7)", fontWeight: 600 }
                    : { color: "var(--text-secondary)" }
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/blog?cat=News"
              className="px-4 py-2 rounded-lg transition-all duration-200 text-sm font-bold flex items-center gap-1.5"
              style={isNewsActive
                ? { background: "linear-gradient(to right, #9333ea, #3b82f6)", color: "#fff" }
                : { background: "rgba(147,51,234,0.1)", color: "#a855f7" }
              }
            >
              <span className="relative flex h-2 w-2">
                <span className={`${isNewsActive ? "" : "animate-ping"} absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75`} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              Live News
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg border transition-all hover:bg-purple-500/10"
              style={{ color: "var(--text-primary)", borderColor: "var(--border-color)", background: "var(--bg-card)" }}
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg border transition-all hover:bg-purple-500/10 flex items-center justify-center"
              style={{ color: "var(--text-primary)", borderColor: "var(--border-color)", background: "var(--bg-card)", minWidth: "38px", minHeight: "38px" }}
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link href="/blog" className="hidden md:flex btn-primary text-sm py-2 px-4">
              Start Reading
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg border transition-all hover:bg-purple-500/10"
              style={{ color: "var(--text-primary)", borderColor: "var(--border-color)", background: "var(--bg-card)" }}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--text-muted)" }} />
              <input
                autoFocus
                type="text"
                value={navQuery}
                onChange={(e) => setNavQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNavSearch()}
                placeholder="Search articles, tools, reviews..."
                className="w-full rounded-xl pl-12 pr-28 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 glass"
                style={{ color: "var(--text-primary)" }}
              />
              <button
                onClick={handleNavSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-white rounded-lg px-4 py-1.5 transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(to right, #9333ea, #3b82f6)" }}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t animate-fade-up"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg transition-all text-sm font-medium"
                  style={active
                    ? { background: "rgba(147,51,234,0.15)", color: "#a855f7", fontWeight: 600 }
                    : { color: "var(--text-secondary)" }
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/blog?cat=News"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all text-sm font-bold"
              style={isNewsActive
                ? { background: "linear-gradient(to right, #9333ea, #3b82f6)", color: "#fff" }
                : { background: "rgba(147,51,234,0.1)", color: "#a855f7" }
              }
            >
              <span className="relative flex h-2 w-2">
                <span className={`${isNewsActive ? "" : "animate-ping"} absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75`} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              Live News
            </Link>
            <div className="pt-2">
              <Link href="/blog" className="btn-primary block text-center text-sm">
                Start Reading
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
