import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Resume Builder — ClickWise",
  description: "Build a professional resume in minutes. Choose from multiple templates and export as PDF. Free, no signup required.",
  ...canonicalMeta("/tools/resume-builder", {
    title: "Free Resume Builder — ClickWise",
    description: "Build a professional resume in minutes. Choose from multiple templates and export as PDF. Free, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
