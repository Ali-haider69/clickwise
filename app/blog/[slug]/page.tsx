import { posts } from "@/data/posts";
import { blogContent } from "@/data/blogContent";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AdSenseUnit from "@/components/AdSenseUnit";
import { Clock, Calendar, ArrowLeft, Share2, BookOpen } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: "article" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = blogContent[slug];
  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Article */}
          <article className="lg:col-span-2">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-purple-600 dark:hover:text-purple-400" style={{ color: "var(--text-muted)" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{post.category}</span>
              {post.trending && <span className="text-sm font-medium text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">Trending</span>}
              {post.tags.slice(0,2).map(t => <span key={t} className="text-xs glass px-3 py-1 rounded-full" style={{ color: "var(--text-muted)" }}>{t}</span>)}
            </div>

            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-8 pb-6" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-color)" }}>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} read</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />ClickWise Editorial</span>
              <button className="ml-auto flex items-center gap-1.5 hover:text-purple-600 transition-colors">
                <Share2 className="w-4 h-4" />Share
              </button>
            </div>

            <AdSenseUnit format="horizontal" className="mb-8" />

            {/* Real content or fallback */}
            <div style={{ color: "var(--text-secondary)" }}>
              {content ?? (
                <div className="space-y-5">
                  <p className="text-lg leading-relaxed">{post.excerpt}</p>
                  <p className="leading-relaxed">Our team spent weeks researching this topic to bring you the most accurate and up-to-date information for 2026. Everything below is based on real testing and verified data.</p>
                  <h2 className="text-2xl font-bold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>Key Takeaways</h2>
                  <p className="leading-relaxed">After extensive research, we found consistent patterns that separate the winners from the rest. Here&apos;s what you need to know.</p>
                  <AdSenseUnit format="rectangle" className="my-8" />
                  <h2 className="text-2xl font-bold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>Our Top Recommendation</h2>
                  <p className="leading-relaxed">Based on performance, value, and real-world results — here&apos;s what we recommend for most people in 2026.</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-10 pt-6" style={{ borderTop: "1px solid var(--border-color)" }}>
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm glass px-3 py-1 rounded-full" style={{ color: "var(--text-muted)" }}>#{tag}</span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-5">
              <AdSenseUnit format="rectangle" />

              {related.length > 0 && (
                <div className="glass rounded-2xl p-5">
                  <h3 className="font-bold text-sm uppercase tracking-wide mb-4" style={{ color: "var(--text-primary)" }}>Related Articles</h3>
                  <div className="space-y-4">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="flex gap-3 group">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={r.image} alt={r.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                          <p className="text-xs text-purple-600 dark:text-purple-400 mb-0.5">{r.category}</p>
                          <p className="text-sm leading-snug line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" style={{ color: "var(--text-secondary)" }}>{r.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">📧</div>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>Get Weekly Deals</h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>Join 50K+ subscribers</p>
                <Link href="/#newsletter" className="btn-primary text-sm w-full block text-center">Subscribe Free</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
