import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI & Tech — Latest Trends, Tools & Insights",
  description: "Stay ahead with the latest AI tools, emerging tech trends, and expert insights shaping 2026. Discover how artificial intelligence is changing the future.",
  ...canonicalMeta("/ai-tech", {
    title: "AI & Tech — Latest Trends, Tools & Insights",
    description: "Stay ahead with the latest AI tools, tech trends, and expert insights shaping 2026.",
  }),
};

export default function AITechPage() {
  return (
    <CategoryPage
      category="AI & Tech"
      title="AI & Tech"
      description="Latest AI tools, tech trends, and innovations shaping 2026."
      introHeading="Why AI & Tech Matters in 2026"
      introParagraphs={[
        "Artificial intelligence is no longer a future concept — it is reshaping how we work, create, and communicate right now. From AI writing assistants and code generators to image tools and automation platforms, the landscape is evolving faster than ever.",
        "At ClickWise, we test and review AI tools hands-on so you can skip the hype and find what actually works. Whether you are a freelancer looking for productivity boosts, a business owner exploring automation, or simply curious about the latest tech breakthroughs, our guides are designed to give you practical, honest insights.",
      ]}
      topicHighlights={[
        { title: "AI Tool Reviews", text: "In-depth evaluations of the most popular AI platforms — what they do well, where they fall short, and who they are best for." },
        { title: "Tech Trends", text: "Coverage of emerging technologies shaping industries in 2026, from generative AI and LLMs to robotics and edge computing." },
        { title: "How-To Guides", text: "Step-by-step tutorials on using AI tools effectively for writing, design, coding, marketing, and business automation." },
      ]}
      ctaText="Browse our latest AI & Tech articles below to stay ahead of the curve."
    />
  );
}
