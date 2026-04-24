import Link from "next/link";
import { Calculator, Sparkles, TrendingUp, ArrowRight, Zap, Code2, PenTool } from "lucide-react";
import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Online Tools 2026 — AI & Utilities",
  description: "Free tools: QR code generator, image compressor, password generator, resume builder, YouTube thumbnail downloader, AI generators, and more. No signup required.",
  ...canonicalMeta("/tools", {
    title: "Free Online Tools 2026 — AI & Utilities",
    description: "Free online tools: QR code generator, image compressor, resume builder, password generator, AI generators, and more. No signup required.",
  }),
};

const toolCategories = [
  {
    label: "AI Content Tools",
    icon: "🤖",
    color: "from-purple-500 to-blue-500",
    badge: "#1 Traffic Driver",
    tools: [
      {
        href: "/tools/ai-linkedin-post-generator",
        icon: "💼",
        title: "LinkedIn Post Generator",
        description: "Generate scroll-stopping LinkedIn posts in seconds. Pick your tone and topic — done.",
        badge: "Most Popular",
        badgeColor: "from-purple-500 to-blue-500",
        stats: ["4 post tones", "Industry-specific", "Instant output"],
      },
      {
        href: "/tools/ai-instagram-caption-generator",
        icon: "📸",
        title: "Instagram Caption Generator",
        description: "Create viral Instagram captions with hashtags for any niche or mood.",
        badge: "Trending",
        badgeColor: "from-pink-500 to-rose-500",
        stats: ["7 niches", "25 hashtags", "Emoji support"],
      },
      {
        href: "/tools/ai-blog-intro-generator",
        icon: "✍️",
        title: "Blog Intro Generator",
        description: "Hook readers in 3 seconds with a compelling blog introduction built for SEO.",
        badge: "New",
        badgeColor: "from-orange-500 to-amber-500",
        stats: ["4 hook styles", "150–200 words", "SEO optimized"],
      },
    ],
  },
  {
    label: "Developer Tools",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    badge: "Low Competition",
    tools: [
      {
        href: "/tools/json-formatter",
        icon: "{ }",
        title: "JSON Formatter & Validator",
        description: "Format, validate, and minify JSON instantly. Syntax highlighted output with error detection.",
        badge: "Dev Favourite",
        badgeColor: "from-blue-500 to-cyan-500",
        stats: ["Syntax highlighting", "Error detection", "Download output"],
      },
      {
        href: "/tools/jwt-decoder",
        icon: "🔐",
        title: "JWT Decoder",
        description: "Decode any JSON Web Token — see header, payload, expiry, and claims instantly.",
        badge: "Security",
        badgeColor: "from-slate-500 to-gray-600",
        stats: ["Header + Payload", "Expiry check", "Client-side only"],
      },
      {
        href: "/tools/api-response-viewer",
        icon: "🔌",
        title: "API Response Viewer",
        description: "Paste any API response to format, explore, and analyse it with table view and search.",
        badge: "Useful",
        badgeColor: "from-teal-500 to-emerald-500",
        stats: ["JSON / XML / Text", "Table view", "Search & filter"],
      },
    ],
  },
  {
    label: "Calculators",
    icon: "🧮",
    color: "from-green-500 to-emerald-500",
    badge: "Google Loves These",
    tools: [
      {
        href: "/tools/age-calculator",
        icon: "🎂",
        title: "Age Calculator (Exact)",
        description: "Find your exact age in years, months, and days — plus zodiac sign, birthstone, and next birthday.",
        badge: "Fun + Useful",
        badgeColor: "from-pink-500 to-purple-500",
        stats: ["Exact to the day", "Zodiac + birthstone", "Birthday countdown"],
      },
      {
        href: "/tools/freelancer-earnings-calculator",
        icon: "💰",
        title: "Freelancer Earnings Calculator",
        description: "Calculate your real take-home pay after Upwork, Fiverr, and Freelancer.com fees.",
        badge: "High Traffic",
        badgeColor: "from-green-500 to-emerald-500",
        stats: ["6 platforms", "5 currencies", "Monthly projection"],
      },
      {
        href: "/tools/fiverr-fee-calculator",
        icon: "🟢",
        title: "Fiverr Fee Calculator",
        description: "Instantly see how much Fiverr takes from sellers and charges buyers. Reverse calculate too.",
        badge: "SEO Gold",
        badgeColor: "from-lime-500 to-green-500",
        stats: ["Seller + Buyer mode", "Reverse calculate", "Price table included"],
      },
    ],
  },
  {
    label: "High-Traffic Utilities",
    icon: "🔥",
    color: "from-red-500 to-orange-500",
    badge: "5M+ Monthly Searches",
    tools: [
      {
        href: "/tools/qr-code-generator",
        icon: "📱",
        title: "QR Code Generator",
        description: "Generate custom QR codes for URLs, text, WiFi, email, and phone. Customize colors and size.",
        badge: "5M+ Searches",
        badgeColor: "from-red-500 to-orange-500",
        stats: ["5 QR types", "Custom colors", "PNG download"],
      },
      {
        href: "/tools/image-compressor",
        icon: "🗜️",
        title: "Image Compressor",
        description: "Compress images without losing quality. Supports JPG, PNG, WebP with batch processing.",
        badge: "3M+ Searches",
        badgeColor: "from-blue-500 to-cyan-500",
        stats: ["Batch upload", "WebP output", "Quality control"],
      },
      {
        href: "/tools/password-generator",
        icon: "🔐",
        title: "Password Generator",
        description: "Generate strong passwords with cryptographic randomness. Includes strength meter and crack time estimate.",
        badge: "2M+ Searches",
        badgeColor: "from-green-500 to-emerald-500",
        stats: ["Strength meter", "Crack time", "Crypto-secure"],
      },
      {
        href: "/tools/resume-builder",
        icon: "📄",
        title: "Resume Builder",
        description: "Build a professional resume in minutes. Choose from 3 templates and export as PDF or HTML.",
        badge: "4M+ Searches",
        badgeColor: "from-purple-500 to-blue-500",
        stats: ["3 templates", "PDF export", "Live preview"],
      },
      {
        href: "/tools/youtube-thumbnail-downloader",
        icon: "🎬",
        title: "YouTube Thumbnail Downloader",
        description: "Download YouTube video thumbnails in all available resolutions. Just paste the URL.",
        badge: "1.5M+ Searches",
        badgeColor: "from-pink-500 to-rose-500",
        stats: ["All resolutions", "One-click save", "Shorts support"],
      },
    ],
  },
  {
    label: "More Tools",
    icon: "⚡",
    color: "from-orange-500 to-pink-500",
    badge: "Popular",
    tools: [
      {
        href: "/tools/side-hustle-calculator",
        icon: "💸",
        title: "Side Hustle Income Calculator",
        description: "Find out exactly how much you can earn from 20+ side hustles based on your skills.",
        badge: "Most Used",
        badgeColor: "from-orange-500 to-pink-500",
        stats: ["20+ hustles", "Instant results", "Free forever"],
      },
      {
        href: "/tools/ai-finder",
        icon: "🤖",
        title: "AI Tool Finder",
        description: "Answer 3 questions and get matched to the best AI tools for your exact needs.",
        badge: "Trending",
        badgeColor: "from-purple-500 to-blue-500",
        stats: ["50+ AI tools", "Smart matching", "Free tools first"],
      },
      {
        href: "/tools/investment-calculator",
        icon: "📈",
        title: "Investment Growth Calculator",
        description: "See how your money grows with compound interest. Plan your financial future.",
        badge: "Finance",
        badgeColor: "from-green-500 to-emerald-500",
        stats: ["Visual chart", "Multiple scenarios", "Inflation adjusted"],
      },
      {
        href: "/tools/tax-calculator",
        icon: "🧾",
        title: "Income Tax Calculator",
        description: "Calculate your income tax, take-home pay, and effective tax rate for the US, UK, Canada, and more.",
        badge: "New",
        badgeColor: "from-yellow-500 to-orange-500",
        stats: ["6 countries", "Federal + State", "Instant results"],
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 mb-6">
            <Zap className="w-4 h-4" /> 19 Free Tools — No Signup Required
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Free Tools</span>
            <br />
            <span style={{ color: "var(--text-primary)" }}>That Actually Work</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            AI content generators, developer utilities, and calculators — all free, all instant, no login needed.
          </p>
        </div>

        {/* Tool Categories */}
        {toolCategories.map((cat) => (
          <div key={cat.label} className="mb-20">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl`}>
                {cat.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{cat.label}</h2>
                <span className={`text-xs font-bold text-white bg-gradient-to-r ${cat.color} px-2 py-0.5 rounded-full`}>{cat.badge}</span>
              </div>
            </div>

            {/* Tools grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cat.tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="group glass rounded-2xl p-6 card-hover flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className={`text-xs font-bold text-white bg-gradient-to-r ${tool.badgeColor} px-2 py-1 rounded-full`}>
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-purple-600 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {tool.title}
                  </h3>
                  <p className="text-sm mb-4 leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.stats.map((s) => (
                      <span key={s} className="text-xs glass px-2 py-0.5 rounded-full" style={{ color: "var(--text-muted)" }}>{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all mt-auto">
                    Use Free <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Why section */}
        <div className="glass rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Why ClickWise Tools?</h2>
          <p className="mb-8" style={{ color: "var(--text-muted)" }}>Built for speed. Optimized for real results.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: "Instant Results", desc: "No loading, no delays" },
              { icon: Sparkles, label: "No Signup", desc: "Use immediately, free" },
              { icon: Code2, label: "Works Offline", desc: "Client-side processing" },
              { icon: TrendingUp, label: "Updated 2026", desc: "Fresh rates and data" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label}>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{label}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
