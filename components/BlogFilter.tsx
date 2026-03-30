"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { Category } from "@/data/posts";

interface BlogFilterProps {
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
}

export default function BlogFilter({ categories, initialQuery, initialCategory }: BlogFilterProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const categorySlugMap: Record<string, string> = {
    "All": "/blog",
    "AI & Tech": "/ai-tech",
    "Make Money": "/make-money",
    "Gadgets": "/gadgets",
    "Finance": "/finance",
    "Health": "/health",
    "Trending": "/trending",
    "News": "/news",
  };

  function applySearch() {
    const slug = categorySlugMap[initialCategory] || "/blog";
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    router.push(`${slug}${qs ? `?${qs}` : ""}`);
  }

  function selectCategory(cat: string) {
    const slug = categorySlugMap[cat] || "/blog";
    router.push(slug);
  }

  return (
    <>
      {/* Search Bar */}
      <div className="relative flex-1 mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          placeholder="Search articles..."
          className="w-full glass rounded-xl pl-12 pr-32 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          style={{ color: "var(--text-primary)" }}
        />
        <button
          onClick={applySearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-sm py-1.5 px-4"
        >
          Search
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => selectCategory("All")}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            background: initialCategory === "All" ? "linear-gradient(to right,#9333ea,#3b82f6)" : "var(--bg-card)",
            color: initialCategory === "All" ? "white" : "var(--text-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => selectCategory(cat.name)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: initialCategory === cat.name ? "linear-gradient(to right,#9333ea,#3b82f6)" : "var(--bg-card)",
              color: initialCategory === cat.name ? "white" : "var(--text-secondary)",
              border: "1px solid var(--border-color)",
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </>
  );
}
