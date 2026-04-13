import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Health & Wellness — Tips, Guides & Insights",
  description: "Explore comprehensive health and wellness guides, fitness tracker reviews, and practical lifestyle advice designed to help you live a better, healthier life.",
  ...canonicalMeta("/health", {
    title: "Health & Wellness — Tips, Guides & Insights",
    description: "Health guides, fitness tips, and wellness advice to help you live better in 2026.",
  }),
};

export default function HealthPage() {
  return (
    <CategoryPage
      category="Health"
      title="Health & Wellness"
      description="Health guides, fitness tips, and lifestyle advice to help you live better."
      introHeading="Health Information That Is Actually Useful"
      introParagraphs={[
        "The health and wellness space is full of trends, fads, and conflicting advice. We focus on evidence-based information and practical tips you can actually apply to your daily routine — no miracle cures or pseudoscience.",
        "From fitness tracker reviews and workout guides to nutrition basics and mental health resources, our content is designed to help you make better health decisions with clear, well-researched information.",
      ]}
      topicHighlights={[
        { title: "Fitness & Wearables", text: "Reviews of fitness trackers, smartwatches, and health-monitoring devices — tested for accuracy, comfort, and real-world value." },
        { title: "Nutrition & Wellness", text: "Straightforward nutrition advice, supplement reviews, and wellness tips grounded in current research." },
        { title: "Mental Health", text: "Resources and practical strategies for managing stress, improving sleep, and building healthier daily habits." },
      ]}
      ctaText="Explore our health and wellness articles below."
    />
  );
}
