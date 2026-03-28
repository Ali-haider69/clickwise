import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — ClickWise",
  description: "ClickWise affiliate disclosure — how we earn commissions and how it affects our content.",
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Affiliate Disclosure</h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>Last updated: March 29, 2026</p>

        <div className="glass rounded-2xl p-5 mb-8 flex gap-3" style={{ borderLeft: "3px solid #9333ea" }}>
          <AlertCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Short version:</strong> Some links on ClickWise are affiliate links. If you click and buy something, we earn a small commission — at no extra cost to you. This is how we keep the site free. It never affects what we recommend.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "What Is Affiliate Marketing?",
              body: `Affiliate marketing is a way for websites to earn revenue by promoting products and services. When you click an affiliate link on ClickWise and make a qualifying purchase, we receive a small percentage of the sale from the retailer — at no additional cost to you.`,
            },
            {
              title: "Which Programs We Participate In",
              body: `ClickWise participates in the Amazon Associates Program, the Apple Affiliate Program, and other affiliate programs. Links to Amazon, Apple, and other retailers throughout the site may be affiliate links.`,
            },
            {
              title: "How This Affects Our Reviews",
              body: `It doesn't. Our reviews and recommendations are based on real testing, research, and genuine editorial judgment. We recommend products we believe are genuinely good — and we call out products that aren't worth your money, even if they offer higher affiliate commissions. Our reputation depends on honest advice, not on maximizing commissions.`,
            },
            {
              title: "FTC Compliance",
              body: `In accordance with the FTC's guidelines concerning the use of endorsements and testimonials in advertising, ClickWise clearly discloses affiliate relationships. This disclosure page, along with in-article disclosures, satisfies the FTC's requirements for affiliate marketing transparency.`,
            },
            {
              title: "Free Tools",
              body: `Our free tools (calculators, AI generators, etc.) are provided entirely free of charge with no affiliate components. They are funded by affiliate commissions from our review and comparison content.`,
            },
          ].map((s) => (
            <div key={s.title} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-center" style={{ color: "var(--text-muted)" }}>
          Questions about our affiliate relationships? <a href="/contact" className="text-purple-500 hover:underline">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
