import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free YouTube Thumbnail Downloader — ClickWise",
  description: "Download YouTube video thumbnails in all resolutions. Just paste the URL. Free, no signup required.",
  ...canonicalMeta("/tools/youtube-thumbnail-downloader", {
    title: "Free YouTube Thumbnail Downloader — ClickWise",
    description: "Download YouTube video thumbnails in all resolutions. Just paste the URL. Free, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
