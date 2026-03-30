import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Latest News — ClickWise",
  description: "Breaking news and updates on tech, AI, gadgets, and more. Stay informed with ClickWise.",
};

export default function NewsPage() {
  return (
    <CategoryPage
      category="News"
      title="Latest News"
      description="Breaking news and updates on tech, AI, gadgets, and more."
    />
  );
}
