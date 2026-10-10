import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/data/posts";
import { ArrowRight } from "lucide-react";

export default function ReadNext({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="my-10 p-6 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
      <p className="text-sm font-bold uppercase tracking-wide mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <ArrowRight className="w-4 h-4 text-[#b15f2c]" /> Keep Reading
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.slice(0, 2).map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="flex gap-3 group rounded-xl p-3 transition-colors hover:bg-[#b15f2c]/5"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={p.image} alt={p.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#b15f2c] dark:text-[#cf8047] mb-0.5">{p.category}</p>
              <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#b15f2c] dark:group-hover:text-[#cf8047] transition-colors" style={{ color: "var(--text-primary)" }}>
                {p.title}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{p.readTime} read</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
