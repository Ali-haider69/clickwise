import Image from "next/image";
import Link from "next/link";
import { Clock, TrendingUp, ArrowRight } from "lucide-react";
import { type Post } from "@/data/posts";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group glass rounded-3xl overflow-hidden card-hover flex flex-col md:flex-row">
        <div className="relative md:w-1/2 h-56 md:h-auto overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
        </div>
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            {post.trending && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> Trending
              </span>
            )}
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" style={{ color: "var(--text-primary)" }}>
            {post.title}
          </h2>
          <p className="mb-6 line-clamp-3 text-sm" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <Clock className="w-4 h-4" />
              <span>{post.readTime} read</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:gap-2 transition-all">
              Read <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group glass rounded-2xl overflow-hidden card-hover flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {post.trending && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-bold text-white bg-orange-500/90 backdrop-blur px-2 py-0.5 rounded-full">
              Trending
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-2">{post.category}</span>
        <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 flex-1" style={{ color: "var(--text-primary)" }}>
          {post.title}
        </h3>
        <p className="text-sm line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs mt-auto pt-4" style={{ borderTop: "1px solid var(--border-color)", color: "var(--text-muted)" }}>
          <Clock className="w-3.5 h-3.5" />
          <span>{post.readTime}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
