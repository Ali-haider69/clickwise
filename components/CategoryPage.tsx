import React from "react";
import { posts, categories } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import BlogFilter from "@/components/BlogFilter";

interface TopicHighlight {
  title: string;
  text: string;
}

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
  introHeading?: string;
  introParagraphs?: string[];
  topicHighlights?: TopicHighlight[];
  ctaText?: string;
}

export default function CategoryPage({
  category,
  title,
  description,
  introHeading,
  introParagraphs,
  topicHighlights,
  ctaText,
}: CategoryPageProps) {
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

        {/* Unique intro content section */}
        {(introParagraphs || topicHighlights) && (
          <div className="mb-12">
            {introHeading && (
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                {introHeading}
              </h2>
            )}

            {introParagraphs && (
              <div className="glass rounded-2xl p-6 md:p-8 mb-6 space-y-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {introParagraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}

            {topicHighlights && topicHighlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {topicHighlights.map((topic) => (
                  <div key={topic.title} className="glass rounded-2xl p-5">
                    <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
                      {topic.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {topic.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {ctaText && (
              <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
                {ctaText}
              </p>
            )}
          </div>
        )}

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
