import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  trailingSlash: false,
  async redirects() {
    return [
      // Canonical post slug is only how-to-get-ai-clients — old URLs consolidate here (avoid duplicate indexed URLs).
      {
        source: "/blog/how-to-get-ai-clients-24-hours-no-experience",
        destination: "/blog/how-to-get-ai-clients",
        permanent: true,
      },
      {
        source: "/blog/how-to-get-ai-clients-fast",
        destination: "/blog/how-to-get-ai-clients",
        permanent: true,
      },
      {
        source: "/blog/how-to-start-ai-automation-agency-2026",
        destination: "/blog/ai-automation-agency",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
  },
};

export default nextConfig;
