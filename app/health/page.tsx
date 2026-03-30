import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Health & Wellness — Tips, Guides & Insights",
  description: "Health and wellness guides, fitness tips, and lifestyle advice to help you live better.",
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
