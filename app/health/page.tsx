import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Health & Wellness — Tips, Guides & Insights",
  description: "Explore comprehensive health and wellness guides, fitness tracker reviews, and practical lifestyle advice designed to help you live a better, healthier life.",
  ...canonicalMeta("/health"),
};

export default function HealthPage() {
  return (
    <CategoryPage
      category="Health"
      title="Health & Wellness"
      description="Health guides, fitness tips, and lifestyle advice to help you live better."
    />
  );
}
