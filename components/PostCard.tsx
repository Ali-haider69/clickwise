import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Clock } from "lucide-react";
import type { Post } from "@/data/posts";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  featured?: boolean;
  compact?: boolean;
}

export default function PostCard({
  post,
  priority = false,
  compact = false,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800",
        "transition-all duration-300 hover:border-[#b15f2c]/40 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(177,95,44,0.12)]",
        compact && "w-[260px] flex-shrink-0"
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={compact ? "260px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        {/* Category badge */}
        <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-sm text-[#cf8047] text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 border border-[#b15f2c]/20">
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <h3
          className={cn(
            "font-semibold text-white leading-snug group-hover:text-[#f5d9c0] transition-colors line-clamp-2",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {post.title}
        </h3>

        {!compact && (
          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center gap-1 pt-2.5 border-t border-zinc-800/60">
          <Clock className="w-3 h-3 text-zinc-700" />
          <span className="text-[11px] text-zinc-600">{post.readTime}</span>
          <span className="text-zinc-800 mx-0.5">·</span>
          <span className="text-[11px] text-zinc-600">{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
