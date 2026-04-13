import type { Metadata } from "next";
import { Zap, BookOpen, TrendingUp, Wrench, Shield, Eye } from "lucide-react";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About ClickWise — Who We Are",
  description: "ClickWise is your go-to source for unbiased reviews, AI tool comparisons, and side hustle guides in 2026.",
  ...canonicalMeta("/about", {
    title: "About ClickWise — Who We Are",
    description: "ClickWise is your go-to source for unbiased reviews, AI tool comparisons, and side hustle guides in 2026.",
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-6">
            <Zap className="w-4 h-4" /> Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            About <span className="gradient-text">ClickWise</span>
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Smart picks, real reviews, and honest comparisons — for everything trending in 2026.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 mb-8 space-y-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            ClickWise was built with one mission: cut through the noise. The internet is full of sponsored listicles, biased reviews, and generic advice written by people who have never actually used the products they write about.
          </p>
          <p>
            We do things differently. Every tool we recommend, every gadget we review, and every comparison we publish goes through real-world testing. We use products ourselves, test AI tools hands-on, and share honest verdicts — even when that means recommending a cheaper alternative over a big brand.
          </p>
          <p>
            Our coverage spans AI and technology, online income strategies, consumer electronics, personal finance, and health and wellness. We update our content regularly to make sure you are always getting current, accurate information.
          </p>
          <p>
            <strong style={{ color: "var(--text-primary)" }}>Reader-supported, not brand-supported.</strong> We may earn affiliate commissions when you buy through our links — but that never influences our editorial decisions. If a product does not deserve a recommendation, we say so. You can read more about this in our{" "}
            <a href="/disclosure" className="text-purple-600 dark:text-purple-400 underline">affiliate disclosure</a>.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: "Articles Published", value: "50+" },
            { icon: TrendingUp, label: "Categories", value: "6" },
            { icon: Wrench, label: "Free Tools", value: "12" },
            { icon: Eye, label: "Products Reviewed", value: "8+" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-2xl p-5 text-center">
              <Icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>{value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>What We Cover</h2>
          <ul className="space-y-4" style={{ color: "var(--text-secondary)" }}>
            {[
              { heading: "AI Tools & Tech", text: "Reviews and comparisons of the most popular AI software, from writing assistants and image generators to automation platforms." },
              { heading: "Make Money Online", text: "Tested side hustles, freelancing strategies, and income guides with realistic expectations — not hype." },
              { heading: "Gadgets & Reviews", text: "Hands-on testing of smartphones, laptops, earbuds, and wearables with detailed specs and honest verdicts." },
              { heading: "Finance", text: "Investing fundamentals, budgeting methods, and financial tool reviews written in plain language." },
              { heading: "Health & Wellness", text: "Fitness tracker reviews, wellness tips, and health resources grounded in evidence-based information." },
              { heading: "Trending", text: "The most-read articles and timely topics our readers are engaging with right now." },
            ].map((item) => (
              <li key={item.heading} className="text-sm leading-relaxed">
                <strong style={{ color: "var(--text-primary)" }}>{item.heading}</strong> — {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            <Shield className="w-5 h-5 inline-block mr-2 text-purple-600" />
            Our Editorial Standards
          </h2>
          <ul className="space-y-3" style={{ color: "var(--text-secondary)" }}>
            {[
              "We never accept payment in exchange for a positive review.",
              "Affiliate links are clearly disclosed and never influence our editorial recommendations.",
              "We update articles when products change, prices shift, or new information becomes available.",
              "If we have not personally tested a product, we say so — and we explain how we gathered our information.",
              "We welcome corrections and feedback through our contact page.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                <span className="text-purple-600 mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
