import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI Instagram Caption Generator — Free Captions That Get Likes",
  description: "Generate scroll-stopping Instagram captions with AI in seconds. Free tool with hashtag suggestions included.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
