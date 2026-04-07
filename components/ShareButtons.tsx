"use client";

import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `https://clickwise.website/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons = [
    { label: "X", icon: Twitter, href: `https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}` },
    { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}` },
  ];

  return (
    <div className="flex items-center gap-2">
      <Share2 className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
      {buttons.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${b.label}`}
          className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <b.icon className="w-4 h-4" />
        </a>
      ))}
      <button
        onClick={copy}
        className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
        style={{ color: "var(--text-muted)" }}
        aria-label="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
