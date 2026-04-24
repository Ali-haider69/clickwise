import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Tool {
  href: string;
  title: string;
  description: string;
}

const allTools: Tool[] = [
  { href: "/tools/qr-code-generator", title: "QR Code Generator", description: "Generate custom QR codes instantly" },
  { href: "/tools/image-compressor", title: "Image Compressor", description: "Compress images without losing quality" },
  { href: "/tools/password-generator", title: "Password Generator", description: "Create strong, secure passwords" },
  { href: "/tools/resume-builder", title: "Resume Builder", description: "Build a professional resume in minutes" },
  { href: "/tools/youtube-thumbnail-downloader", title: "YouTube Thumbnail Downloader", description: "Download video thumbnails in all sizes" },
  { href: "/tools/json-formatter", title: "JSON Formatter", description: "Format, validate, and minify JSON" },
  { href: "/tools/jwt-decoder", title: "JWT Decoder", description: "Decode and inspect JWT tokens" },
  { href: "/tools/api-response-viewer", title: "API Response Viewer", description: "View and format API responses" },
  { href: "/tools/age-calculator", title: "Age Calculator", description: "Calculate your exact age in detail" },
  { href: "/tools/freelancer-earnings-calculator", title: "Freelancer Earnings Calculator", description: "Calculate earnings across 6 platforms" },
  { href: "/tools/fiverr-fee-calculator", title: "Fiverr Fee Calculator", description: "Calculate Fiverr fees and net earnings" },
  { href: "/tools/side-hustle-calculator", title: "Side Hustle Calculator", description: "Estimate side hustle income projections" },
  { href: "/tools/investment-calculator", title: "Investment Calculator", description: "Calculate investment growth over time" },
  { href: "/tools/tax-calculator", title: "Tax Calculator", description: "Calculate income tax for multiple countries" },
  { href: "/tools/ai-finder", title: "AI Tool Finder", description: "Find the best AI tool for your needs" },
  { href: "/tools/ai-linkedin-post-generator", title: "LinkedIn Post Generator", description: "Generate professional LinkedIn posts" },
  { href: "/tools/ai-instagram-caption-generator", title: "Instagram Caption Generator", description: "Generate captions with hashtags" },
  { href: "/tools/ai-blog-intro-generator", title: "Blog Intro Generator", description: "Generate compelling blog introductions" },
];

export default function RelatedTools({ currentTool }: { currentTool: string }) {
  const related = allTools.filter((t) => t.href !== `/tools/${currentTool}`).slice(0, 6);

  return (
    <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--border-color)" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>More Free Tools</h2>
        <Link href="/tools" className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {related.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="glass rounded-xl p-4 hover:scale-[1.02] transition-transform"
          >
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{tool.title}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
