import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Newsletter from "@/components/Newsletter";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import AdSenseUnit from "@/components/AdSenseUnit";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "ClickWise — Smart Picks. Real Reviews. Best Deals.",
  description: "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  ...canonicalMeta("/", {
    title: "ClickWise — Smart Picks. Real Reviews. Best Deals.",
    description: "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  }),
};

const tools = [
  { href: "/tools/side-hustle-calculator", icon: "💰", title: "Side Hustle Calculator", desc: "Find your earning potential", badge: "Most Popular" },
  { href: "/tools/ai-finder", icon: "🤖", title: "AI Tool Finder", desc: "Get matched to the right AI", badge: "Trending" },
  { href: "/tools/investment-calculator", icon: "📈", title: "Investment Calculator", desc: "See your money grow", badge: "New" },
];

export default function HomePage() {
  const topProducts = products.slice(0, 3);
  const latestPosts = posts.slice(1, 5); // skip featured

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ClickWise",
    url: "https://clickwise.website",
    logo: "https://clickwise.website/opengraph-image",
    description: "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ClickWise",
    url: "https://clickwise.website",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://clickwise.website/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      {/* Hero */}
      <Hero />

      {/* Ad Unit — Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdSenseUnit format="horizontal" />
      </div>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" /> Free Tools
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Interactive tools — no signup needed</p>
          </div>
          <Link href="/tools" className="btn-ghost text-sm hidden md:flex items-center gap-2">
            All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="group glass rounded-2xl p-5 card-hover flex items-center gap-4">
              <div className="text-3xl">{t.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors" style={{ color: "var(--text-primary)" }}>{t.title}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t.desc}</div>
              </div>
              <span className="text-[10px] font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-0.5 rounded-full flex-shrink-0">{t.badge}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bento Grid — Categories & Trending */}
      <BentoGrid />

      {/* Top Picks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">Top Picks Right Now</h2>
            <p className="section-sub">Tested, reviewed, and ranked by our team</p>
          </div>
          <Link href="/reviews" className="btn-ghost text-sm hidden md:flex items-center gap-2">
            All Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Trust signal */}
        <div className="flex items-center justify-center gap-2 mt-8 text-gray-600 text-sm">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          All products independently tested. We never accept payment for positive reviews.
        </div>
      </section>

      {/* Ad Unit — Mid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdSenseUnit format="rectangle" />
      </div>

      {/* Latest Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-sub">Fresh guides, comparisons, and how-tos</p>
          </div>
          <Link href="/blog" className="btn-ghost text-sm hidden md:flex items-center gap-2">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Ad Unit — Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
        <AdSenseUnit format="horizontal" />
      </div>
    </>
  );
}
