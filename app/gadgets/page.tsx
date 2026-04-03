import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gadgets — Reviews, Comparisons & Buying Guides",
  description: "Explore in-depth gadget reviews, detailed comparisons, and expert buying guides for the latest smartphones, laptops, wireless earbuds, and smart wearables.",
  ...canonicalMeta("/gadgets"),
};

export default function GadgetsPage() {
  return (
    <CategoryPage
      category="Gadgets"
      title="Gadgets"
      description="In-depth reviews, comparisons, and buying guides for phones, laptops, earbuds, and more."
    />
  );
}
