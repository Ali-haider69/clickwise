import React from "react";
import { posts, categories } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import BlogFilter from "@/components/BlogFilter";

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
}

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  const filtered = posts.filter((p) =>
    category === "Trending" ? p.trending : p.category === category
  );

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted.find((p) => p.featured);
  const rest = sorted.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">{title}</span>
          </h1>
          <p className="max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>
        </div>

        <BlogFilter
          categories={categories}
          initialQuery=""
          initialCategory={category}
        />

        <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
        </p>

        {featured && (
          <div className="grid grid-cols-1 mb-8">
            <BlogCard post={featured} featured />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
