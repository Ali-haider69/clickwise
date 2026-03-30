import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
import { categories, posts } from "@/data/posts";

const categorySlugMap: Record<string, string> = {
  "AI & Tech": "/ai-tech",
  "Make Money": "/make-money",
  "Gadgets": "/gadgets",
  "Finance": "/finance",
  "Health": "/health",
  "Trending": "/trending",
  "News": "/news",
};

export default function BentoGrid() {
  const featured = posts.find((p) => p.featured);
  const trending = posts.filter((p) => p.trending).slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="section-title">Explore Topics</h2>
          <p className="section-sub">Everything you need to know, ranked and reviewed</p>
        </div>
        <Link href="/blog" className="btn-ghost text-sm hidden md:flex items-center gap-2">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {/* Featured Large Card */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 group relative glass rounded-3xl overflow-hidden card-hover min-h-[300px]"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover opacity-40 group-hover:opacity-55 transition-opacity group-hover:scale-105 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full w-fit mb-3">
                <TrendingUp className="w-3 h-3" /> {featured.category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-purple-200 transition-colors">
                {featured.title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-2 mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} read</span>
              </div>
            </div>
          </Link>
        )}

        {/* Category Cards */}
        {categories.slice(0, 4).map((cat) => (
          <Link
            key={cat.name}
            href={categorySlugMap[cat.name] || "/blog"}
            className="group glass rounded-3xl p-6 card-hover flex flex-col justify-between min-h-[140px] relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`} />
            <div className="text-4xl mb-2">{cat.icon}</div>
            <div>
              <h3 className="font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all" style={{ color: "var(--text-primary)" }}>
                {cat.name}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{cat.count} articles</p>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:text-purple-500 group-hover:translate-x-1 transition-all absolute bottom-6 right-6" style={{ color: "var(--text-muted)" }} />
          </Link>
        ))}
      </div>

      {/* Trending Row */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Trending Right Now</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trending.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group glass rounded-2xl overflow-hidden card-hover"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold text-white bg-orange-500/90 px-2 py-1 rounded-full">
                    #{i + 1} Trending
                  </span>
                </div>
              </div>
              <div className="p-4">
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">{post.category}</span>
                <h4 className="text-sm font-semibold mt-1 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2" style={{ color: "var(--text-primary)" }}>
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
