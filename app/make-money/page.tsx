import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Make Money Online 2026 — Side Hustles & Freelancing",
  description: "Proven ways to make money online in 2026. Side hustles, freelancing tips, passive income strategies, and more.",
  ...canonicalMeta("/make-money", {
    title: "Make Money Online 2026 — Side Hustles & Freelancing",
    description: "Proven ways to make money online in 2026. Side hustles, freelancing tips, and passive income strategies.",
  }),
};

export default function MakeMoneyPage() {
  return (
    <CategoryPage
      category="Make Money"
      title="Make Money Online"
      description="Proven side hustles, freelancing tips, and passive income strategies for 2026."
      introHeading="Your Guide to Earning Online in 2026"
      introParagraphs={[
        "Making money online is more accessible than ever — but sorting the real opportunities from the noise is harder than ever too. We focus on strategies that are working right now, tested by people who are actually doing them.",
        "Whether you are looking to earn your first dollar freelancing, build a side hustle alongside your day job, or scale an online business, our articles break down the exact steps, tools, and realistic income expectations so you can make informed decisions.",
      ]}
      topicHighlights={[
        { title: "Side Hustles", text: "Vetted side hustle ideas with realistic earning potential, startup costs, and time commitments — no get-rich-quick schemes." },
        { title: "Freelancing", text: "Practical guides on landing clients, setting rates, and building a sustainable freelance career on platforms and beyond." },
        { title: "Passive Income", text: "Honest breakdowns of passive income strategies including what they actually require in terms of upfront effort and investment." },
      ]}
      ctaText="Explore our latest make-money guides below — written from experience, not theory."
    />
  );
}
