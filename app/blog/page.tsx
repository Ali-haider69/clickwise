import React from "react";
import { posts, categories } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import BlogFilter from "@/components/BlogFilter";
import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

/** Always canonical /blog — avoids duplicate index URLs for ?q= search variants. */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog — AI Tools, Make Money, Gadgets & More",
    description:
      "Guides, comparisons, and reviews on AI tools, side hustles, gadgets, and finance. Everything you need to make smarter decisions in 2026.",
    ...canonicalMeta("/blog"),
  };
}

interface BlogPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q = "" } = await searchParams;

  const filtered = posts.filter((p) => {
    return (
      q.trim() === "" ||
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(q.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())) ||
      p.category.toLowerCase().includes(q.toLowerCase())
    );
  });

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted.find((p) => p.featured);
  const rest = sorted.filter((p) => !p.featured);

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

        {/* Interactive search + filter (client component) */}
        <BlogFilter
          categories={categories}
          initialQuery={q}
          initialCategory="All"
        />

        {/* Results count */}
        {q.trim() && (
          <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
            {filtered.length === 0
              ? `No results for "${q}"`
              : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}${q.trim() ? ` for "${q}"` : ""}`}
          </p>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              No articles found
            </p>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Try a different search term or browse all categories.
            </p>
            <a href="/blog" className="btn-primary px-6 py-2 text-sm">
              Clear filters
            </a>
          </div>
        )}

        {/* Featured Post — server-rendered, Googlebot sees this */}
        {featured && (
          <div className="grid grid-cols-1 mb-8">
            <BlogCard post={featured} featured />
          </div>
        )}

        {/* All Posts Grid — server-rendered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
