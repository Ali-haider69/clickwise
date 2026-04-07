"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const els = article.querySelectorAll("h2, h3");
    const items: Heading[] = [];
    els.forEach((el, i) => {
      if (!el.id) el.id = `heading-${i}`;
      items.push({
        id: el.id,
        text: el.textContent?.replace(/^#+ /, "") ?? "",
        level: el.tagName === "H3" ? 3 : 2,
      });
    });
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 3) return null;

  return (
    <nav className="glass rounded-2xl p-5 mb-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide w-full"
        style={{ color: "var(--text-primary)" }}
      >
        <List className="w-4 h-4" />
        Table of Contents
        <span className="ml-auto text-xs" style={{ color: "var(--text-muted)" }}>
          {open ? "Hide" : "Show"}
        </span>
      </button>
      {open && (
        <ul className="mt-3 space-y-1.5 text-sm">
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1rem" : 0 }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="block py-1 transition-colors hover:text-purple-600 dark:hover:text-purple-400 leading-snug"
                style={{
                  color: active === h.id ? "var(--text-primary)" : "var(--text-muted)",
                  fontWeight: active === h.id ? 600 : 400,
                  borderLeft: active === h.id ? "2px solid rgb(147 51 234)" : "2px solid transparent",
                  paddingLeft: "0.75rem",
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
