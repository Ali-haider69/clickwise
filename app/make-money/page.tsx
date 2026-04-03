import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Make Money Online 2026 — Side Hustles & Freelancing",
  description: "Proven ways to make money online in 2026. Side hustles, freelancing tips, passive income strategies, and more.",
  ...canonicalMeta("/make-money"),
};

export default function MakeMoneyPage() {
  return (
    <CategoryPage
      category="Make Money"
      title="Make Money Online"
      description="Proven side hustles, freelancing tips, and passive income strategies for 2026."
    />
  );
}
