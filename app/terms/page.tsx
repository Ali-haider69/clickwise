import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service — ClickWise",
  description: "Review the ClickWise Terms of Service to understand the rules, guidelines, and user agreements for safely and responsibly using our website and digital tools.",
  ...canonicalMeta("/terms", {
    title: "Terms of Service — ClickWise",
    description: "ClickWise terms of service — rules and guidelines for using our website and tools.",
  }),
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using ClickWise ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.`,
  },
  {
    title: "Use of Content",
    body: `All content on ClickWise — including articles, reviews, tool outputs, and comparisons — is for informational purposes only. You may not reproduce, distribute, or republish our content without written permission. Sharing individual articles with proper attribution is permitted.`,
  },
  {
    title: "Accuracy of Information",
    body: `We strive to keep all content accurate and up to date. However, product prices, availability, and specifications change frequently. Always verify critical information directly with the manufacturer or retailer before making a purchase decision.`,
  },
  {
    title: "Affiliate Disclaimer",
    body: `ClickWise participates in affiliate programs including Amazon Associates and others. We earn commissions on qualifying purchases made through our links. This does not affect the price you pay and does not influence our editorial recommendations.`,
  },
  {
    title: "Free Tools",
    body: `The free tools provided on ClickWise (calculators, AI generators, etc.) are provided "as is" without warranty. We do not guarantee the accuracy of tool outputs and are not responsible for decisions made based on tool results.`,
  },
  {
    title: "Limitation of Liability",
    body: `ClickWise shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site. Our total liability to you shall not exceed $0 (i.e., we provide this service free of charge and without warranty).`,
  },
  {
    title: "Changes to Terms",
    body: `We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Terms of Service</h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>Effective date: March 29, 2026</p>

        <div className="space-y-6">
          {sections.map((s) => (
            <div key={s.title} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-center" style={{ color: "var(--text-muted)" }}>
          Questions? <a href="/contact" className="text-purple-500 hover:underline">Contact us</a>.
        </p>
      </div>
    </div>
  );
}
