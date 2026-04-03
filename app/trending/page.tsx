import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trending — Most Popular Articles Right Now",
  description: "Discover the most popular and trending articles on ClickWise right now. Stay ahead of the curve with our most-read tech, finance, and AI news of the week.",
  ...canonicalMeta("/trending"),
};

export default function TrendingPage() {
  return (
    <CategoryPage
      category="Trending"
      title="Trending Now"
      description="The most popular articles on ClickWise right now."
    />
  );
}
