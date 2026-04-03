import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Finance — Investing, Budgeting & Money Tips",
  description: "Master your money with our smart finance tips, proven investing strategies, practical budgeting advice, and comprehensive wealth management guides for 2026.",
  ...canonicalMeta("/finance"),
};

export default function FinancePage() {
  return (
    <CategoryPage
      category="Finance"
      title="Finance"
      description="Smart investing strategies, budgeting advice, and money management guides."
    />
  );
}
