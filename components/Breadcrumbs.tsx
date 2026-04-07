import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://clickwise.website${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs flex-wrap mb-4" style={{ color: "var(--text-muted)" }}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="truncate max-w-[200px]" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
