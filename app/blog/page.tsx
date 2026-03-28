"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { posts, categories } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import { Search } from "lucide-react";

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("cat") || "All");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setActiveCategory(searchParams.get("cat") || "All");
  }, [searchParams]);

  const filtered = posts.filter((p) => {
    const matchesQuery = query.trim() === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.category.toLowerCase().includes(query.toLowerCase());

    const matchesCat = activeCategory === "All" ||
      p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === "trending" && p.trending);

    return matchesQuery && matchesCat;
  });

  function applySearch(q: string) {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (activeCategory !== "All") params.set("cat", activeCategory);
    router.push(`/blog?${params.toString()}`);
  }

  function selectCategory(cat: string) {
    setActiveCategory(cat);
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (cat !== "All") params.set("cat", cat);
    router.push(`/blog?${params.toString()}`);
  }

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">All Articles</span>
          </h1>
          <p className="max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Guides, comparisons, reviews, and how-tos — everything you need to make smarter decisions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--text-muted)" }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch(query)}
            placeholder="Search articles..."
            className="w-full glass rounded-xl pl-12 pr-32 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            style={{ color: "var(--text-primary)" }}
          />
          <button
            onClick={() => applySearch(query)}
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
              background: activeCategory === "All" ? "linear-gradient(to right,#9333ea,#3b82f6)" : "var(--bg-card)",
              color: activeCategory === "All" ? "white" : "var(--text-secondary)",
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
                background: activeCategory === cat.name ? "linear-gradient(to right,#9333ea,#3b82f6)" : "var(--bg-card)",
                color: activeCategory === cat.name ? "white" : "var(--text-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(query.trim() || activeCategory !== "All") && (
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            {filtered.length === 0
              ? `No results for "${query}"`
              : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}${query.trim() ? ` for "${query}"` : ""}`}
          </p>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>No articles found</p>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Try a different search term or browse all categories.</p>
            <button onClick={() => { setQuery(""); selectCategory("All"); }} className="btn-primary px-6 py-2 text-sm">
              Clear filters
            </button>
          </div>
        )}

        {/* Featured Post */}
        {featured && (
          <div className="grid grid-cols-1 mb-8">
            <BlogCard post={featured} featured />
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-20 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}
