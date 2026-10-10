"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Zap } from "lucide-react";
import Link from "next/link";

const TRENDING_TAGS = [
  { label: "ChatGPT vs Claude", q: "chatgpt vs claude" },
  { label: "AI Side Hustles", q: "ai side hustles" },
  { label: "Best AI Tools 2026", q: "best ai tools" },
  { label: "Cursor AI", q: "cursor ai" },
  { label: "Make Money with AI", q: "make money ai" },
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/blog?q=${encodeURIComponent(q)}`);
  }

  return (
    <section
      className="w-full px-4 py-16 sm:py-20 text-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(207,128,71,0.15) 0%, transparent 70%), #0a0a0a",
      }}
    >
      {/* Eyebrow pill */}
      <div className="inline-flex items-center gap-1.5 bg-[#b15f2c]/10 border border-[#b15f2c]/25 rounded-full px-3 py-1 mb-6">
        <Zap className="w-3 h-3 text-[#cf8047]" />
        <span className="text-xs font-semibold text-[#cf8047] tracking-wide uppercase">
          AI tools · reviews · tutorials
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-[1.1] max-w-3xl mx-auto">
        Your AI knowledge hub,{" "}
        <span className="text-[#cf8047]">no fluff.</span>
      </h1>

      <p className="text-zinc-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
        Honest reviews, step-by-step tutorials and breaking AI news — updated
        daily.
      </p>

      {/* Search box */}
      <form
        onSubmit={handleSearch}
        className="relative max-w-2xl mx-auto mb-6"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools, tutorials, reviews…"
          className="w-full h-14 rounded-2xl bg-zinc-900 border border-zinc-700 hover:border-zinc-600 pl-12 pr-36 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#b15f2c] focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 bg-[#b15f2c] text-white text-sm font-bold rounded-xl hover:bg-[#cf8047] active:scale-95 transition-all"
        >
          Search
        </button>
      </form>

      {/* Trending tags */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
        <span className="text-xs text-zinc-600 font-medium">Trending:</span>
        {TRENDING_TAGS.map((tag) => (
          <Link
            key={tag.q}
            href={`/blog?q=${encodeURIComponent(tag.q)}`}
            className="text-xs text-zinc-400 hover:text-[#cf8047] hover:border-[#b15f2c]/40 border border-zinc-800 rounded-full px-3 py-1 transition-all"
          >
            {tag.label}
          </Link>
        ))}
      </div>

      {/* Stats strip */}
      <div className="flex items-center justify-center gap-8 border-t border-zinc-800 pt-8 max-w-sm mx-auto">
        {[
          { value: "100+", label: "Articles" },
          { value: "50k+", label: "Monthly Readers" },
          { value: "Daily", label: "Updated" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
