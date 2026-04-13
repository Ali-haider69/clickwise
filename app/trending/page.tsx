import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trending — Most Popular Articles Right Now",
  description: "Discover the most popular and trending articles on ClickWise right now. Stay ahead of the curve with our most-read tech, finance, and AI news of the week.",
  ...canonicalMeta("/trending", {
    title: "Trending — Most Popular Articles Right Now",
    description: "The most popular and trending articles on ClickWise right now — tech, AI, finance, and more.",
  }),
};

export default function TrendingPage() {
  return (
    <CategoryPage
      category="Trending"
      title="Trending Now"
      description="The most popular articles on ClickWise right now."
      introHeading="What Readers Are Reading Right Now"
      introParagraphs={[
        "These are the articles getting the most attention on ClickWise right now. From viral AI tools and buzzy product launches to side hustle strategies readers keep coming back to, this page highlights the content that is resonating most with our audience.",
        "Trending articles are selected based on reader engagement and timeliness. Bookmark this page to stay in the loop on the topics and guides people are talking about this week.",
      ]}
      ctaText="Explore what is trending below."
    />
  );
}
