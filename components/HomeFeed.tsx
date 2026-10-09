"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import FeaturedGrid from "@/components/FeaturedGrid";
import Link from "next/link";
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
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-blue-500 rounded-full" />
          <h2 className="text-base font-bold text-white">Featured</h2>
        </div>
        <Link
          href="/blog"
          className="text-xs text-zinc-500 hover:text-blue-400 transition-colors font-medium"
        >
          View all →
        </Link>
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => setActive(chip)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border",
              active === chip
                ? "bg-blue-500 text-black border-blue-500"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
            )}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Featured grid */}
      <FeaturedGrid posts={filtered} />
    </section>
  );
}
