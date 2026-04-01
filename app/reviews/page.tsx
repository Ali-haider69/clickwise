import React from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import AdSenseUnit from "@/components/AdSenseUnit";
import { ShieldCheck, Star, SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Product Reviews — Top Picks 2026",
  description: "Independently tested and ranked product reviews for 2026.",
  ...canonicalMeta("/reviews"),
};

const filterCategories = ["All", "Earbuds", "Laptops", "Smartphones", "Smart Home", "Fitness"];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Product Reviews</span>
          </h1>
          <p className="max-w-xl mx-auto mb-6" style={{ color: "var(--text-secondary)" }}>
            Every product independently tested by our team. No paid reviews, no bias.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
            <ShieldCheck className="w-4 h-4" />
            100% Independent — Never Paid For
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "All"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "glass hover:border-purple-400/40"
                }`}
                style={cat !== "All" ? { color: "var(--text-secondary)" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="btn-ghost flex items-center gap-2 text-sm whitespace-nowrap">
            <SlidersHorizontal className="w-4 h-4" /> Sort & Filter
          </button>
        </div>

        <div className="mb-10">
          <AdSenseUnit format="horizontal" />
        </div>

        {/* Score legend */}
        <div className="glass rounded-2xl p-4 mb-8 flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
            <Star className="w-4 h-4 text-yellow-400" />
            Scoring: performance, value, design, longevity
          </span>
          <span className="ml-auto font-semibold" style={{ color: "var(--text-primary)" }}>
            {products.length} products reviewed
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} />
              {(i + 1) % 3 === 0 && (
                <div className="md:col-span-2 lg:col-span-3">
                  <AdSenseUnit format="horizontal" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-ghost px-10">Load More Reviews</button>
        </div>
      </div>
    </div>
  );
}
