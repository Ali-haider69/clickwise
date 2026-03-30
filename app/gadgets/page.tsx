import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Gadgets — Reviews, Comparisons & Buying Guides",
  description: "In-depth gadget reviews, comparisons, and buying guides for phones, laptops, earbuds, and more.",
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
