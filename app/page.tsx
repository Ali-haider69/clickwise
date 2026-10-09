import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";
import TopBar from "@/components/TopBar";
import HeroSearch from "@/components/HeroSearch";
import HomeFeed from "@/components/HomeFeed";
import CarouselRow from "@/components/CarouselRow";
import Newsletter from "@/components/Newsletter";
import AdSenseUnit from "@/components/AdSenseUnit";
import { posts } from "@/data/posts";
import { videos } from "@/data/videos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ClickWise — Smart Picks. Real Reviews. Best Deals.",
  description:
    "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  ...canonicalMeta("/", {
    title: "ClickWise — Smart Picks. Real Reviews. Best Deals.",
    description:
      "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  }),
};

const featuredPosts = posts.filter((p) => p.featured).slice(0, 8);
const trendingPosts = posts.filter((p) => p.trending).slice(0, 12);
const tutorialPosts = posts
  .filter((p) => p.category === "Tutorials")
  .slice(0, 12);
const reviewPosts = posts
  .filter((p) => p.category === "Reviews")
  .slice(0, 12);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ClickWise",
  url: "https://clickwise.website",
  logo: "https://clickwise.website/opengraph-image",
  description:
    "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="homepage min-h-screen pt-16" style={{ backgroundColor: "#0a0a0a" }}>
        {/* Dismissible newsletter bar */}
        <TopBar />

        {/* Hero */}
        <HeroSearch />

        {/* Featured grid + chips */}
        <HomeFeed posts={featuredPosts} />

        {/* AdSense */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <AdSenseUnit format="horizontal" />
        </div>

        {/* Trending */}
        <CarouselRow
          title="Trending Now"
          href="/blog?sort=trending"
          posts={trendingPosts}
        />

        {/* Beginner Tutorials */}
        <CarouselRow
          title="Beginner Tutorials"
          href="/blog?category=Tutorials"
          posts={tutorialPosts}
        />

        {/* AdSense mid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <AdSenseUnit format="rectangle" />
        </div>

        {/* Tool Reviews */}
        <CarouselRow
          title="Tool Reviews"
          href="/reviews"
          posts={reviewPosts}
        />

        {/* Watch & Learn */}
        <CarouselRow title="Watch &amp; Learn" videos={videos} />

        {/* Newsletter */}
        <div id="newsletter" className="mt-4">
          <Newsletter />
        </div>

        {/* AdSense bottom */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-8">
          <AdSenseUnit format="horizontal" />
        </div>
      </div>
    </>
  );
}
