import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Finance — Investing, Budgeting & Money Tips",
  description: "Smart finance tips, investing strategies, budgeting advice, and money management guides.",
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
