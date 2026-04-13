import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Latest News — ClickWise",
  description: "Get breaking news and real-time updates on global events, artificial intelligence, technology trends, and market shifts. Stay informed daily with ClickWise.",
  ...canonicalMeta("/news", {
    title: "Latest News — ClickWise",
    description: "Breaking news and updates on AI, tech, gadgets, and global events — without the clickbait.",
  }),
};

export default function NewsPage() {
  return (
    <CategoryPage
      category="News"
      title="Latest News"
      description="Breaking news and updates on tech, AI, gadgets, and more."
      introHeading="Tech News Without the Clickbait"
      introParagraphs={[
        "Staying informed should not mean scrolling through sensationalized headlines. Our news coverage focuses on developments that actually matter — product launches, industry shifts, policy changes, and breakthroughs that affect how you use technology.",
        "We aim to give you context alongside the facts. Instead of just telling you what happened, we explain why it matters and what it means for consumers, creators, and the tech industry at large.",
      ]}
      topicHighlights={[
        { title: "Product Launches", text: "Coverage of major product announcements and releases from Apple, Google, Samsung, and other key players in tech." },
        { title: "Industry Updates", text: "News on AI regulation, company mergers, platform changes, and shifts that shape the technology landscape." },
        { title: "Analysis & Context", text: "Beyond the headlines — we break down what major news stories mean for everyday users and the broader market." },
      ]}
      ctaText="Read our latest news articles below for updates that matter."
    />
  );
}
