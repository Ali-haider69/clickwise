import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Make Money Online — Side Hustles, Freelancing & Passive Income",
  description: "Proven ways to make money online in 2026. Side hustles, freelancing tips, passive income strategies, and more.",
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
