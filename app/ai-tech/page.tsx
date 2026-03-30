import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "AI & Tech — Latest Trends, Tools & Insights",
  description: "Stay ahead with the latest AI tools, tech trends, and innovations shaping 2026.",
};

export default function AITechPage() {
  return (
    <CategoryPage
      category="AI & Tech"
      title="AI & Tech"
      description="Latest AI tools, tech trends, and innovations shaping 2026."
    />
  );
}
