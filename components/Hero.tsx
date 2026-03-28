"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, Star, Zap } from "lucide-react";
import Link from "next/link";

const trending = [
  "Best AI Tools 2026",
  "ChatGPT vs Claude",
  "Make Money Online",
  "Best Laptops",
  "Side Hustles",
];

const stats = [
  { label: "Reviews Published", value: "500+", icon: Star },
  { label: "Monthly Readers", value: "200K+", icon: TrendingUp },
  { label: "Categories", value: "6", icon: Zap },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch() {
    const q = query.trim();
    if (q) router.push(`/blog?q=${encodeURIComponent(q)}`);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-600 dark:text-purple-400 font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Updated daily with the latest deals &amp; reviews
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 animate-fade-up">
          <span style={{ color: "var(--text-primary)" }}>Discover What&apos;s</span>
          <br />
          <span className="gradient-text">Actually Worth It</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ color: "var(--text-secondary)", animationDelay: "0.1s" }}>
          Unbiased reviews, honest comparisons, and smart picks for AI tools,
          gadgets, side hustles, and everything trending in 2026.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative gradient-border rounded-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search best AI tools, gadgets, side hustles..."
              className="w-full rounded-2xl pl-14 pr-36 py-4 focus:outline-none text-base"
              style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-white rounded-xl px-5 py-2 transition-opacity hover:opacity-90 active:opacity-75"
              style={{ background: "linear-gradient(to right, #9333ea, #3b82f6)" }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Trending Searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>Trending:</span>
          {trending.map((term) => (
            <Link
              key={term}
              href={`/blog?q=${encodeURIComponent(term)}`}
              className="text-sm glass px-3 py-1 rounded-full transition-all hover:border-purple-400/40"
              style={{ color: "var(--text-secondary)" }}
            >
              {term}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass rounded-2xl p-4 text-center card-hover">
              <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
              <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-purple-400/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-purple-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
