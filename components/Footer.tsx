"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Send, Check } from "lucide-react";

const footerLinks = {
  Categories: [
    { label: "AI & Tech", href: "/blog?cat=ai" },
    { label: "Make Money", href: "/blog?cat=money" },
    { label: "Gadgets & Reviews", href: "/reviews" },
    { label: "Finance", href: "/blog?cat=finance" },
    { label: "Health & Fitness", href: "/blog?cat=health" },
    { label: "Trending Now", href: "/blog?cat=trending" },
  ],
  "Quick Links": [
    { label: "Latest Posts", href: "/blog" },
    { label: "Top Reviews", href: "/reviews" },
    { label: "Compare Products", href: "/compare" },
    { label: "About ClickWise", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Affiliate Disclosure", href: "/disclosure" },
  ],
};

function FooterContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass rounded-xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-green-500" />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Message sent!</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>We'll get back to you within 24–48 hrs.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full glass rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        style={{ color: "var(--text-primary)" }}
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full glass rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        style={{ color: "var(--text-primary)" }}
      />
      <textarea
        required
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message..."
        className="w-full glass rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
        style={{ color: "var(--text-primary)", fontFamily: "inherit" }}
      />
      <button
        type="submit"
        className="flex items-center gap-2 text-sm font-semibold text-white rounded-xl px-4 py-2 transition-opacity hover:opacity-90 w-full justify-center"
        style={{ background: "linear-gradient(to right, #9333ea, #3b82f6)" }}
      >
        <Send className="w-3.5 h-3.5" /> Send Message
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-color)" }} className="mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand + Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span style={{ color: "var(--text-primary)" }}>Click</span>
                <span className="gradient-text">Wise</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "var(--text-muted)" }}>
              Smart picks, real reviews, and honest comparisons for everything
              trending in 2026. We help you make better decisions, faster.
            </p>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Contact Us</p>
            <FooterContactForm />
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border-color)" }}>
          <p className="text-sm text-center md:text-left" style={{ color: "var(--text-muted)" }}>
            © 2026 ClickWise. All rights reserved.
          </p>
          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            ClickWise is reader-supported. We may earn commissions from affiliate links.{" "}
            <Link href="/disclosure" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors underline">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
