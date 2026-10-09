import PostCard from "@/components/PostCard";
import type { Post } from "@/data/posts";

interface FeaturedGridProps {
  posts: Post[];
}

export default function FeaturedGrid({ posts }: FeaturedGridProps) {
  if (posts.length === 0) {
    return (
      <p className="text-zinc-500 text-sm py-12 text-center">
        No posts found in this category yet.
      </p>
    );
  }

  const visible = posts.slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {visible.map((post, i) => (
        <PostCard key={post.slug} post={post} priority={i === 0} />
      ))}
    </div>
  );
}
