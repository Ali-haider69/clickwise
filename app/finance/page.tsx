import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Finance — Investing, Budgeting & Money Tips",
  description: "Master your money with our smart finance tips, proven investing strategies, practical budgeting advice, and comprehensive wealth management guides for 2026.",
  ...canonicalMeta("/finance", {
    title: "Finance — Investing, Budgeting & Money Tips",
    description: "Smart investing strategies, budgeting advice, and money management guides for 2026.",
  }),
};

export default function FinancePage() {
  return (
    <CategoryPage
      category="Finance"
      title="Finance"
      description="Smart investing strategies, budgeting advice, and money management guides."
      introHeading="Personal Finance Made Simple"
      introParagraphs={[
        "Managing money well does not require a finance degree — but it does require good information. We break down investing, budgeting, and wealth-building concepts into clear, actionable advice that anyone can follow.",
        "Our finance content is written for real people, not Wall Street traders. Whether you are opening your first brokerage account, trying to build an emergency fund, or figuring out how to invest while paying off debt, we cover the fundamentals without jargon.",
      ]}
      topicHighlights={[
        { title: "Investing Basics", text: "Beginner-friendly guides to stocks, ETFs, index funds, and retirement accounts — with honest risk assessments." },
        { title: "Budgeting & Saving", text: "Practical budgeting methods, savings strategies, and tools to help you take control of your money month by month." },
        { title: "Financial Tools", text: "Reviews of budgeting apps, investment platforms, and calculators to help you make smarter financial decisions." },
      ]}
      ctaText="Browse our finance articles below to start building a stronger financial foundation."
    />
  );
}
