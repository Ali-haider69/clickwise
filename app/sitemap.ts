import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const BASE = "https://clickwise-pi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/compare`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/make-money`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/ai-tech`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/gadgets`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/finance`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/health`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/trending`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/disclosure`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const toolPages: MetadataRoute.Sitemap = [
    "ai-linkedin-post-generator",
    "ai-instagram-caption-generator",
    "ai-blog-intro-generator",
    "json-formatter",
    "jwt-decoder",
    "api-response-viewer",
    "age-calculator",
    "freelancer-earnings-calculator",
    "fiverr-fee-calculator",
    "tax-calculator",
    "side-hustle-calculator",
    "ai-finder",
    "investment-calculator",
  ].map((slug) => ({
    url: `${BASE}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: post.category === "News" || post.category === "Sports" ? "daily" as const : "monthly" as const,
    priority: post.category === "News" ? 1.0 : post.featured ? 0.9 : post.trending ? 0.8 : 0.7,
  }));

  const reviewPages: MetadataRoute.Sitemap = [
    "airpods-pro-3",
    "samsung-galaxy-buds-4-pro",
    "sony-wf-1000xm6",
    "macbook-air-m4",
    "dell-xps-15",
    "iphone-17-pro-max",
    "iphone-16-pro-max",
  ].map((id) => ({
    url: `${BASE}/reviews/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...blogPages, ...reviewPages];
}
