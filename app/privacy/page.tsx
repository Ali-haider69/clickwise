import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ClickWise",
  description: "ClickWise Privacy Policy — how we collect, use, and protect your data.",
};

const sections = [
  {
    title: "Information We Collect",
    body: `We collect information you voluntarily provide (such as your email address when subscribing to our newsletter) and information automatically collected when you visit our site (such as IP address, browser type, pages visited, and time spent on pages). We use cookies and similar tracking technologies to improve your experience.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use collected information to: deliver and improve our content and tools; send newsletters and updates (only if you've subscribed); analyze site traffic and usage patterns; comply with legal obligations. We do not sell your personal information to third parties.`,
  },
  {
    title: "Cookies",
    body: `ClickWise uses cookies to remember your preferences, analyze traffic via Google Analytics, and serve relevant content. You can disable cookies in your browser settings, though some site features may not function properly.`,
  },
  {
    title: "Affiliate Links & Third Parties",
    body: `Our site contains affiliate links to third-party retailers (Amazon, Apple, etc.). When you click these links and make a purchase, we may earn a commission at no extra cost to you. Third-party sites have their own privacy policies, which we encourage you to review.`,
  },
  {
    title: "Data Retention",
    body: `We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law. Newsletter subscribers can unsubscribe at any time using the link in any email we send.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to access, correct, or delete your personal data. To exercise these rights, contact us via our Contact page. EU/UK residents have additional rights under GDPR/UK GDPR.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of ClickWise after changes constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Privacy Policy</h1>
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
