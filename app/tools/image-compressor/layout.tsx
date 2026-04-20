import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Image Compressor — ClickWise",
  description: "Compress images instantly without losing quality. Supports JPG, PNG, and WebP. Free, no signup required.",
  ...canonicalMeta("/tools/image-compressor", {
    title: "Free Image Compressor — ClickWise",
    description: "Compress images instantly without losing quality. Supports JPG, PNG, and WebP. Free, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
