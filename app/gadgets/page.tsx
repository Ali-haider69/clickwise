import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gadgets — Reviews, Comparisons & Buying Guides",
  description: "Explore in-depth gadget reviews, detailed comparisons, and expert buying guides for the latest smartphones, laptops, wireless earbuds, and smart wearables.",
  ...canonicalMeta("/gadgets", {
    title: "Gadgets — Reviews, Comparisons & Buying Guides",
    description: "In-depth gadget reviews and buying guides for smartphones, laptops, earbuds, and wearables.",
  }),
};

export default function GadgetsPage() {
  return (
    <CategoryPage
      category="Gadgets"
      title="Gadgets"
      description="In-depth reviews, comparisons, and buying guides for phones, laptops, earbuds, and more."
      introHeading="Honest Gadget Reviews You Can Trust"
      introParagraphs={[
        "Buying tech should not feel like a gamble. With new smartphones, laptops, earbuds, and wearables launching every month, it is easy to overspend on a product that does not live up to the marketing. That is where we come in.",
        "Our gadget reviews are based on real-world testing — not spec sheets and press releases. We evaluate build quality, battery life, day-to-day performance, and value for money so you know exactly what you are getting before you spend.",
      ]}
      topicHighlights={[
        { title: "Smartphones", text: "Side-by-side comparisons and detailed reviews of the latest iPhones, Samsung Galaxy, and Pixel devices to help you pick the right one." },
        { title: "Laptops & PCs", text: "Performance benchmarks, real-world usage tests, and buying advice for MacBooks, ultrabooks, and budget laptops." },
        { title: "Audio & Wearables", text: "Earbuds, headphones, smartwatches, and fitness trackers reviewed for sound quality, comfort, and everyday usability." },
      ]}
      ctaText="Check out our latest gadget reviews and buying guides below."
    />
  );
}
