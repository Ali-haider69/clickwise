import type { Metadata } from "next";
import { Zap, Users, Star, TrendingUp } from "lucide-react";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About ClickWise — Who We Are",
  description: "ClickWise is your go-to source for unbiased reviews, AI tool comparisons, and side hustle guides in 2026.",
  ...canonicalMeta("/about"),
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
            ClickWise was built with one mission: cut through the noise. The internet is full of sponsored listicles, biased reviews, and generic advice written by people who've never actually used the products they write about.
          </p>
          <p>
            We do things differently. Every tool we recommend, every gadget we review, and every comparison we publish goes through rigorous real-world testing. We buy products with our own money, test AI tools ourselves, and share honest verdicts — even when that means recommending a cheaper alternative over a big brand.
          </p>
          <p>
            Our team covers AI & tech, make money online strategies, consumer gadgets, finance, and health. We update our content regularly to make sure you're always getting the most current information — not outdated guides from 3 years ago.
          </p>
          <p>
            <strong style={{ color: "var(--text-primary)" }}>Reader-supported, not brand-supported.</strong> We may earn affiliate commissions when you buy through our links — but that never influences our editorial decisions. If a product doesn't deserve a recommendation, we say so.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Star, label: "Reviews Published", value: "500+" },
            { icon: Users, label: "Monthly Readers", value: "200K+" },
            { icon: TrendingUp, label: "Categories", value: "6" },
            { icon: Zap, label: "Free Tools", value: "12" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass rounded-2xl p-5 text-center">
              <Icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-black mb-1" style={{ color: "var(--text-primary)" }}>{value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>What We Cover</h2>
          <ul className="space-y-3" style={{ color: "var(--text-secondary)" }}>
            {[
              "🤖 AI Tools & Tech — Reviews and comparisons of the best AI software in 2026",
              "💰 Make Money Online — Real side hustles, freelancing tips, and income strategies",
              "📱 Gadgets & Reviews — Hands-on testing of the latest consumer electronics",
              "📈 Finance — Investing basics, credit cards, and money management guides",
              "💪 Health & Fitness — Wearables, trackers, and wellness tools reviewed",
              "🔥 Trending — Whatever the internet is talking about right now, fact-checked",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
